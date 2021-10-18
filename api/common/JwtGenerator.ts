import "../startup";
import * as nJwt from "njwt";
import * as secureRandom from "secure-random";

export class JwtGenerator {
  public signingKey: Buffer;

  constructor(signingKey: Buffer) {
    this.signingKey = signingKey;
  }

  public static fromEnvironment() {
    return this.fromBase64Key(process.env.JWT_SIGNING_KEY);
  }

  public static fromBase64Key(key: string) {
    const signingKey = Buffer.from(key, "utf8");
    return new JwtGenerator(signingKey);
  }

  public static withRandomSigningKey() {
    var signingKey = secureRandom(256, { type: "Buffer" });
    return new JwtGenerator(signingKey);
  }

  generate(userId: string, extraClaims?: any) {
    const claims = {
      iss: "http://ffschat.ably.dev/", // The URL of your service
      sub: `users/${userId}`, // The UID of the user in your system
      scope: "self, users",
      userId,
      ...(extraClaims || {}),
    };

    const jwt = nJwt.create(claims, this.signingKey);
    return jwt.compact();
  }

  validate(packedToken: string) {
    try {
      const token = nJwt.verify(packedToken, this.signingKey);
      return { success: true, token };
    } catch (e) {
      console.log(e);
      return { success: false, token: null };
    }
  }
}
