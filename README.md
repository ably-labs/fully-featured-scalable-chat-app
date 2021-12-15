# FULLY FEATURED SCALABLE CHAT APP

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://github.com/ably-labs/fully-featured-scalable-chat-app)

The goal is to build a chat app with a complete feature set using [Ably Realtime](https://ably.com/) in combination with other services to store, manipulate and share data.

If you have any questions, ideas or want to contribute, please raise an issue or [reach out to us](mailto:devrel@ably.com).

## Things you will need to make this run locally!

1. [Node 16 installed](https://nodejs.org/en/download/)
2. [The Azure Functions Runtime from NPM](https://www.npmjs.com/package/azure-functions-core-tools). To install this run:

    `npm install -g azure-functions-core-tools@4`

3. an `.env` file in `./api`: (we have create a template for you, open
   [./api/.env-sample](./api/.env-sample)  replace the `{token-values}` and
   save the file as `.env`. _You should NEVER commit `.env` files._

```text
COSMOS_ENDPOINT={https://yourcosomsdb.documents.azure.com}
COSMOS_KEY={ask-for-this-or-make-your-own}
COSMOS_DATABASE_ID=metadata

ABLY_API_KEY={ABLY:APIKEY.SECRET}
JWT_SIGNING_KEY={ask-for-this-or-make-your-own}

AUTH0_DOMAIN={yourdomain.auth0.com}
AUTH0_CLIENTID={yourclientid}
AUTH0_REDIRECT_URI=http://localhost:8080/auth0-landing

AZURE_STORAGE_CONNECTION_STRING={your-string-here}
AZURE_STORAGE_CONTAINER_NAME={container-name-here}
```

4. In the root folder
```
npm run init
npm run start
```

5. Open a browser to [http://localhost:8080](http://localhost:8080)

# Design

The chat app is made up of the following:

- A Web Application that is hosted in Azure Static Web Apps (React)
- A "BFF" API built to run in Azure Functions (Node.js)
- A CosmosDB database to store metadata (user accounts, chat channel metadata)
- An [Ably Realtime](https://ably.com/) account to send and receive chat messages
- An `Archive API` to receive events from Ably Reactor and maintain a chat history
- A Storage bucket to store `Chat Archive`.

## The React Application

The React application is a default, single page application.
It uses a mixture of `react-router-dom` and a custom `AppProvider` to provide the security context for the application.

The app uses [@ably-labs/react-hooks](https://www.npmjs.com/package/@ably-labs/react-hooks) to interact with **Ably Channels**, and the application is composed of modern _React Functional Components_.

_snowpack_ is the development server, which will transparently build ES6 code for production.

## The BFF (Backend-for-Frontend) API

The BFF is an _application specific_ API that contains all of the serverside logic for the chat app.
Because it is hosted on **Azure Static Web Apps**, we can use the `azure-functions-core-tools` run the API server.

In addition to this, the **Azure Static Web Apps** runtime will _auto-host_ the APIs for us - so we don't need to worry about configuring hosting.
The BFF is executed on serverless infrastrucutre, and Azure SWA will auto-scale it to meet demand.

To add new API endpoints, you will need to add a new directory to the `api` folder.

First, create a directory for the new API - for example, `api/messages`.
Then, create a `function.json` file in the new directory.

```json
{
  "bindings": [
    {
      "route": "messages",
      "authLevel": "function",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get", "post"]
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
}
```

This API will now be mounted at `http://localhost:8080/api/messages`.

And that's it! The tooling and SDK will auto-detect your code as you change it and rebuild your functions for you.

# Authentication and Security

The app uses JWT token authentication between the Web application and the BFF.
We store user credentials and salted, one way hashed passwords (done with bcrypt) in the CosmosDB database.

When a user authenticates, the app signs a JWT token with the user's id and username that is then sent to the BFF in subsequent requests for authenticated data.
This means, with a small amount of code in the APIs, we can ensure that the user is who they claim to be, and that they are entitled to access API data.

We can expand this model to include a collection of `roles` for claims-based authentication to resources in the application.

## Creating an `Authenticated User Only` API call

We can create a `JWT token` authenticated API call by using the following convenience methods in the `BFF API`.

```typescript
import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(context, req, () => {
    // This code will only run if the user is authenticated

    context.res = {
      status: 200,
      body: JSON.stringify("I am validated and authenticated")
    };
  });
}
```

If you want to access the authenticated users information as part of one of these API calls, you can do the following:

```typescript
import "../startup";
import { Context, HttpRequest } from "@azure/functions";
import { authorized, ApiRequestContext } from "../common/ApiRequestContext";

export default async function (context: Context, req: HttpRequest): Promise<void> {
  await authorized(
    context,
    req,
    ({ user }: ApiRequestContext) => {
      // user is the userDetails object retrieved from CosmosDb

      context.res = {
        status: 200,
        body: JSON.stringify("I am validated and authenticated")
      };
    },
    true
  ); // <- true to include the userDetails object in the ApiRequestContext
}
```

## Accessing user data in the React application

The in-app authentication is implemented in `AppProviders.jsx`.

It provides a React Hook that will return the `userDetails` object if the user is authenticated (along with ensuring that the user is authenticated at all).
If a given user is not authenticated, they will be redirected to the login page in all cases.

Because the `AppProvider` takes care of authentication, you'll need to use hooks to access user data, and to make authenticated API calls in any components.

Here is an example of accessing the `userDetails` object of the currently authenticated user.

```jsx
import { useAuth } from "../../AppProviders";

const MyComponent = () => {
  const { user } = useAuth();

  return <div>{user.username}</div>;
};

export default MyComponent;
```

You can also access an instance of the `BffApiClient` class, which will allow you to make authenticated API calls and already contains the currently logged in users `JWT token`.

```jsx
import { useAuth } from "../../AppProviders";

const MyComponent = () => {
  const { api } = useAuth();
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await api.listChannels();
      setChannels(response.channels);
    };
    fetchChannels();
  }, []);

  return <div>... bind channel data here</div>;
};

export default MyComponent;
```

The above example uses the `useEffect` hook to fetch the channels when the component mounts - the API request is made using the `api` instance, provided by the `useAuth` hook.

This is the only way you should make `API` calls to the BFF from a component, as it'll ensure the `JWT` token is valid and present.

If you're adding new `BFF APIs` to the application, you'll need to implement a new function in `/app/src/sdk/BffApiClient.js` to make it available to your components.

These `BffApiClient` calls are simple, and look like this:

```js
async listChannels() {
    const result = await this.get("/api/channels");
    return await result.json();
}
```

Some utility code in the client will make sure the correct `JWT token` is present when the request is made.

# The CosmosDb datastore

We're using CosmosDb to store our application metadata because it is a scalable, highly available, managed database that we don't have to administer ourselves.
It can run in a pre-provisioned or serverless mode, helping keep costs low when the application isn't in use (at the cost of some performance).

We use a single CosmosDb database to store all of the metadata, and inside, we've created a collection for each type of Entity we're storing.

For example: The `User` collection, stores our User records - and can be queried using SQL-like syntax. CosmosDb makes this easy by automatically indexing json documents.

Each of the stored metadata entities have an `id` and a `type` field, and we're using a `generic repository` class (`/api/common/dataaccess/CosmosDbMetadataRepository`) to load and save these entities.

For local development, you can either use the cloud hosted version of Cosmos, or use one of the available `docker container images` to run a local copy of the database.

# Ably for Chat

We're using `Ably channels` to store our chat messages and to push events to our React application.
Each connected user will receive messages for channels that they are actively viewing in real-time, and we're using `Channel rewind` to populate the most recently sent messages.

### Future work

Messages may be `corrected` asyncronously after they have been received - for instance, to apply profanity filtering, or to correct spelling errors.
These correction messages will be part of the stream, and applied retroactively in the react application. (Further development on this in later epics)

This design allows us to stand up extra APIs that consume these events, and publish their own elaborations on the channels for clients to respond to.

# Suggested Chat Archiving

## The Chat Archive API

Because Ably events will vanish over time, we're going to store copies of inbound events on each channel into our `Chat Archive` via the `Archive API`.

The `Archive API` will receieve reactor messages for all of our channels, and append them to channel-specific `Azure Storage Blobs`.
The API will append to a single file until it reaches a size threshold (~500kb) and then create a new file for subsequent messages.

The `Archive API` will maintain a record of the currently active archive file in the `Metadata database` for each channel.

The `Archive API` will be able to update a search index as messages are received and archived to later expose them in search.

# Testing

Tests are written in `jest` with `ts-jest` used to execute the APIs `TypeScript` tests.




# TODO
- M1 setup problems ask @jo what the diff is this
- Write the respective how-to guides to .env bit and pieces
