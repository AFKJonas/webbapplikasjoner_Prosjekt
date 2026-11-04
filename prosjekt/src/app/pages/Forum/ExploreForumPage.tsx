
import { AppLayout } from "@/app/components/Layout/AppLayout";
import { getAllPosts } from "@/repositories/postRepository";
import {faThumbsUp, faThumbsDown,faComment, faArrowLeft,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//komponent som viser alle foruminnlegg
export async function ExploreForumPage() {
  //henter alle innlegg fra databsen
  const posts = await getAllPosts();
  return (

    //legger siden inn i den felles layouten
    <AppLayout>
    <main className="forum-page">
      <nav aria-label="Forum-navigasjon">
      <a href="/forum" className="back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Tilbake til Mine Forums
      </a>
    </nav>
      <header className="forum-header">
        <h1>Utforsk forum</h1>
        <p>
          Finn diskusjoner, oppdag nye spill og del meninger
          med andre spillere.
        </p>
      </header>

      {/*viser alle frouminnleggene som er hentet fra databsen */}
      <section className="post-list" aria-label="Alle foruminnlegg">
        {posts.map((post) => (
          //viser hvert innlegg som et eget kort
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
    </AppLayout>
  );
}
