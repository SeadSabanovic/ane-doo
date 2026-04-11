import Link from "next/link";
import type { Category } from "@/sanity/lib/api";

function getShopFilterHref(slug: string) {
  return `/katalog?kategorija=${encodeURIComponent(slug)}`;
}

/**
 * Isti href-ovi kao u dropdownu „Kategorije“. U početnom HTML-u za crawlers (nije drugi <nav> —
 * glavni landmark ostaje NavigationMenu). aria-hidden + tabIndex={-1}: bez duplog čitanja i fokusa.
 */
export function CategoryNavLinksSrOnly({
  categories,
}: {
  categories: Category[];
}) {
  const entries: { key: string; href: string; label: string }[] = [];
  for (const category of categories) {
    const slug = category.slug?.current;
    if (!slug) continue;
    entries.push({
      key: `cat-${category._id}`,
      href: getShopFilterHref(slug),
      label: category.name,
    });
    for (const sub of category.subcategories ?? []) {
      const subSlug = sub.slug?.current;
      if (!subSlug) continue;
      entries.push({
        key: `sub-${sub._id}`,
        href: getShopFilterHref(subSlug),
        label: sub.name,
      });
    }
  }

  if (entries.length === 0) return null;

  return (
    <div className="sr-only" aria-hidden="true">
      <ul>
        {entries.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href} tabIndex={-1}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
