import proxy from "http2-proxy";

export default {
  "devOptions:": {
    "out ": "dist"
  },
  env: {
    API_URL: 'api.google.com',
    SNOWPACK_PUBLIC_AUTH0_DOMAIN: 'dev-bq0at7yy.us.auth0.com',
    SNOWPACK_PUBLIC_AUTH0_CLIENT_ID: 'RBnxtz9TQ5w0RpsgaeTqmuJoC9Pr8Cl4',
    SNOWPACK_PUBLIC_AUTH0_AUDIENCE: 'ably-auth'
  },
  "buildOptions:": {
    "clean ": true
  },
  mount: {
    "app/public": "/",
    "app/src": "/dist"
  },
  plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-dotenv"],
  routes: [
    {
      src: "/api/.*",
      dest: (req, res) => {
        return proxy.web(req, res, { hostname: "localhost", port: 7071 });
      }
    },
    {
      match: "routes",
      src: ".*",
      dest: "/index.html"
    }
  ]
};
