import { useState } from 'react'
import SuuntaBanner from './components/SuuntaBanner'
import Eteneminen from './components/Eteneminen'
import TeemaKortti from './components/TeemaKortti'
import { teemat } from './data/teemat'
import './styles.css'

const alkutila = Object.fromEntries(
  teemat.map((t) => [t.id, { avoinna: false, avattu: false, taso: 'matala', valmis: false }])
)

export default function App() {
  const [tila, setTila] = useState(alkutila)

  function onToggleOpen(id) {
    setTila((prev) => {
      const nykyinen = prev[id]
      const avoinna = !nykyinen.avoinna
      return {
        ...prev,
        [id]: { ...nykyinen, avoinna, avattu: nykyinen.avattu || avoinna },
      }
    })
  }

  function onChangeTaso(id, taso) {
    setTila((prev) => ({ ...prev, [id]: { ...prev[id], taso } }))
  }

  function onMerkitse(id) {
    setTila((prev) => ({ ...prev, [id]: { ...prev[id], valmis: true } }))
  }

  return (
    <div className="wrap">
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
