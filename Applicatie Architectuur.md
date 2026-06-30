# Applicatie Architectuur

## Functionele requirements

De TransparantieApp ondersteunt de twee usecases uit [Business Architectuur.md](./Business%20Architectuur.md):

1. **"Waarom is dit gebeurd?"** — een betrokkene wil de Trace rondom een specifiek besluit reconstrueren. Het startpunt (de Verantwoordelijke) is bekend uit het besluit zelf.

2. **"Wie heeft er aan mijn gegevens gezeten?"** — een betrokkene wil overheidsbreed inzicht in alle Traces waarbij diens persoonsgegevens betrokken zijn, zonder voorgedefinieerd startpunt.

Vanuit applicatie-technisch perspectief is de tweede usecase de meest uitdagende: er is geen startpunt, en het antwoord ligt potentieel verspreid over honderden tot duizenden Logboeken. De architectuur in dit document is daarom primair ontworpen rondom deze tweede usecase. De eerste usecase volgt als vereenvoudigde variant: het startpunt is bekend, waardoor de overheidsbrede zoekvraag wegvalt.

Hieruit volgen onderstaande functionele requirements:

- **FR-1: Lijst van Traces tonen.** De app toont de ingelogde gebruiker een chronologisch overzicht van Traces waarin diens persoonsgegevens zijn verwerkt. Het aantal te tonen Traces is configureerbaar en de lijst is gepagineerd, zodat zowel een snel overzicht (bijvoorbeeld de 25 meest recente) als een uitgebreid historisch overzicht opvraagbaar is.

- **FR-2: Detail van een Trace tonen.** Voor elke Trace in de lijst kan de gebruiker doorklikken om de bijbehorende Trace in te zien: welke Verantwoordelijke, welke gegevens, met welk doel en op welk moment. Deze Traces worden opgehaald uit de Logboeken van de betrokken Verantwoordelijken.

- **FR-3: Trace opzoeken via een Trace-identifier.** Wanneer de gebruiker een `trace_id` aanlevert (bijvoorbeeld uit een besluitbrief), kan de app de bijbehorende Trace tonen zonder dat de gebruiker eerst de lijst uit FR-1 hoeft te raadplegen. Dit ondersteunt de usecase *"Waarom is dit gebeurd?"*.

- **FR-4: Volledigheidsindicatie bij ontoegankelijke Logboeken.** Wanneer een Logboek tijdelijk niet bereikbaar is, toont de app een placeholder die aangeeft dat er Traces bij die Verantwoordelijke aanwezig zijn en op welk moment, maar dat de inhoud nu niet kan worden opgehaald. De gebruiker kan zo onderscheid maken tussen *"geen Traces door deze Verantwoordelijke"* en *"Traces aanwezig, maar nu niet beschikbaar"*.

- **FR-5: Vertrouwelijke Traces afschermen.** Traces die door een initierende Verantwoordelijke als vertrouwelijk zijn aangemerkt (bijvoorbeeld in het kader van een lopend justitieel onderzoek) worden niet in de app getoond, ook niet als placeholder. Pas wanneer de betreffende Verantwoordelijke de Trace alsnog vrijgeeft, wordt deze zichtbaar voor de betrokkene.

- **FR-6: Filteren van de Tracelijst.** De lijst uit FR-1 is door de gebruiker te filteren op (a) een tijdsperiode, (b) de *initierende Verantwoordelijke* van de Trace en (c) een *domein* (bijvoorbeeld *Huisvesting*, *Inkomen* of *Gezondheid*). Een domein wordt op het niveau van het Logboek vastgelegd: elk Logboek is aan precies één domein gekoppeld. De LDV-standaard kent het concept *domein* niet; dit is een toevoeging van de Extensie Lezen.

## Niet-functionele requirements

Naast de functionele requirements stelt de architectuur de volgende kwaliteitseisen:

- **NFR-1: Decentrale opslag van Trace-data.** De inhoud van Traces blijft opgeslagen in het Logboek van de Verantwoordelijke die deze heeft gelogd. Er ontstaat geen centrale kopie van Logboek-inhoud; 

- **NFR-2: Schaalbaarheid naar overheidsbrede uitrol.** De architectuur is geschikt voor duizenden Logboeken. Nederland kent circa 1.600 overheidsorganisaties, en iedere organisatie kan meerdere Logboeken beheren. Het beantwoorden van een gebruikersvraag mag niet vereisen dat alle Logboeken bevraagd worden; alleen de Logboeken die volgens de TraceIndex relevante Traces bevatten worden geraadpleegd.

- **NFR-3: Geschikt voor Web en Mobile.** De TransparantieApp moet als webapplicatie en als native mobiele applicatie geimplementeerd kunnen worden. De architectuur stelt geen eisen die slechts in één van beide platformen haalbaar zijn.

- **NFR-4: Acceptabele laadtijd.** Het tonen van de Tracelijst (FR-1) gebeurt binnen 1 seconde onder normale omstandigheden. Vertraging veroorzaakt door één traag of onbereikbaar Logboek mag de overige resultaten niet ophouden; in plaats daarvan wordt voor het betreffende Logboek de placeholder uit FR-4 getoond.

- **NFR-5: Privacy-by-design.** De architectuur is zo ontworpen dat persoonsgegevens (in het bijzonder het BSN) niet centraal verwerkt worden. De TraceIndex werkt uitsluitend met pseudoniemen en kent op geen enkel moment het BSN; de pseudonimisering wordt nader uitgewerkt in dit hoofdstuk.

- **NFR-6: Toegangscontrole bij Logboeken.** Een Logboek stelt geen Traces ter beschikking zonder bewijs dat de aanvragende gebruiker hier toegerechtigd is.

## Componenten

De architectuur kent de volgende componenten: de TransparantieApp (zelf bestaande uit een frontend en een backend), een Pseudoniemendienst (PRS), een TraceIndex en de Logboeken van de deelnemende Verantwoordelijken. Daarnaast wordt gebruikgemaakt van een externe Identity Provider voor de authenticatie van de gebruiker.

- **TransparantieApp Frontend** — Web- of Mobile-applicatie waarmee de Betrokkene zijn Traces inziet. Bevraagt rechtstreeks de TraceIndex en de Logboeken.

- **TransparantieApp Backend** — heeft twee taken: (1) authenticatie van de Betrokkene via de Identity Provider (DigiD vereist een backend-component) en (2) initiatie van de OPRF-flow. De backend ontvangt het BSN van de Identity Provider, past *blinding* toe en stuurt het geblindeerde BSN naar de Pseudoniemendienst. Het resultaat van de PRS (een JWE) wordt samen met de blinding factor doorgegeven aan de frontend, waarmee de TraceIndex wordt aangeroepen.

- **Identity Provider** — externe dienst (bijvoorbeeld DigiD voor burgers, eHerkenning voor bedrijven) die de identiteit van de gebruiker bevestigt aan de TransparantieApp Backend. De architectuur is niet gebonden aan één specifieke provider; ook een OpenID Verifiable Credentials-flow is mogelijk.

- **Pseudoniemendienst (PRS)** — implementeert een Oblivious Pseudorandom Function (OPRF) waarmee een BSN onomkeerbaar wordt omgezet naar een pseudoniem. Beheert het OPRF-secret, maar krijgt het BSN zelf nooit te zien — uitsluitend een geblindeerde representatie. Wordt zowel door de TransparantieApp Backend (voor lookup) als door de Verantwoordelijken (voor het publiceren van Traces) aangeroepen.

- **TraceIndex** — dat per pseudoniem vastlegt in welk Logboek en op welk moment Traces voor de Betrokkene zijn opgenomen. Geeft bij een lookup een JWT-accesstoken af waarmee de TransparantieApp Frontend namens de gebruiker een Logboek mag bevragen.

- **Logboek** — opslag van Traces bij een Verantwoordelijke. Per Verantwoordelijke kunnen meerdere Logboeken bestaan, elk gekoppeld aan precies één domein (zie FR-6). Een Logboek geeft alleen Traces vrij na succesvolle validatie van het JWT dat door de TraceIndex is uitgegeven.

## Sequence diagrammen

### Aanmelden van een Trace door een Verantwoordelijke

Wanneer een Verantwoordelijke een Dataverwerking uitvoert, legt deze de Dataverwerking eerst vast in het eigen Logboek. Hierdoor onstaat er een Trace in het Logboek. Vervolgens meldt de Verantwoordelijke de Trace — gepseudonimiseerd — aan bij de TraceIndex.

<figure id="Sequence diagram: aanmelden van een Trace">
<pre class="diagram mermaid">
sequenceDiagram;

participant A as Verantwoordelijke
participant L as Logboek
participant B as Pseudoniemendienst
participant C as TraceIndex

autonumber

C->>B: Registeer public key (éénmalig)

A->>L: log Dataverwerking (incl. BSN & Trace ID)

A->>A: P = Hash(BSN)
A->>A: P' = r ⋅ P, where r is a random blinding factor
A->>B: P', destination = TraceIndex
B->>B: Z' = k ⋅ P', where k is secret
B->>B: Create JWE with Subject = Z' and public key obtained in step 1
B-->>A: JWE

A->>C: Register [JWE, r, Logbook ID, Trace ID]
C->>C: Decrypt JWE using private key and obtain Z'
C->>C: Z = 1 / r ⋅ Z', unblinding using r
C->>C: Pseudonym = H(Logbook ID || Z), where || is concatenation
C->>C: Store in Database: (Pseudonym, Logbook ID, Trace ID)
</pre>
<figcaption>Sequence diagram: aanmelden van een Trace</figcaption>
</figure>

Traces die door een initierende Verantwoordelijke als vertrouwelijk zijn aangemerkt (bijvoorbeeld in het kader van een lopend justitieel onderzoek) worden niet in de app getoond, conform FR-5. Hier wordt aan voldaan door stappen 2 en 3 niet direct op één volgend uit te voeren. Een Trace wordt pas toegankelijk binnen de TransparantieApp zodra de TraceIndex hiervoor een gelding JWT access token kan verstrekken. Dit is onmogelijk zolang een Trace niet is aangemeld bij de TraceIndex. 

### Ophalen van Traces door de Betrokkene

Wanneer de Betrokkene de TransparantieApp opent, wordt deze geauthenticeerd via de Identity Provider, wordt het BSN via de Pseudoniemendienst omgezet naar een pseudoniem, en wordt dat pseudoniem gebruikt om bij de TraceIndex op te zoeken welke Logboeken bevraagd moeten worden. Per Logboek wordt vervolgens de Dataverwerking opgehaald met het JWT-accesstoken dat de TraceIndex per resultaat heeft uitgegeven.


<figure id="Sequence diagram voor het opvragen van traceId's">
<pre class="diagram mermaid">
sequenceDiagram

actor U as Betrokkene
participant X as Transparantie-App (frontend)
participant D as Transparantie-App (backend)
participant I as Identity Provider
participant B as Pseudoniemendienst
participant C as TraceIndex
participant L as Logboek

autonumber

C->>B: Register public key

U->>X: open TransparantieApp
X->>D: HTTP GET https://transparantie-app/get-token
D->>I: authenticeer Betrokkene
I-->>D: BSN

D->>D: P = Hash(BSN)
D->>D: P' = r ⋅ P, where r is a random blinding factor

D->>B: P', destination = TraceIndex
B->>B: Z' = k ⋅ P', where k is secret depending on destination
B->>B: Create JWE with Subject = Z' and public key obtained in step 1
B-->>D: JWE Token

D-->>X: JWE Token + Blinding Factor

X->>C: HTTP GET https://trace-register/lookup Authorization: Bearer {JWE} Body: Blinding Factor

C->>C: Decrypt JWE using private key and obtain Z'
C->>C: Z = 1 / r ⋅ Z', unblinding using r
C->>C: Pseudonyms = { H(Z || L) | L in LS } , where || is concatenation and LS is a collection of all Logbook ID's

C->>C: Lookup all (trace_id, logboekId) for calculated pseudonyms in database
C->>C: Per resultaat: genereer JWT accessToken met claim trace_id

C-->>X: JSON { traces: [{ traceId, logbookReaderApi, accessToken }, ...] }

loop per trace-resultaat
    X->>L: HTTP GET {logbookReaderApi}/logboek/{traceId} Authorization: Bearer {accessToken}
    L->>L: Verifieer JWT met public key TraceIndex
    L->>L: Check claim trace_id == {traceId}
    L-->>X: Dataverwerkingen
end

X-->>U: toon Tracelijst
</pre>
<figcaption>Sequence diagram: Opvragen van TraceId's</figcaption>
</figure>

Stappen 12 en 13 zijn geïntroduceerd om een duidelijke splitsing in beschikbare informatie af te dwingen tussen de transparantie-app backend en de TraceIndex. De transparantie-app backend weet wie er ingelogd is, maar beschikt niet over bijbehoorde `traceId`'s. De TraceIndex daarentegen weet _niet_ wie er ingelogd is, maar beschikt wel over de `traceId`'s. Pas in de transparantie-app frontend (browser of native) komt deze informatie samen.

In tabel vorm: 

| Applicatie onderdeel | Kennis van identiteit ingelogde gebruiker | Kennis van `traceId`'s |
|---|---|---|
| TraceIndex | Nee | Ja | 
| Transparantie App backend | Ja | Nee | 
| Transparantie App frontend | Ja | Ja |

## Authenticatie & Autorisatie

### Authenticatie van de Betrokkene

De Betrokkene authenticeert zich via een Identity Provider — voor natuurlijke personen typisch DigiD, voor bedrijven eHerkenning. De TransparantieApp Backend ontvangt na succesvolle inlog het BSN, blindeert dit direct en geeft het geblindeerde resultaat door aan de Pseudoniemendienst (zie [Ophalen van Traces door de Betrokkene](#ophalen-van-traces-door-de-betrokkene)). Het BSN verlaat de backend niet in klare vorm en wordt niet in een sessie bewaard; de backend functioneert hierdoor als kortlopende doorgever. Andere Identity Providers (maar ook bijvoorbeeld OpenID Verifiable Credentials) zijn toepasbaar mits zij het BSN of RSIN kunnen leveren dat als invoer voor de pseudonimisering kan dienen.

### Autorisatie tot een Trace

Autorisatie wordt op het niveau van het Logboek afgedwongen, op basis van een kortlevend JWT-accesstoken dat de TraceIndex per resultaat in de lookup-response uitgeeft. Dit token bevat als claim het `trace_id` en is gesigneerd met de private sleutel van de TraceIndex. Het Logboek verifieert de handtekening met de publieke sleutel van de TraceIndex en controleert of de geclaimde `trace_id` daadwerkelijk in dit Logboek aanwezig is; alleen dan wordt de bijbehorende Trace vrijgegeven. Hierdoor kan een Betrokkene uitsluitend Traces inzien die via een eerdere lookup met diens pseudoniem zijn gevonden. Deze werkwijze beidt daarnaast een uitkomst voor Verantwoordelijken welke *geen* persoongegevens verwerken. 

### Authenticatie tussen server componenten

Voor server-to-server communicatie, bijvoorbeeld tussen de Verantwoordelijke en de Pseudoniemendienst of tussen de Verantwoordelijke en de TraceIndex, is wederzijdse authenticatie nodig zodat alleen erkende partijen elkaar kunnen aanroepen. De concrete invulling (bijvoorbeeld via Open FSC [[?OpenFSC]]) is een implementatiekeuze en valt buiten de scope van dit document. Wel is vereist dat de TraceIndex haar publieke sleutel op een verifieerbare wijze publiceert, zodat de Logboeken deze sleutel kunnen ophalen en als authentiek kunnen vertrouwen (voor JWT-verificatie van het accesstoken). Hiervoor biedt de TraceIndex een JWKS [[?JWKS]] endpoint aan. 

## Pseudonimisering via OPRF

De pseudonimisering in deze architectuur is gebaseerd op een *Oblivious Pseudorandom Function* (OPRF) [[?OPRF]]. Hieronder eerst kort de werking van een gewone Pseudorandom Function (PRF), vervolgens hoe een OPRF dat uitbreidt, en ten slotte hoe OPRF in de architectuur wordt ingezet.

### Pseudorandom Function (PRF)

Een Pseudorandom Function (PRF) is een functie F(k, x) die met een geheime sleutel k en een invoer x een uitvoer produceert die voor een buitenstaander niet van willekeur te onderscheiden is. Drie eigenschappen zijn relevant:

- *deterministisch* — dezelfde k en x leveren altijd dezelfde uitvoer op;
- *onvoorspelbaar zonder k* — zonder kennis van k is de uitvoer cryptografisch niet voorspelbaar;
- *onomkeerbaar* — uit de uitvoer kan x niet hersteld worden.

Een eenvoudige PRF-realisatie is bijvoorbeeld `HMAC-SHA256(k, x)`. Voor pseudonimisering ligt het voor de hand: een server kiest een geheim k en berekent voor elke binnenkomende identifier (zoals een BSN) een pseudoniem `F(k, BSN)`. Twee verschillende BSN's leveren twee verschillende pseudoniemen op, en zonder `k` kan niemand een BSN uit een pseudoniem herleiden. Het bezwaar in deze architectuur is echter principieel: de server moet het BSN ontvangen om `F(k, BSN)` uit te rekenen. Daarmee komt het BSN bij een centrale partij terecht — precies wat [NFR-5](#niet-functionele-requirements) wil voorkomen.

### Oblivious PRF (OPRF)

Een Oblivious PRF voegt aan een gewone PRF een protocol toe waarmee client en server samen `F(k, x)` kunnen berekenen, zonder dat:

- de server `x` leert (de invoer blijft bij de client), en
- de client `k` leert (de sleutel blijft bij de server).

Dit gebeurt door *blinding*: de client maakt `x` onherkenbaar voordat het naar de server gaat, en draait die operatie terug nadat de server het resultaat heeft teruggestuurd. In de elliptische-curve-variant die in deze architectuur wordt gebruikt verloopt dat als volgt:

1. De client hasht `x` naar een punt op de elliptische curve: `P = Hash(x)`.
2. De client kiest een willekeurige *blinding factor* `r` en berekent het geblindeerde punt `P' = r ⋅ P`.
3. De client stuurt `P'` naar de server. Zonder `r` is `P` (en daarmee ook `x`) niet uit `P'` te herleiden.
4. De server past zijn geheime sleutel toe: `Z' = k ⋅ P'`, en stuurt `Z'` terug.
5. De client *unblindt*: `Z = (1/r) ⋅ Z' = (1/r) ⋅ k ⋅ r ⋅ P = k ⋅ P`.

De client heeft nu `Z = k ⋅ P`, het OPRF-resultaat, zonder dat de server `x` ooit gezien heeft en zonder dat de client `k` geleerd heeft. 

Standaard worden stappen 1 t/m 3 en de stap 5 uitgevoerd door dezelfde client. Echter stappen 1 t/m 3 en stap 5 kunnen ook op twee verschillende clients uitgevoerd worden. De _blinding client_ voert  stappen 1 t/m 3 uit, en de _unblinding client_ voert stap 5 uit. Het is dan de verantwoordelijkheid van de _blinding client_ om `Z'` (het resultaat van stap 4) door te geven aan de `_unblinding client_`. 

### Toepassing in deze architectuur

OPRF wordt tweemaal toegepast binnen onze architectuur. Bij het [aanmelden van een Trace](#aanmelden-van-een-trace-door-een-verantwoordelijke) vervuld de Pseudoniemendienst de rol van OPRF-server: zij bewaart het geheim `k` en biedt een endpoint waar een geblindeerd punt `P'` binnenkomt en `Z'` wordt teruggestuurd. De cliënt-rol is opgesplitst over twee entiteiten:

1. de Verantwoordelijke is de _blinding client_,
2. de TraceIndex, is de _unblinding client_

Bij het [ophalen van Traces](#ophalen-van-traces-door-de-betrokkene) wordt OPRF opnieuw gebruikt. Ook hier vervuld de Pseudoniemendienst de rol van OPRF-server. De cliënt-rol is hier echter opgesplitst tussen:

1. De TransparantieApp backend is de `_blinding client_`
2. De TraceIndex is de `_unblinding client_`

Hierdoor zijn drie eigenschappen geborgd:

- De Pseudoniemendienst krijgt nooit een BSN te zien (NFR-5).

- Dankzij het deterministische karakter levert ieder kanaal voor hetzelfde BSN dezelfde `Z` op. Een Verantwoordelijke die bij het aanmelden van een Trace voor BSN X een pseudoniem produceert, gebruikt dezelfde `Z` als de TransparantieApp Backend bij het lookup-en voor diezelfde BSN X — zonder dat één van beide partijen het BSN aan elkaar hoeft door te geven. \#1

- De pseudoniemen die feitelijk in de TraceIndex worden opgeslagen zijn niet `Z` zelf, maar `H(Logbook ID || Z)`. Hierdoor ontstaat per Logboek een ander pseudoniem voor dezelfde Betrokkene, en kan de TraceIndex niet zonder meer zien dat twee registraties onder verschillende Logbook ID's bij dezelfde persoon horen.


\#1 TODO: Bovenstaand is hoe de referentie-implementatie nu werkt. Echter, dit stelt de TraceIndex wel instaat om Z te bewaren. Dat doet deze nu niet, omdat we juist verschillende pseudoniemen per logbook willen hebben. Maar als de TraceIndex kwaadwillend is dan kán deze natuurlijk simpelweg ook Z gaan opslaan. Een oplossing hiervoor is om per logbook een ander secret te gaan gebruiken in de OPRF server. Dit is echter nog niet geimplementeerd en vereist ook aanpassingen aan de Pseudoniemendienst. 

### JWE Encyptie van Z'

In plaats van `Z'` direct aan de _blinding cliënt_ te retourneren, verpakt de OPRF-server `Z'` in een JWE die uitsluitend voor de TraceIndex te ontsleutelen is. De cliënt geeft deze JWE samen met de blinding factor `r` door aan de TraceIndex; pas de TraceIndex voert de unblinding uit en kent daarmee `Z`.

Het gevolg is dat de cliënt (Verantwoordelijke of TransparantieApp Backend) zelf nooit `Z` of een pseudoniem construeert. `Z` blijft uitsluitend in handen van de TraceIndex. Hiermee wordt voorkomen dat Verantwoordelijken hun verkregen `Z`-waarden onderling zouden kunnen vergelijken om buiten de TraceIndex om gemeenschappelijke Betrokkenen te identificeren.

## Related work

De combinatie van decentrale data-opslag ("data bij de bron") en de wens om hierover een geconsolideerd overzicht aan een Betrokkene te tonen, komt in meerdere Nederlandse overheidsinitiatieven voor. Elk initiatief maakt daarin een eigen afweging — voornamelijk tussen privacy, schaalbaarheid en eenvoud van implementatie. Tijdens het onderzoek zijn de volgende drie initiatieven bekeken die de combinatie van FR-1 en NFR-1 t/m NFR-5 op een eigen wijze invullen.

### Mijn Zakenlijst

Mijn Zakenlijst hanteert eveneens een centrale index die de aanvragende applicatie verwijst naar de juiste bronnen. In de koppeltabel — vergelijkbaar met onze TraceIndex — wordt echter rechtstreeks het BSN opgenomen. Hiermee wordt niet aan NFR-5 (Privacy-by-design) voldaan: de centrale index krijgt BSN's in klare vorm te zien, in plaats van uitsluitend pseudoniemen. 

Hierbij moet vermeld worden dat de privacy afwegingen verschillen. De TransparantieApp zal overheidsbreed uitgerold worden en dus per definitie ook privacy gevoeligere informatie verwerken. Mijn Zakenlijst daarin tegen betreft met name relaties met gemeentes. Enkel het feit dat een burger contact heeft met b.v. de gemeente Amersfoort is minder privacy gevoelig fat het feit dat een burger contact heeft gehad met bijvoorbeeld de Dienst Justitiële Inrichtingen. 

### VWS Verwijsindex

VWS werkt aan een verwijsindex die conceptueel sterk overeenkomt met de TraceIndex in dit document. De aanpak in deze architectuur sluit hier het dichtst bij aan: de Pseudoniemendienst die in de huidige architectuur wordt ingezet is door VWS ontwikkeld als proof-of-concept ([gfmodules-pseudoniemendienst](https://github.com/minvws/gfmodules-pseudoniemendienst)) en vormt de basis waarop de pseudonimisering in dit document voortbouwt.

### Vorderingenoverzicht Rijk (VO-Rijk)

VO-Rijk hanteert geen koppeltabel: de frontend bevraagt rechtstreeks alle deelnemende partijen. Hierdoor zijn FR-4 (volledigheidsindicatie bij onbereikbare bron) en NFR-2 t/m NFR-4 (schaalbaarheid, web/mobile, laadtijd) niet realiseerbaar bij een overheidsbrede uitrol. 

Het aantal deelnemers aan VO-Rijk is op dit moment beperkt tot circa acht organisaties. De kans dat één van de bevraagde Logboeken op enig moment niet bereikbaar is neemt sterk toe met het aantal deelnemers: bij een handvol partijen is een tijdelijk uitvallend Logboek nog een uitzondering, maar bij overheidsbrede uitrol — duizenden Logboeken — is het statistisch eerder regel dan uitzondering.

Zonder koppeltabel kan de frontend in zo'n geval bovendien niet vaststellen óf de onbereikbare partij überhaupt een Dataverwerking voor deze  Betrokkene zou hebben opgeleverd, waardoor FR-4 terugvalt op een generieke disclaimer dat het overzicht mogelijk niet compleet is — een waarschuwing die bij een dergelijke schaal nagenoeg permanent getoond zou moeten worden.

Een koppeltabel zoals de TraceIndex ondervangt dit op twee manieren: het aantal te bevragen Logboeken daalt tot uitsluitend de Logboeken die voor de Betrokkene daadwerkelijk relevant zijn — typisch enkele tientallen — waardoor de kans op één onbereikbaar Logboek per opvraging beheersbaar wordt; en doordat de TraceIndex het bestaan en het tijdstip van een Dataverwerking kent, kan de frontend ook bij een tijdelijk niet-bereikbaar Logboek de specifieke placeholder uit FR-4 tonen.