import {login, register} from "../UserRequests";
import sinonStubPromise from "sinon-stub-promise";
import sinon from "sinon";
import assert from "assert";

const loginInput = {
    "email":"test@email.com",
    "password":"password",
};

const blankLoginInput = {
    "email":"",
    "password":"",
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

const blankResponse = {
    "status": 400,
    "timestamp": "time",
    "message": "Invalid Login Inputs. Please fix the following errors",
    "errors": [
        {
            "field": "password",
            "rejectedValue": "",
            "message": "must not be blank"
        },
        {
            "field": "email",
            "rejectedValue": "",
            "message": "must not be blank"
        }
    ]
};

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
            const res = await login(loginInput);
            
            assert.equal(res.status, goodResponse.status);
        });

        it("Should throw error from unsuccesful post when logging", async () => {
            window.fetch.returns(mockApiResponse(badResponse));

            assert.rejects(async () => await login(loginInput), Error);
        });

        it("Should throw error blank inputs, async", async () => {
            window.fetch.returns(mockApiResponse(blankResponse));
            const res = await login(blankLoginInput);
            
            assert.equal(res.status, blankResponse.status);
            assert.equal(res.errors[0].message, "must not be blank");
            assert.equal(res.errors[1].message, "must not be blank");
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