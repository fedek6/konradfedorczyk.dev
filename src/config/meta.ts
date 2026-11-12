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
        "Quick, practical tips and advice on coding shortcuts, design hacks, and mini tutorials for swift reference and learning.",
    },
    articles: {
      title: "Articles",
      slug: "articles",
      description:
        "In-depth pieces providing extensive knowledge on web development topics, including tutorials, case studies, and reviews.",
    },
    projects: {
      title: "Projects",
      slug: "projects",
      description:
        "Real-world examples of web development tasks showcasing the application of theories, problem-solving, and project completion.",
    },
  },
};
