import { render, route, layout } from "rwsdk/router";
import { defineApp } from "rwsdk/worker";
import { Document } from "@/app/document";
import { setCommonHeaders } from "@/app/headers";
import { auth } from "@/auth/auth";
import { authMiddleware } from "@/auth/middleware";
import { requireAuth, requireAdmin } from "@/auth/guards";
import { AuthLayout } from "@/app/components/Layout/AuthLayout";

import { HomePage } from "./app/pages/Game/HomePage";
import { PostPage } from "./app/pages/Forum/PostPage";
import { ForumRoute } from "./app/pages/Forum/ForumRoute";
import { LoginPage } from "./app/pages/Login/LoginPage";
import CreateNewUser from "./app/pages/Login/CreateNewUser";
import { ExploreForumPage } from "./app/pages/Forum/ExploreForumPage";
import { ProfilePage } from "./app/pages/Profile/ProfilePage";
import { AdminPage } from "./app/pages/Admin/AdminPage";
import { getMyGames } from "@/app/api/games";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  route("/api/auth/*", ({ request }) => auth.handler(request)), 
  authMiddleware,

  route("/api/games", { get: getMyGames}),

  render(Document, [
    layout(AuthLayout, [
      route("/", [requireAuth(), HomePage]),
      route("/post", [requireAuth(), PostPage]),
      route("/forum", [requireAuth(), ForumRoute]),
      route("/Login", LoginPage),
      route("/CreateNewUser", CreateNewUser),
      route("/Profile", [requireAuth(), ProfilePage]),
      route("/explore", [requireAuth(), ExploreForumPage]),
      route("/admin", [requireAdmin(), AdminPage]),
    ]),
  ]),
]);