import React from 'react';
import BillDisplay from '../BillDisplay.jsx';
import { shallow } from "enzyme";
import { FaUtensils, FaShoppingCart, FaShoppingBag, FaCar, FaBus, FaQuestion, FaSearch } from 'react-icons/fa';
import { Nav, NavItem, NavLink } from "shards-react";

jest.mock("../../../utils/requests/BillRequests", () => {
  return ({
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"])
  })
});

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

          it("Should have 3 list items", () => {
            const mockBills = [
              {
                  "id": 1,
                  "name": "BILL MOCK 1",
                  "status": "OPEN",
                  "created": "07-07-2020 14:25:10 -0400",
                  "category": "string",
                  "balance": 12.0000
              },
              {
                  "id": 2,
                  "name": "BILL MOCK 2",
                  "status": "OPEN",
                  "created": "07-07-2020 14:25:10 -0400",
                  "category": "string",
                  "balance": 15.000000
              }
            ];
            wrapper.setState({
                user:   {   firstName:  "",
                            lastName: ""
                        },
                bills:  mockBills,
                billsLoaded: true  
            } );
            expect(wrapper.find('SmallBillCard')).toHaveLength(mockBills.length);
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
              wrapper.setState({
                    user:   {   firstName:  "",
                                lastName: ""
                            },
                    bills:  [],
                    billsLoaded: false  
              });
              expect(wrapper.find('img.loading__gif')).toHaveLength(1);
            });
          });
        });

        describe("Nav link components", () => {
          it("Should have 3 non active, and 1 active", () => {
            expect(wrapper.find(NavLink)).toHaveLength(4);
            expect(wrapper.find(NavLink).at(0).props().active).toBe(true);
          });
        });
         
      describe("functions", () => {
          it("fetchBill should be called 1 time", () => {
            const spy = jest.spyOn(instance, 'fetchBill'); // spy on the fetchBill
            instance.componentDidMount();
            expect(spy).toBeCalledTimes(1);
            spy.mockRestore();

          });

          it("filterDateTime should return correct format", () => {
            jest.spyOn(instance, 'filterDateTime'); // spy on the filterDateTime
            const date = new Date(new Date().setHours(0,0,0,0));
            expect(instance.filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
            expect(instance.filterDateTime(`01-01-${date.getFullYear()} 15:25:10 -0400`)).toBe("01/01");
            expect(instance.filterDateTime(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} 15:25:10 -0400`)).toBe("3:25 PM");
            expect(instance.filterDateTime(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} 3:25:10 -0400`)).toBe("3:25 AM");
          });

          it("fetchBill should return correct icon", () => {
            jest.spyOn(instance, 'billIcons'); // spy on the billIcons
            const color = "rgba(0, 0, 0, 0.96)";
            expect(instance.billIcons("food")).toStrictEqual(<FaUtensils color={color} size={24}/>);
            expect(instance.billIcons("transport")).toStrictEqual(<FaCar color={color} size={24}/>);
            expect(instance.billIcons("public-transport")).toStrictEqual(<FaBus color={color} size={24}/>);
            expect(instance.billIcons("grocery")).toStrictEqual(<FaShoppingCart color={color} size={24}/>);
            expect(instance.billIcons("shopping")).toStrictEqual(<FaShoppingBag color={color} size={24}/>);
            expect(instance.billIcons("unknown")).toStrictEqual(<FaQuestion color={color} size={24}/>);
          });
      
    });
});