import { videoFor } from '../data/videos';
import './Video.css';

/**
 * Renders the clip for this page, or nothing while there is none. The matching
 * VideoObject JSON-LD is added by renderHead() in entry-server.jsx, gated the
 * same way.
 */
export default function Video({ path }) {
  const v = videoFor(path);
  if (!v) return null;

  return (
    <section className="video-block" aria-labelledby="video-heading">
      <div className="container">
        <h2 id="video-heading">{v.name}</h2>
        <figure className="video-figure">
          <video
            controls
            preload="none"
            playsInline
            poster={v.thumbnail}
            width="1280"
            height="720"
          >
            <source src={v.url} type="video/mp4" />
          </video>
          {v.description ? <figcaption>{v.description}</figcaption> : null}
        </figure>
      </div>
    </section>
  );
}
