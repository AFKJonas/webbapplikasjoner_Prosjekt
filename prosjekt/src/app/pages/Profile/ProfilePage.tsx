import type { RequestInfo } from "rwsdk/worker";
import { AppLayout } from "@/app/components/Layout/AppLayout";
import { ProfileInformationList } from "@/app/components/Profile/ProfileInformationList";

export function ProfilePage({ ctx }: RequestInfo) {
    return (
        <AppLayout>
            <main>
                <h1>67</h1>
                <ProfileInformationList
                    username={ctx.user!.name}
                    email={ctx.user!.email}
                    steamId={ctx.user!.steamId}
                />
            </main>
        </AppLayout>
    );
}