/**
 * Video clips, keyed by the page path they appear on.
 *
 * Intentionally empty. Google shows a video result for terms like
 * "led screen trailer", and a short, genuine clip lifts dwell time — a set-up
 * timelapse or a fleet walkthrough is worth having. Do not link a stock clip.
 *
 * To add one:
 *   1. Put the file at public/video/<name>.mp4 (H.264 / AAC, ideally under 20 MB)
 *      and a poster frame at public/img/<name>-poster.jpg
 *   2. Add an entry below, keyed by the page path it belongs on:
 *
 *      '/led-screen-trailer-hire/': {
 *        url: '/video/<name>.mp4',
 *        thumbnail: '/img/<name>-poster.jpg',
 *        name: 'Setting up an LED screen trailer',
 *        description: 'A 30-second timelapse of an LED screen trailer being '
 *          + 'levelled, raised and switched on at a Melbourne event site.',
 *        uploadDate: '2026-09-01',   // ISO date
 *        duration: 'PT35S',          // optional, ISO 8601
 *      }
 *
 * While a path has no entry, <Video> renders nothing and no VideoObject schema
 * is emitted for that page.
 */
export const VIDEOS = {};

/** The video for a page path, or null. */
export function videoFor(path) {
  return VIDEOS[path] || null;
}
