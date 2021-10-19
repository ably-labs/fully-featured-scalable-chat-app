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


# Design

The chat app is made up of the following:

- A Web Application that is hosted in Azure Static Web Apps (React)
- A "BFF" API built to run in Azure Functions (Node.js)
- A CosmosDB database to store metadata (user accounts, chat channel metadata)
- An [Ably Realtime](https://ably.com/) account to send and receive chat messages
- An API to receive events from Ably Reactor
- A Storage bucket to store chat archive data.

## The React Application

The React application is an unremarkable, default, single page application.
It uses a mixture of `react-router-dom` and a custom `AppProvider` to provide the security context for the application.

In the app, we make use of `ably-labs/react-hooks` to interact with **Ably Channels**, and the application is composed of modern *React Functional Components*.

We're using *snowpack* as our development server, which will transparently build our ES6 code for production.

## The BFF API

The BFF (Backend-for-Frontend) is an *application specific** API that contains all the serverside logic for our chat app.
Because we're hosting this on **Azure Static Web Apps**, we can use the `azure-functions-core-tools` run our API server.

In addition to this, the **Azure Static Web Apps** runtime will *auto-host* our APIs for us - so we don't need to worry about configuring hosting.
The BFF is executed on *serverless* infrastrucutre, and Azure SWA will auto-scale it to meet demand.

Adding new API endpoints is as simple as adding a new directory to the `api` folder.

First, create a directory for the new API - for example, `api/messages`.
Then, create a `function.json` file in the new directory.

```json
{
  "bindings": [
    {
      "route": "path/to/your/api",
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [ "get", "post" ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ],
  "scriptFile": "../dist/messages/index.js"
}
```

Next, you'll need to create your `TypeScript` API:

```typescript
import "../startup";
import { Context, HttpRequest } from "@azure/functions";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    context.res = { status: 200, body: "I'm an API" };
};
```

This API will now be mounted at `http://localhost:8080/api/messages`.

And that's it! The tooling and SDK will auto-detect your code as you change it and rebuild your functions for you.

# Authentication and Security

Out of the box we're using `JWT token` authentication between our Web application and the BFF.
We store user credentials and salted, one way hashed passwords (`bcrypt`) in the CosmosDB database.

When a user authenticates, we `sign` a JWT token with the user's id and username that is then sent to the BFF in subsequent requests for authenticated data.
This means, with a small amount of code in our APIs, we can ensure that the user is who they claim to be, and that they are entitled to access API data.

We will expand this model to include a collection of `roles` for claims-based authentication to resources in the application.

## Creating an `Authenticated User Only` API call

We can create a `JWT token` authenticated API call by using the following convenience methods in our `BFF API`.

```typescript
import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    await authorized(context, req, () => {

        // This code will only run if the user is authenticated

        context.res = { status: 200, body: JSON.stringify("I am validated and authenticated") };
    });
};
```

If you want to access the authenticated users information as part of one of these API calls, you can do the following:


```typescript
import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";

export default async function (context: Context, req: HttpRequest): Promise<void> {
    await authorized(context, req, ({ user }) => {

        // user is the userDetails object retrieved from CosmosDb

        context.res = { status: 200, body: JSON.stringify("I am validated and authenticated") };
    }, true);
};
```