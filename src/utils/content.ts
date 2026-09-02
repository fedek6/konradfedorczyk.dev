export const createCollectionHeadMapper =
  (itemsCount: number) =>
  <T extends { data: { pubDate: Date } }>(content: T[]): T[] => {
    return [...content]
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, itemsCount);
  };
