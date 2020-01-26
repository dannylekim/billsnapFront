import { login, register } from "./UserRequests";
import sinonStubPromise from "sinon-stub-promise";
import sinon from "sinon"
import assert from "assert";

const loginInput = {
    "email":"test@email.com",
    "password":"password",
};

const registerInput = {
    "email":"test@email.com",
    "password":"password",
    "firstName":"test",
    "lastName":"test",
}

const goodResponse = {
    "status": 200,
}

const badResponse = {
    "status": 400,
    "timestamp": "a date",
    "message": "error message from server",
    "errors": [
      {
        "field": "string",
        "rejectedValue": {},
        "message": "string",
      }
    ]
}

sinonStubPromise(sinon)

describe("UserRequests", () => {
    describe("login", () => {

        let mockObj;

        beforeEach(() => {
            mockObj = sinon.stub(window, "fetch");
        });

        afterEach(() => {
            mockObj.restore();
        });

        it("Should login successfully", async () => {
            window.fetch.returns(mockApiResponse(goodResponse));
            const res = await register(loginInput);
            
            assert.equal(res.status, goodResponse.status);
        });

        it("Should throw error from unsuccesful post when logging", async () => {
            window.fetch.returns(mockApiResponse(badResponse));

            assert.rejects(async () => await login(loginInput), Error);
        });

    });

    describe("register", () => {

        let mockObj;

        beforeEach(() => {
            mockObj = sinon.stub(window, "fetch");
        });

        afterEach(() => {
            mockObj.restore();
        });

        it("Should register successfully", async () => {
            window.fetch.returns(mockApiResponse(goodResponse));
            const res = await register(registerInput);
            
            assert.equal(res.status, goodResponse.status);
        });

        it("Should throw error from unsuccesful post when registering", async () => {
            window.fetch.returns(mockApiResponse(badResponse));

            assert.rejects(async () => await register(registerInput), Error);
        });

    });
});

function mockApiResponse(response) {
    return new window.Response(JSON.stringify(response), {
       status: response.status,
       headers: { "Content-type": "application/json" },
       body: response.body,
    });
}