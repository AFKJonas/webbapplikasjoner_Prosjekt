
import { posts } from "../posts.data";
import {
  faThumbsUp,
  faThumbsDown,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ExploreForumPage() {
  return (
    <main className="forum-page">
      <header className="forum-header">
        <h1>Utforsk forum</h1>
        <p>
          Finn diskusjoner, oppdag nye spill og del meninger
          med andre spillere.
        </p>
      </header>

      <section className="post-list" aria-label="Alle foruminnlegg">
        {posts.map((post) => (
          <article className="post-card" key={post.id}>
            <header>
              <h2>
                <a href={`/post?id=${post.id}`}>{post.title}</a>
              </h2>

              <p>
                Skrevet av {post.author} ·{" "}
                <time dateTime={post.createdAt}>
                  {post.createdAt}
                </time>
              </p>
            </header>

            <p>{post.description}</p>

            <footer>
              <p>
                <FontAwesomeIcon icon={faThumbsUp} className="faIcon" aria-hidden="true"/>
                <span>{post.thumbsUp}</span>

                <FontAwesomeIcon icon={faThumbsDown} className="faIcon" aria-hidden="true"/>
                <span>{post.thumbsDown}</span>

                <FontAwesomeIcon icon={faComment} className="faIcon" aria-hidden="true"/>
                <span>0 kommentarer</span>
              </p>
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
