const SERVER_CREDENTIALS = require("./serverConfig");
const express = require("express");
const app = express();
const jwt = require("express-jwt");
const cors = require("cors");
const Ably = require("ably");

const port = process.env.PORT || 5000;

const myJwt = {
  secret: SERVER_CREDENTIALS.auth0.secret,
  audience: SERVER_CREDENTIALS.auth0.audience,
  issuer: SERVER_CREDENTIALS.auth0.issuer,
  algorithms: SERVER_CREDENTIALS.auth0.algorithms,
};

const jwtCheck = jwt(myJwt);

const ablyRestClient = new Ably.Rest({
  key: SERVER_CREDENTIALS.ably.apiKey,
});

app.use(cors());
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  const tokenParams = {};
  ablyRestClient.auth.createTokenRequest(tokenParams, function (err, tokenRequest) {
    if (err) {
      res.status(500).send("Error requesting token: " + JSON.stringify(err));
    } else {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(tokenRequest));
    }
  });
});

app.listen(port);

console.log("Running on port ", port);
