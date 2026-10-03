export function PostPage() {
    return (
      <main className="post-page">
        <a href="/forum" className="back-button">
            ← Tilbake til forum
        </a>
  
        <article className="post">
          <h1>Hva synes dere om dette spillet?</h1>
  
          <p className="post-author">👤 Skrevet av Mohammed</p>
  
          <p className="post-content">
            Dette er innholdet i posten. Her kan brukeren
            skrive hva de synes om spillet.
          </p>
  
          <div className="post-actions">
            <button>👍 12</button>
            <button>👎 2</button>
            <button>🗑 Slett post</button>
          </div>
        </article>
  
        <section className="comments">
          <h2>Kommentarer</h2>
  
          <div className="comment">
            <p>👤 User123</p>
            <p>Dette var en interessant post!</p>
          </div>
  
          <div className="comment">
            <p>👤 User456</p>
            <p>Jeg er helt enig.</p>
          </div>
  
          <textarea
            className="comment-box"
            placeholder="Skriv en kommentar..."
          />
  
          <button className="comment-button">
            Kommenter
          </button>
        </section>
      </main>
    );
  }