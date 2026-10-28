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
import { ForumPage } from "./app/pages/Forum/ForumPage";
import { LoginPage } from "./app/pages/Login/LoginPage";
import CreateNewUser from "./app/pages/Login/CreateNewUser";
import { ExploreForumPage } from "./app/pages/ExploreForumPage";
import { ProfilePage } from "./app/pages/Profile/ProfilePage";
import { AdminPage } from "./app/pages/Admin/AdminPage";

export type AppContext = {};

export default defineApp([
  setCommonHeaders(),
  route("/api/auth/*", ({ request }) => auth.handler(request)), // MÅ ligge før authMiddleware
  authMiddleware,

  render(Document, [
    layout(AuthLayout, [
      route("/", [requireAuth(), HomePage]),
      route("/post", [requireAuth(), PostPage]),
      route("/forum", [requireAuth(), ForumPage]),
      route("/Login", LoginPage),
      route("/CreateNewUser", CreateNewUser),
      route("/Profile", [requireAuth(), ProfilePage]),
      route("/explore", ExploreForumPage),
      route("/admin", [requireAdmin(), AdminPage]),
    ]),
  ]),
]);