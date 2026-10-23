import { getUserInformation } from "@/lib/dbRepository";

export async function ProfileInformationList () {
    const user = await getUserInformation(1)


    if (!user) {
        return <p>Klarte ikke å finne brukeren.</p>;
    }

    return (
        <section>
            <p>Navn: {user.username} </p>
            <p>Email: {user.email}</p>
            <p>steamId: {user.steamId}</p>
        </section>
    )
}