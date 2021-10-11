const Auth0ServerCredentials = require("./serverConfig");
var express = require("express");
var app = express();
var jwt = require("express-jwt");

var port = process.env.PORT || 5000;

var jwtCheck = jwt({
  secret: Auth0ServerCredentials.secret,
  audience: Auth0ServerCredentials.audience,
  issuer: Auth0ServerCredentials.issuer,
  algorithms: Auth0ServerCredentials.alogorithms,
});

console.log(Auth0ServerCredentials);

// enforce on all endpoints
app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(port);

console.log("Running on port ", port);
