export default function Itsereflektio({ moduuliId, teksti, tallennettu, jaettu, onTekstiChange, onTallenna, onJaa }) {
  return (
    <div className="itsereflektio" onClick={(e) => e.stopPropagation()}>
      <label className="itsereflektio-label" htmlFor={`refl-${moduuliId}`}>
        Oma pohdintasi — näkyy vain sinulle, ellet erikseen jaa sitä valmentajalle
      </label>
      <textarea
        id={`refl-${moduuliId}`}
        className="itsereflektio-teksti"
        rows={4}
        value={teksti}
        onChange={(e) => onTekstiChange(e.target.value)}
        placeholder="Kirjoita tähän omia ajatuksiasi..."
      />
      <div className="itsereflektio-toiminnot">
        <button type="button" className="itsereflektio-tallenna" onClick={onTallenna}>
          Tallenna
        </button>
        {tallennettu && !jaettu && <span className="itsereflektio-tila">Tallennettu, ei jaettu</span>}
        {!jaettu ? (
          <button
            type="button"
            className="itsereflektio-jaa"
            onClick={onJaa}
            disabled={!tallennettu}
            title={!tallennettu ? 'Tallenna ensin oma pohdintasi' : undefined}
          >
            Jaa valmentajalle
          </button>
        ) : (
          <span className="itsereflektio-jaettu">✓ Jaettu valmentajalle</span>
        )}
      </div>
    </div>
  )
}
