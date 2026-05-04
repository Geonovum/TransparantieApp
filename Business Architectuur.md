# Business Architectuur
De TransparantieApp is bedoeld om inzichttelijk te maken welke (persoons)gegevens verwerkt (gelezen, toegevoegd of gewijzigd) zijn door welke (overheids)organisatie(s) en waarom.
Degene die inzicht wil hebben in deze verwerkingen kan daarvoor in hoofdlijnen op twee manieren de vraag 'insteken': 
a) Hoe is dit besluit tot stand gekomen?
b) Wie heeft er - los van welk besluit ook - eigenlijk inzicht in of gebruik gemaakt van mijn persoonsgegevens?
Onderstaand worden beide Usecases toegelicht.

## Usecase "Waarom is dit gebeurd?"
Wanneer een bedrijf of inwoner (burger) geconfronteerd wordt met een besluit van een overheidsorganisatie (uitvoeringsorganisaties expliciet inbegrepen), ontstaat geregeld de vraag hoe men tot dat besluit gekomen is. Er is een expliciete 'trigger' die deze vraag doet rijzen (het document waarin het besluit wordt meegedeeld). Vaak zal de vraag om inzicht in de totstandkoming van het besluit ingegeven worden door onbegrip over de uitkomst of omdat de uitkomst de betrokkene niet welgevallig is. Gebruikersonderzoek laat zien dat dit patroon het beste aansluit op de verwachtingen van gebruikers van een te realiseren TransparantieApp.  
De totstandkoming van het besluit is over het algemeen gebaseerd op meerdere elementen:  
1. de geregistreerde gegevens over de persoon of diens eigendom/gebruik van zaken (bijvoorbeeld: de eigendom van een woning op 1 januari van enig jaar)
2. wet- en regelgeving (bijvoorbeeld de Gemeentewet en lokale verordeningen)  
3. de grondslag(en) (bijvoorbeeld de woningwaarde volgens de wet WOZ, waarbij vervolgens ook weer geregistreerde gegevens van belang zijn, zoals het bouwjaar, de staat van onderhoud, etc. van de betreffende woning)  
4. de eventuele berekeningen/formules (bijvoorbeeld WOZ-waarde/1000\*tarief)  

Door de duidelijke trigger (bijvoorbeeld de gemeentelijke belastingaanslag) is het duidelijk waar de burger moet zijn met diens vraag (de betreffende gemeente). Wel kan het zijn dat er vanuit dat startpunt nog andere organisaties geraadpleegd moeten worden. Vanuit de LDV-logging-standaard wordt deze keten vastgelegd en is deze dus ook te volgen.  
  
De logging-standaard voorziet alleen in het vastleggen van de gebruikte gegevens, niet zozeer in de (uitleg van de) achterliggende wetgeving en rekenregels. Ook de totstandkoming van de grondslag (in het voorbeeld de WOZ-waarde) zal geregeld geen onderdeel uitmaken van de(zelfde) *trace* als de totstandkoming van het besluit. Daarom is het advies om in de standaard voor de logging de optie op te nemen van verwijzingen naar *of* andere traces *of* een URL waarachter een webpagina of een document verdere uitleg geeft over de totstandkoming van de grondslag (bijvoorbeeld het taxatieverslag). Wel is er voorzien in unieke identificatiecodes voor verwerkingen, maar dat gaat om statische data die eventueel wel bruikbaar is voor uitleg van de wet- en regelgeving, maar niet geschikt is voor de verstrekking van gepersonaliseerde data die onder de grondslagen ligt.  

## Usecase "Wie heeft er aan mijn gegevens gezeten?"
Een andere gebruikspatroon is de meer generieke vraag van een bedrijf of inwoner: wie heeft er aan mijn gegevens gezeten. Bestaande apps en websites maken dit tot op zekere hoogte al transparant, maar net niet op het detailniveau waarop dat zou kunnen met de TransparantieApp.  
Zo is in de App "MijnGegevens" wel te zien met welke organisaties BRP-gegevens gedeeld worden, maar wordt niet duidelijk om welke gegevens-elementen het dan exact gaat en welke gegevens-wijzigingen er worden gedeeld met welke organisaties. Bovendien is alleen voor zogenaamde \'identiteitsgegevens\' zichtbaar dat deze gedeeld zijn, maar niet voor bijvoorbeeld WOZ-gegevens of diploma\'s.  
Op de website "Gegevens bij besluiten" wordt per besluit in zijn algemeenheid wel aangegeven welke gegevens-elementen van welke registraties worden gebruikt, maar kan een persoon niet \'doorklikken\' om te zien wanneer welke gegevens-waarden dan daadwerkelijk zijn gecommuniceerd. Bovendien is niet te zien welke besluiten er daadwerkelijk over iemand genomen zijn, het is een verzameling van alle (?) potentiele besluiten die overheden kunnen nemen. Het is, kortom, niet gepersonaliseerd.  
  
De TransparantieApp combineert in deze usecase in feite die beide invalshoeken en kan dus gepersonaliseerde informatie laten zien over gedeelde gegevens tussen overheden, pensioenfondsen e.d.: "welke gegevens zijn door wie gebruikt om wat te doen"  
Omdat er meer dan alleen (semi-)overheidsorganisaties gebruik maken van het BSN en daaraan gerelateerde gegevens, is het advies de reikwijdte van de logging-standaard te vergroten tot de autorisatielijst BSN gerechtigden (ALB).  

## Federatieve architectuur

## Gevolgen voor Applicatie architectuur

## Gevolgen voor standaard