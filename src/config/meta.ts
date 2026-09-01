type Category = {
  title: string;
  slug: string;
  description: string;
};

type MetaConfig = {
  pageName: string;
  categories: Record<string, Category>;
};

export const metaConfig: MetaConfig = {
  pageName: "Konrad Fedorczyk dev blog",
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
