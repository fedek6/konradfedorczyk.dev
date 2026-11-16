---
title: "How to migrate SQLite3 to MySQL: a step-by-step guide"
description: In a few steps I'll show you how to migrate your SQLite3 database to MySQL
pubDate: 2024-03-15
categories: ["sqlite3", "mysql"]
---

This article outlines a step-by-step process for migrating an SQLite3 database to MySQL. The technique described here has been successfully implemented for production-level data migrations.

> <strong>UPDATE:</strong><br /> It looks like there's a special Python based tool for this task <a href="https://pypi.org/project/sqlite3-to-mysql/" target="_blank">here</a>. If you want to have a control over the process you can still follow my guide.


## Prepare the schema file

```bash
sqlite3 mydatabase.db .schema > schema.sql
```

## Make required schema replacements

* Replace `"` with `` ` ``
* Remove `CREATE TABLE sqlite_sequence(name,seq);`
* Replace `autoincrement` with `AUTO_INCREMENT`
* Replace `varchar` with `varchar(255)` (case sensitive)
* Replace `CLOB` with `TEXT`
* Replace ` COLLATE BINARY` with nothing
* Replace `(256)` with `(255)` (everything bigger than 255 should be 255 or change column type to `TEXT` if required)
* Remove or replace `check in` with `enum`

## Prepare the data file

```bash
sqlite3 db.sqlite .dump | grep -v '^CREATE TABLE' > data.sql
```

## Import schema

```bash
mysql -u oko -p db < ./schema.sql
```

## Import data

```bash
mysql --default-character-set=utf8mb4  -u oko -p db < ./data.sql
```

During this step, you might experience some errors. Fix them one by one.
