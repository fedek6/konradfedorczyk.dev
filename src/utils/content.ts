export const createCollectionHeadMapper =
  (itemsCount: number) =>
  <T extends { data: { pubDate: Date } }>(content: T[]): T[] => {
    return [...content]
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .slice(0, itemsCount);
  };

export const groupByYear = <T extends { data: { pubDate: Date } }>(
  content: T[],
) =>
  Object.entries(
    Object.groupBy(content, (item) => item.data.pubDate.getFullYear()),
  ).sort(([a], [b]) => +b - +a);
