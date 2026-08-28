/**
 * Customer reviews shown on the site and rolled into AggregateRating schema.
 *
 * This is intentionally empty. The competitor analysis found that NOT ONE
 * competitor surfaces star ratings on their own site — so real reviews here are
 * the single fastest differentiator available. Add them only when they are
 * genuine and you have the customer's OK to publish.
 *
 * To add a review, push an object:
 *   {
 *     author: 'Full name or "Name, Company"',
 *     rating: 5,                 // 1–5, whole or half numbers
 *     date: '2026-08-01',        // ISO date the review was given
 *     text: 'What they said, verbatim, trimmed only for length.',
 *     source: 'Google',          // where it came from — Google, email, etc.
 *   }
 *
 * While this array is empty:
 *   - <Reviews> renders nothing.
 *   - No aggregateRating / review is added to the business JSON-LD.
 * Never pre-fill it with invented ratings — an AggregateRating with no real
 * reviews behind it is exactly the kind of thing that gets manual actions.
 */
export const REVIEWS = [];

/** Average rating to one decimal place, or null when there are no reviews. */
export function averageRating(reviews = REVIEWS) {
  if (!reviews.length) return null;
  const sum = reviews.reduce((n, r) => n + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}
