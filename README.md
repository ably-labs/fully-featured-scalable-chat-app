# FULLY FEATURED SCALABLE CHAT APP

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://github.com/ably-labs/fully-featured-scalable-chat-app)

The goal is to build a chat app with a complete feature set using [Ably Realtime](https://ably.com/) in combination with other services to store, manipulate and share data.

If you have any questions, ideas or want to contribute, please raise an issue or [reach out to us](devrel@ably.com).

## Things you will need to make this run locally!

1. Node
2. [The Azure Functions Runtime from NPM](https://www.npmjs.com/package/azure-functions-core-tools)
3. an `.env` file in ./api

```[text]
COSMOS_ENDPOINT=https://ffschatmetadata.documents.azure.com
COSMOS_KEY=ASK FOR THIS OR MAKE YOUR OWN
COSMOS_DATABASE_ID=metadata
JWT_SIGNING_KEY=ASK FOR THIS OR MAKE YOUR OWN
ABLY_API_KEY=YOURKEY:HERE
```

4. `npm run start` in the root.