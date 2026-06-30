# Aanbevelingen

We hebben in de uitvoering van het TransparantieApp project veel geleerd, over de standaard logboek dataverwerkingen (core) en de extensie lezen daarop, over gebruikersonderzoek, UX design, business architectuur en implementatie architectuur.  In de hoofdstuk noemen we onze belangrijkste bevindingen zodat daar door volgende projecten als ook de beheerder van de standaard op voortgebouwd kan worden.

## Standaard

### extensie lezen

1. Zorg dat je bij overgang naar volgende organisatie in je eigen logging doorverwijst (core wijst alleen terug naar aanroepende organisatie)  
2. Maak batch bevragingen mogelijk (je wil op meerdere traceIDs, BSNs etc logging kunnen opvragen met 1 call)
3. Maak paginatie mogelijk zodat je in een gebruikersinterfacewelke gebruik maakt van de API makkelijk resultaten kan weergeven
4. Gebruik alleen een POST operatie voor het bevragen van de lezen API. Dataverwerkingen zijn vaak privacy gevoelig en gevoelige informatie wil je niet in Queries binnen een GET operatie gebruiken zoals aangeraden door de REST API designrules. Daarom is het uit privacy by design overwegingen beter om alleen de POST operatie toe te passen.
5. Zorg voor een goede beveiliging van het lezen API endpoint, volg daarin de best practices van de module access-control van het kennisplatform APIs. Beveiliging is zeer domein specifiek daarom verplichten we in de standaard niet één specifieke methode.

### Core standaard

1. maak mogelijk dat wanneer er wel een objectID maar geen subject ID is de subjectID niet veplicht is (bijvoorbeeld als een trace start met verwerkingen voordat er persoonsgegevens opgevraagd worden)
2. maak mogelijk om te verwijzen naar een andere *trace* (voor bijvoorbeeld de totstandkoming van een grondslag) of om te verwijzen naar een document of web-pagina (beide via een URL) waarin meer informatie te vinden is. Een voorbeeld hiervan is het taxatieverslag in het geval van een OZB-aanslag.  
3. verruim het organisatorische werkingsgebied van de logging-Standaard en van de extensie lezen naar alle gebruikers van gegevens, die gebaseerd zijn op het BSN (zie de ALB: https://www.rvig.nl/autorisatielijst-bsn-gerechtigden). Dat betekent in elk geval uitbreiding naar pensioenfondsen, zorgverzekeraars en zorgverleners.  

## Architectuur

## Gebruikersonderzoek
Dit onderzoek laat zien dat de huidige standaard voornamelijk is ontwikkeld vanuit de technische mogelijkheden van logging, terwijl burgers vooral behoefte hebben aan inzicht in de totstandkoming van besluiten. Ook de literatuur van de Kafka Brigade laat zien dat burgers vastlopen doordat zij onvoldoende inzicht hebben in de samenhang tussen gegevens, regels en besluiten. Niet alleen de gebruikte gegevens, maar ook de toegepaste regels en de onderbouwing van een besluit moeten begrijpelijk en controleerbaar zijn.

Bij de ontwikkeling van toekomstige standaarden en applicaties voor burgers is het daarom aan te bevelen om uit te gaan van de problemen die burgers ervaren, en niet uitsluitend van de beschikbare technische mogelijkheden. Door de informatiebehoefte van burgers als uitgangspunt te nemen, kan beter worden bepaald welke informatie nodig is om betekenisvolle transparantie te bieden.

De huidige standaard maakt vooral inzichtelijk welke gegevens zijn gebruikt, maar biedt nog beperkt inzicht in hoe deze gegevens hebben bijgedragen aan een besluit. Een interessante richting voor verder onderzoek is daarom de toepassing van Rules as Code. Door logging te combineren met machineleesbare wet- en regelgeving kan worden onderzocht hoe toekomstige standaarden niet alleen inzicht kunnen bieden in de gebruikte gegevens, maar ook in de toegepaste regels en de onderbouwing van besluiten. Hiermee kunnen standaarden beter aansluiten op de informatiebehoefte van burgers en bijdragen aan uitlegbare en transparante overheidsdienstverlening. De volgende methodieken en handvaten zijn gebruikt tijdens dit onderzoek om de standaard nader te onderzoeken:

1. Maak abstracte concepten concreet met prototypes

Transparantie, logging en gegevensuitwisseling zijn voor veel burgers abstracte begrippen. Het gebruik van interactieve prototypes helpt deelnemers om zich een concreet beeld te vormen van de oplossing, waardoor betrouwbaardere feedback ontstaat.

2. Onderzoek mentale modellen in plaats van alleen usability

Bij nieuwe concepten is het niet alleen belangrijk of gebruikers een interface kunnen bedienen, maar vooral of zij begrijpen wat er gebeurt. Onderzoek zou daarom expliciet moeten kijken naar hoe burgers denken dat gegevensverwerking en besluitvorming werken.

3. Gebruik realistische casussen met een daadwerkelijke stakeholder.

Onderwerpen zoals het zorgdomein bleek geschikt om abstracte vraagstukken rondom transparantie begrijpelijk te maken. Het gebruik van herkenbare situaties vergroot de kwaliteit van de feedback en het realitische laten aansluiten van de standaard.

4. Betrek verschillende doelgroepen

Het onderzoek laat zien dat actieve inzagezoekers, pragmatische burgers en kwetsbare gebruikers verschillende behoeften hebben. Het is daarom belangrijk om niet uitsluitend digitaal vaardige gebruikers te onderzoeken.

5. Combineer meerdere onderzoeksmethoden

De combinatie van interviews, literatuuronderzoek, usabilitytesten, co-creatie en design research leverde meer inzicht op dan één enkele methode. Verschillende methoden vullen elkaar aan en helpen om zowel behoeften als gedrag beter te begrijpen.

6. Onderzoek de behoefte aan de "waarom-vraag"

Gebruikers blijken niet alleen geïnteresseerd in welke gegevens zijn gebruikt, maar vooral in hoe deze hebben bijgedragen aan een besluit. Dit vormt een interessante onderzoekslijn voor toekomstige ontwikkeling van zowel de standaard als de applicatie. Leer hiervoor ook sectie 5.1.

7. Hanteer een iteratieve aanpak

Inzichten ontstaan door meerdere cycli van ontwerpen, testen en verbeteren. Gebruikersonderzoek moet daarom geen eindcontrole zijn, maar een doorlopend onderdeel van het ontwerpproces.



## UX design

Naast gebruikers onderzoek zijn er ook meerdere design gemaakt. Tijdens de design sprints zijn er bepaalde design principes gebruikt. De volgende blijken nuttig en relevant voor het ontwerpen van UI voor data logging visualisatie: 


0. maak geen nieuwe app maar biedt transparantie aan in context, bij een brief van de overheid of op mijnoverheid.nl bijvoorbeeld 

1. Hanteer een mobile-first ontwerpstrategie

Gebruikers zijn gewend om overheidsdiensten steeds vaker via mobiele apparaten te gebruiken. Daarnaast dwingt een mobile-first benadering ontwerpers om kritisch te kijken naar welke informatie daadwerkelijk noodzakelijk is. Door eerst voor kleine schermen te ontwerpen ontstaat een compactere en beter geprioriteerde informatiearchitectuur, waardoor de kans op informatie-overload afneemt.

2. Gebruik een persona-matrix voor informatieprioritering

Uit het onderzoek blijkt dat verschillende gebruikersgroepen uiteenlopende informatiebehoeften hebben. Het wordt aanbevolen om een persona-matrix te gebruiken waarin per doelgroep wordt vastgelegd welke informatie belangrijk is en wanneer deze relevant wordt. Deze matrix kan vervolgens worden gebruikt om informatie te prioriteren en te bepalen welke informatie prominent zichtbaar moet zijn en welke informatie optioneel beschikbaar wordt gemaakt.

3. Ontwerp eerst de gebruikersflow en daarna de interfacecomponenten

Bij complexe transparantievraagstukken is het belangrijk om eerst inzicht te krijgen in de gebruikersreis voordat individuele schermen of componenten worden ontworpen. Het wordt aanbevolen om eerst de flow van taken, beslissingen en informatiebehoeften uit te werken en pas daarna componenten op detailniveau te ontwerpen. Hierdoor blijft de focus liggen op het oplossen van gebruikersproblemen in plaats van op afzonderlijke interface-elementen.

4. Gebruik begrijpelijke en mensgerichte taal

Technische, juridische en organisatorische terminologie vormt een belangrijke drempel voor burgers. Het ontwerp dient daarom gebruik te maken van begrijpelijke taal die aansluit bij het dagelijkse taalgebruik van gebruikers. Complexe begrippen kunnen waar nodig worden voorzien van aanvullende uitleg, zodat informatie toegankelijk blijft voor een brede doelgroep.

5. Ondersteun snelle informatievinding met zoeken en filteren

Gebruikers bezoeken een transparantievoorziening vaak met een specifieke vraag of informatiebehoefte. Het wordt daarom aanbevolen om zoek- en filtermogelijkheden aan te bieden waarmee gebruikers snel relevante gebeurtenissen, gegevensverwerkingen of besluiten kunnen vinden. Dit helpt gebruikers om sneller antwoord te krijgen op hun vragen en vermindert de complexiteit van grote dossiers.

6. Ontwerp voor stressvolle gebruikssituaties

De behoefte aan transparantie ontstaat vaak wanneer burgers worden geconfronteerd met een onverwacht of negatief besluit. In dergelijke situaties is de cognitieve belasting hoog en is er behoefte aan snelle duidelijkheid. Het ontwerp dient daarom prioriteit te geven aan overzicht, eenvoud en directe beantwoording van vragen zoals: wat is er gebeurd, waarom is dit gebeurd en wat kan ik nu doen?

7. Beperk informatie-overload in navigatie-elementen

Bij complexe dossiers kunnen navigatiepaden snel omvangrijk worden. Het wordt aanbevolen om breadcrumbs compact te houden en standaard alleen de meest bovenligenste van de navigatiestructuur te tonen. Hierdoor behouden gebruikers context zonder dat de interface onnodig veel ruimte inneemt of extra cognitieve belasting veroorzaakt.

8. Bied transparantie gelaagd aan

Niet iedere gebruiker heeft behoefte aan dezelfde hoeveelheid detail. Daarom wordt aanbevolen om informatie gelaagd aan te bieden, waarbij gebruikers eerst een overzicht op hoofdlijnen krijgen en vervolgens kunnen doorklikken naar meer detail. Deze aanpak ondersteunt zowel gebruikers die snel antwoord willen als gebruikers die behoefte hebben aan diepgaand inzicht in gegevensverwerkingen en besluitvorming.

Gelaagdheid dient niet alleen terug te komen in de inhoud van de informatie, maar ook in de interactie en componenten van de gebruikersinterface. Het wordt aanbevolen om gebruikers stapsgewijs door informatie te laten navigeren via afzonderlijke schermen of detailweergaven. Hierdoor ontstaat een duidelijke gebruikersreis waarin gebruikers beter begrijpen waar zij zich bevinden en welke informatie beschikbaar is.

Idealiter is de interactie "klikken" of "tappen". Deze aanpak draagt daarnaast bij aan de toegankelijkheid van de applicatie. Een duidelijke schermstructuur en navigatie zijn voor gebruikers van screenreaders vaak eenvoudiger te volgen dan grote hoeveelheden dynamisch open- en dichtklappende content. Door informatie op meerdere niveaus aan te bieden blijft de interface overzichtelijk, toegankelijk en beter beheersbaar voor een brede groep gebruikers.

9. Structureer informatie rondom de informatiebehoefte van gebruikers

Er bestaan verschillende manieren om complexe gegevensverwerkingen, relaties en besluitvorming visueel weer te geven. Hoewel dergelijke visualisaties waardevol kunnen zijn voor uitgebreide visualisaties voor veel burgers, en met name oudere gebruikers, moeilijk te interpreteren zijn of the navigeren.

Daarom wordt aanbevolen om niet de beschikbare data of techniek als uitgangspunt te nemen, maar de informatiebehoefte van de gebruiker (de job to be done). Per gebruikssituatie dient te worden onderzocht welke informatie gebruikers daadwerkelijk zoeken en welke informatie hen helpt om hun vraag te beantwoorden.

Uit het onderzoek blijkt dat gebruikers vooral behoefte hebben aan drie kernvragen om een eerste overzicht te krijgen van hun data:

* Welke organisaties waren betrokken?
Gebruikers willen kunnen zien welke organisaties gegevens met elkaar hebben uitgewisseld of verwerkt.
* Wanneer gebeurde dit?
De datum en volgorde van gebeurtenissen vormen een belangrijk herkenningspunt voor gebruikers en helpen bij het reconstrueren van een proces.
* Welke gegevens zijn gebruikt?
Gebruikers willen inzicht krijgen in welke persoonsgegevens of gegevenscategorieën een rol hebben gespeeld binnen een proces of besluit.

Deze informatie vormt voor veel gebruikers het primaire startpunt voor begrip en herkenning. Meer geavanceerde visualisaties en aanvullende details kunnen vervolgens als verdiepende laag worden aangeboden voor gebruikers die behoefte hebben aan meer context.

10. Bied transparantie aan in de context van bestaande dienstverlening

Uit het onderzoek blijkt dat burgers hun interactie met de overheid ervaren als één doorlopende klantreis, terwijl informatie in de praktijk vaak verspreid is over verschillende systemen en applicaties. Het introduceren van een afzonderlijke transparantie-app kan ertoe leiden dat gebruikers opnieuw moeten zoeken naar informatie en moeten schakelen tussen verschillende omgevingen.

Daarom wordt aanbevolen om transparantie zoveel mogelijk aan te bieden binnen de context waarin burgers deze informatie nodig hebben. Bijvoorbeeld bij een besluitbrief, binnen een dossier op MijnOverheid of als onderdeel van bestaande overheidsdiensten. Op deze manier ontstaat transparantie op het moment dat gebruikers vragen hebben over een besluit of gebeurtenis.

Deze benadering sluit aan bij het principe dat niet de burger hoeft te reizen tussen systemen, maar dat de informatie naar de burger wordt gebracht. Hierdoor wordt de drempel om transparantie-informatie te raadplegen lager en neemt de kans toe dat de informatie daadwerkelijk wordt gebruikt.

11. Gebruik samenvattingen om informatie scanbaar en begrijpelijk te maken

Transparantie-informatie kan snel omvangrijk en complex worden. Gebruikers hebben echter vaak eerst behoefte aan een korte samenvatting voordat zij zich verdiepen in de onderliggende details. Het wordt daarom aanbevolen om gegevensverwerkingen, gebeurtenissen en besluiten te voorzien van begrijpelijke samenvattingen die in één oogopslag duidelijk maken wat er is gebeurd.

Deze samenvattingen kunnen bijvoorbeeld bestaan uit een korte beschrijving van de gebeurtenis, de betrokken organisatie, de gebruikte gegevens en de datum waarop de gebeurtenis heeft plaatsgevonden. Hierdoor kunnen gebruikers snel door een dossier navigeren en bepalen welke onderdelen voor hen relevant zijn.

Hoewel complexe visualisaties waardevol kunnen zijn voor sommige gebruikers, blijkt uit het onderzoek dat deze niet altijd bijdragen aan begrip. In veel situaties kunnen goed ontworpen samenvattingen dezelfde informatie effectiever overbrengen dan uitgebreide diagrammen of procesvisualisaties. Samenvattingen kunnen daardoor niet alleen dienen als introductie op meer detail, maar in sommige gevallen ook als volwaardig alternatief voor complexere visualisaties.

Door informatie eerst op samenvattingsniveau aan te bieden en details pas daarna beschikbaar te maken, wordt de scanbaarheid verbeterd en neemt de cognitieve belasting af. Dit is met name belangrijk voor mobiele gebruikers, ouderen en gebruikers die een specifiek antwoord zoeken binnen een groter dossier.

12. Sluit aan bij bestaande mentale modellen en interactiepatronen

Volgens Jakob's Law besteden gebruikers het grootste deel van hun tijd aan andere websites en applicaties. Hierdoor verwachten zij dat nieuwe systemen vergelijkbare patronen, navigatiestructuren en interacties gebruiken als systemen die zij al kennen.

Voor transparantievoorzieningen betekent dit dat gebruikers niet geholpen zijn met volledig nieuwe interactiemodellen of een aparte manier van navigeren door gegevens. Het wordt aanbevolen om aan te sluiten bij bestaande patronen die men veel gebruikt.  Door aan te sluiten bij bestaande mentale modellen wordt de leercurve beperkt en kunnen gebruikers zich richten op het beantwoorden van hun vraag in plaats van op het leren gebruiken van een nieuw systeem.

## Beleidsjuridisch kader

Hieronder zijn een aantal uitgangspunten en principes benoemd. Voordat organisaties de leesextensie gaan implementeren, wordt aanbevolen om hier in de organisatie zelf naar te kijken.

**Gegevens worden vastgelegd en uitleesbaar gemaakt**

1. Overheidsorganisaties die gebruik maken van de standaard Logboek dataverwerkingen inclusief de leesextensie om de verwerking van data gestandaardiseerd zichtbaar te maken, zijn zelf verantwoordelijk voor implementatie en inrichting van de standaard, de logs en de informatie die erin te vinden is.

2. Dataverwerkingen worden waar mogelijk gemakkelijk inzichtelijk gemaakt. Overheidsorganisaties maken een afweging over welke gegevens proactief inzichtelijk gemaakt kunnen worden en welke niet. Een organisatie kan daarmee ook bepalen welke informatieverzoeken in de regel worden toegekend en kijk of deze informatie al proactief open kan worden gezet, al dan niet afgeschermd door authenticatie. Het is uiteindelijk aan de overheidsorganisatiezelf om te beoordelen welke informatie al vooraf inzichtelijk gemaakt wordt en welke naar aanleiding van een informatieverzoek (zoals de AVG of Woo) getoond wordt. Deze vorm van proactieve beschikbaar maken van informatie moet worden onderscheiden van formele verzoekprocedures en vormt geen recht in de zin van artikel 15 AVG of de Woo, maar kan deze mogelijk wel ondersteunen.

3. Bij het tonen van informatie moet de organisatie rekening houden met zwaarder wegende algemene belangen (bijv. nationale/openbare veiligheid, opsporing van strafbare feiten) of zwaarder wegende belangen van betrokkene of rechten van anderen (bijv. bescherming persoon) waardoor bepaalde informatieverplichtingen niet gelden. Dit kan bijvoorbeeld door bij een verwerkingsactiviteit een vertrouwelijke en niet-vertrouwelijke variant op te nemen, waardoor het vanuit de logfile inzichtelijk of er bij de betreffende verwerking rekening moet worden gehouden met zwaarder wegende belangen.

4. De organisatie borgt dat de Leesextensie optimaal ingericht wordt ten behoeve van ondersteuning van het versterken van de informatiepositie van de burger, door proactief en waar mogelijk, de informatie die zij heeft geautomatiseerd te verschaffen.


**Naleving en vertrouwen**

5. De Leesextensie dient zodanig ingericht te worden dat deze voldoet aan de vereisten die volgen uit regels ten aanzien van informatieveiligheid. De organisatie bepaalt vooraf de procedurele, procesmatige en technische waarborgen die nodig zijn om ervoor te zorgen dat de uitleesbaar gemaakte gegevens niet oneigenlijk worden gebruikt of misbruikt.

6. Organisaties moeten erop kunnen vertrouwen dat informatie niet onjuist wordt gebruikt of wordt misbruikt:

a. De organisatie zorgt ervoor dat de beoogde toegang tot gegevens en de juiste werking van zijn systemen continu alsook achteraf te controleren is.

b. De organisatie verschaft alleen geautoriseerde afnemers toegang tot vertrouwelijke gegevens.

c. De organisatie zorgt ervoor dat de beoogde toegang tot gegevens en de juiste werking van zijn systemen continu alsook achteraf te controleren is.

7. Bij gerede twijfel aan de juistheid van informatie meldt de organisatie dit aan de verantwoordelijke bronhouder. De informatie zal daar waar het is opgeslagen moeten worden gecorrigeerd.

8. Bij het inzichtelijk maken van een dataverwerking, dient een tijdsstempel opgenomen worden die aangeeft de gegevenswaarde wordt getoond zoals die gold ten tijde van de verwerking; ook als deze bijvoorbeeld na enkele maanden opnieuw wordt ingezien of verstrekt.
