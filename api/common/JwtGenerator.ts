import "../startup";
import * as nJwt from "njwt";
import * as secureRandom from "secure-random";

//var signingKey = secureRandom(256, { type: "Buffer" }); // Create a highly random byte array of 256 bytes
//console.log(signingKey.toString('base64'));

const secret = process.env.JWT_SIGNING_KEY;
const signingKey = Buffer.from(secret, "utf8");

export function generateJwt(userId: string, extraClaims?: any) {
  const claims = {
    iss: "http://ffschat.ably.dev/", // The URL of your service
    sub: `users/${userId}`, // The UID of the user in your system
    scope: "self, users",
    userId,
    ...(extraClaims || {}),
  };

  const jwt = nJwt.create(claims, signingKey);
  return jwt.compact();
}

export function validateJwt(packedToken: string) {
  try {
    const token = nJwt.verify(packedToken, signingKey);
    return { success: true, token };
  } catch (e) {
    console.log(e);
    return { success: false, token: null };
  }
}
