import { AppLayout } from "@/app/components/Layout/AppLayout";
import { ProfileInformationList } from "@/app/components/Profile/ProfileInformationList";

export function ProfilePage () {
    return (
        <AppLayout>
            <main>
                <h1>Velkommen til din profil</h1>
                <ProfileInformationList />
            </main>
        </AppLayout>
    )
}