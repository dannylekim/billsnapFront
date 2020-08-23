import React from "react";
import BillFilter from "../BillFilter";
import {shallow} from "enzyme";

describe("BillFilter", () => {
  let mockApplyFiltering;
  let mockCloseFunction;
  let mockDateCheckboxHandler;
  let mockFilterToggleChange;
  let mockHandleDateSelection;
  let mockHandleStatusChange;
  let wrapper;
  let instance;

  let SAMPLE_BILL_STATUS = {
    resolved: false,
    open: false,
    in_progess: false
  };

  let SAMPLE_DATE_FILTER = {
    startDate: { selected: false, value: "" },
    endDate: { selected: false, value: "" },
  };

  let SAMPLE_FILTER_TOGGLES = {
    statusOpened: false,
    categoryOpened: false,
    dateOpened: false,
  };

  beforeEach(() => {
    mockApplyFiltering = jest.fn();
    mockCloseFunction = jest.fn();
    mockDateCheckboxHandler = jest.fn();
    mockFilterToggleChange = jest.fn();
    mockHandleDateSelection = jest.fn();
    mockHandleStatusChange = jest.fn();

    wrapper = shallow(
      <BillFilter
        activeTab={'allBills'}
        applyFiltering={mockApplyFiltering}
        currentSorting="Newest"
        billStatusFilter={SAMPLE_BILL_STATUS}
        closeHandler={mockCloseFunction}
        dateCheckboxHandler={mockDateCheckboxHandler}
        dateFilters={SAMPLE_DATE_FILTER}
        filterToggles={SAMPLE_FILTER_TOGGLES}
        filterToggleChange={mockFilterToggleChange}
        handleDateSelection={mockHandleDateSelection}
        handleStatusChange={mockHandleStatusChange}
      />
    );
    instance = wrapper.instance();
  });

  afterEach(() => {

  })

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("BillFilter should match snap shot if none of the filters are active", () => {
        matches(wrapper);
      });
      it("BillFilter should match snap shot if date filter is active", () => {
        wrapper.setProps({
          filterToggles: {
            ...SAMPLE_FILTER_TOGGLES,
            dateOpened: true
          }
        })
        matches(wrapper);
      });
      it("BillFilter should match snap shot if status filter is active", () => {
        wrapper.setProps({
          filterToggles: {
            ...SAMPLE_FILTER_TOGGLES,
            statusOpened: true
          }
        })
        matches(wrapper);
      });
      it("BillFilter should match snap shot if category filter is active", () => {
        wrapper.setProps({
          filterToggles: {
            ...SAMPLE_FILTER_TOGGLES,
            categoryOpened: true
          }
        })
        matches(wrapper);
      });
    });
  });

  describe("component ", () => {
    it("should show the date value next to start date", () => {
      wrapper.setProps({
        dateFilters:{
          startDate: { selected: true, value: "2020-01-01" },
          endDate: { selected: false, value: "" },
        },
        filterToggles: {
          statusOpened: false,
          categoryOpened: false,
          dateOpened: true,
        }
      });

      expect(wrapper.find("FormCheckbox").at(0).render().text()).toBe(
        "Start date: 2020-01-01"
      );
    });

    it("should show the date value next to end date", () => {
      wrapper.setProps({
        dateFilters:{
          startDate: { selected: false, value: "" },
          endDate: { selected: true, value: "2020-01-01" },
        },
        filterToggles: {
          statusOpened: false,
          categoryOpened: false,
          dateOpened: true,
        }
      });

      expect(wrapper.find("FormCheckbox").at(1).render().text()).toBe(
        "End date: 2020-01-01"
      );
    });
  });
});
