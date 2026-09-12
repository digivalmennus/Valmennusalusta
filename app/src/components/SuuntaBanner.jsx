export default function SuuntaBanner({ suunta, laajuus, seuraavaTapaaminen }) {
  return (
    <div className="suunta-banner">
      <p className="suunta-label">
        Valittu liikkeen suunta — sovittu yhdessä valmentajan kanssa
      </p>
      <h1 className="suunta-title">{suunta}</h1>
      <p className="suunta-sub">
        Alla olevat teemat koskevat vain tätä suuntaa. Voit avata ne missä
        järjestyksessä haluat — mitään ei ole lukittu.
      </p>
      <div className="suunta-meta">
        <span>Laajuus: {laajuus}</span>
        <span>Seuraava tapaaminen: {seuraavaTapaaminen}</span>
      </div>
    </div>
  )
}
