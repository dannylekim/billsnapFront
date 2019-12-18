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

        it("Should login successfully", async () => {
            sinon.stub(window, "fetch")
            window.fetch.returns(mockApiResponse(goodLoginResponse));
            let res = await register(loginInput);
            
            assert.equal(res.status, 200);
        });

        it("Should return error from unsuccesful post", async () => {
            sinon.stub(window, "fetch")
            window.fetch.returns(mockApiResponse(badLoginResponse));

            let res = await register(loginInput);
            
            assert.equal(res.status, 400);
        });

    });
});

function mockApiResponse(status, body) {
    return new window.Response(JSON.stringify(body), {
       status: status,
       headers: { "Content-type": "application/json" }
    });
}