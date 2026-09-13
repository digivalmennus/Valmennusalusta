import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { teemaOtsikko } from '../data/teemat'

export default function ValmentajaNakyma({ email, onKirjauduUlos }) {
  const [lataa, setLataa] = useState(true)
  const [virhe, setVirhe] = useState(null)
  const [asiakkaat, setAsiakkaat] = useState([])
  const [etenemiset, setEtenemiset] = useState([])
  const [jaetut, setJaetut] = useState([])

  useEffect(() => {
    let peruttu = false

    async function lataaKaikki() {
      const [
        { data: profiilit, error: e1 },
        { data: eteneminen, error: e2 },
        { data: reflektiot, error: e3 },
      ] = await Promise.all([
        supabase.from('profiilit').select('id, email, nimi, rooli').eq('rooli', 'asiakas'),
        supabase.from('etenemistieto').select('*'),
        supabase.from('itsearviointitulos').select('*').eq('jaettu_valmentajalle', true),
      ])
      if (peruttu) return

      const virheet = [e1, e2, e3].filter(Boolean)
      if (virheet.length > 0) setVirhe(virheet.map((e) => e.message).join(' / '))

      setAsiakkaat(profiilit ?? [])
      setEtenemiset(eteneminen ?? [])
      setJaetut(reflektiot ?? [])
      setLataa(false)
    }

    lataaKaikki()
    return () => {
      peruttu = true
    }
  }, [])

  if (lataa) {
    return (
      <div className="valmentaja-wrap">
        <p>Ladataan...</p>
      </div>
    )
  }

  return (
    <div className="valmentaja-wrap">
      <div className="topbar">
        <span className="topbar-email">{email}</span>
        <button type="button" className="kirjaudu-ulos" onClick={onKirjauduUlos}>
          Kirjaudu ulos
        </button>
      </div>

      <h1 className="valmentaja-title">Asiakkaat</h1>

      {virhe && <p className="auth-virhe">{virhe}</p>}
      {asiakkaat.length === 0 && !virhe && <p className="valmentaja-tyhja">Ei vielä asiakkaita.</p>}

      <div className="asiakaslista">
        {asiakkaat.map((asiakas) => {
          const omat = etenemiset.filter((e) => e.asiakas_id === asiakas.id)
          const jaetutOmat = jaetut.filter((j) => j.asiakas_id === asiakas.id)

          return (
            <div className="asiakas-kortti" key={asiakas.id}>
              <h2>{asiakas.nimi || asiakas.email}</h2>
              {asiakas.nimi && <p className="asiakas-email">{asiakas.email}</p>}

              {omat.length === 0 ? (
                <p className="asiakas-ei-etenemista">Ei vielä avattuja moduuleita.</p>
              ) : (
                <ul className="asiakas-moduulit">
                  {omat.map((rivi) => (
                    <li key={rivi.moduuli_id}>
                      <span className="moduuli-nimi">{teemaOtsikko(rivi.moduuli_id)}</span>
                      <span className="moduuli-taso">
                        {rivi.taso_valittu === 'syventava' ? 'Syvenny' : 'Aloita helposti'}
                      </span>
                      {rivi.merkitty_valmiiksi && <span className="moduuli-valmis">✓ Käyty läpi</span>}
                    </li>
                  ))}
                </ul>
              )}

              {jaetutOmat.length > 0 && (
                <div className="asiakas-jaetut">
                  {jaetutOmat.map((rivi) => (
                    <div className="jaettu-rivi" key={rivi.moduuli_id}>
                      <p className="jaettu-otsikko">
                        Asiakas on jakanut: {teemaOtsikko(rivi.moduuli_id)}
                      </p>
                      <p className="jaettu-sisalto">{rivi.sisalto}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
