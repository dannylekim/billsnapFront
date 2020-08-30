import React from "react";
import ReactDOM from "react-dom";
import {CreateBillFormContainer} from "../CreateBillFormContainer.jsx";
import {shallow} from "enzyme";

// describe("CreateBillFormContainer", () => {
//     describe("render", () => {
//       it("renders without crashing", () => {
//         const div = document.createElement("div");
//         ReactDOM.render(<CreateBillFormContainer />, div);
//       });
//     });
// });
  
describe("CreateBillFormContainer", () => {
    let wrapper;
    let mockOnFormChange,
        mockHandleSubmitClick,
        mockHandleErrorResponse,
        mockHandleAddClick,
        mockHandleRemoveClick,
        mockHandleCorrectTipFormat,
        mockCalculateExtraFees,
        mockToggleModal,
        mockCreateNewBill;
    

    beforeEach(() => {
        mockOnFormChange = jest.fn();
        mockHandleSubmitClick = jest.fn();
        mockHandleErrorResponse = jest.fn();
        mockHandleAddClick = jest.fn();
        mockHandleRemoveClick = jest.fn();
        mockHandleCorrectTipFormat = jest.fn();
        mockCalculateExtraFees = jest.fn();
        mockToggleModal = jest.fn();
        mockCreateNewBill = jest.fn();

        wrapper = shallow(<CreateBillFormContainer />);
    });

    afterEach(() => {
        mockOnFormChange.mockRestore();
        mockHandleSubmitClick.mockRestore();
        mockHandleErrorResponse.mockRestore();
        mockHandleAddClick.mockRestore();
        mockHandleRemoveClick.mockRestore();
        mockHandleCorrectTipFormat.mockRestore();
        mockCalculateExtraFees.mockRestore();
        mockToggleModal.mockRestore();
        mockCreateNewBill.mockRestore();
    });

    // describe("render", () => {
    //     describe("snapshots 📸", () => {
    //         it("CreateBillFormContainer should match snap shot", () => {
    //             matches(<CreateBillFormContainer />);
    //         });
    //     });

    //     describe("components", () => {});
    // });

    describe("functions", () => {

        it("onFormChange should change state when it's details", () => {
            const eventTarget = {
                target: { name: "name", value: "bill name" }
            }
            
            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.instance().onFormChange(eventTarget, "details");

            expect(wrapper.state().addBillForm.name).toEqual(eventTarget.target.value);
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("onFormChange should change state when it's item", () => {
            const eventTarget = {
                target: { name: "cost", value: "10" }
            }
            
            wrapper.instance().onFormChange(eventTarget, "item");

            expect(wrapper.state().itemBuffer.cost).toEqual(Number("10"));
        });

        it("onFormChange should change state when it's tax", () => {
            const eventTarget = {
                target: { name: "percentage", value: "10" }
            }
            
            wrapper.instance().onFormChange(eventTarget, "tax");

            expect(wrapper.state().taxBuffer.percentage).toEqual(Number("10"));
        });

        it("onFormChange should change state when it's tipFormat", () => {
            const eventTarget = {
                target: { name: "tipFormat", value: "" }
            }

            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.instance().onFormChange(eventTarget, "tipFormat");

            expect(wrapper.state().tipFormat).toBe(false);
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("onFormChange should change state when it's account", () => {
            const eventTarget = {
                target: { name: "account", value: "test@email.com" }
            }

            wrapper.instance().onFormChange(eventTarget, "account");

            expect(wrapper.state().accountBuffer).toEqual(eventTarget.target.value);
        });

        it("handleSubmitClick should return a bill", async () => {
            const paramEvent = {
                preventDefault: () => {}
            }

            mockCreateNewBill = jest.fn().mockImplementation(() => {
                return {name: "a bill"};
            });

            wrapper = shallow(<CreateBillFormContainer createNewBill={mockCreateNewBill}/>);
            const result = await wrapper.instance().handleSubmitClick(paramEvent);

            expect(result.name).toEqual("a bill");
            expect(wrapper.state().isOpen).toBe(false);
            expect(wrapper.state().isLoading).toBe(false);
        });

        it("handleSubmitClick should throw an error and call handleErrorResponse", async () => {
            const paramEvent = {
                preventDefault: () => {}
            }

            mockCreateNewBill = jest.fn().mockImplementation(() => {
                throw new Error();
            });


            wrapper = shallow(<CreateBillFormContainer createNewBill={mockCreateNewBill}/>);
            wrapper.instance().handleErrorResponse = mockHandleErrorResponse;

            await wrapper.instance().handleSubmitClick(paramEvent);

            expect(mockHandleErrorResponse).toBeCalledTimes(1);
            expect(wrapper.state().isOpen).toBe(true);
            expect(wrapper.state().isLoading).toBe(false);
        });


        it("handleErrorResponse should change state correctly for BAD_REQUEST with account error", async () => {
            const response = {
                status: "BAD_REQUEST",
                errors: [
                    {
                        field: "accountsList[0]",
                        message: "message"
                    }
                ],
                message: "response message"
            }

            wrapper.instance().handleErrorResponse(response);

            expect(wrapper.state().hasErrors.account.hasError).toBe(true);
            expect(wrapper.state().hasErrors.account.message).toEqual(response.errors[0].message);
            expect(wrapper.state().alertMessage.visible).toBe(true);
            expect(wrapper.state().alertMessage.alertType).toEqual("danger");
            expect(wrapper.state().errorMessage).toEqual(response.message);
        });

        it("handleErrorResponse should change state correctly for BAD_REQUEST without account error", async () => {
            const response = {
                status: "BAD_REQUEST",
                errors: [
                    {
                        field: "name",
                        message: "message"
                    }
                ],
                message: "response message"
            }

            wrapper.instance().handleErrorResponse(response);

            expect(wrapper.state().hasErrors.name.hasError).toBe(true);
            expect(wrapper.state().hasErrors.name.message).toEqual(response.errors[0].message);
            expect(wrapper.state().alertMessage.visible).toBe(true);
            expect(wrapper.state().alertMessage.alertType).toEqual("danger");
            expect(wrapper.state().errorMessage).toEqual(response.message);
        });

        it("handleErrorResponse should change state correctly for UNAUTHORIZED", async () => {
            const response = {
                status: "UNAUTHORIZED",
                message: "response message"
            }

            wrapper.instance().handleErrorResponse(response);

            expect(wrapper.state().alertMessage.visible).toBe(true);
            expect(wrapper.state().alertMessage.alertType).toEqual("danger");
            expect(wrapper.state().errorMessage).toEqual(response.message);
        });

        it("handleErrorResponse should change state correctly for NOT_FOUND", async () => {
            const response = {
                status: "NOT_FOUND",
                message: "response message"
            };

            wrapper.instance().handleErrorResponse(response);

            expect(wrapper.state().alertMessage.visible).toBe(true);
            expect(wrapper.state().alertMessage.alertType).toEqual("danger");
            expect(wrapper.state().errorMessage).toEqual(response.message);
        });

        it("handleAddClick should change state correctly for category Item", async () => {
            const itemBuffer = {name: "cheese", cost: 420.69};

            wrapper.state().itemBuffer = {...itemBuffer};
            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.instance().handleAddClick("item");

            expect(wrapper.state().addBillForm.items[0]).toEqual(itemBuffer);
            expect(wrapper.state().balance).toEqual(itemBuffer.cost);
            expect(wrapper.state().itemBuffer).toEqual({name: "", cost: 0});
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("handleAddClick should not change state for category Item", async () => {
            const errorBuffer1 = {name: "", cost: 420.69};
            const errorBuffer2 = {name: "cheese", cost: 0};
            const errorBuffer3 = {name: "", cost: 0};

            wrapper.state().itemBuffer = {...errorBuffer1};
            wrapper.instance().handleAddClick("item");
            expect(wrapper.state().addBillForm.items.length).toEqual(0);

            wrapper.state().itemBuffer = {...errorBuffer2};
            wrapper.instance().handleAddClick("item");
            expect(wrapper.state().addBillForm.items.length).toEqual(0);

            wrapper.state().itemBuffer = {...errorBuffer3};
            wrapper.instance().handleAddClick("item");
            expect(wrapper.state().addBillForm.items.length).toEqual(0);
        });

        it("handleAddClick should change state correctly for category Tax", async () => {
            const taxBuffer = {name: "TPS", percentage: 12};

            wrapper.state().taxBuffer = {...taxBuffer};
            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.instance().handleAddClick("tax");
            
            expect(wrapper.state().addBillForm.taxes[0]).toEqual(taxBuffer);
            expect(wrapper.state().taxBuffer).toEqual({name: "", percentage: 0});
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("handleAddClick should not change state for category Tax", async () => {
            const errorBuffer1 = {name: "", percentage: 12};
            const errorBuffer2 = {name: "TPS", percentage: 0};
            const errorBuffer3 = {name: "", percentage: 0};

            wrapper.state().taxBuffer = {...errorBuffer1};
            wrapper.instance().handleAddClick("tax");
            expect(wrapper.state().addBillForm.taxes.length).toEqual(0);

            wrapper.state().taxBuffer = {...errorBuffer2};
            wrapper.instance().handleAddClick("tax");
            expect(wrapper.state().addBillForm.taxes.length).toEqual(0);

            wrapper.state().taxBuffer = {...errorBuffer3};
            wrapper.instance().handleAddClick("tax");
            expect(wrapper.state().addBillForm.taxes.length).toEqual(0);
        });

        it("handleRemoveClick should change state correctly for category Account", async () => {
            const accountBuffer = "test@email.com";

            wrapper.state().accountBuffer = accountBuffer;
            wrapper.instance().handleAddClick("account");
            
            expect(wrapper.state().addBillForm.accountsList[0]).toEqual(accountBuffer);
            expect(wrapper.state().accountBuffer).toEqual("");
        });

        it("handleRemoveClick should not change state for category Account", async () => {
            const accountBuffer = "";

            wrapper.state().accountBuffer = accountBuffer;
            wrapper.instance().handleAddClick("account");
            
            expect(wrapper.state().addBillForm.accountsList.length).toEqual(0);
        });

        it("handleRemoveClick should change state correctly for category Item", async () => {
            const item = {name: "cheese", cost: 20}

            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.state().addBillForm.items.push(item);
            wrapper.state().balance = item.cost;
            wrapper.instance().handleRemoveClick("item", 0);
            
            expect(wrapper.state().addBillForm.items.length).toEqual(0);
            expect(wrapper.state().balance).toEqual(0);
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("handleRemoveClick should change state correctly for category Tax", async () => {
            const tax = {name: "TPS", percentage: 20}

            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.state().addBillForm.taxes.push(tax);
            wrapper.instance().handleRemoveClick("tax", 0);
            
            expect(wrapper.state().addBillForm.taxes.length).toEqual(0);
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

        it("handleRemoveClick should change state correctly for category Account", async () => {

            wrapper.state().addBillForm.accountsList.push("test@email.com");
            wrapper.state().hasErrors.account.hasError = true;
            wrapper.state().hasErrors.account.message = "message";
            wrapper.instance().handleRemoveClick("account", 0);
            
            expect(wrapper.state().addBillForm.accountsList.length).toEqual(0);
            expect(wrapper.state().hasErrors.account.hasError).toBe(false);
            expect(wrapper.state().hasErrors.account.message).toEqual("");
        });

        it("handleCorrectTipFormat should change state correctly when it's tip amount", async () => {
            wrapper.state().addBillForm.tipAmount = 50;
            wrapper.state().addBillForm.tipPercent = 10;
            wrapper.state().tipFormat = true;
            wrapper.instance().handleCorrectTipFormat();
            
            expect(wrapper.state().addBillForm.tipPercent).toEqual(undefined);
        });

        it("handleCorrectTipFormat should change state correctly when it's tip percent", async () => {
            wrapper.state().addBillForm.tipAmount = 50;
            wrapper.state().addBillForm.tipPercent = 10;
            wrapper.state().tipFormat = false;
            wrapper.instance().handleCorrectTipFormat();
            
            expect(wrapper.state().addBillForm.tipAmount).toEqual(undefined);
        });

        it("calculateExtraFees should calculate correct new total balance for tip amount", () => {
            wrapper.state().balance = 10;
            wrapper.state().addBillForm.taxes.push({name: "TPS", percentage: 10});
            wrapper.state().addBillForm.tipAmount = 1;
            wrapper.state().tipFormat = true;
            wrapper.instance().calculateExtraFees();
            expect(wrapper.state().totalBalance).toEqual("12.00");

        });

        it("calculateExtraFees should calculate correct new total balance for tip percent", () => {
            wrapper.state().balance = 10;
            wrapper.state().addBillForm.taxes.push({name: "TPS", percentage: 10});
            wrapper.state().addBillForm.tipPercent = 10;
            wrapper.state().tipFormat = false;
            wrapper.instance().calculateExtraFees();

            expect(wrapper.state().totalBalance).toEqual("12.00");
        });

        it("toggleModal should change state correctly", () => {
            const addBillForm = {
                name: "",
                category: "",
                company: "",
                items: [],
                accountsList: [],
                tipAmount: 0,
                tipPercent: 0,
                taxes: []
            };

            wrapper.instance().calculateExtraFees = mockCalculateExtraFees;
            wrapper.instance().toggleModal();
            
            expect(wrapper.state().addBillForm).toEqual(addBillForm);
            expect(wrapper.state().balance).toEqual(0);
            expect(mockCalculateExtraFees).toBeCalledTimes(1);
        });

    });
});
