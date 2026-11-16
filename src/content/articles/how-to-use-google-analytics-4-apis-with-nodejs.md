---
title: "How to Use Google Analytics 4 APIs with Node.js?"
description: Feeling overwhelmed by Google Analytics 4 APIs in Node.js? This guide demystifies the process, helping you navigate and leverage these powerful tools more effectively.
pubDate: 2023-05-24
categories: ["GA4", "Node.js", "APIs", "web analytics", "data analysis"]
---

Feeling overwhelmed by Google Analytics 4 APIs in Node.js? This guide demystifies the process, helping you navigate and leverage these powerful tools more effectively.


## Useful links

These are services that I'll use through the tutorial:

- [Google Analytics Data: Node.js Client](https://googleapis.dev/nodejs/analytics-data/latest/index.html)
- [Google Cloud Console](https://console.cloud.google.com/)
- [GA4 Query Explorer](https://ga-dev-tools.google/ga4/query-explorer/)
- [API Dimensions & Metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)

## Create a Google Cloud project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
2. Got to _APIs & Services_.
3. Add the _Google Analytics Data API_ to your project.
4. Go to _Credentials_ and create a new _Service Account_.
5. Go to keys and create a new key. Select _JSON_ as the key type.
6. Browse will download the JSON file with the credentials. Save it in a safe place.

## Add access to your Google Analytics 4 property

Go to your GA4 property and add the service account email as a user. You can find the email in the JSON file you downloaded in the previous step (the property is called `client_email`).

## Create a Node.js project

Create a new Node.js project and install the Google Analytics Data client:

```bash
yarn init -y
yarn add @google-analytics/data
yarn add dotenv -D
```

### Update your `package.json`:

```json
  "scripts": {
    "start": "node -r dotenv/config demo.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### Create a `.env` file

```env
GOOGLE_APPLICATION_CREDENTIALS="./credentials.json"
PROPERTY_ID=[numeric property id]
```

Place your credentials file in the root of the project.

**Attention!** The setting `GOOGLE_APPLICATION_CREDENTIALS` is used by the Google Cloud client library to find your credentials.

## Create a demo script

Create a `demo.js` file in the root of your project:

```js
// Imports the Google Analytics Data API client library.
import { BetaAnalyticsDataClient } from "@google-analytics/data";

/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
const propertyId = process.env.PROPERTY_ID;

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: "7daysAgo",
        endDate: "today",
      },
    ],
    dimensions: [
      {
        name: "pagePath",
      },
      {
        name: "pageTitle",
      },
    ],
    metrics: [
      {
        name: "screenPageViews",
      },
    ],
    metricFilter: {
      filter: {
        fieldName: "screenPageViews",
        numericFilter: {
          operation: "GREATER_THAN",
          value: {
            int64Value: "0",
          },
        },
      },
    },
    orderBys: [
      {
        metric: {
          metricName: "screenPageViews",
        },
        desc: false,
      },
    ],
    offset: 0,
    limit: 100,
  });

  console.log("Report result:");

  response.rows.forEach((row) => {
    console.log(row);
  });
}

runReport();
```

## Test

Run the script:

```bash
yarn start
```

You should see the results of the query in the console (or error if something is wrong).

## Conclusion

In this guide I showed you how to use Google Analytics 4 APIs with Node.js. I hope you found it useful!

Check useful links in the first section of this article for more information about the dimensions and metrics you can use.