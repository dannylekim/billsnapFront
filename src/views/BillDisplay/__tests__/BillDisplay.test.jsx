import React from "react";
import BillDisplay from "../BillDisplay";
import BillFilter from "../../../components/BillFilter";
import {shallow} from "enzyme";
import {FaBus, FaCar, FaQuestion, FaShoppingBag, FaShoppingCart, FaUtensils} from 'react-icons/fa';

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBills: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
      let wrapper, instance;
      let mockFetch = jest.fn(),mockSortAlphabetical = jest.fn();

      const responsible = ({
        id: 1,
        email: "someEmail@email.com",
        firstName: "Bob",
        middleName: null,
        lastName: "Smith",
        gender: null,
        phoneNumber: null,
        birthDate: null,
        location: null
      });

      const mockBills = [
        {
          id: 1,
          name: "BILL MOCK 1",
          status: "OPEN",
          category: "string",
          created:  "05-03-2018 15:25:10 -0400",
          balance: 12.0,
          responsible
        },
        {
          id: 2,
          name: "BILL MOCK 2",
          status: "OPEN",
          category: "string",
          created:  "06-04-2018 15:25:10 -0400",
          balance: 15.0,
          responsible
        },
      ];

      beforeEach(() => {
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

            it("BillDisplay should match snap shot when done loading + bills", () => {
              matches(
                <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} orderAlphabetical={mockSortAlphabetical} />
              );
            });

            it("BillDisplay should match snap shot when done loading + no bills", () => {
              matches(
                <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={false} orderAlphabetical={mockSortAlphabetical} />
              );
            });
          });
      });

      describe("components", () => {
       
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

        it("should change activeTab on click.", () => {
          expect(wrapper.state().currentActiveTab).toBe("allBills");
          wrapper.find('NavLink').at(1).simulate('click');
          expect(wrapper.state().currentActiveTab).toBe("owedToYou");
        });

        it("should call mock function on all bills", () => {
          wrapper.find('NavItem').at(0).simulate('click');
          expect(mockFetch).toHaveBeenCalled();
        });

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
          let billFilterWrapper, billWrapper, mockHandleDateSelection;
          beforeEach(() => {
            expect(wrapper.state().filter.opened).toBeFalsy();
            wrapper.find('span.filter__bill').simulate('click');
            wrapper.update();

            mockHandleDateSelection = jest.fn();
            billFilterWrapper = () => shallow(<BillFilter dateFilters={wrapper.state().dateFilters}
                                                          filter={wrapper.state().filter} 
                                                          billStatusFilter={wrapper.state().billStatusFilter}  
                                                          handleDateSelection={mockHandleDateSelection}
                                                          updateBills={(type) => instance.updateBills(type)}
                                                          setState={(newState) => instance.setState(newState)} />);
            billWrapper = billFilterWrapper();
          });

          it("should close filter div", () => {
            expect(wrapper.state().filter.opened).toBeTruthy();
            billWrapper.find('div.filter__header').simulate('click');
            wrapper.update();
            expect(wrapper.state().filter.opened).toBeFalsy();
          });
          
          it("should trigger a Mock function when Newest is selected.", () => {
            billWrapper.find('Badge').at(0).simulate('click');//calls updateBills
            expect(mockFetch).toHaveBeenCalled();
            expect(wrapper.state().sorting.type).toBe("Newest");
          });

          it("should trigger a Mock function when Oldest is clicked.", () => {
            billWrapper.find('Badge').at(1).simulate('click');
            expect(mockFetch).toHaveBeenCalled()
            expect(wrapper.state().sorting.type).toBe("Oldest");
          });
          
          it("should change status checkbox states on status filter select.", () => {
            expect(wrapper.state().filter.statusOpened).toBeFalsy();
            billWrapper.find('Badge').at(2).simulate('click');
            expect(wrapper.state().filter.statusOpened).toBeTruthy();
            
            billWrapper = billFilterWrapper();

            billWrapper.find('FormCheckbox').at(2).simulate('change');
            wrapper.update();
            expect(wrapper.state().billStatusFilter.in_progess).toBeTruthy();
            expect(wrapper.state().billStatusFilter.resolved).toBeFalsy();
            expect(wrapper.state().billStatusFilter.open).toBeFalsy();
            
            billWrapper.find('FormCheckbox').at(1).simulate('change');
            expect(wrapper.state().billStatusFilter.in_progess).toBeFalsy();
            expect(wrapper.state().billStatusFilter.resolved).toBeFalsy();
            expect(wrapper.state().billStatusFilter.open).toBeTruthy();
            
            billWrapper.find('FormCheckbox').at(0).simulate('change');
            expect(wrapper.state().billStatusFilter.in_progess).toBeFalsy();
            expect(wrapper.state().billStatusFilter.resolved).toBeTruthy();
            expect(wrapper.state().billStatusFilter.open).toBeFalsy();
          });

          it("should trigger a Mock function when A to Z is clicked.", () => {
            billWrapper.find('Badge').at(3).simulate('click');
            expect(mockSortAlphabetical).toHaveBeenCalled()
            expect(wrapper.state().sorting.type).toBe("A to Z");
          });

          it("should trigger a Mock function when Z to A is clicked.", () => {
            billWrapper.find('Badge').at(4).simulate('click');
            expect(mockSortAlphabetical).toHaveBeenCalled()
            expect(wrapper.state().sorting.type).toBe("Z to A");
          });

          it("should trigger category open state on category filter select", () => {
            expect(wrapper.state().filter.categoryOpened).toBeFalsy();
            billWrapper.find('Badge').at(5).simulate('click');
            expect(wrapper.state().filter.categoryOpened).toBeTruthy();
          });

          describe("testing the date function", () => { 
           //has to re-shallow bill filter every time wrapper is updated (.update does not work on functional)
            beforeEach(() => {
              expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
              expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();
             
              billWrapper.find('Badge').at(6).simulate('click');
            
              expect(wrapper.state().filter.dateOpened).toBeTruthy();
            });
            
              describe(" Start date and End date should be triggered on handleDateSelection", () => {
                const event = ({
                  preventDefault: jest.fn(),
                  target: {
                      value: '2020-01-01'
                  }
                });

                it("should change start date checkbox states onChange.", () => {
                  billFilterWrapper().find('FormCheckbox').at(0).simulate('change');
                  wrapper.update();
                  
                  billWrapper =  billFilterWrapper()
                  billWrapper.find('FormInput').simulate('change',event);
                  const spy = jest.spyOn(instance, 'handleDateSelection'); // handleDateSelection
                  instance.handleDateSelection(event);
                  wrapper.update();
                  expect(wrapper.state().dateFilters.startDate.value).toBe(event.target.value);

                  expect(spy).toBeCalledTimes(1);
                  expect(spy).toHaveBeenCalledWith(event);
                  spy.mockRestore();
              });

                it("should change enddate checkbox states onChange.", () => {
                  billFilterWrapper().find('FormCheckbox').at(1).simulate('change');
                  wrapper.update();
                  
                  billWrapper =  billFilterWrapper()
          
                  billWrapper.find('FormInput').simulate('change',event);
                  instance.handleDateSelection(event);
                  wrapper.update();
                  expect(wrapper.state().dateFilters.endDate.value).toBe(event.target.value);
              });
            });

            it("should return null", ()=> {
              const event = ({
                preventDefault: jest.fn(),
                target: {
                    value: ""
                }
              })
              billFilterWrapper().find('FormCheckbox').at(1).simulate('change');
              wrapper.update();
              
              billFilterWrapper().find('FormInput').at(0).simulate('change',event);
              expect(instance.handleDateSelection(event)).toBe(null);
            });
          });
        });
      });

      describe("functions", () => {
          it("fetchBill should be called 1 time", () => {
            expect(mockFetch).toBeCalledTimes(1);
          });

          it("filterDateTime should return correct format", () => {
           
            const today = new Date(new Date().setHours(0,0,0,0));
            expect(BillDisplay.filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
            expect(BillDisplay.filterDateTime("15-12-2017 15:25:10 -0400")).toBe("15/12/2017");
            expect(BillDisplay.filterDateTime("11-10-2017 15:25:10 -0400")).toBe("11/10/2017");
            expect(BillDisplay.filterDateTime(`01-01-${today.getFullYear()} 15:25:10 -0400`)).toBe("01/01");
            expect(BillDisplay.filterDateTime(`15-01-${today.getFullYear()} 15:25:10 -0400`)).toBe("15/01");
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