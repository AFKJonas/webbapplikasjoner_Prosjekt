type Props = { username: string; email: string; steamId: string };

export function ProfileInformationList({ username, email, steamId }: Props) {
    return (
        <section className="profile-card" aria-label="Profilinformasjon">
            <h2>Profilinformasjon</h2>
            <ul>
                <li>Navn: {username}</li>
                <li>Email: {email}</li>
                <li>steamId: {steamId}</li>
            </ul>
        </section>
    );
}