import React from "react";
import ReactDOM from "react-dom";
import {CreateBillForm} from "../CreateBillForm";
import { DEFAULT_ERRORS, DEFAULT_ALERT_MESSAGE} from "../CreateBillFormContainer";

const addBillForm = {
    name: "",
    category: "",
    company: "",
    items: [{name: "cheese", cost: 10}],
    accountsList: ["email"],
    tipAmount: 0,
    tipPercent: 0,
    taxes: [{name: "tps", percentage: 11}]
}

describe("CreateBillForm", () => {

    describe("render", () => {
        it("renders without crashing", () => {
            const div = document.createElement("div");
            ReactDOM.render(<CreateBillForm
                handleSubmitClick={jest.fn}
                handleAddClick={jest.fn}
                handleRemoveClick={jest.fn}
                onFormChange={jest.fn}
                hasErrors={DEFAULT_ERRORS}
                errorMessage={""}
                alertMessage={DEFAULT_ALERT_MESSAGE}
                addBillForm={addBillForm}
                totalBalance={0}
                tipFormat={true}
                itemBuffer={{name: "", cost: 0}}
                taxBuffer={{name: "", percentage: 0}}
                accountBuffer={""}
                inputList={[]}/>, div);
        });
    });

    describe("snapshots 📸", () => {
        it("CreateBillFormContainer should match snap shot", () => {
            matches(<CreateBillForm
                handleSubmitClick={jest.fn}
                handleAddClick={jest.fn}
                handleRemoveClick={jest.fn}
                onFormChange={jest.fn}
                hasErrors={DEFAULT_ERRORS}
                errorMessage={""}
                alertMessage={DEFAULT_ALERT_MESSAGE}
                addBillForm={addBillForm}
                totalBalance={0}
                tipFormat={true}
                itemBuffer={{name: "", cost: 0}}
                taxBuffer={{name: "", percentage: 0}}
                accountBuffer={""}
                inputList={[]}/>
            );
        });
    });

});
