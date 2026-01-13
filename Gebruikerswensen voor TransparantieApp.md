# Gebruikerswensen voor TransparantieApp
TODO: wat voor relevante onderzoeken zijn er al gedaan naar gebruikswensen bij transparantie in besluitvorming? Wat kunnen we daaruit leren voor de TransparantieApp en lezen logging standaard?
<<<<<<< Updated upstream
=======

Dit hoofdstuk beschrijft de gebruikerswensen die relevant zijn voor de TransparantieApp. De inzichten zijn gebaseerd op gesprekken met betrokkenen binnen het project, interviews met inhoudelijke experts en literatuuronderzoek naar transparantie, datagebruik en digitale dienstverlening door de overheid. Het doel van dit hoofdstuk is niet om een uitputtende set eisen te formuleren, maar om de belangrijkste gebruikersperspectieven en spanningsvelden te schetsen die richting geven aan het ontwerp van de TransparantieApp en de standaard voor het lezen van logging. 

### 4.1 Inzichten uit gesprekken en projectcontext

In gesprekken met softwareontwikkelaars en het projectteam is verkend welke data momenteel beschikbaar is en welke ambities de TransparantieApp moet ondersteunen. Uit bestaande simulaties binnen Digilab blijkt dat reeds relevante informatie wordt vastgelegd over gegevensuitwisseling en besluitvorming, zoals momenten waarop gegevens worden geraadpleegd of gedeeld. Het hergebruik van deze bestaande data en simulaties wordt gezien als een kansrijke basis voor verdere ontwikkeling, zie afbeelding 1.

<figure>
  <a href="media/Simulatie van de transparantieapp.png">
    <img
      src="media/Simulatie van de transparantieapp.png"
      alt="Schermweergave van een webportaal met de pagina “Dataverwerkingen”. Links staat een navigatiemenu met onderdelen zoals Home, Berichtenbox, Identiteit en Dataverwerkingen (geselecteerd). In het hoofdgedeelte staat een overzicht van dataverwerkingen van de laatste 7 dagen, gefilterd op alle organisaties en activiteiten. Per organisatie (A en B) worden verwerkingsactiviteiten getoond, zoals Kinderopvangtoeslag registreren, Verifieer toeslag, Bereken toeslag en Inzage persoonsgegevens. Rechts van elke activiteit staat een tijdstip (12-12-2025, 09:39:45) en de verwerkingsduur in milliseconden, weergegeven als groene en blauwe balken. Bovenaan is een tijdlijn met datums zichtbaar."
      style="max-width: 100%; height: auto;"
    />
  </a>
  <figcaption>
   Afbeelding 1: Eerste versie van simulatie van TransparantieApp
  
  </figcaption>
</figure>




Binnen het projectteam is expliciet stilgestaan bij de afbakening van de TransparantieApp. Er is gekozen voor een focus op het inzichtelijk maken van hoe besluiten tot stand komen op basis van gegevens. Andere AVG-rechten, zoals het indienen van bezwaar of het direct corrigeren van gegevens, vallen buiten de scope van de app. Deze keuze is ingegeven door de wens om de functionaliteit eenduidig en begrijpelijk te houden voor eindgebruikers, en om de implementatie binnen de overheid haalbaar te maken.

Daarnaast zijn lessen opgehaald uit de Rijksapp-filosofie, die sterk inzet op gebruikersgericht ontwerp en consistentie tussen interne (beheer- of admin-)views en de weergave voor burgers. Een belangrijk uitgangspunt hierbij is dat transparantie niet alleen een juridische of technische exercitie is, maar vraagt om een human-centered design benadering, waarbij rekening wordt gehouden met stressvolle en complexe gebruikssituaties.

### 4.2 Juridische context en verwachtingen van burgers

Gesprekken met juridisch deskundigen laten zien dat de AVG primair verplicht tot transparantie over het gebruik van persoonsgegevens, maar minder expliciet is over het inzichtelijk maken van de besluitvorming die op basis van die gegevens plaatsvindt. De TransparantieApp beoogt daarmee verder te gaan dan de minimale wettelijke vereisten.

Tegelijkertijd blijkt dat de verwachtingen en behoeften van burgers niet één-op-één aansluiten bij juridische definities. Begrippen als ‘besluit’ en ‘gegevensverwerking’ worden door burgers vaak anders geïnterpreteerd dan in wet- en regelgeving. Zo worden sommige overheidsinteracties, zoals het aanvragen van een paspoort, niet ervaren als een besluit, terwijl afwijzingen van toeslagen of vergunningen juist als ingrijpend en beslissend worden gezien. Dit verschil in beleving vraagt om aanvullende uitleg in begrijpelijke taal wanneer juridische terminologie wordt gebruikt.

### 4.3 Inzichten uit literatuuronderzoek

Uit het bestudeerde literatuuronderzoek komen een aantal terugkerende thema’s naar voren:

- Burgers worden geconfronteerd met een versnipperd landschap van instrumenten voor privacy en transparantie, die elk slechts een deel van hun rechten ondersteunen. Dit leidt tot onoverzichtelijkheid en verwarring.
- Inzage- en correctierechten[[GRIP]] zijn vaak wel geregeld, maar informatie over waarom gegevens worden gebruikt en hoe deze bijdragen aan besluiten ontbreekt veelal.
- Er bestaat geen gestandaardiseerde aanpak voor het inzichtelijk maken van gegevensuitwisseling en besluitvorming over organisatiegrenzen heen.
- Veel toepassingen zijn ontworpen vanuit het perspectief van de organisatie, en minder vanuit de klantreis en informatiebehoefte van de burger.
- Digitale ongelijkheid speelt een belangrijke rol: niet alle burgers beschikken over gelijke digitale vaardigheden of toegang tot digitale middelen.

Opvallend is dat de behoefte aan transparantie bij burgers vaak situationeel is. Zolang processen probleemloos verlopen, bestaat er doorgaans weinig actieve interesse in het gebruik van gegevens. De behoefte aan inzicht ontstaat vooral wanneer besluiten negatieve gevolgen hebben, zoals financiële consequenties of afwijzingen. Dit lijkt samen te hangen met een relatief hoog basisvertrouwen in de overheid, mede versterkt door positieve ervaringen met voorzieningen als DigiD.

### 4.4 Doelgroepen en verschillen in informatiebehoefte

Op basis van literatuur en gesprekken zijn grofweg drie doelgroepen te onderscheiden:

- **De actieve inzagezoekende burger**, die expliciet wil weten welke gegevens zijn gebruikt en hoe deze hebben bijgedragen aan een besluit.
- **De pragmatische, vertrouwende burger**, die uitgaat van een goed functionerende overheid en pas behoefte krijgt aan inzicht wanneer iets misgaat.
- **De kwetsbare burger**, waaronder ouderen, mensen met een beperking en sommige groepen immigranten, die vaker drempels ervaren in digitale dienstverlening.

Deze groepen verschillen sterk in hun informatiebehoefte, taalgebruik en mate van regie die zij wensen. Waar de ene burger behoefte heeft aan detail en controle, zoekt de andere vooral bevestiging dat processen correct verlopen en duidelijke handelingsperspectieven wanneer dat niet het geval is.

### 4.5 Hypotheses voor ontwerp en standaardisatie

De beschreven gebruikerswensen leiden tot een aantal aandachtspunten voor de TransparantieApp en de standaard voor het lezen van logging:

- Transparantie moet waarschijnlijk gelaagd worden aangeboden, zodat gebruikers zelf kunnen bepalen hoeveel detail zij willen zien.
- Uitleg dient aan te sluiten bij het taalgebruik en de belevingswereld van burgers, en niet uitsluitend bij juridische of technische definities.
- De app moet rekening houden met stressvolle gebruikssituaties, waarin burgers grip zoeken en snel willen begrijpen wat er is gebeurd en wat zij kunnen doen.
- Een standaard aanpak is nodig om informatie over dataverwerkingen consistent en vergelijkbaar te presenteren, maar mag niet leiden tot een one-size-fits-all benadering die onvoldoende ruimte laat voor gebruikersverschillen.

Deze inzichten vormen input voor vervolgonderzoek en het ontwikkelen van prototypes, die gebruikt zullen worden om aannames te toetsen en gebruikerswensen verder te verfijnen.

>>>>>>> Stashed changes
