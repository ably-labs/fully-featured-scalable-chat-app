var nJwt = require('njwt');
var secureRandom = require('secure-random');

var signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes

export default function GenerateJwt(userId: string, username: string, extraClaims: any) {

    var claims = {
        iss: "http://myapp.com/",  // The URL of your service
        sub: "users/user1234",    // The UID of the user in your system
        scope: "self, admins",
        ... extraClaims
    };

    var jwt = nJwt.create(claims,signingKey);

    return jwt;

}