---
title: "How to add Apple ID integration to Auth0?"
description: The process of adding Apple integration to Auth0 might be a bit confusing. This article will guide you through the process.
pubDate: 2023-11-07
categories: ["auth0", "apple"]
---

The process of adding Apple ID integration to Auth0 might be a bit confusing. This article will guide you through the whole process.

## Apple developer

Login to <a href="https://developer.apple.com/" target="_blank">Apple Developer</a> and then go to <a href="https://developer.apple.com/account/">account</a>.

### Create app ID

- Go to <a href="https://developer.apple.com/account/resources/identifiers/list" target="_blank">Identifiers</a>.
- In the upper right corner select `App IDs` and click `+`.
- Select `App IDs` in the list (should be selected by default) and click `Continue`. 
- Select `App` and click `Continue`.
- Write your app description (for e.g. "Auth0 dev login") and fill in the `Bundle ID` field. It should be in the format of `com.yourdomain.yourappname`.
- In the list of capabilities select `Sign in with Apple` and click `Continue`.

### Create service ID

- In the upper right corner select `Services IDs` and click `+`.
- Select `Services IDs` in the list (should be selected by default) and click `Continue`.
- Type your description (for e.g. "Auth0 dev login") and fill in the `Identifier` field. It should be in the format of `com.yourdomain.yourappname.client`.
- Click `Continue`.
- After successful creation of the service ID click service name on the list and enable `Sign in with Apple` capability.
- Now press `Configure` button and select your primary app ID from the list. Carefully configure domains and subdomains (it must be configured like in the Auth0 app). 
- Finish configuration by clicking `Save`.

> If you want to use `Test connection` from Auth0 dashboard you must also add `[your tenant].[region].auth0.com/login/callback` to return URLs.



### Create key

- Go to keys list and click `+`.
- Enter your key name (for eg. "Auth0 dev login") and select `Sign in with Apple` capability.
- Click edit button and select your primary app ID from the list.
- Click `continue` and `register`.
- Download your key and copy its id. You will need it later.

## Auth0

- Login to Auth0 account. Enable Apple connection in `Connections` tab.
- In `Client ID` field enter your service ID (the reversed domain name from second Apple step `com.yourdomain.yourappname.client`). 
- In `Client Secret Signing Key` paste downloaded key.
- In `Apple Team ID` field enter your team ID (you can find it in your Apple Developer account, right top corner, random chars like __*****FXD__).
- In `Key ID` field paste copied key id.