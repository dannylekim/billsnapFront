import React from "react";
import BillFilter from "../BillFilter";

import { shallow } from "enzyme";
describe("BillDisplay", () => {
    let wrapper, instance;
    let mockHandleDate,mockUpdateBill,mockSetState;

    beforeEach(() => {
        mockHandleDate = jest.fn();
        mockUpdateBill = jest.fn();
        mockSetState = jest.fn();
    });
 
    afterEach(() => {
        mockHandleDate.mockRestore();
        mockUpdateBill.mockRestore();
        mockSetState.mockRestore();
    });

    describe("render", () => {
        describe("snapshots 📸", () => {
            it("BillFilter should match snap shot when nothing opened", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: false, value: ""},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: false }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });
    
            it("BillFilter should match snap shot when date filter opened", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: true, value: ""},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: true }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });
    
            it("BillFilter should match snap shot when category filter opened", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: false, value: ""},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: true, dateOpened: false }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });
    
            it("BillFilter should match snap shot when status filter opened", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: false, value: ""},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: true, categoryOpened: false, dateOpened: false }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });

            it("BillFilter should match snap shot when start date exists", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: true, value: "2020-01-01"},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: true }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });
        
            it("BillFilter should match snap shot when end date exists", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: false, value: "" },
                                            endDate: {selected: true, value: "2020-01-01"}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: true }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={mockHandleDate}
                            updateBills={mockUpdateBill}
                            setState={mockSetState} />
                );
            });
        });
    });



})

