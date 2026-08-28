import { REVIEWS, averageRating } from '../data/reviews';
import './Reviews.css';

/**
 * Renders the review list, or nothing while there are none. The matching
 * AggregateRating JSON-LD is added by renderHead() in entry-server.jsx, also
 * gated on REVIEWS.length.
 */
export default function Reviews() {
  if (!REVIEWS.length) return null;
  const avg = averageRating();

  return (
    <section id="reviews" className="reviews" aria-labelledby="reviews-heading">
      <div className="container">
        <div className="reviews-head">
          <h2 id="reviews-heading">What customers say</h2>
          <p className="reviews-avg">
            <strong>{avg.toFixed(1)}</strong> out of 5 · {REVIEWS.length}{' '}
            {REVIEWS.length === 1 ? 'review' : 'reviews'}
          </p>
        </div>
        <ul className="reviews-list">
          {REVIEWS.map((r) => (
            <li key={`${r.author}-${r.date}`} className="review">
              <p className="review-text">{r.text}</p>
              <p className="review-meta">
                <span className="review-author">{r.author}</span>
                <span className="review-stars" aria-label={`${r.rating} out of 5`}>
                  {'★'.repeat(Math.round(r.rating))}
                </span>
                {r.source ? <span className="review-source">via {r.source}</span> : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
