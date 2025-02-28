# Moment 3 - Fördjupad frontend-utveckling
#### Av Kajsa Classon, HT24. DT210G - Fördjupad Frontend-utveckling, Mittuniversitetet.

En bloggplattform skapad med React och TypeScript som en Single Page Application. Bloggplattformen kommunicerar med ett REST-api skapad med Laravel där data lagras i en MySQL-databas. REST-apiet hanterar användare och autentisering, samt blogginlägg och kommentarer.

Repo för REST-webbtjänsten hittar du här: https://github.com/ispyspiders/yarnblogApi.git

## Uppgiftsbeskrivning
Uppgiften går ut på att skapa en Single Page Application med React med implementerad routing och autentisering. Till exempel en personlig bloggplattform där användare kan hantera blogginlägg, eller ett enkelt lagerhanteringssystem för produkthantering. 

Projektet ska bestå av:
* Ett backend-API
* Frontend skapad som en Single Page Application med React och TypeScript

### Krav på frontend
* Publik del med översikt av innehåll, tex de senaste inläggen/produkterna utskrivna
* Dynamiska routes för enskilda items
* Inloggningssystem med JWT-tokens
* Skyddad administrativ del för innehållshantering (hantera inlägg/produkter)
* Navigationsmeny som uppdateras efter inloggningsstatus (det ska framgå om användaren är inloggad eller inte).

Antalet undersidor är valfritt men minst en undersida för listning av items (publik), en för listning av enskilt item (publik), inloggningssida (publik) och adminstrationsdel (skyddad).

Tekniska krav:

* React Router för routingstruktur med navigering i gränsnittet.
* JWT-autentisering med tokenhantering, antingen lagrat i localStorage eller som HTTP-cookie.
* TypeScript med väldefinierade interface/types
* Responsiv design för olika skärmstorlekar
* Felhantering och tydliga felmeddelanden vid formulärhantering och API-anrop