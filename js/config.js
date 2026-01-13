let respecConfig = {
  useLogo: true,
  useLabel: true,

  // TODO: title is verplicht! Neem hieronder de titel van het document op
  title: "TransparantieApp rapport",
  //-- specStatus is verplicht! (activeer 1 van de volgende)
  specStatus: "wv",                 // Werkversie
  //specStatus: "cv",               // Consultatieversie
  //specStatus: "vv",               // Versie ter vaststelling
  //specStatus: "def",              // Vastgestelde versie
  //specStatus: "basis",            // Basis Document

  //-- specType is verplicht bij alle andere dan BASIS
  //specType: "NO",                 // Norm
  //specType: "ST",                 // Standaard
  //specType: "IM",                 // Informatie Model
  //specType: "PR",                 // Praktijkrichtlijn
  specType: "HR",                   // HandReiking
  //specType: "WA",                 // Werkafspraak
  //specType: "BD",                 // Beheer Documentatie
  //specType: "AL",                 // Algemeen document
  //specType: "BP",                 // Best Practice

  //-- pubDomain is verplicht! (komt in de URL)
  //-- zie: https://geonovum.github.io/handleiding-tooling/ReSpec/#pubdomain
  //-- TODO: vul pubDomain in
  pubDomain: "ldv",

  //-- license: voor de geldende gebruiksvoorwaarden. Default is cc-by.
  //license: "cc-by-nd",            // bronvermelding, geen afgeleide werken (default)
  //license: "cc0",                 // Public Domain Dedication
  license: "cc-by",                 // Attribution, met bronvermelding

  //-- TODO shortName is verplicht! (komt in de URL: kies logische afkorting)
  shortName: "transparantieapp",
  
  //edDraftURI = De URI van de draft version. Deze wordt automatisch afgeleid van de github URI; maar kan hier overschreven worden. 
	//edDraftURI: ["https://geonovum.github.io", "/", "shortName"],

  //-- publishDate is verplicht. Als je werkversie gekozen hebt  dan pakt Respec
  //-- de pushdate maar de publishDate is nog steeds verplicht.
  publishDate: "2025-11-17",
  
  //-- publishVersion is verplicht. Hij mag wel leeg zijn [], maar niet de lege string zijn "".
  publishVersion: [],
 
  //-- Voor dit blok geldt: alleen als er eerdere versies zijn en altijd beide aan/uit! 
  //previousPublishDate: "2014-05-01",
  //previousMaturity: "CV",

  //-- Deze gebruiken we niet binnen Geonovum
  //prevVersion: "0.0.1",

  //-- TODO: de namen van de Editor(s) / Redacteur(en)
  //-- vul in: per Editor: name:, company:, companyURL:
  editors:
    [
      {
        name: "Frank Terpstra",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      }
    ],

  //-- de namen van de auteur(s) 
  //-- vul in: per auteur: name:, company:, companyURL: 
  authors:
    [
      {
        name: "Frank Terpstra",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      },
	  {
        name: "Carmen Burghardt",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      },
	  {
        name: "Henk Erik van der Hoek",
        company: "Geonovum",
        companyURL: "https://www.geonovum.nl",
      }
    ],

  // TODO: Vul de github URL in.
  //neem hier de URL van de github repository op waar het respec document in staat
  github: "https://github.com/Geonovum/TransparantieApp",

  // Create PDF and link to file in header (optional):
  // TODO: Change the filename as preferred.
  //alternateFormats: [
  //    {
  //        label: "pdf",
  //        uri: "static/template.pdf",
  //    },
  //],

  // Lokale lijst voor bibliografie
  // - Kijk eerst naar de beschikbare www.specref.org .
  // - Kijk daarna in de organisatieconfig.
  // - Voeg dan pas hieronder toe.
  localBiblio: 
  {
    FSAUTH: {
      id: "FSAUTH",
      title: "Forum Standaardisatie Authenticatie Standaarden",
      href: "https://www.forumstandaardisatie.nl/open-standaarden/authenticatie-standaarden",
      status: "Definitief",
      publisher: "Geonovum",
      date: "2020-03-23"
    },
    LDV: {
      id: "LDV",
      title: "Standaard Logboek dataverwerkingen",
      href: "https://logius-standaarden.github.io/logboek-dataverwerkingen/#detailniveaus",
      status: "Werkversie",
      publisher: "Logius",
      date: "2026-01-06"
    },
    DIGIDAPP2APP: {
      id: "DIGIDAPP2APP",
      title: "Functionele beschrijving DigiD app",
      href: "https://www.logius.nl/onze-dienstverlening/toegang/digid/documentatie/functionele-beschrijving-digid-app",
      status: "Definitief",
      publisher: "Logius",
      date: "2023-11-18"
    }
  }
};
