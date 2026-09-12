# Digivalmennusalusta — tietosuojaseloste (luonnos)

*Tämä on luonnos/pohja, ei valmis, julkaisukelpoinen asiakirja. Kohdat merkitty [TÄYDENNETTÄVÄ] vaativat organisaatiokohtaista tietoa, jota ei vielä ole määritelty tässä konseptivaiheessa. Rakenne noudattaa GDPR 13–14 artiklan informointivaatimuksia ja perustuu suoraan `tiedonhallinta.md`-dokumentin entiteetteihin.*

---

## 1. Rekisterinpitäjä

| Kenttä | Tieto |
|---|---|
| Organisaatio | [TÄYDENNETTÄVÄ — esim. hyvinvointialue tai yksityinen palveluntuottaja, joka toteuttaa valmennusta] |
| Y-tunnus | [TÄYDENNETTÄVÄ] |
| Yhteystiedot | [TÄYDENNETTÄVÄ] |
| Yhteyshenkilö tietosuoja-asioissa / tietosuojavastaava | [TÄYDENNETTÄVÄ — pakollinen, jos organisaatio on julkinen tai käsittely on laajamittaista] |

---

## 2. Henkilötietojen käsittelyn tarkoitus

Digivalmennusalustan kautta käsitellään henkilötietoja, jotta:
- valmennettavalle voidaan tarjota hänen valitsemansa liikkeen suunnan (työllistyminen/opiskeluun ohjaus/osallisuus/muu askel) mukaista sisältöä
- valmentaja voi seurata etenemistä ja tukea valmennusprosessia
- valmennuksen tavoitteiden (GAS) toteutumista voidaan seurata
- työsuhteen/opintojen alkuvaiheen tukea (siirtymämoduuli) voidaan tarjota

**Käsittely ei sisällä automaattista päätöksentekoa tai profilointia** (GDPR 22 art.) — sisällön suositukset perustuvat aina valmentajan tekemään arvioon, ei algoritmiseen päättelyyn.

---

## 3. Käsittelyn oikeusperuste

[TÄYDENNETTÄVÄ organisaatiokohtaisesti — todennäköisiä perusteita, riippuen siitä miten palvelu on järjestetty:]

- **Sopimus tai sopimuksen valmistelu** (GDPR 6.1.b), jos valmennus perustuu asiakkaan ja palveluntuottajan väliseen sopimukseen
- **Lakisääteinen velvoite** (GDPR 6.1.c), jos kyse on lakisääteisen muutosturvan toteuttamisesta
- **Yleinen etu / julkisen vallan käyttö** (GDPR 6.1.e), jos rekisterinpitäjä on julkinen toimija
- **Suostumus** (GDPR 6.1.a) tietyille valinnaisille osille, esim. itsereflektiotulosten jakaminen valmentajalle (ks. kohta 4 — tämä ei ole koko käsittelyn peruste vaan yhden erityisen toiminnon peruste)

Terveystietoon tai muuhun erityiseen henkilötietoryhmään viittaavan tiedon käsittely (jos asiakas mainitsee sellaista vapaatekstissä) edellyttää lisäksi GDPR 9 artiklan mukaista erityisperustetta — tätä ei pidä kerätä rakenteisena kenttänä missään tilanteessa.

---

## 4. Käsiteltävät henkilötietoryhmät

Suoraan `tiedonhallinta.md`:n entiteeteistä johdettuna:

| Tietoryhmä | Esimerkki | Näkyy valmentajalle oletuksena? |
|---|---|---|
| Perustiedot | Nimi, yhteystiedot, kielivalinta | Kyllä |
| Valmennussuunnitelma | Liikkeen suunta, prosessin laajuus, GAS-tavoitteet | Kyllä (yhdessä sovittu) |
| Etenemistieto | Mitä sisältöjä käyty, milloin | Kyllä (yhteenvetona) |
| Kolmen kysymyksen mittari | Vastaukset | Kyllä (yhdessä käytävä) |
| **TMT-itsearviointitulos** | Työn merkitysten ja täyttymysten kartoitus | **Ei automaattisesti** — vain asiakkaan aktiivisella jakamisella |
| **Vapaamuotoinen itsereflektio** | Asiakkaan oma pohdinta | **Ei koskaan automaattisesti** |
| Tapaamismuistiinpanot | Valmentajan kirjaamat havainnot kasvokkaisista tapaamisista | Kyllä (valmentajan oma kirjaus) |

**Erityinen huomio:** Jos asiakas mainitsee vapaatekstissä (esim. itsereflektiossa) terveystietoa tai muuta erityistä henkilötietoryhmää, tätä ei indeksoida, luokitella tai käytetä sisällön suositteluun — se pysyy vain tekstinä, jonka asiakas itse näkee, ellei hän erikseen jaa sitä valmentajalle.

---

## 5. Tietojen säännönmukaiset lähteet

- Asiakas itse (rekisteröinnin ja käytön yhteydessä)
- Valmentaja (tapaamisten kirjaukset)
- Ohjaava taho (kertaluontoinen ohjaustieto, esim. TE-palvelut/hyvinvointialue) — ks. tiedonhallinnan malli, kohta 3: tämä on kertaluontoinen, ei jatkuva integraatio

---

## 6. Tietojen luovutukset

[TÄYDENNETTÄVÄ — riippuu lopullisesta teknisestä toteutuksesta, esim.:]

- Alustan tekninen ylläpitäjä/toimittaja (henkilötietojen käsittelijä, oma käsittelysopimus tarvitaan)
- **Ei luovutuksia** ohjaavalle taholle (TE-palvelut/hyvinvointialue) takaisin ilman asiakkaan suostumusta — tämä on tietoinen rajaus (ks. tiedonhallinnan malli, kohta 3: ei kahdensuuntaista integraatiota)
- Ei luovutuksia kolmansille osapuolille markkinointi- tai muuhun tarkoitukseen

**Siirrot EU/ETA-alueen ulkopuolelle:** [TÄYDENNETTÄVÄ — riippuu valitusta pilvipalveluntarjoajasta; jos käytetään esim. yhdysvaltalaista pilvipalvelua, tarvitaan EU:n vakiosopimuslausekkeet tai muu GDPR:n mukainen siirtoperuste]

---

## 7. Säilytysaika

Suoraan `tiedonhallinta.md`:n kohdasta 5:

| Tietotyyppi | Säilytysaika |
|---|---|
| Aktiivisen prosessin tiedot | Prosessin keston ajan |
| Tapaamismuistiinpanot, valmennussuunnitelma | Prosessin päätyttyä organisaation yleisen arkistointikäytännön mukaisesti [TÄYDENNETTÄVÄ tarkka aika] |
| Siirtymämoduulin tiedot | Rajattu seurantajakso (esim. 6 kk työsuhteen alusta) [TÄYDENNETTÄVÄ] |
| Itsearviointitulokset (TMT, itsereflektio) | Harkittava lyhyempää säilytysaikaa; asiakkaalla oikeus poistaa milloin tahansa |

---

## 8. Rekisteröidyn oikeudet

Asiakkaalla on oikeus:
- saada pääsy omiin tietoihinsa (tarkastusoikeus)
- pyytää virheellisen tiedon oikaisua
- pyytää tietojen poistamista (huomioiden mahdolliset säilytysvelvoitteet)
- vastustaa käsittelyä tai pyytää sen rajoittamista
- siirtää tietonsa järjestelmästä toiseen (jos käsittely perustuu sopimukseen tai suostumukseen)
- tehdä valitus tietosuojavaltuutetun toimistolle (yhteystiedot: tietosuoja.fi)

**Itsearviointitulosten (TMT, itsereflektio) osalta:** asiakkaalla on lisäksi mahdollisuus valita, jaetaanko näitä valmentajalle lainkaan — tämä ei ole vain lakisääteinen oikeus vaan rakenteellinen osa palvelun toimintaperiaatetta.

---

## 9. Tietoturva

[TÄYDENNETTÄVÄ tekninen kuvaus — esim. pääsynhallinta rooleittain (asiakas/valmentaja/ylläpito), salaus siirrossa ja levossa, lokitus]

---

## 10. Mitä tämä luonnos ei vielä ratkaise

- Organisaation tarkat yhteystiedot ja tietosuojavastaava
- Lopullinen oikeusperuste (riippuu siitä, miten palvelu virallisesti järjestetään — sopimus, laki vai suostumus)
- Tarkka pilvipalveluntarjoaja ja mahdolliset EU:n ulkopuoliset siirrot
- Tarkat säilytysajat (vaatii organisaation arkistointikäytännön määrittelyn)
- Käsittelysopimukset alihankkijoiden/toimittajien kanssa

**Huomio:** Tämä luonnos ei ole lakineuvontaa. Ennen julkaisua se pitää tarkistuttaa organisaation tietosuojavastaavalla tai lakimiehellä, erityisesti kohdat 3 (oikeusperuste) ja 6 (luovutukset/siirrot), koska ne riippuvat lopullisista organisatorisista ja teknisistä ratkaisuista.
