import type { RequestInfo } from "rwsdk/worker";
import { GamesList } from "@/app/components/Games/GamesList";
import { AppLayout } from "@/app/components/Layout/AppLayout";

export async function HomePage({ ctx }: RequestInfo) {
    const steamId = ctx.user?.steamId;

    if (!steamId) {
        return <p>Klarte ikke å finne steamId</p>;
    }
    return (
        <AppLayout>
            <main className="mainHomePage">
                <GamesList steamId={steamId} />
            </main>
        </AppLayout>
    );
}