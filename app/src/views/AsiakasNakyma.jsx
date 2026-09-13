import { useEffect, useState } from 'react'
import SuuntaBanner from '../components/SuuntaBanner'
import Eteneminen from '../components/Eteneminen'
import TeemaKortti from '../components/TeemaKortti'
import { teemat } from '../data/teemat'
import { supabase } from '../lib/supabaseClient'

const alkutila = Object.fromEntries(
  teemat.map((t) => [t.id, { avoinna: false, avattu: false, taso: 'matala', valmis: false }])
)

const alkuReflektiot = Object.fromEntries(
  teemat.map((t) => [t.id, { teksti: '', tallennettu: false, jaettu: false }])
)

export default function AsiakasNakyma({ userId, email, onKirjauduUlos }) {
  const [tila, setTila] = useState(alkutila)
  const [reflektiot, setReflektiot] = useState(alkuReflektiot)
  const [lataa, setLataa] = useState(true)

  useEffect(() => {
    let peruttu = false

    async function lataaTallennettu() {
      const [{ data: eteneminen, error: e1 }, { data: itsearvioinnit, error: e2 }] = await Promise.all([
        supabase.from('etenemistieto').select('*').eq('asiakas_id', userId),
        supabase.from('itsearviointitulos').select('*').eq('asiakas_id', userId),
      ])
      if (peruttu) return
      if (e1) console.error('Etenemistiedon haku epäonnistui:', e1.message)
      if (e2) console.error('Itsearviointitulosten haku epäonnistui:', e2.message)

      if (eteneminen) {
        setTila((prev) => {
          const seuraava = { ...prev }
          for (const rivi of eteneminen) {
            if (!seuraava[rivi.moduuli_id]) continue
            seuraava[rivi.moduuli_id] = {
              ...seuraava[rivi.moduuli_id],
              avattu: true,
              taso: rivi.taso_valittu ?? 'matala',
              valmis: rivi.merkitty_valmiiksi ?? false,
            }
          }
          return seuraava
        })
      }

      if (itsearvioinnit) {
        setReflektiot((prev) => {
          const seuraava = { ...prev }
          for (const rivi of itsearvioinnit) {
            if (!seuraava[rivi.moduuli_id]) continue
            seuraava[rivi.moduuli_id] = {
              teksti: rivi.sisalto ?? '',
              tallennettu: true,
              jaettu: rivi.jaettu_valmentajalle ?? false,
            }
          }
          return seuraava
        })
      }

      setLataa(false)
    }

    lataaTallennettu()
    return () => {
      peruttu = true
    }
  }, [userId])

  function onToggleOpen(id) {
    setTila((prev) => {
      const nykyinen = prev[id]
      const avoinna = !nykyinen.avoinna
      const ensiKerta = avoinna && !nykyinen.avattu

      if (ensiKerta) {
        supabase
          .from('etenemistieto')
          .upsert(
            { asiakas_id: userId, moduuli_id: id, taso_valittu: nykyinen.taso, paivitetty: new Date().toISOString() },
            { onConflict: 'asiakas_id,moduuli_id' }
          )
          .then(({ error }) => {
            if (error) console.error('Etenemistiedon tallennus epäonnistui:', error.message)
          })
      }

      return {
        ...prev,
        [id]: { ...nykyinen, avoinna, avattu: nykyinen.avattu || avoinna },
      }
    })
  }

  function onChangeTaso(id, taso) {
    setTila((prev) => ({ ...prev, [id]: { ...prev[id], taso } }))
    supabase
      .from('etenemistieto')
      .upsert(
        { asiakas_id: userId, moduuli_id: id, taso_valittu: taso, paivitetty: new Date().toISOString() },
        { onConflict: 'asiakas_id,moduuli_id' }
      )
      .then(({ error }) => {
        if (error) console.error('Tason tallennus epäonnistui:', error.message)
      })
  }

  function onMerkitse(id) {
    const taso = tila[id].taso
    setTila((prev) => ({ ...prev, [id]: { ...prev[id], valmis: true } }))
    supabase
      .from('etenemistieto')
      .upsert(
        {
          asiakas_id: userId,
          moduuli_id: id,
          taso_valittu: taso,
          merkitty_valmiiksi: true,
          paivitetty: new Date().toISOString(),
        },
        { onConflict: 'asiakas_id,moduuli_id' }
      )
      .then(({ error }) => {
        if (error) console.error('Valmiiksi merkitsemisen tallennus epäonnistui:', error.message)
      })
  }

  function onReflektioChange(id, teksti) {
    setReflektiot((prev) => ({ ...prev, [id]: { ...prev[id], teksti } }))
  }

  function onReflektioTallenna(id) {
    const teksti = reflektiot[id].teksti
    supabase
      .from('itsearviointitulos')
      .upsert(
        { asiakas_id: userId, moduuli_id: id, sisalto: teksti },
        { onConflict: 'asiakas_id,moduuli_id' }
      )
      .then(({ error }) => {
        if (error) {
          console.error('Itsearvioinnin tallennus epäonnistui:', error.message)
          return
        }
        setReflektiot((prev) => ({ ...prev, [id]: { ...prev[id], tallennettu: true } }))
      })
  }

  function onReflektioJaa(id) {
    supabase
      .from('itsearviointitulos')
      .update({ jaettu_valmentajalle: true })
      .eq('asiakas_id', userId)
      .eq('moduuli_id', id)
      .then(({ error }) => {
        if (error) {
          console.error('Jakaminen epäonnistui:', error.message)
          return
        }
        setReflektiot((prev) => ({ ...prev, [id]: { ...prev[id], jaettu: true } }))
      })
  }

  if (lataa) {
    return (
      <div className="wrap">
        <p>Ladataan...</p>
      </div>
    )
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <span className="topbar-email">{email}</span>
        <button type="button" className="kirjaudu-ulos" onClick={onKirjauduUlos}>
          Kirjaudu ulos
        </button>
      </div>

      <SuuntaBanner
        suunta="Työllistyminen"
        laajuus="perus (5 tapaamista)"
        seuraavaTapaaminen="24.9."
      />

      <Eteneminen teemat={teemat} tila={tila} />

      <div className="teemat">
        {teemat.map((t) => (
          <TeemaKortti
            key={t.id}
            teema={t}
            tila={tila[t.id]}
            onToggleOpen={onToggleOpen}
            onChangeTaso={onChangeTaso}
            onMerkitse={onMerkitse}
            reflektio={reflektiot[t.id]}
            onReflektioChange={onReflektioChange}
            onReflektioTallenna={onReflektioTallenna}
            onReflektioJaa={onReflektioJaa}
          />
        ))}
      </div>

      <p className="jarjestys-huom">
        Valmentaja on suositellut sinulle 3 teemaa aloitukseksi (merkitty ★) —
        muut voit avata halutessasi. Et voi edetä väärässä järjestyksessä,
        koska järjestystä ei ole.
      </p>
    </div>
  )
}
