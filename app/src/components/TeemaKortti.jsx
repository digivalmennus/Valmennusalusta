import NeljaPolkuaKaavio from './NeljaPolkuaKaavio'
import Itsereflektio from './Itsereflektio'

export default function TeemaKortti({
  teema,
  tila,
  onToggleOpen,
  onChangeTaso,
  onMerkitse,
  reflektio,
  onReflektioChange,
  onReflektioTallenna,
  onReflektioJaa,
}) {
  const teksti = tila.taso === 'matala' ? teema.matala : teema.syventava
  const onItsereflektio = teema.muoto.includes('itsereflektio')

  return (
    <div
      className={'kortti' + (tila.avoinna ? ' open' : '')}
      onClick={() => onToggleOpen(teema.id)}
    >
      <div className="kortti-top">
        <h3>
          {teema.suositeltu ? '★ ' : ''}
          {teema.title}
        </h3>
        <span className="muoto">{teema.muoto}</span>
      </div>
      <p className="kuvaus">{teema.kuvaus}</p>
      {tila.valmis && <p className="valmis-merkki show">✓ Käyty läpi</p>}

      {tila.avoinna && (
        <div className="sisalto show">
          {teema.id === 'miksi-nain' && <NeljaPolkuaKaavio />}
          <div className="tasot">
            <button
              type="button"
              className={'taso-btn' + (tila.taso === 'matala' ? ' active' : '')}
              data-taso="matala"
              onClick={(e) => {
                e.stopPropagation()
                onChangeTaso(teema.id, 'matala')
              }}
            >
              Aloita helposti
            </button>
            <button
              type="button"
              className={'taso-btn' + (tila.taso === 'syventava' ? ' active' : '')}
              data-taso="syventava"
              onClick={(e) => {
                e.stopPropagation()
                onChangeTaso(teema.id, 'syventava')
              }}
            >
              Syvenny
            </button>
          </div>
          <p className="taso-teksti">{teksti}</p>

          {onItsereflektio && reflektio && (
            <Itsereflektio
              moduuliId={teema.id}
              teksti={reflektio.teksti}
              tallennettu={reflektio.tallennettu}
              jaettu={reflektio.jaettu}
              onTekstiChange={(teksti) => onReflektioChange(teema.id, teksti)}
              onTallenna={() => onReflektioTallenna(teema.id)}
              onJaa={() => onReflektioJaa(teema.id)}
            />
          )}

          <div className="toiminnot">
            <button
              type="button"
              className={'merkitse' + (tila.valmis ? ' done' : '')}
              onClick={(e) => {
                e.stopPropagation()
                onMerkitse(teema.id)
              }}
            >
              {tila.valmis ? 'Käyty läpi ✓' : 'Merkitse käydyksi'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
