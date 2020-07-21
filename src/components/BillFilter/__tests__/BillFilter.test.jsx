import React from "react";
import BillFilter from "../BillFilter";

describe("BillFilter", () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("BillFilter should match snap shot when category filter opened", () => {
                matches(
                <BillFilter dateFilters={{
                                            startDate: {selected: false, value: ""},
                                            endDate: {selected: false, value: ""}
                                        }}
                            filter={{ opened: true, type: "", statusOpened: false, categoryOpened: true, dateOpened: false }} 
                            billStatusFilter={{resolved: false, open: false, in_progess:false}}
                            handleDateSelection={jest.fn()}
                            updateBills={jest.fn()}
                            setState={jest.fn()} />
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
                            handleDateSelection={jest.fn()}
                            updateBills={jest.fn()}
                            setState={jest.fn()} />
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
                            handleDateSelection={jest.fn()}
                            updateBills={jest.fn()}
                            setState={jest.fn()} />
                );
            });

        });
    });

})

