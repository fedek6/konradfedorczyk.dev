---
title: "Logging raw SQL queries in Prisma ORM"
description: This short snippet will allow you to log all raw SQL queries in Prisma ORM.
pubDate: 2023-07-13
categories: ["prisma", "orm"]
---

Prisma is a great tool for working with databases. It allows you to write queries in a type-safe way and it's easy to use. However, sometimes you need to see the raw SQL queries that are being executed. This is especially useful when you're debugging a problem with your database.

Put this code where you initialize Prisma:

```ts
const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

function replacePlaceholders(input: string, values: any[]) {
  return input.replace(/\$(\d+)/g, (match, placeholderIndex) => {
    const index = parseInt(placeholderIndex) - 1;
    if (values[index] !== undefined) {
      // Add single quotes around string values
      return typeof values[index] === "string"
        ? `'${values[index]}'`
        : values[index];
    }
    return match;
  });
}

function LogQueryHandler(e: Prisma.QueryEvent) {
  console.log("🧩 Params: " + e.params);
  console.log(
    "📜 Nice query:",
    replacePlaceholders(e.query, JSON.parse(e.params))
  );
  console.log("⏱️ Duration: " + e.duration + "ms");
}

// @ts-ignore
prisma.$on("query", LogQueryHandler);
```