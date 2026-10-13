import { faThumbsUp, faThumbsDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ForumPage() {
    return (
      <main className="forum-page">
        <h1>Spillforum</h1>
  
        <p>Diskuter spill, del meninger og snakk med andre spillere.</p>
  
        <div className="post-list">
  
        <a href="/post" className="post-card">
          <h2>Hva synes dere om GTA 6?</h2>
          <p>Mohammed</p>

          <p>
            <FontAwesomeIcon icon={faThumbsUp} className="faIcon" /> 24
            &nbsp;
            <FontAwesomeIcon icon={faThumbsDown} className="faIcon" /> 3
            &nbsp;
            <FontAwesomeIcon icon={faComment} className="faIcon" /> 5 kommentarer
          </p>
        </a>
  
        <a href="/post" className="post-card">
        <h2>Beste spill dere har spilt?</h2>
          <p>User123</p>

          <p>
            <FontAwesomeIcon icon={faThumbsUp} className="faIcon" /> 15
            &nbsp;
            <FontAwesomeIcon icon={faThumbsDown} className="faIcon" /> 1
            &nbsp;
            <FontAwesomeIcon icon={faComment} className="faIcon" /> 8 kommentarer
          </p>
        </a>
  
        <a href="/post" className="post-card">
          <h2>Hva spiller dere akkurat nå?</h2>
          <p>User456</p>

          <p>
            <FontAwesomeIcon icon={faThumbsUp} className="faIcon" /> 9
            &nbsp;
            <FontAwesomeIcon icon={faThumbsDown} className="faIcon" /> 2
            &nbsp;
            <FontAwesomeIcon icon={faComment} className="faIcon" /> 4 kommentarer
          </p>
        </a>
  
        </div>
  
        <button className="new-post-button">
          + Ny post
        </button>
      </main>
    );
  }