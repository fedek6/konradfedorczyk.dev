import { metaConfig } from "../config/meta";

const SITE_URL = import.meta.env.SITE ?? "https://konradfedorczyk.dev";

type Node = Record<string, unknown>;

function websiteNode(): Node {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: metaConfig.pageName,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

function organizationNode(): Node {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: metaConfig.pageName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    founder: { "@id": `${SITE_URL}/#person` },
  };
}

function personNode(): Node {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: metaConfig.author.name,
    jobTitle: metaConfig.author.jobTitle,
    url: `${SITE_URL}/about`,
    sameAs: metaConfig.author.sameAs,
  };
}

const siteNodes = (): Node[] => [
  websiteNode(),
  organizationNode(),
  personNode(),
];

/**
 * Build a single JSON-LD `@graph` document. Custom nodes passed in first;
 * the shared site nodes (WebSite / Organization / Person) are appended
 * automatically and de-duplicated by `@id`, so every `@id` reference
 * resolves within one document.
 */
export function graph(...nodes: Node[]): Node {
  const out: Node[] = [];
  const seen = new Set<string>();
  for (const node of [...nodes, ...siteNodes()]) {
    const id = node["@id"];
    if (typeof id === "string") {
      if (seen.has(id)) continue;
      seen.add(id);
    }
    out.push(node);
  }
  return { "@context": "https://schema.org", "@graph": out };
}

export function articleNode(
  title: string,
  description: string,
  pubDate: Date,
  url: URL | string,
): Node {
  return {
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: pubDate.toISOString(),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

interface Entry {
  data: {
  title: string;
  description: string;
  pubDate: Date;}
}

export function collectionNode(
  title: string,
  description: string,
  url: URL | string,
  entries: Entry[],
): Node {
  return {
    "@type": "CollectionPage",
    name: title,
    description,
    url,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.data.title,
      })),
    },
  };
}

export interface Breadcrumb {
  label: string;
  href: string;
}

export function breadcrumbNode(items: Breadcrumb[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };
}
