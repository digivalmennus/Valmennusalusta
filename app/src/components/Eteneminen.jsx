export default function Eteneminen({ teemat, tila }) {
  return (
    <div className="etenee">
      <h2>Oma eteneminen — ei tarvitse edetä järjestyksessä</h2>
      <div className="pisteet">
        {teemat.map((t) => (
          <div
            key={t.id}
            className={'piste' + (tila[t.id].avattu ? ' done' : '')}
            title={t.title}
          >
            {tila[t.id].avattu ? '✓' : '·'}
          </div>
        ))}
      </div>
    </div>
  )
}
