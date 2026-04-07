# Voorstel 2: Federated Aggregator 

## Fase 1: TraceId's verzamelen

In de eerste fase wordt een set van traceId's opgebouwd per root-organisatie. Een root organisatie is de organisatie waar een trace gestart is. De process verloopt als volgt: 

<figure id="Sequence diagram voor federated aggregator">
<pre class="diagram mermaid">
sequenceDiagram

participant A as Client applicatie
participant B as Federated Aggregator
participant C as Organisaties (Logboeken) (1000+)

A->>B: 1. HTTP GET /get-traces

loop Voor elk Logboek (1 request per C)
    B->>C: HTTP GET /get-trace-ids
    C-->>B: Response
end
</pre>
<figcaption>Sequence diagram: Opvragen van TraceId's</figcaption>
</figure>

Van iedere deelnemende organisatie (Logboek) ontvangt de federated aggregator een response met de volgende structuur:

```
[{
    "rootLogboek": "DUO-studiefinanciering",
    "traceId": "xyz",
}, 
...
]
```

Er zijn drie scenario's mogelijk:

1. Geen logverwerkingen gevonden, geef een lege lijst als response.

2. Logverwerkingen gevonden, maar de trace spans hebben betrekking op een trace welke niet gestart is bij het bevraagde Logboek. In de response wordt dit aangegeven door in het `rootLogboek` veld aan te geven bij welke organisatie de trace is gestart. Dit vereist dat we in het logboek per trace span gaan bij houden wat het root Logboek is (aanpassing huidige log-standaard). 

3. Logverwerkingen gevonden, en de trace spans hebben betrekking op een trace welke gestart is door de aangeroepen Logboek. 

## Fase 2: Trace 

Iedere _root_ Logboek waarvoor traceId's gevonden zijn in fase 1 worden in fase 2 aangeroepen met het verzoek voor deze traces volledige span terug te geven. 

Dit verzoek is altijd gericht aan het root Logboek. Hierdoor kan het root Logboek, bij het moment van uitvragen, controleren of de ingelogde gebruiker toegang mag hebben. 

<figure id="Sequence diagram voor federated aggregator">
<pre class="diagram mermaid">
sequenceDiagram

participant A as Client applicatie
participant B as Federated Aggregator
participant C as Organisaties (Logboeken) (1000+)

loop Voor elk Logboek waarbij in fase 1 een resultaat is gevonden
    B->>C: HTTP GET /get-traces
    C-->>B: Response
end
</pre>
<figcaption>Sequence diagram: Opvragen van TraceId's</figcaption>
</figure>

Ieder root Logboek geeft de volledige trace terug. Als een trace dus over meerdere organisaties loopt, dan is het de verantwoordelijkheid van het root Logboek om alle trace spans te verzamelen en geaggregeerd terug te sturen. 

## Voorbeeld

We geven een voorbeeld. Opsporingsinstantie FIOD bevraagt het RDW in het kader van een lopend onderzoek naar een misdrijf. Betrokkene mag geen inzage krijgen in de verwerking door FIOD, omdat dit het onderzoek zou kunnen hinderen. 

### Logboek van FIOD

| Verwerking                       | TraceId | SpanId | ParentSpanId | Root Organization (Logboek) | DataSubjectId |
|---                               |---      | ---    | ---          | ---                         | ---           |
| Kenteken uitvragen               | T1      | S1     | NULL         | FIOD                        | NULL          |

### Logboek van RDW

| Verwerking                       | TraceId | SpanId | ParentSpanId | Root Organization (Logboek) | DataSubjectId |
|---                               |---      | ---    | ---          | ---                         | ---           |
| Kenteken informatie verstrekken  | T1      | S2     | S1           | FIOD                        | BSN1          |


<figure id="Sequence diagram voor federated aggregator">
<pre class="diagram mermaid">
sequenceDiagram

participant A as Client applicatie
participant B as Federated Aggregator
participant C as FIOD
participant D as RDW

autonumber
rect rgb(191, 223, 255)
note left of A: Fase 1
A->>B: 1. HTTP GET /get-traces

B->>C: HTTP GET /get-trace-ids?SubjectId=BSN1
Note over C: mapping = []
C-->>B: Response

B->>D: HTTP GET /get-trace-ids?SubjectId=BSN1
Note over D: mapping = [{ rootOrganization: "FIOD", traceId: "T1"  }]
D-->>B: Response
end

rect rgb(191, 223, 255)
note left of A: Fase 2
B->>C: HTTP GET /get-trace?traceId=T1
C->>D: HTTP GET /get-trace?traceId=T1

D-->>C: Response (met inhoud)
C-->>B: Response (zonder inhoud, gebruiker niet geautoriseerd)
B-->>A: Response
end
</pre>
<figcaption>Sequence diagram: voorbeeld</figcaption>
</figure>