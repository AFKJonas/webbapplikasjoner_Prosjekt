type Props = { username: string; email: string; steamId: string };

export function ProfileInformationList({ username, email, steamId }: Props) {
    return (
        <section>
            <p>Navn: {username}</p>
            <p>Email: {email}</p>
            <p>steamId: {steamId}</p>
        </section>
    );
}