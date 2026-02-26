# Voorstel: Trace Register

## Doelstelling
In aanloop naar de demodag van 12 februari is er een eerste versie van de transparantie app gerealiseerd. Enkele bedenkingen zijn achteraf beschreven in het hoofdstuk reflectie. Dit document beschrijft een voorstel welke twee van deze bedenkingen adresseert. Het doel is een oplossing te realiseren voor de volgende twee bedenkingen:

- Verantwoordelijkheid voor vertrouwelijke verwerkingen 
([zie bedenking 1](#bedenking-1-verborgen-verwerkingen-en-verantwoordelijkheid))
- Security-risico’s in de vorm van traceId-endpoints ([zie bedenking 2](#bedenking-2-data_subject_id-en-toegangscontrole)).

## Kernprincipe van de oplossing
Er wordt een trace register geïntroduceerd. Het trace register registreert uitsluitend:

| (ID betrokkene,| traceId, | organisatie ID)|
|----|-----|---|


Het trace register:
- Slaat geen loggegevens of inhoudelijke trace-informatie op.
- Weet alleen welke traceId’s bij welke betrokkene horen.
- Genereert op verzoek een ondertekend token waarin traceId’s als claim zijn opgenomen.

De inhoudelijke logboek data blijft volledig bij de bronorganisatie. 

TODO: Toevoegen, vergelijking/relatie met gemeente dossiers in Mijn Overheid zakelijk

##  Oplossing in meer detail

### Registratie van traceId’s
De organisatie __welke de trace start__ bepaalt zelf of deze trace direct zichtbaar is, tijdelijk verborgen moet blijven of zelfs permanent uitgesloten is van inzage.

Een niet vertrouwelijke trace wordt direct aangemeld bij het trace register. Een vertrouwelijke trace wordt niet aangemeld bij het trace register. Wanneer vertrouwelijkheid vervalt (bijvoorbeeld na afronding van een onderzoek), kan de betreffende organisatie alsnog de betreffende traceId’s aanmelden.


### Opvragen door burger of bedrijf
Een burger of bedrijf logt in, bijv. via DigiD of eHerkenning bij het trace register. Vervolgens wordt het trace register gevraagd om een JWT te genereren met als claim een lijst van gekoppelde traceId’s. Het JWT token heeft een beperkte geldigheid (korte time-to-live, TTL) 

Voorbeeld (conceptueel):
```json
{
  "trace_ids": [
    "abc-123",
    "def-456"
  ],
  "exp": 1700000000
}
```

De claims bevatten géén BSN of andere persoonsgegevens — uitsluitend traceId’s.

### Bevraging van logboek-API’s
De frontend stuurt het token mee naar iedere bevraagde organisatie. Elke organisatie:

- Verifieert de handtekening in het token via de publieke sleutel van het trace register.
- Controleert of de gevraagde traceId in de claims staat.
- Retourneert uitsluitend logregels die corresponderen met geautoriseerde traceId’s.

Er zijn dus geen bevragingen meer op basis van traceID zonder enige vorm van access control. 

## Oplossing per bedenking

### Bedenking 1 – Verborgen verwerkingen

__Probleem__:

Bedenking 1 stelt dat sommige verwerkingen niet zichtbaar mogen worden via frontend-samenvoeging. Een voorbeeld in het project besluit Vertrouwelijkheid wordt vastgelegd per Verwerkingsactiviteit illustreert het probleem:

> Opsporingsinstantie A bevraagt bij Overheidsorgaan B data over Betrokkene X in het kader van een lopend onderzoek naar een misdrijf. Betrokkene mag geen inzage krijgen in de verwerking door Opsporingsinstantie A, omdat dit het onderzoek zou kunnen hinderen. Als Betrokkene wel inzage krijgt in de verwerking van Overheidsorgaan B, kan hij alsnog afleiden dat Opsporingsinstantie A deze data heeft opgevraagd, met hetzelfde ongewenste effect.


__Oplossing binnen dit model__:

Alleen opsporingsorganisatie A weet of een verwerking verborgen is. Opsporingsorganisatie A start de trace en kiest er voor om de trace niet aan te melden bij het trace register. Zolang een traceId niet is aangemeld, kan er geen geldig JWT voor worden afgegeven en blijft de trace verborgen. Andere organisaties hoeven geen additionele logica te implementeren over zichtbaarheid en hoeven bovendien hierover geen informatie op te slaan. 

### Bedenking 2 – traceId-endpoints

__Probleem:__

Bij de demo ontstond een technisch patroon waarbij de frontend in twee rondes de volledige trace opbouwde:

- Bevraging op basis van BSN → alleen WOZ retourneert een traceId.
- Bevraging op basis van traceId → alle organisaties retourneren hun deel van de trace.

Op basis van een willekeurig traceId trace-informatie verstrekken, zonder toegangscontrole, bij een bevraging op basis van traceID is vanuit security en privacy oogpunt onacceptabel.

__Oplossing binnen dit model__:

Het introduceren van een trace register welke tokens uitgeeft met het traceId in de claims lost dit op: iedere bevraging is ondertekend met een JWT en elke organisatie valideert zelf het token. Trace data wordt enkel verstrekt indien de gevraagde trace informatie is gekoppeld aan één van de trace ID's in het JWT token. 

Bijkomend, er is geen noodzaak voor `data_subject_id` bij elke organisatie. Dit lost een probleem op bij b.v. de BAG waarbij er geen `data_subject_id` in de logregels staan, en hieraan ook moeilijk een zinvolle invulling te geven is.
