/**
 * A titled block of internal links, styled with the shared .sp-related rules.
 * `items` is `[[href, label, sub?], ...]`. Renders nothing if empty.
 */
export default function RelatedLinks({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="sp-related">
      <div className="container">
        <h2>{title}</h2>
        <ul>
          {items.map(([href, label, sub]) => (
            <li key={href}>
              <a href={href}>
                {label}
                {sub ? <span>{sub}</span> : null}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
