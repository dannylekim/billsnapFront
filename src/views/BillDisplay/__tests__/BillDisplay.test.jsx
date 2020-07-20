import React from "react";
import BillDisplay from "../BillDisplay";
import { shallow } from "enzyme";
import { FaUtensils, FaShoppingCart, FaShoppingBag, FaCar, FaBus, FaQuestion } from 'react-icons/fa';

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
      let wrapper, instance;
      let mockFetch,mockSortAlphabetical;

      const mockBills = [
        {
          id: 1,
          name: "BILL MOCK 1",
          status: "OPEN",
          category: "string",
          created:  "05-03-2018 15:25:10 -0400",
          balance: 12.0,
          responsible: {
            id: 1,
            email: "someEmail@email.com",
            firstName: "Bob",
            middleName: null,
            lastName: "Smith",
            gender: null,
            phoneNumber: null,
            birthDate: null,
            location: null
          }
        },
        {
          id: 2,
          name: "BILL MOCK 2",
          status: "OPEN",
          category: "string",
          created:  "05-03-2018 15:25:10 -0400",
          balance: 15.0,
          responsible: {
            id: 1,
            email: "someEmail@email.com",
            firstName: "Bob",
            middleName: null,
            lastName: "Smith",
            gender: null,
            phoneNumber: null,
            birthDate: null,
            location: null
          }
        },
      ];

      beforeEach(() => {
        mockFetch = jest.fn();
        mockSortAlphabetical = jest.fn();
        wrapper = shallow(
          <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} orderAlphabetical={mockSortAlphabetical} />
        );

        instance = wrapper.instance();
      });
      afterEach(() => {
        mockFetch.mockRestore();
        mockSortAlphabetical.mockRestore();
      });

      describe("render", () => {
          describe("snapshots 📸", () => {
            it("BillDisplay should match snap shot when loading", () => {
              matches(
                <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={true} orderAlphabetical={mockSortAlphabetical} />
              );
            });

            it("BillDisplay should match snap shot when done loading + no bills", () => {
              matches(
                <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={false} orderAlphabetical={mockSortAlphabetical} />
              );
            });
          });

          it("should change seachedQuery state on form search.", () => {
            const event = {
              target: { value: 'hahahhahahahha' }
            };
           
            wrapper.find('input.form-control.border-0').simulate('change', event);
            expect(wrapper.state().seachedQuery).toBe(event.target.value);
          })

          it("should change selectedBill on click.", () => {
            wrapper.find('div.bill__card.card').at(0).simulate('click');
            expect(wrapper.state().selectedBill.bill).toBe(mockBills[0]);
            wrapper.find('div.bill__card.card').at(1).simulate('click');
            expect(wrapper.state().selectedBill.bill).toBe(mockBills[1]);
          })


          describe("simple sort onClicks", () => {
            beforeEach(() => {
              wrapper.find('span.simple__sort').simulate('click');
              wrapper.update();
            });

            it("should trigger a Mock function when A to Z is clicked.", () => {
              wrapper.find('li.sorting__titles').at(0).simulate('click');
              expect(mockSortAlphabetical).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("A to Z");
            })

            it("should trigger a Mock function when Z to A is clicked.", () => {
              wrapper.find('li.sorting__titles').at(1).simulate('click');
              expect(mockSortAlphabetical).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("Z to A");
            })

            it("should trigger a Mock function when Newest is selected after oldest is selected.", () => {
              wrapper.find('li.sorting__titles').at(2).simulate('click');
              expect(mockFetch).toHaveBeenCalled()
              wrapper.find('span.simple__sort').simulate('click');
              wrapper.update();
              wrapper.find('li.sorting__titles').at(0).simulate('click');
              expect(mockFetch).toHaveBeenCalled()
            });
          });

          describe("filter badge onClicks", () => {
            beforeEach(() => {
              expect(wrapper.state().filter.opened).toBeFalsy();
              wrapper.find('span.filter__bill').simulate('click');
              wrapper.update();
            });

            it("should close filter div", () => {
              expect(wrapper.state().filter.opened).toBeTruthy();
              wrapper.find('div.filter__header').simulate('click');
              wrapper.update();
              expect(wrapper.state().filter.opened).toBeFalsy();
            });
            
            it("should trigger a Mock function when Newest is selected.", () => {
              wrapper.find('Badge').at(0).simulate('click');
              expect(mockFetch).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("Newest");
            });

            it("should trigger a Mock function when Oldest is clicked.", () => {
              wrapper.find('Badge').at(1).simulate('click');
              expect(mockFetch).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("Oldest");
            });
            
            it("should change status checkbox states on status filter select.", () => {
              expect(wrapper.state().filter.statusOpened).toBeFalsy();
              wrapper.find('Badge').at(2).simulate('click');
              expect(wrapper.state().filter.statusOpened).toBeTruthy();
              
              wrapper.find('FormCheckbox').at(2).simulate('change');
              expect(wrapper.state().billStatusFilter.in_progess).toBeTruthy();
              expect(wrapper.state().billStatusFilter.resolved).toBeFalsy();
              expect(wrapper.state().billStatusFilter.open).toBeFalsy();
              
              wrapper.find('FormCheckbox').at(1).simulate('change');
              expect(wrapper.state().billStatusFilter.in_progess).toBeFalsy();
              expect(wrapper.state().billStatusFilter.resolved).toBeFalsy();
              expect(wrapper.state().billStatusFilter.open).toBeTruthy();
              
              wrapper.find('FormCheckbox').at(0).simulate('change');
              expect(wrapper.state().billStatusFilter.in_progess).toBeFalsy();
              expect(wrapper.state().billStatusFilter.resolved).toBeTruthy();
              expect(wrapper.state().billStatusFilter.open).toBeFalsy();
            });

            it("should trigger a Mock function when A to Z is clicked.", () => {
              wrapper.find('Badge').at(3).simulate('click');
              expect(mockSortAlphabetical).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("A to Z");
            });

            it("should trigger a Mock function when Z to A is clicked.", () => {
              wrapper.find('Badge').at(4).simulate('click');
              expect(mockSortAlphabetical).toHaveBeenCalled()
              expect(wrapper.state().sorting.type).toBe("Z to A");
            });

            it("should trigger category open state on category filter select", () => {
              expect(wrapper.state().filter.categoryOpened).toBeFalsy();
              wrapper.find('Badge').at(5).simulate('click');
              expect(wrapper.state().filter.categoryOpened).toBeTruthy();
            });
  
            describe("testing the date function", () => { 
              beforeEach(() => {
                expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
                expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();
              
                wrapper.find('Badge').at(6).simulate('click');
                expect(wrapper.state().filter.dateOpened).toBeTruthy();
                
                wrapper.find('FormCheckbox').at(0).simulate('change');
                expect(wrapper.state().dateFilters.startDate.selected).toBeTruthy();
                expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();
              
                wrapper.find('FormCheckbox').at(1).simulate('change');
                expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
                expect(wrapper.state().dateFilters.endDate.selected).toBeTruthy();
              });
              
              it("should change start date checkbox states onChange.", () => {
                const event = ({
                  preventDefault: jest.fn(),
                  target: {
                      value: '2020-01-01'
                  }
                });
                wrapper.find('FormInput').at(0).simulate('change',event);
                wrapper.setState({ dateFilters: {
                                    startDate: {selected: true, value: ""},
                                    endDate: {selected: false, value: ""}
                                } });
                const spy = jest.spyOn(instance, 'handleDateSelection'); // handleDateSelection
                instance.handleDateSelection(event);
                expect(spy).toBeCalledTimes(1);
                expect(spy).toHaveBeenCalledWith(event);
                wrapper.update();
                expect(wrapper.state().dateFilters.startDate.value).toBe(event.target.value);
                spy.mockRestore();
              });

              it("should return null", ()=> {
                const event = ({
                  preventDefault: jest.fn(),
                  target: {
                      value: ""
                  }
                })
                wrapper.find('FormInput').at(0).simulate('change',event);
                expect(instance.handleDateSelection(event)).toBe(null);

              });
          })
        });

          it("should change activeTab on click.", () => {
            expect(wrapper.state().currentActiveTab).toBe("allBills");
            wrapper.find('NavLink').at(1).simulate('click');
            expect(wrapper.state().currentActiveTab).toBe("owedToYou");
          });

          it("should call mock function on all bills", () => {
            wrapper.find('NavItem').at(0).simulate('click');
            expect(mockFetch).toHaveBeenCalled();
          });

        });

      describe("components", () => {
        
        it("BillDisplay should match snap shot when done loading + bills", () => {
        
          matches(
            <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} orderAlphabetical={mockSortAlphabetical} />
          );
        });
      });

      describe("functions", () => {
          it("fetchBill should be called 1 time", () => {
            expect(mockFetch).toBeCalledTimes(1);
          });

          it("filterDateTime should return correct format", () => {
           
            const today = new Date(new Date().setHours(0,0,0,0));
            expect(BillDisplay.filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
            expect(BillDisplay.filterDateTime(`01-01-${today.getFullYear()} 15:25:10 -0400`)).toBe("01/01");
            expect(BillDisplay.filterDateTime(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} 15:25:10 -0400`)).toBe("3:25 PM");
            expect(BillDisplay.filterDateTime(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} 3:25:10 -0400`)).toBe("3:25 AM");
          });

          it("fetchBill should return correct icon", () => {
            const color = "rgba(0, 0, 0, 0.96)";
            expect(BillDisplay.billIcons("food")).toStrictEqual(<FaUtensils color={color} size={24}/>);
            expect(BillDisplay.billIcons("transport")).toStrictEqual(<FaCar color={color} size={24}/>);
            expect(BillDisplay.billIcons("public-transport")).toStrictEqual(<FaBus color={color} size={24}/>);
            expect(BillDisplay.billIcons("grocery")).toStrictEqual(<FaShoppingCart color={color} size={24}/>);
            expect(BillDisplay.billIcons("shopping")).toStrictEqual(<FaShoppingBag color={color} size={24}/>);
            expect(BillDisplay.billIcons("unknown")).toStrictEqual(<FaQuestion color={color} size={24}/>);
          });
    });
});