import { render, route } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";

import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import {GamesList} from "@/app/components/GamesList"; // importert Games
import { HomePage } from "./app/pages/HomePage"; // importert HomePage
import { PostPage } from "./app/pages/PostPage";
import { ForumPage } from "./app/pages/ForumPage";
import { LoginPage } from "./app/pages/LoginPages/LoginPage"; // importert LoginPage
import CreateNewUser from "./app/pages/LoginPages/CreateNewUser"; // importert NewUserRegistrer

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
    route("/Login",LoginPage), // Burde nok bytte ut "/" HomePage med noe annet og få LogIn page på "/" ?
    route("/CreateNewUser", CreateNewUser),
  ]),
]);
