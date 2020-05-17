import React from 'react';
import BillDisplay from '../BillDisplay.jsx';
import { shallow } from "enzyme";

describe('BillDisplay', () => {
    let wrapper, instance;
    beforeEach(() => {    
        wrapper = shallow(
          <BillDisplay/>
        );
        instance = wrapper.instance(); 
      });

    describe("render", () => {
        describe("snapshots 📸", () => {
            it("BillDisplay should match snap shot", () => {
                matches(<BillDisplay />);
            });
        });
    });

    describe("components", () => {
        describe("bill list item", () => {

         const mockBills = [
            {
                "id": 1,
                "name": "BILL MOCK 1",
                "status": "OPEN",
                "category": "string",
                "balance": 12.0000
            },
            {
                "id": 2,
                "name": "BILL MOCK 2",
                "status": "OPEN",
                "category": "string",
                "balance": 15.000000
            }
        ];
          it("Should have 3 list items", () => {
            wrapper.setState({bills: {
                user:   {   firstName:  "",
                            lastName: ""
                        },
                bills:  mockBills,
                billsLoaded: true  
            }} );
            expect(wrapper.find('ul')).toHaveLength(mockBills.length);
            expect(wrapper.find('li')).toHaveLength(mockBills.length * 3);
          });
        });

        describe("no bills", () => {
            it("Should have 1 p tag", () => {
              wrapper.setState({bills: {
                    user:   {   firstName:  "",
                                lastName: ""
                            },
                    bills:  [],
                    billsLoaded: true  
              }} );
              expect(wrapper.find('p')).toHaveLength(1);
            });
          });

        describe("not loaded", () => {
            it("Should display loader gif", () => {
              wrapper.setState({bills: {
                    user:   {   firstName:  "",
                                lastName: ""
                            },
                    bills:  [],
                    billsLoaded: false  
              }} );
              expect(wrapper.find('img.loading__gif')).toHaveLength(1);
            });
          });
    });


    describe("functions", () => {
        it("fetchBill should be called 1 time", () => {
            const spy = jest.spyOn(instance, 'fetchBill'); // spy on the fetchBill
            instance.componentDidMount();
            expect(spy).toBeCalledTimes(1);
           
            spy.mockRestore();
        });

        it("billStatusColor should return appropriate colors", () => {
            jest.spyOn(instance, 'billStatusColor'); // spy on the billStatusColor
            expect(instance.billStatusColor("OPEN")).toBe("success");
            expect(instance.billStatusColor("RESOLVED")).toBe("primary");
            expect(instance.billStatusColor("IN_PROGRESS")).toBe("warning");
            expect(instance.billStatusColor("BlahBlah")).toBe("muted");
        });
    });
});