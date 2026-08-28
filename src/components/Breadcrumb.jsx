/**
 * Visible breadcrumb. Takes the same [[label, path], …] shape the route's
 * `seo.breadcrumb` uses, so a page passes its route crumbs straight through.
 * The matching BreadcrumbList JSON-LD is emitted separately by renderHead().
 */
export default function Breadcrumb({ items }) {
  if (!items || items.length < 2) return null;
  return (
    <nav className="sp-breadcrumb container" aria-label="Breadcrumb">
      <ol>
        {items.map(([label, path], i) => {
          const last = i === items.length - 1;
          return (
            <li key={path}>
              {last ? <span aria-current="page">{label}</span> : <a href={path}>{label}</a>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
