import React from "react";
import BillFilter from "../BillFilter";
import { shallow } from "enzyme";

describe("BillFilter", () => {
    let wrapper;
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
        });

       
    });

        describe("component ", () => {
            it("should show the date value next to start date", () => {
                wrapper = shallow( <BillFilter dateFilters={{
                                                    startDate: {selected: true, value: "2020-01-01"},
                                                    endDate: {selected: false, value: ""}
                                                }}
                                    filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: true }} 
                                    billStatusFilter={{resolved: false, open: false, in_progess:false}}
                                    handleDateSelection={jest.fn()}
                                    updateBills={jest.fn()}
                                    setState={jest.fn()} />);

                expect(wrapper.find("FormCheckbox").at(0).render().text()).toBe("Start date : 2020-01-01");

            })

            it("should show the date value nex to end date", () => {
                wrapper = shallow( <BillFilter dateFilters={{
                                                    startDate: {selected: false, value: "" },
                                                    endDate: {selected: true, value: "2020-01-01"}
                                                }}
                                                filter={{ opened: true, type: "", statusOpened: false, categoryOpened: false, dateOpened: true }} 
                                                billStatusFilter={{resolved: false, open: false, in_progess:false}}
                                                handleDateSelection={jest.fn()}
                                                updateBills={jest.fn()}
                                                setState={jest.fn()} />);

                expect(wrapper.find("FormCheckbox").at(1).render().text()).toBe("End date : 2020-01-01");

            })
        })

})

