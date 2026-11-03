import type { RequestInfo } from "rwsdk/worker";
import { AppLayout } from "@/app/components/Layout/AppLayout";
import { ProfileInformationList } from "@/app/components/Profile/ProfileInformationList";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ProfilePage({ ctx }: RequestInfo) {
    return (
        <AppLayout>
            <main className="profile-page">
            <a href="/" className="back-button">
                {<FontAwesomeIcon icon={faArrowLeft} />} Tilbake til hjem
            </a>
                <h1 className="profile-header">Min Profil</h1>
                <p>Her finner du informasjon som er knyttet til kontoen din</p>
                <ProfileInformationList
                    username={ctx.user!.name}
                    email={ctx.user!.email}
                    steamId={ctx.user!.steamId}
                />
            </main>
        </AppLayout>
    );
}