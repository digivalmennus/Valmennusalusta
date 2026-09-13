export default function NeljaPolkuaKaavio() {
  return (
    <div className="kaavio-wrap">
      <svg
        viewBox="0 0 400 460"
        role="img"
        aria-label="Neljä rinnakkaista polkua merkityksellisyyteen: autonomia, kyvykkyys, yhteisöllisyys, hyvän tekeminen, jotka kaikki yhdistyvät keskellä olevaan merkityksellisyyteen ja hyvinvointiin. Ei pyramidia, ei järjestystä."
      >
        <defs>
          <marker
            id="nelja-polkua-arr"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path
              d="M2 1L8 5L2 9"
              fill="none"
              stroke="#B8B6AC"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        <line x1="115" y1="98" x2="172" y2="195" stroke="#B8B6AC" strokeWidth="1.4" markerEnd="url(#nelja-polkua-arr)" />
        <line x1="265" y1="98" x2="208" y2="195" stroke="#B8B6AC" strokeWidth="1.4" markerEnd="url(#nelja-polkua-arr)" />
        <line x1="115" y1="362" x2="172" y2="265" stroke="#B8B6AC" strokeWidth="1.4" markerEnd="url(#nelja-polkua-arr)" />
        <line x1="265" y1="362" x2="208" y2="265" stroke="#B8B6AC" strokeWidth="1.4" markerEnd="url(#nelja-polkua-arr)" />

        <rect x="20" y="55" width="180" height="60" rx="12" fill="#E4EFEA" stroke="#2F5D50" strokeWidth="1.5" />
        <text x="110" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#22221F">Autonomia</text>
        <text x="110" y="98" textAnchor="middle" fontSize="12.5" fill="#54534C">Oma tahti, omat valinnat</text>

        <rect x="200" y="55" width="180" height="60" rx="12" fill="#F7E9E1" stroke="#B4542A" strokeWidth="1.5" />
        <text x="290" y="78" textAnchor="middle" fontSize="16" fontWeight="700" fill="#22221F">Kyvykkyys</text>
        <text x="290" y="98" textAnchor="middle" fontSize="12.5" fill="#54534C">Onnistumisen kokemukset</text>

        <rect x="20" y="345" width="180" height="60" rx="12" fill="#EAE7F7" stroke="#4A3F8C" strokeWidth="1.5" />
        <text x="110" y="368" textAnchor="middle" fontSize="16" fontWeight="700" fill="#22221F">Yhteisöllisyys</text>
        <text x="110" y="388" textAnchor="middle" fontSize="12.5" fill="#54534C">Valmentaja ja muut rinnalla</text>

        <rect x="200" y="345" width="180" height="60" rx="12" fill="#F6EBD3" stroke="#9A6B12" strokeWidth="1.5" />
        <text x="290" y="368" textAnchor="middle" fontSize="16" fontWeight="700" fill="#22221F">Hyvän tekeminen</text>
        <text x="290" y="388" textAnchor="middle" fontSize="12.5" fill="#54534C">Oma edistyminen auttaa muitakin</text>

        <circle cx="190" cy="230" r="65" fill="#2B2B27" stroke="#2B2B27" />
        <text x="190" y="222" textAnchor="middle" fontSize="15" fontWeight="700" fill="#F5F3EC">Merkityksellisyys</text>
        <text x="190" y="242" textAnchor="middle" fontSize="15" fontWeight="700" fill="#F5F3EC">&amp; hyvinvointi</text>

        <text x="190" y="430" textAnchor="middle" fontSize="12" fontStyle="italic" fill="#7A796F">
          Neljä yhtä tärkeää polkua — ei järjestystä, ei hierarkiaa
        </text>
        <text x="190" y="445" textAnchor="middle" fontSize="12" fontStyle="italic" fill="#7A796F">
          (Ryan &amp; Deci; Martela &amp; Ryan 2016; Martela &amp; Riekki 2018)
        </text>
      </svg>
    </div>
  )
}
