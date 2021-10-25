import proxy from "http2-proxy";

export default {
  "devOptions:": {
    "out ": "dist"
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
      },
    },
    {
      match: "routes",
      src: ".*",
      dest: "/index.html"
    },
  ]
};
