# webbapplikasjoner_Prosjekt

Spill forum
-------------

Spill forum er en webapp der brukere har mulighet for å logge inn med en Steam-ID, videre se eget Steam-bibliotek sortert etter spilletid. Brukerne har tilgang til et felles forum for hvert spill der ulike diskusjoner kan diskuteres.
Brukerenes innlegg og innlogging lagres i et database, derimot blir spilldata hentet live fra Steam sitt API. Appen kjøres på Cloudflare workers og er bygget med RedwoodSDK (React Server Components, better-auth og Drizzle.)

Kom i gang, ved installasjon av prosjektet skal følgende kommandoer kjøres i rekkefølge i terminalen:

1. cd prosjekt
2. pnpm install

Opprett filen prosjekt/.dev.vars med nødvendige nøkler:


Lag den lokale databasen:

pnpm migrate:new
pnpm migrate:dev


Kjør programmet:

pnpm dev

Kjør testene:

pnpm test



Hovedflyten:
1. Registrering /CreateNewUser: brukernavn, Steam-ID, epost og passord sendes til better-auth, dette oppretter en bruker og innlogget sesjon (cookie) 
2. Hjem /: serveren leser steamId fra den innloggede brukeren, henter relevant spill til steamID-en og viser dem etter mest spilt først.
3. Forum /forum: En bruker har mulighet for å trykke på et spill og komme til forum. På forum ligger også /post der man kan trykke inn på en spesifik post.
4. Profil og admin: /Profile: viser kontoopplysninger, /Admin: viser alle brukere på appen og er kun relevant for de med rolle admin.
5. Ikke innlogget sendes til /Login

