type Category = {
  title: string;
  slug: string;
  description: string;
};

type Author = {
  name: string;
  email: string;
  jobTitle: string;
  sameAs: string[];
};

type MetaConfig = {
  pageName: string;
  author: Author;
  categories: Record<string, Category>;
};

export const metaConfig: MetaConfig = {
  pageName: "Konrad Fedorczyk",
  author: {
    name: "Konrad Fedorczyk",
    email: "contact@konradfedorczyk.dev",
    jobTitle: "Software developer",
    sameAs: [
      "https://github.com/fedek6",
      "https://www.linkedin.com/in/konrad-fedorczyk-rh/",
    ],
  },
  categories: {
    notes: {
      title: "Notes",
      slug: "notes",
      description:
        "A collection of entries designed for rapid reference, featuring essential terminal commands and brief code snippets.",
    },
    articles: {
      title: "Articles",
      slug: "articles",
      description:
        "A place for the long reads. Unpacking IT topics through tutorials, case studies, and a few deep dives into the tools I'm using lately.",
    },
    projects: {
      title: "Projects",
      slug: "projects",
      description:
        "Think of these as living dev blogs—I'll be posting regular updates here to show how these projects grow and change over time.",
    },
  },
};
