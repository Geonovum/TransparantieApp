# Praktijkbeproeving

## Opzet praktijkbeproeving

### Infrastructuur

De praktijkbeproeving draait in een simulatieomgeving waarin iedere gesimuleerde organisatie
haar eigen, geïsoleerde omgeving heeft. Er is bewust geen centrale opslag van logs of gegevens.

- **Kubernetes** op het Digilab-platform (`*.ldv.projects.digilab.network`).

- **Eigen namespace per organisatie**, met een eigen PostgreSQL-database voor het primaire proces en
  een eigen ClickHouse-database voor het logboek. Een organisatie ontsluit dus uitsluitend haar eigen logregels.

- **OpenTelemetry**: per organisatie draait een aangepaste collector die de log spans wegschrijft naar het 
  logboek van die organisatie.

- **Keycloak** als `mock` omgeving van DigiD; hiermee wordt het inloggen van een burger gesimuleerd.

- **GitOps**: de omgeving is volledig als code vastgelegd (Kustomize-overlays per omgeving, uitgerold
  met Flux), images worden reproduceerbaar gebouwd met Bazel in een CI/CD-pijplijn.

### Software

Alle onderdelen staan in één monorepo: backends in Go, frontends in React/TypeScript, met
OpenAPI-specificaties als contract waaruit zowel server- en clientcode wordt gegenereerd.

- **Organisaties**: gesimuleerde BAG, BRK en WOZ, een gemeente en een toeslagendienst. Samen voeren 
  zij ketenprocessen uit (zoals een OZB-aanslag), zodat er dataverwerkingen over organisatiegrenzen 
  heen ontstaan.

- **Logboek met leesinterface**: elke organisatie heeft een `log-reader` die de leesextensie op
  [[?LDV]] implementeert (`POST /v0/data-processing-operations`). Dit is de standaard die in dit project 
  is opgesteld.

- **Trace-index**: registreert per verwerking alleen betrokkene-ID, trace-ID en logboek-ID en verstrekt  
  kortlevende JWT tokens met de toegestane traceId's als claim.

- **Pseudoniemendienst (PRS)**: zet het BSN via blinding om naar een versleuteld pseudoniem, zodat het
  BSN niet bij de trace-index of bij andere organisaties terechtkomt.

- **Registers**: een register van logboeken (welke organisatie heeft welk logboek) en een register van
  verwerkingsactiviteiten.

- **TransparantieApp**: frontend en backend die met het token van de trace-index de logboeken van de
  betrokken organisaties bevragen en de verwerkingen in één overzicht tonen.

- **Tests**: per applicatie geautomatiseerde test cases, plus één ketentest die de volledige flow doorloopt,
  van het uitvoeren van een verwerking tot het inzien ervan door de burger.

## lessen uit praktijkbeproeving

De praktijkbeproeving ondersteunde het opstellen van de leesspecificatie zelf: de
[extensie lezen](https://logius-standaarden.github.io/logboek-extensie-lezen/) op [[?LDV]].
Het opstellen van de specificatie is een wisselwerking geweest tussen vooraf ontwerpen en aanpassen naar 
aanleiding van bevindingen welke het bouwen van de referentie-implementatie en de TransparantieApp aan het 
licht bracht. De lessen hieronder zijn afgeleid uit die wijzigingen.

### Les 1: Zoekvragen horen in de request body, niet in de URL

De eerste versie was een `GET /processing-activities` met de zoekcriteria als queryparameters:
`traceId`, `dpl.core.data_subject_id`, `startTime` en `endTime`. Daar zitten twee problemen in.
Ten eerste komt de identificatie van de betrokkene, in de vorm van een `data_subject_id` daarmee in de URL terecht, 
en dus in access logs, proxies en browserhistorie, Ten tweede zijn de LDV-attributen
genest en uitbreidbaar, en die structuur laat zich lastig uitdrukken in platte queryparameters met
punten in de naam.

De specificatie is daarom omgezet naar een `POST /data-processing-operations` met een JSON-body,
waarbij minimaal één zoekcriterium gevuld moet zijn. 

### Les 2: De attributen zijn een extensiepunt, geen vaste lijst

Aanvankelijk stonden alle `dpl.core.*`-velden hard in de specificatie opgesomd. Inmiddels verwijst de
specificatie naar een apart JSON Schema met de namespaces `dpl.core` en `dpl.read`, dat aanvullende
attributen toestaat. Een implementatie verwijst ofwel naar het core-schema in de standaard, ofwel past een
eigen kopie aan.

### Les 3: De extensie-leze heeft eigen attributen nodig

De schrijfstandaard bevat niet alles wat nodig is om een logboek te kunnen lezen. Voor het volgen van
een keten over organisaties heen is in de extensie het attribuut `dpl.read.nextLogbookId` toegevoegd:
een verwijzing naar het *volgende* logboek in de keten. 

### Les 4: Een verwerkingsactiviteit is geen dataverwerking

De resource heette lange tijd `ProcessingActivity`, terwijl het gaat om de concrete, gelogde
dataverwerking. De verwerkingsactiviteit is juist het item in het verwerkingenregister waar het
attribuut `processingActivityId` naar verwijst. Dat verschil was in de API-naamgeving verdwenen. 
De resource is hernoemd naar `DataProcessingOperation`, met bijbehorend pad `/data-processing-operations`. 

### Les 5: Verwijs naar registers

Gedurende de beproeving zijn er verschillende velden in de specificatie beland die eigenlijk uit een
register komen. Bijvoorbeeld het doel van de verwerkingsactiviteit (`purpose`). Dit is aangepast naar een 
verwijzining naar een registratie van de verwerkingsactiviteit. Hiervoor worden HATEOAS `links` objecten 
gebruikt.  De frontend verrijkt een logregel tijdens de weergave met extra gegevens uit het verwerkingenregister.

### Les 6: Laat het interne datamodel niet doorlekken

De tijdstippen waren aanvankelijk epoch-milliseconden. Dat is vervangen door RFC 3339-tijdstippen. 
En vergelijkbaar hieraan, in de span staan de attributen plat en in snake_case (`dpl.core.data_subject_id`), terwijl 
de API ze genest en in camelCase aanbiedt (`dpl.core.dataSubjectId`). Hiermee voldoent de lezen standaard
aan de API Design Rules. 

## Aanpassingen voorkomend uit beproeving

### RFCs voor standaarden

#### RFC: `data_subject_id` niet verplicht stellen in LDV core standaard

[[?LDV]] rekent `dpl.core.data_subject_id` en `dpl.core.data_subject_id_type` tot de
verplichte velden in de namespace `core`, en schrijft voor dat de Applicatie in *elke* logregel een
identificerende code van de Betrokkene opneemt. In de praktijk is die code lang niet altijd
beschikbaar op het moment dat een span wordt afgesloten.

Dat is eerder opgemerkt bij het opstellen van de extensie voor (geo)objecten [[?LDVObjecten]]. Daar is
vastgesteld dat `dpl.core.data_subject_id` alleen gebruikt hoort te worden om naar een persoonsgegeven
te verwijzen, terwijl er bij het loggen van objecten regelmatig geen betrokkene aan te wijzen is. De
oplossing is daar om het veld leeg te laten en de objectgegevens in een eigen `dpl.objects`-namespace te loggen.

Hetzelfde probleem speelt bij verwerkingen die wél over personen gaan, maar waarbij de betrokkene pas
gaandeweg bekend wordt. In de referentie-implementatie is dat te zien in de OZB-keten. De gemeente
opent eerst een span voor de aanslag zelf, vraagt vervolgens de WOZ-waarde op, en haalt daarna via de
BAG en de BRK de percelen en hun eigenaren op. Pas in die laatste stap komt een BSN (of RSIN) in beeld. 
Alle spans die daaraan voorafgaan hebben geen `data_subject_id` en kunnen dat ook niet hebben.

**Voorstel**: maak `dpl.core.data_subject_id` en `dpl.core.data_subject_id_type` in de LDV core standaard
niet langer onvoorwaardelijk verplicht, maar verplicht ze op het moment dat een span
daadwerkelijk persoonsgegevens van een identificeerbare Betrokkene verwerkt. 
