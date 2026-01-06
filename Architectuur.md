# Context

- Er zijn **meerdere bronorganisaties**
- Elke bronorganisatie:
    - Beheert **eigen data**
    - Houdt **eigen logs** bij van dataverwerkingen
- Een dataverwerking is bijvoorbeeld:
    - Inzien van (persoons)gegevens
    - Wijzigen van (persoons)gegevens
- Over alle organisaties heen wordt **BSN of RSIN** gebruikt als **identificatie kenmerk**
- Het doel is: Een **geconsolideerd overzicht** tonen aan een persoon of bedrijf van **alle dataverwerkingen** over **alle bronorganisaties** heen.
- Elke organisatie biedt een **API** waarmee logs kunnen worden opgevraagd op basis van **BSN/RSIN**.

# Architectuuroplossing 1: Backend-for-Frontend met server-side aggregatie

## Kernidee

De browser of mobiele app communiceert met één centrale backend, de aggregation backend. Deze backend:

- Roept **alle organisatie-API’s server-to-server** aan
- Aggegreert de logs
- Geeft **één** geconsolideerd resultaat terug

## Sequence diagram

![Sequence diagram voor aggregation architectuur](media/aggregation.png)

## Gedetailleerde flow

1. Applicatie opent een browser ten behoeve van login sessie
    - Via de intermediary IdP (Identity Provider) wordt een DigiD login sessie gestart
    - Intermediary IdP vertaald de SAML interface van DigiD naar een OIDC
    - Intermediary IdP wordt overbodig zodra DigiD OIDC aanbiedt
2. Applicatie vraagt een JWT token op
    - JWT token wordt verrijkt met een BSN nummer in het sub veld
3. Normalisatie & filtering
4. Aggregatie backend:
    - Haalt bij alle deelnemende bron organisaties de log verwerkingen op
    - Filtert eventueel per autorisatie
    - Sorteert op tijd of type verwerking etc.
5. Response
    - Frontend ontvangt één resultaat bericht

## Voor- en nadelen

### Voordelen

- Geschikt voor zowel web- als native applicaties
- Geen CORS headers nodig bij webapplicatie.
- Eenvoudige frontend implementatie. 
- Functionaliteit eenvoudig aan te bieden vanuit meerdere clients (web, native app, etc). 

## Nadelen

- Aggregation backend is single point of failure.
- Aggregation backend heeft toegang tot het totaal overzicht alle log gegevens.

# Architectuuroplossing 2: Token-gebaseerd (JWT) met gedistribueerde aggregatie

## Kernidee

Na authenticatie ontvangt de client een JWT dat:

- Ondertekend is door de identity provider.
- Iedere organisatie kan **verifiëren** op echtheid. 

Iedere organisatie levert alleen zijn eigen logs terug. De frontend roept meerdere organisatie-API’s direct aan.

## Sequence diagram

![Sequence diagram voor JWT-architectuur](media/jwt.png)

## Gedetailleerde flow

1. Applicatie opent een browser ten behoeve van login sessie
    - Via de intermediary IdP (Identity Provider) wordt een DigiD login sessie gestart
    - Intermediary IdP vertaald de SAML interface van DigiD naar een OIDC
    - Intermediary IdP wordt overbodig zodra DigiD OIDC aanbiedt
2. Applicatie vraagt een JWT token op
    - JWT token wordt verrijkt met een BSN nummer in het sub veld API-calls per organisatie
3. Client-side aggregatie
    - Frontend combineert resultaten
    - Sorteert en presenteert overzicht

## Voor- en nadelen

### Voordelen

- Geschikt voor zowel web- als native applicaties
- Geen centrale backend applicatie waarin alle log verwerkingen samen komen

### Nadelen

- Complexiteit bij frontend:
    - Meerdere calls
    - Foutafhandeling

- Bij een Webapplicatie: CORS headers noodzakelijk om HTTP Headers cross-origin te kunnen versturen. 
- CORS headers dienen ingesteld te worden bij iedere deelnemende organisatie (Dit nadeel is niet van toepassing als de client een native app is)
- Aggregatie code leeft in de frontend en zal per client (web, native, etc) opnieuw geïmplementeerd moeten worden.

### Wanneer geschikt?

- Federatief landschap
- Geen centrale log verwerker gewenst
- Frontend mag complexer zijn

# Architectuuroplossing 3: VORijk implementatie

## Kernidee

- Iedere app creëert een public/private key pair.
- De public key wordt opgestuurd naar een beheer-applicatie.
- Na authenticatie retourneert de beheer-applicatie een certificaat (= public key + BSN + signature)
- Iedere bron-organisatie kan het certificaat verifiëren op echtheid. 
- Iedere organisatie levert alleen zijn eigen logs terug
- Communicatie tussen app en bronorganisatie is versleuteld via mTLS verbinding. (Opmerking: onduidelijk of dit boven op HTTPS is, óf in plaats van)
- De frontend roept meerdere organisatie-API’s direct aan

## Sequence diagram
TODO

### Voor- en nadelen

## Voordelen

- Geen centrale backend applicatie waarin alle log verwerkingen samen komen
- Slechts éénmalig inloggen bij DigiD. Gegevens worden daarna uitgewisseld op basis van het uitgegeven certificaat welke wordt opgeslagen op de telefoon van de gebruiker.

## Nadelen

- Complexiteit bij frontend:
    - Meerdere calls
    - Foutafhandeling
    - Extra stappen om 
- Certificaat wordt éénmalig aangemaakt in activatie stap en dient daarna opgeslagen te worden op de client t.b.v. vervolg sessies
- Public private key pairs gegeneerd op de client. Alle communicatie tussen bron organisatie en app gebruikt dezelfde key pair. Geen forward secrecy zoals bij een standaard HTTPS verbinding met DHE.
- Aggregatie code leeft in de frontend en zal per client (web, native, etc) opnieuw geïmplementeerd moeten worden.
- Afwijkend van open standaarden. 
- Onduidelijk hoe keys worden geroteerd, (is er functionaliteit vergelijkbaar met  `Key Id` in JWT tokens beschikbaar?)

# Vergelijking


| Aspect                         | Backend aggregatie | JWT         | VO-RIJK     | 
| ------------------------------ | ------------------ | ----------- | ----------- |
| BSN in frontend                | Ja                 | Ja          | Ja          |
| Log gegevens centraal verwerkt | Ja                 | Nee         | Nee         |
| Aggregatie                     | Backend            | Frontend    | Frontend    | 
| Complexiteit frontend          | Laag               | Gemiddeld   | Hoog        |

# Nog niet bekeken alternatieven

## JWT token zonder BSN

In de variant “backend aggregatie architectuur” kan het BSN nummer in het JWT token vervangen worden door een pseudo-anonieme identifier. Het BSN nummer hoeft dat niet gecommuniceerd te worden met de frontend. 

## DigiD App in plaats van Browser

Inloggen met DigiD kan via app2app[1]. De gebruiker maakt dan geen uitstapje naar de webbrowser maar een uitstapje naar de DigiD app. Er zijn twee varianten beschreven via SAML en via OIDC. Echter de OIDC variant is nog niet algemeen beschikbaar:
> Noot: Deze aansluitvorm is nog niet algemeen beschikbaar voor dienstaanbieders.  

[1] https://www.logius.nl/onze-dienstverlening/toegang/digid/documentatie/functionele-beschrijving-digid-app


