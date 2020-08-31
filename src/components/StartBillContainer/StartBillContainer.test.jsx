import React from "react";
import StartBillContainer from "./StartBillContainer";

const userEmail = "string@email.com";

const bill =
    {
        id: 123,
        name: "string 1",
        responsible: {
            firstName: "string",
            middleName: "string",
            lastName: "string",
            id: 0,
            email: "string@email.com",
        },
        status: "OPEN",
        category: "string",
        created: "2020-08-26T00:31:21.674Z",
        balance: 100,
        amountOwed: 50,
    };

describe("StartBillContainer", () => {
    describe("handleStartBill", () => {
        it("should call start bill route", async () => {
            const mockStartBill = jest.fn();
            shallow(
                <StartBillContainer startABill={mockStartBill} bill={bill} userEmail={userEmail}/>
            ).instance().handleStartBill(bill.id);

            expect(mockStartBill).toHaveBeenCalledWith(bill.id);
        });
    });

    describe("snapshots 📸", () => {
        it("StartBillContainer should match snap shot when user is not bill responsible", () => {
            matches(<StartBillContainer bill={bill}/>);
        });

        it("StartBillContainer should match snap shot when user is bill responsible", () => {
            matches(<StartBillContainer bill={bill} userEmail={userEmail}/>);
        });
    });
});
