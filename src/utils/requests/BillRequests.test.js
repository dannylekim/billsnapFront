import { getBill } from "./BillRequests";
import sinonStubPromise from "sinon-stub-promise";
import sinon from "sinon"
import assert from "assert";

const invalidToken = "invalid";
sinonStubPromise(sinon)

describe("BillRequests", () => {
    describe("getBill", () => {

        let mockObj;

        beforeEach(() => {
            mockObj = sinon.stub(window, "fetch");
        });

        afterEach(() => {
            mockObj.restore();
        });

        it("Should throw an unauthorized error", () => {
            assert.rejects(async () => await getBill(invalidToken), Error);
        });
    });
});
