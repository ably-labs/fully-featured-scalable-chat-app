import { mockCall, Mock } from "../test-helpers/FakeCosmosDbMetadataRepository";
jest.doMock("../common/dataaccess/CosmosDbMetadataRepository", () => Mock);
import { default as sut } from './index';

describe("Registration API", () => {

    let context: any;
    beforeEach(() => {
        context = {};
        process.env.JWT_SIGNING_KEY = "secret";
    });

    it("when any mandatory property is missing, fails", async () => {
        const requiredProperties = [
            "username",
            "firstName",
            "lastName",
            "password"
        ];

        for (let prop of requiredProperties) {
            const body = { username: "user", firstName: "first", lastName: "last", password: "password" };
            delete body[prop];

            await sut(context, { body });
            const responseBody = JSON.parse(context.res.body);

            expect(responseBody[prop][0]).toBe(`The ${prop} field is required.`);
        }
    });

    it("user exists, returns 400 error", async () => {
        const body = { username: "user", firstName: "first", lastName: "last", password: "password" };
        existingUser({ id: "id", username: "user", firstName: "first", lastName: "last", password: "password" });

        await sut(context, { body });
        const responseBody = JSON.parse(context.res.body);

        expect(context.res.status).toBe(400);
        expect(responseBody["username"][0]).toBe(`This username is not available.`);
    });

    it("no existing users, returns 200 created", async () => {
        const body = { username: "user", firstName: "first", lastName: "last", password: "password" };
        noExistingUsers();

        await sut(context, { body });
        const responseBody = JSON.parse(context.res.body);

        expect(context.res.status).toBe(200);
        expect(responseBody.reason).toBe("created");
    });
});


const noExistingUsers = () => mockCall('getByProperty', () => Promise.resolve([]));
const existingUser = (user) => mockCall('getByProperty', () => Promise.resolve([user]));