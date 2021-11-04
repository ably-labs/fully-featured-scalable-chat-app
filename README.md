# FULLY FEATURED SCALABLE CHAT APP

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://github.com/ably-labs/fully-featured-scalable-chat-app)

The goal is to build a chat app with a complete feature set using [Ably Realtime](https://ably.com/) in combination with other services to store, manipulate and share data.

If you have any questions, ideas or want to contribute, please raise an issue or [reach out to us](devrel@ably.com).

## How to make this work locally

### Step 1 - Pre-requisites

1. Install [Node JavaScript runtime](https://nodejs.org/en/) on your system
2. Install [Azure Functions Runtime from NPM](https://www.npmjs.com/package/azure-functions-core-tools) on your system
3. Create an [Ably](https://ably.com/) account
4. Create an [Auth0](https://auth0.com/) account

### Step 2 - Add the following environment variables

1. a `.env` file in the root

You can find your auth0 credentials on your [account dashboard](https://auth0.com/docs/configure/applications/application-settings)

```[text]
SNOWPACK_PUBLIC_AUTH0_DOMAIN=<YOUR AUTH0 DOMAIN>
SNOWPACK_PUBLIC_AUTH0_CLIENT_ID=<YOUR AUTH0 CLIENTID>
SNOWPACK_PUBLIC_AUTH0_AUDIENCE=<YOUR AUTH0 AUDIENCE>
```

2. a `.env` file in ./api

```[text]
JWT_SIGNING_KEY=<YOUR_JWT_KEY_FROM_AUTH0>
ABLY_API_KEY=<YOUR_ABLY_API_KEY>
```

### Step 3 - Run the app

Run the following command from the root

```sh
npm run start
```

## Design

The chat app is made up of the following:

- User authentication is enabled using a third party API, [Auth0](https://auth0.com/). The library is instanced via [@auth0/auth0-react](@https://www.npmjs.com/package/@auth0/auth0-react) NPM package
- The SPA (Single Page Application) is written in React and in Azure Static Web Apps
- The "BFF" API is written in Node.js and built to run in Azure Functions
- An [Ably Realtime](https://ably.com/documentation/realtime/usage) instance is used to send and receive chat messages used. The library is instanced using the [@ably-labs/react-hooks](https://www.npmjs.com/package/@ably-labs/react-hooks) NPM package.

### The React Application

The React application is a default single page application.
It uses a mixture of `react-router-dom` and an auth context exposed by Auth0 to ultimately provide the security context for the application.

The app uses [@ably-labs/react-hooks](https://www.npmjs.com/package/@ably-labs/react-hooks) to interact with **Ably Channels**, and the application is composed of modern **React Functional Components**.

[Snowpack](https://www.snowpack.dev/) is the development server, which will transparently build ES6 code for production.

### The BFF (Backend-for-Frontend) API

The BFF is an **application specific** API that contains all of the serverside logic for the chat app.
Because it is hosted on **Azure Static Web Apps**, we can use the `azure-functions-core-tools` run the API server.

In addition to this, the **Azure Static Web Apps** runtime will **auto-host** the APIs for us - so we don't need to worry about configuring hosting.

The BFF is executed on serverless infrastructure, and Azure SWA will auto-scale it to meet demand.

#### Extending the API

To add new API endpoints, you will need to add a new directory to the `api` folder.

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

## Authentication and Security

The app uses a third-party service, [Auth0](https://auth0.com/), to enable authentication. Auth0 exposes a custom hook `useAuth0()` to login, logout or retrieve various user details, including a JWT.

When a user authenticates, the JWT signed by Auth0 is then sent to the BFF in subsequent requests for authenticated data. This means, with a small amount of code in the APIs, we can ensure that the user is who they claim to be, and that they are entitled to access API data.

As part of the upcoming work, we'll expand this model to include a collection of roles for claims-based authentication to resources in the application.

### Accessing user data in the React application

The `user` object from the `useAuth0` hook provided by Auth0 can be directly used to retrieve details of the authenticated user.

```jsx
const { user } = useAuth0();
```

### Invoking the Azure functions from the React application

The `BFFApiClient` in the `sdk` folder allows the React application to invoke any Azure function, provided the app has the right authorization.

As part of future work, we'll create a shared context to access an instance of the `BffApiClient` class from various components. For now, it is instantiated in any component that needs to access it.

```jsx
import { BffApiClient } from "../../sdk/BffApiClient";
import { useAuth0 } from "@auth0/auth0-react";

export default () => {
  const params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const fetchChannels = async () => {
      const auth0Token = await getAccessTokenSilently();
      const bffClient = new BffApiClient(auth0Token);
      const response = await bffClient.listChannels();
      setChannels(response.channels);
    };
    fetchChannels();
  }, []);

  return <div>... bind channel data here</div>;
};
```

The above example uses the `useEffect` hook to fetch the channels when the component mounts. The API request is made on a newly created instance of the `BffApiClient` and passing it the token returned by the `useAuth0` hook.

These `BffApiClient` calls are simple, and look like this:

```js
async listChannels() {
    const result = await this.get("/api/channels");
    return await result.json();
}
```

Some utility code in the client will make sure the correct `JWT token` is present when the request is made.

## Ably for Chat

We're using `Ably channels` to store our chat messages and to push events to our React application.
Each connected user will receive messages for channels that they are actively viewing in real-time, and we're using `Channel rewind` to populate the most recently sent messages.

#### Future work

Messages may be `corrected` asyncronously after they have been received - for instance, to apply profanity filtering, or to correct spelling errors.
These correction messages will be part of the stream, and applied retroactively in the react application. (Further development on this in later epics)

This design allows us to stand up extra APIs that consume these events, and publish their own elaborations on the channels for clients to respond to.

## Suggested Chat Archiving

### The Chat Archive API

Because Ably events will vanish over time, we're going to store copies of inbound events on each channel into our `Chat Archive` via the `Archive API`.

The `Archive API` will receive reactor messages for all of our channels, and append them to channel-specific `Azure Storage Blobs`.
The API will append to a single file until it reaches a size threshold (~500kb) and then create a new file for subsequent messages.

The `Archive API` will maintain a record of the currently active archive file in the `Metadata database` for each channel.

The `Archive API` will be able to update a search index as messages are received and archived to later expose them in search.

## Testing

Tests are written in `jest` with `ts-jest` used to execute the APIs `TypeScript` tests.
