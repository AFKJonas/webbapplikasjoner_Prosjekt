import { render, route, prefix } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { db } from "@/db"
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import {GamesList} from "@/app/components/Games/GamesList"; // importert Games
import { HomePage } from "./app/pages/Game/HomePage"; // importert HomePage
import { PostPage } from "./app/pages/Forum/PostPage";
import { ForumPage } from "./app/pages/Forum/ForumPage";
import { LoginPage } from "./app/pages/Login/LoginPage"; // importert LoginPage
import CreateNewUser from "./app/pages/Login/CreateNewUser"; // importert NewUserRegistrer
import { users } from "./db/schema/schema";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  ({ ctx }) => {
    // setup ctx here
    ctx;
  },
  render(Document, [
    route("/", HomePage), // endret route for / til HomePage 
    route("/post", PostPage),
    route("/forum", ForumPage),
    route("/Login", LoginPage), // Burde nok bytte ut "/" HomePage med noe annet og få LogIn page på "/" ?
    route("/CreateNewUser", CreateNewUser),
    prefix("/api", [
      route("/seed", async () => {
        const seed = await db.insert(users)
                              .values({username: "Marius", email: "email@email.com", password: "1234", steamId: "76561198351280476"})
                              .returning();
        return Response.json(seed)
      })
    ])
  ]),
]);
