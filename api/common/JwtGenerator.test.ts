import { JwtGenerator } from './JwtGenerator';
import * as secureRandom from "secure-random";

describe("Generator", () => {

    let sut: JwtGenerator;
    beforeEach(() => {
        const signingKey = secureRandom(256, { type: "Buffer" });
        sut = new JwtGenerator(signingKey);
        sut = JwtGenerator.fromBase64Key("");
    });

    it("Can validate a token it generated", () => {
        const result = sut.generate("1");

        let { success, token } = sut.validate(result);

        expect(success).toBe(true);
        expect(token).not.toBeNull();
        expect(token.body["userId"]).toBe("1");
    });
})