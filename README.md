# Spill forum

Spill forum er en webapp der brukere har mulighet for å logge inn med en Steam-ID, videre se eget Steam-bibliotek sortert etter spilletid. Brukerne har tilgang til et felles forum for hvert spill der ulike diskusjoner kan diskuteres.
Brukerenes innlegg og innlogging lagres i et database, derimot blir spilldata hentet live fra Steam sitt API.



# Installasjon
Ved installasjon av prosjektet skal følgende kommandoer kjøres i rekkefølge i terminalen:

1. cd prosjekt
2. pnpm install

Opprett en fil under prosjekt/
1. kall den .dev.vars.
2. Legg til nødvendige nøkler som er tilsendt.
3. Pass på å lagre med "CTRL S"


Lag den lokale databasen:
I terminalen skriv,

1. pnpm migrate:new
2. pnpm migrate:dev

3. Tast Y for Yes, på spørsmål i terminalen 


Kjør så programmet i terminalen:

1. pnpm run dev 


1. Trykk på [localhost](http://localhost:5173), her blir du navigert til login siden.
2. Registrer bruker med navn, steamID, E-post, passord og velg rolle (anbefalt Admin, for å teste all funksjonalitet)
3. steamID-en må være en gyldig steamID. Dersom du ikke har en, kan du bruke denne “76561198351280476”.
4. Profilen må være public for at man skal vise spill



For å kjøre testene avslutter du programmet og gjør dette i terminalen:
1. Pass på at du er i riktig directory: webbapplikasjoner_Prosjekt/prosjekt
2. kjør "pnpm test"

Dette vil kjøre alle testene som ligger under prosjekt/__tests__

# Hovedflyten:
1. Registrering /CreateNewUser: brukernavn, Steam-ID, epost og passord sendes til better-auth, dette oppretter en bruker og innlogget sesjon (cookie)
2. Hjem /: serveren leser steamId fra den innloggede brukeren, henter relevant spill til steamID-en og viser dem etter mest spilt først.
3. Forum /forum: En bruker har mulighet for å trykke på et spill og komme til forum. På forum ligger også /post der man kan trykke inn på en spesifik post.
4. Profil og admin: /Profile: viser kontoopplysninger, /Admin: viser alle brukere på appen og er kun relevant for de med rolle admin.
5. Ikke innlogget sendes til /Login




# Prosjektstruktur
```
├── src
│   ├── worker.tsx                    --> Ruter
│   ├── app
│   │   ├── api
│   │   │   └── games.ts              --> API-endepunkt: GET /api/v1/games
│   │   ├── pages                     --> Sider (Layout, Login, Forum, Games, Profile)
│   │   ├── components                --> Komponenter (Layout, Login, Forum, Games, Profile)
│   │   ├── context
│   │   │   └── AuthProvider.tsx      --> Innlogget bruker i klienten
│   │   ├── actions
│   │   │   └── postActions.ts        --> Server actions (opprett og slett innlegg)
│   │   └── headers.ts                --> Sikkerhetshoder
│   ├── auth
│   │   ├── auth.ts                   --> Auth-endepunkter (/api/auth/)
│   │   ├── guards.ts                 --> Tilgangskontroll (requireAuth, requireAdmin)
│   │   └── middleware.ts             --> Tilgangskontroll
│   ├── db
│   │   ├── index.ts                  --> Databasetilkobling (Drizzle mot D1-bindingen webapplikasjoner_db)
│   │   └── schema
│   │       └── schema.ts             --> Skjema (users, sessions, accounts, posts)
│   ├── repositories
│   │   ├── postRepository.ts         --> Spørringer
│   │   └── gamesApi.ts               --> Eksterne kall
│   └── services
│       └── gameService.ts            --> Forretningslogikk
├── drizzle                           --> Migrasjoner
├── __tests__
│   ├── unit                          --> Enhetstester
│   └── integration                   --> Integrasjonstester
├── wrangler.jsonc                    --> Konfig: Cloudflare
├── vite.config.mts                   --> Konfig: Vite
├── vitest.config.mts                 --> Konfig: Vitest
└── drizzle.config.ts                 --> Konfig: Drizzle
```

# Viktige valg

Teknologi
  RedwoodSDK (rwsdk) på Cloudflare Workers: Server-first React og server actions. Appen kjører på Cloudflare, rwsdk gir ruting, server actions, dette uten et avansert oppsett.
  Cloudflare D1 med Drizzle: D1 er en SQL-database som følger med Cloudflare, så det trengs ingen egen databaseserver. Dette gjør det enkelt å følge og å få typesikre spørringer.

Arkitektur
 Lagdelt struktur: Sider og komponenter (src/app) kaller services (src/services), som igjen bruker repositories (src/repositories). Databasespørringer og eksterne kall er skilt fra forretningslogikken, Dette gjør det lettere å teste og endre.
 Server actions for innlegg: Opprett og slett innlegg skjer i postActions.ts, slik at logikken kjører på serveren og ikke i klienten.

Sikkerhet
Tilgangskontroll: requireAuth og requireAdmin i src/auth/guards.ts brukes sammen med middleware.
Hemmeligheter ligger utenfor repoet: API-nøkler ligger i .dev.vars, disse blir ikke committet på grunn av .gitignore.

Testing
Vitest med enhets- og integrasjonstester i tests/unit/ og tests/integration/. Enhetstestene dekker blant annet logikken, integrasjonstestene dekker flyten mot API og database.
