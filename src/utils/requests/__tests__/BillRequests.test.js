import {getBill} from "../BillRequests"; 

const unAuthorizedResponse =  { 
                    status: 401,
                    statusText: "Unauthorized",
                    body: {
                        status: "UNAUTHORIZED",
                        message: "Access is unauthorized!"
                    }
};

describe("BillRequests", () => {
    describe("getBill", () => {

        it("Should return an json object", async () => {
            const mockRes = mockApiResponse(unAuthorizedResponse); 
            const res = await getBill("aToken");
            
            expect(res.headers.map["content-type"].split(";")[0]).toEqual(mockRes.headers.map["content-type"]); 
        });

        it("Should throw an unauthorized error", async () => {
            const mockRes = mockApiResponse(unAuthorizedResponse); 
            const res = await getBill("invalidToken");
            const body = await res.json();
            expect(res.status).toEqual(mockRes.status);
            expect(res.statusText).toEqual(mockRes.statusText);
            expect(body.message).toEqual(mockRes._bodyInit.body.message);
            expect(body.status).toEqual(mockRes._bodyInit.body.status);
        });
    });
});

const mockApiResponse = (response) => new window.Response(response, {
       status: response.status,
       statusText:  response.statusText,
       headers: { "Content-type": "application/json" },
       body: response.body,
    }
);