import { login, register } from "./UserRequests";
import sinonStubPromise from "sinon-stub-promise";
import sinon from "sinon"
import assert from "assert";

// import "whatwg-fetch"
const loginInput = {
    "email":"test@email.com",
    "password":"password",
};

const goodLoginResponse = {
    "status": 200,
}

const badLoginResponse = {
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

fdescribe("UserRequests", () => {
    describe("login", () => {

        let mockObj;

        beforeEach(() => {
            mockObj = sinon.stub(window, "fetch");
        });

        afterEach(() => {
            mockObj.restore();
        });

        it("Should login successfully", async () => {
            window.fetch.returns(mockApiResponse(goodLoginResponse));
            let res = await register(loginInput);
            
            assert.equal(res.status, 200);
        });

        it("Should return error from unsuccesful post", async () => {
            window.fetch.returns(mockApiResponse(badLoginResponse));

            let res = await login(loginInput);
            
            assert.equal(res instanceof Error, true);
            assert.equal(res.message, badLoginResponse.message);
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