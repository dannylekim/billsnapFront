import React from "react";
import SearchBar from "../SearchBar";
import BillFilter from "../../BillFilter";
import SimpleFilter from "../../SimpleFilter";

describe("SearchBar", () => {
  describe("render", () => {
    let handleMockFunction ,mockSortAlphabetical,mockSortingType, mockUpdateSearch,mockFetchBill;
    let wrapper, instance
    beforeEach(() => {
        handleMockFunction = jest.fn();
        mockUpdateSearch = jest.fn(e => e);
        mockFetchBill = jest.fn();
        mockSortingType = jest.fn();
        mockSortingType = "";

        wrapper = shallow(
          <SearchBar
            updateBillNameSearch={mockUpdateSearch}
            fetchBills={mockFetchBill}
            orderAlphabetical={mockSortAlphabetical}
            billNameSearch=""
            activeTab="allBills"
          />);
          instance = wrapper.instance();

    });

    describe("snapshots 📸", () => {
      it("SearchBar should match snap shot without sorting type", () => {
        matches(wrapper);
      });
      it("SearchBar should match snap shot when sorting type is set", () => {
        wrapper.setState({currentSorting : "A to Z"})
        matches(wrapper);
      });
    });


    describe("components", () => {
      it("should change seachedQuery state on form search.", () => {
        const event = {
          target: { value: "hahahhahahahha" },
        };
        
        wrapper.find("input.form-control.border-0").simulate("change", event);
        expect(mockUpdateSearch).toBeCalledWith(event.target.value);
      });
  
      describe("short filter onClicks", () => {

        it("should set short filter as true", ()=> {
          wrapper.find("span.simple__sort").simulate("click");
          expect(wrapper.state().toggle.short).toBeTruthy();
        })

        // it("should trigger a Mock function when A to Z is clicked.", () => {
        //   expect(wrapper.find(SimpleFilter)).toHaveLength(1);
        // });

      });

      describe("long filter onClicks", () => {

        it("should set long filter as true", ()=> {
          wrapper.find("span.filter__bill").simulate("click");
          expect(wrapper.state().toggle.long).toBeTruthy();
        });

      });
  
      describe.skip("filter badge onClicks", () => {
        let billFilterWrapper, billWrapper, mockHandleDateSelection;
        beforeEach(() => {
           wrapper.setState((prev) => ({
             toggle: { ...prev.toggle, long: true },
           }))
           wrapper.update();
         
         
          mockHandleDateSelection = jest.fn();
          billFilterWrapper = () =>
            shallow(
              <BillFilter
                dateFilters={wrapper.state().dateFilters}
                filter={wrapper.state().filter}
                billStatusFilter={wrapper.state().billStatusFilter}
                handleDateSelection={mockHandleDateSelection}
                updateBills={(type) => instance.updateBills(type)}
                setState={(newState) => instance.setState(newState)}
              />
            );
          billWrapper = billFilterWrapper();
        });
  
        it("should close filter div", () => {
          expect(wrapper.state().toggle.long).toBeTruthy();
          billWrapper.find("div.filter__header").simulate("click");
          wrapper.update();
          expect(wrapper.state().toggle.long).toBeFalsy();
        });
  
        it("should trigger a Mock function when Newest is selected.", () => {
          billWrapper.find("Badge").at(0).simulate("click"); //calls updateBills
          expect(mockFetchBill).toHaveBeenCalled();
          expect(wrapper.state().currentSorting).toBe("Newest");
        });
  
        it("should trigger a Mock function when Oldest is clicked.", () => {
          billWrapper.find("Badge").at(1).simulate("click");
          expect(mockFetchBill).toHaveBeenCalled();
          expect(wrapper.state().currentSorting).toBe("Oldest");
        });
  
        it("should change status checkbox states on status filter select.", () => {
          expect(wrapper.state().filterToggles.statusOpened).toBeFalsy();
          billWrapper.find("Badge").at(2).simulate("click");
          expect(wrapper.state().filterToggles.statusOpened).toBeTruthy();
  
          billWrapper = billFilterWrapper();
  
          billWrapper.find("FormCheckbox").at(2).simulate("change");
          wrapper.update();
          expect(wrapper.state().statusFilter.in_progess).toBeTruthy();
          expect(wrapper.state().statusFilter.resolved).toBeFalsy();
          expect(wrapper.state().statusFilter.open).toBeFalsy();
  
          billWrapper.find("FormCheckbox").at(1).simulate("change");
          expect(wrapper.state().statusFilter.in_progess).toBeFalsy();
          expect(wrapper.state().statusFilter.resolved).toBeFalsy();
          expect(wrapper.state().statusFilter.open).toBeTruthy();
  
          billWrapper.find("FormCheckbox").at(0).simulate("change");
          expect(wrapper.state().statusFilter.in_progess).toBeFalsy();
          expect(wrapper.state().statusFilter.resolved).toBeTruthy();
          expect(wrapper.state().statusFilter.open).toBeFalsy();
        });
  
        it("should trigger a Mock function when A to Z is clicked.", () => {
          billWrapper.find("Badge").at(3).simulate("click");
          expect(mockSortAlphabetical).toHaveBeenCalled();
          expect(wrapper.state().sorting.type).toBe("A to Z");
        });
  
        it("should trigger a Mock function when Z to A is clicked.", () => {
          billWrapper.find("Badge").at(4).simulate("click");
          expect(mockSortAlphabetical).toHaveBeenCalled();
          expect(wrapper.state().currentSorting).toBe("Z to A");
        });
  
        it("should trigger category open state on category filter select", () => {
          expect(wrapper.state().filterToggles.categoryOpened).toBeFalsy();
          billWrapper.find("Badge").at(5).simulate("click");
          expect(wrapper.state().filterToggles.categoryOpened).toBeTruthy();
        });
  
        describe("testing the date function", () => {
          //has to re-shallow bill filter every time wrapper is updated (.update does not work on functional)
          beforeEach(() => {
            expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
            expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();
  
            billWrapper.find("Badge").at(6).simulate("click");
  
            expect(wrapper.state().filterToggles.dateOpened).toBeTruthy();
          });
  
          describe(" Start date and End date should be triggered on handleDateSelection", () => {
            const event = {
              preventDefault: jest.fn(),
              target: {
                value: "2020-01-01",
              },
            };
  
            it("should change start date checkbox states onChange.", () => {
              billFilterWrapper().find("FormCheckbox").at(0).simulate("change");
              wrapper.update();
  
              billWrapper = billFilterWrapper();
              billWrapper.find("FormInput").simulate("change", event);
              const spy = jest.spyOn(instance, "handleDateSelection"); // handleDateSelection
              instance.handleDateSelection(event);
              wrapper.update();
              expect(wrapper.state().dateFilters.startDate.value).toBe(
                event.target.value
              );
  
              expect(spy).toBeCalledTimes(1);
              expect(spy).toHaveBeenCalledWith(event);
              spy.mockRestore();
            });
  
            it("should change enddate checkbox states onChange.", () => {
              billFilterWrapper().find("FormCheckbox").at(1).simulate("change");
              wrapper.update();
  
              billWrapper = billFilterWrapper();
  
              billWrapper.find("FormInput").simulate("change", event);
              instance.handleDateSelection(event);
              wrapper.update();
              expect(wrapper.state().dateFilters.endDate.value).toBe(
                event.target.value
              );
            });
          });
  
          it("should return null", () => {
            const event = {
              preventDefault: jest.fn(),
              target: {
                value: "",
              },
            };
            billFilterWrapper().find("FormCheckbox").at(1).simulate("change");
            wrapper.update();
  
            billFilterWrapper().find("FormInput").at(0).simulate("change", event);
            expect(instance.handleDateSelection(event)).toBe(null);
          });
        });
      });
    });
  });
});
