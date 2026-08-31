# Conclusies

Dit project had twee nauw verweven doelen: het uitbreiden van de standaard Logboek Dataverwerkingen met een extensie voor het lezen van logging, en het valideren van die extensie via een werkend prototype — de TransparantieApp — in een simulatieomgeving. Dit hoofdstuk brengt de bevindingen uit het gebruikersonderzoek, de architectuur en de praktijkbeproeving samen, en beantwoordt de vraag of, en onder welke voorwaarden, deze aanpak burgers daadwerkelijk transparantie biedt zonder ze te overvragen.

## Zonder een volledige keten werkt automatisering tegen transparantie

De belangrijkste bevinding uit het gebruikersonderzoek is niet UX-technisch van aard, maar fundamenteel voor de opzet van de app zelf: ontbrekende of niet-beschikbare informatie is de enige bevinding die als kritiek is geclassificeerd. Wanneer het systeem meldingen toont zoals "actie niet beschikbaar" of gegevens simpelweg ontbreken zonder toelichting, ontstaat niet alleen onduidelijkheid maar actief wantrouwen: burgers vermoeden dat informatie bewust wordt achtergehouden.

Deze bevinding leidt tot een conclusie die verder gaat dan een ontwerpaanpassing. Een app die zonder tussenkomst van een mens (volledige automatisering, zie ook de vier toepassingscategorieën in "Standaard voor lezen logging") gegevens ophaalt en toont, is alleen verantwoord wanneer alle organisaties in de keten daadwerkelijk zijn aangesloten. Zolang dat niet zo is, vertaalt elk gat in de keten zich direct in een gat in het vertrouwen van de burger — een gat dat met goede UX (heldere statussen, uitleg, handelingsperspectief) te verzachten is, maar niet op te lossen. Zolang niet iedere organisatie is aangesloten, is menselijke tussenkomst — bijvoorbeeld een medewerker die ontbrekende schakels handmatig aanvult of duidt — dan ook geen tijdelijke noodoplossing, maar een randvoorwaarde voor verantwoorde transparantie. Volledige automatisering is een stip op de horizon die pas verantwoord is wanneer de dekking van de keten dat rechtvaardigt.

## Transparantie is een kwestie van context, niet van kwantiteit

Los van deze kritieke randvoorwaarde laat het onderzoek zien dat burgers geen behoefte hebben aan meer data, maar aan begrijpelijke gebeurtenissen. Drie principes komen telkens terug en vormen de kern van het antwoord op de onderzoeksvraag:

1. **Van 'log' naar 'gebeurtenis':** technische logregels worden vertaald naar voor burgers herkenbare gebeurtenissen (bijvoorbeeld "WOZ-waarde vastgesteld" in plaats van "Dataverwerking verzoek 0x234"), aansluitend bij patronen die burgers al kennen van MijnOverheid.
2. **Progressive disclosure:** informatie wordt gelaagd aangeboden, zodat de burger zelf de detaildiepte kiest in plaats van in één keer geconfronteerd te worden met alle technische details.
3. **Inclusiviteit door eenvoud:** het ontwerp voor de meest kwetsbare gebruiker (heldere taal, B1-niveau, WCAG 2.2 Level C) blijkt in de praktijk ook de meest effectieve standaard voor alle andere gebruikersgroepen.

Deze drie principes verklaren waarom het prototype, ondanks de kritieke bevinding over ontbrekende informatie, wél aantoont dat transparantie op een gebruiksvriendelijke manier vormgegeven kan worden.

## De extensie lezen is technisch haalbaar, en de praktijkbeproeving werkt al door in de standaard

De praktijkbeproeving toont dat de extensie lezen werkt in een gesimuleerde meerorganisatie-omgeving. Belangrijker nog: de lessen die daarbij zijn opgehaald — zoekcriteria in de request body in plaats van de URL, uitbreidbare attributen via namespaces in plaats van een vaste lijst, en het verbergen van interne datamodellen achter leesbare formaten — zijn geen aanbevelingen voor de toekomst gebleven, maar al verwerkt in de werkversie van de standaard zelf ([logius-standaarden.github.io/logboek-extensie-lezen](https://logius-standaarden.github.io/logboek-extensie-lezen/)). Voor de technische onderbouwing per les verwijzen we naar het hoofdstuk Praktijkbeproeving en naar de standaard zelf.

Zo is de aanbeveling "alleen een POST-operatie te gebruiken voor het bevragen van de lezen API" al toegepast.

Wat nog wél open staat, is te volgen via de [openstaande pull requests](https://github.com/Logius-standaarden/logboek-extensie-lezen/pulls). De verwerking gaat bij afsluiting van dit project snel, dus mogelijk zijn op moment van lezen nog meer aanbevelingen en open punten verwerkt.

De gepubliceerde specificatie is op het moment van schrijven nog een werkversie, de stap naar formele vastlegging is echter wel een logisch vervolg. De verwachting is dat op korte termijn een publieke consultatie zou kunnen starten. Adoptie en praktisch gebruik in productie van de resultaten van dit onderzoek liggen in de nabije toekomst. De verwachting is dat dit binnen de beheeropdracht van Logius voor de standaard gerealiseerd kan worden.

## Randvoorwaarden voor verantwoorde doorontwikkeling

De reflectie op de architectuur versterkt de conclusie over ketenvolledigheid vanuit een ander perspectief: bij circa 1.600 overheidsorganisaties is het onrealistisch te veronderstellen dat aansluiting op de standaard van de ene op de andere dag compleet is, en vraagt het gekozen gedecentraliseerde model om zorgvuldige toegangscontrole per organisatie in plaats van één centrale voorziening. Ook het beleidsjuridisch kader benadrukt dat elke organisatie zelf verantwoordelijk blijft voor de inrichting van haar eigen logging en voor de afweging welke informatie proactief inzichtelijk wordt gemaakt. Doorontwikkeling van de TransparantieApp vraagt daarom om een groeipad: begin met de situaties waarin de keten wél compleet is, of waar menselijke tussenkomst de ontbrekende schakels kan opvangen, en breid volledige automatisering pas uit naarmate meer organisaties daadwerkelijk aansluiten.

## Eindoordeel

Het prototype TransparantieApp toont aan dat transparantie over overheidsbesluiten begrijpelijk, gelaagd en inclusief kan worden aangeboden, en dat de extensie lezen op het Logboek Dataverwerkingen daarvoor een werkbare technische basis biedt — al is die basis, als werkversie van de standaard, zelf nog niet afgerond. Het onderzoek laat echter net zo duidelijk zien dat de grootste bedreiging voor vertrouwen niet in de interface zit, maar in onvolledige of niet-aangesloten organisaties binnen de keten. Volledig geautomatiseerde transparantie zonder menselijke tussenkomst is daarom pas verantwoord wanneer de keten dat aankan; tot die tijd is een combinatie van automatisering waar mogelijk en menselijke tussenkomst waar nodig de meest betrouwbare weg naar herstel van vertrouwen tussen burger en overheid. De concrete vervolgstappen hiervoor staan uitgewerkt in de sectie Aanbevelingen.
