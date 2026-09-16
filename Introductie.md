# Introductie

De overheid verwerkt enorme hoeveelheden burgerdata, bijvoorbeeld bij het nemen van besluiten. Op individueel niveau is echter niet altijd duidelijk welke data wordt gebruikt bij besluitvorming. Er bestaan standaarden zoals het Logboek Dataverwerkingen, Nen-normen en EU-Dataspaces die vastleggen hoe data worden verwerkt en hoe beslissingen tot stand komen. Het toegankelijk maken van deze informatie voor het brede publiek, met oog voor privacybelangen van alle betrokkenen, is een grote uitdaging. 

Om dit doel te bereiken willen we een standaard voor het lezen van logging voor transparantie besluitvorming definieren en een prototype App bouwen, de TransparantieApp die van deze standaard gebruik maakt. Deze wordt neergezet in een simulatieomgeving. De app haalt automatisch informatie op en maakt deze inzichtelijk uit een al bestaand logbestand zoals bijvoorbeeld een logbestand gemaakt met Logboek Dataverwerkingen. Logboek Dataverwerkingen is een standaard voor overheden waarmee zij vastleggen hoe zij gegevens verwerken (ook wel 'loggen'). Hierdoor kunnen overheden transparant maken wat er met gegevens gebeurt, zowel binnen hun eigen organisatie als in samenwerking met andere instanties. De App is vergelijkbaar met de Vorderingenoverzicht Rijk-app (vorijk.nl, inmiddels bekend als mijn betaaloverzicht) en sluit aan bij het overheidsbeleid rondom data-uitwisseling, zoals vastgelegd in de Nederlandse Digitaliseringsstrategie. De App haalt zijn data direct bij de bron via API's, werkt volledig op basis van open standaarden en legt nadruk op privacy van de burger door de data alleen bij de burger samen te brengen.

Dit document is onderdeel van de rapportage over het project TransparantieApp de rapportage bestaat uit drie documenten:

| **Naam**                         | **publicatie**                                            | **werkversie**                                                       | **github**                                                           |
|----------------------------------|-----------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|
| TransparantieApp rapport         | https://docs.geostandaarden.nl/ldv/transparantieapp       | https://geonovum.github.io/TransparantieApp/                         | https://github.com/Geonovum/TransparantieApp                         |
| Gebruikersonderzoek en UX design | https://docs.geostandaarden.nl/ldv/transparantieapp-go-ux | https://geonovum.github.io/TransparantieApp-Gebruikers-Onderzoek-UX/ | https://github.com/Geonovum/TransparantieApp-Gebruikers-Onderzoek-UX |
| Applicatie Architectuur          | https://docs.geostandaarden.nl/ldv/transparantieapp-arch  | https://geonovum.github.io/TransparantieApp-Applicatie-Architectuur/ | https://github.com/Geonovum/TransparantieApp-Applicatie-Architectuur |

## Leeswijzer

Dit rapport bundelt de resultaten van het project TransparantieApp; de hoofdstukken zijn afzonderlijk leesbaar. Wie weinig tijd heeft, leest [Conclusies](#conclusies) en [Aanbevelingen](#aanbevelingen): samen geven die de kern van het rapport, de overige hoofdstukken bevatten de onderbouwing daarvan.

- [Aanbevelingen](#aanbevelingen) — de adviezen uit alle onderdelen van het project, geordend naar standaard, architectuur, mentale modellen, gebruikersonderzoek, UX-design en beleidsjuridisch kader.
- [User eXperience](#user-experience) — het mentale model van datatransparantie, de persona's en de ontwerpkeuzes die daaruit volgen. Volledig uitgewerkt in de bijlage Gebruikersonderzoek en UX design.
- [Business Architectuur](#business-architectuur) — de twee usecases, "Waarom is dit gebeurd?" en "Wie heeft er aan mijn gegevens gezeten?", en wat die betekenen voor een federatieve opzet en voor de standaard.
- [Applicatie Architectuur](#applicatie-architectuur) — requirements, componenten, sequence-diagrammen, authenticatie en autorisatie, en pseudonimisering via OPRF. Volledig uitgewerkt in de bijlage Applicatie Architectuur.
- [Praktijkbeproeving](#praktijkbeproeving) — de opzet van de simulatieomgeving, de lessen daaruit en de aanpassingen die al in de standaard zijn verwerkt.
- [De Standaard](#de-standaard) — beleidsjuridisch kader, ontwikkelmethode, de Open API Specification voor de extensie lezen en de vier manieren waarop die toegepast kan worden.
- [Conclusies](#conclusies) — het antwoord op de onderzoeksvraag en de randvoorwaarden voor verantwoorde doorontwikkeling.

De links naar de twee bijlagen staan in de tabel hierboven.
