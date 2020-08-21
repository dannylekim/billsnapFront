import React from "react";
import CreateBillBackground from "./CreateBillBackground.jsx";

describe("Background", () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("CreateBillBackground should match snapshot", () => {
                matches(<CreateBillBackground/>);
            });
        });
    });
});
