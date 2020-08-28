import React from "react";
import BillFilter from "../BillFilter";
import { shallow } from "enzyme";

describe("BillFilter", () => {
  let mockApplyFiltering;
  let mockCloseHandler;
  let mockDateCheckboxHandler;
  let mockFilterToggleChange;
  let mockHandleDateSelection;
  let mockHandleStatusChange;
  let wrapper;

  beforeEach(() => {
    mockApplyFiltering = jest.fn((e) => e);
    mockCloseHandler = jest.fn();
    mockDateCheckboxHandler = jest.fn((e) => e);
    mockFilterToggleChange = jest.fn((e) => e);
    mockHandleDateSelection = jest.fn((date) => date);
    mockHandleStatusChange = jest.fn((type) => type);
  });
  describe("render", () => {
    describe("snapshots 📸", () => {
      wrapper = shallow(
        <BillFilter
          activeTab="allBills"
          applyFiltering={mockApplyFiltering}
          currentSorting="Newest"
          billStatusFilter={{
            resolved: false,
            open: false,
            in_progess: false,
          }}
          closeHandler={mockCloseHandler}
          dateCheckboxHandler={mockDateCheckboxHandler}
          dateFilters={{
            startDate: { selected: false, value: "" },
            endDate: { selected: false, value: "" },
          }}
          filterToggles={{
            statusOpened: false,
            categoryOpened: true,
            dateOpened: false,
          }}
          filterToggleChange={mockFilterToggleChange}
          handleDateSelection={mockHandleDateSelection}
          handleStatusChange={mockHandleStatusChange}
        />
      );
      it("BillFilter should match snap shot when category toggle opened", () => {
        matches(wrapper);
      });
      it("BillFilter should match snap shot when status toggle is opened", () => {
        wrapper.setProps({
          filterToggles: {
            statusOpened: true,
            categoryOpened: false,
            dateOpened: false,
          }
        });
        matches(wrapper);
      });
      it("BillFilter should match snap shot when date toggle is opened", () => {
        wrapper.setProps({
          filterToggles: {
            statusOpened: false,
            categoryOpened: false,
            dateOpened: true,
          }
        });
        matches(wrapper);
      });
    });
  });

  describe("component ", () => {
    beforeEach(() => {
      wrapper = shallow(
        <BillFilter
          activeTab="allBills"
          applyFiltering={mockApplyFiltering}
          currentSorting="Newest"
          billStatusFilter={{
            resolved: false,
            open: false,
            in_progess: false,
          }}
          closeHandler={mockCloseHandler}
          dateCheckboxHandler={mockDateCheckboxHandler}
          dateFilters={{
            startDate: { selected: false, value: "" },
            endDate: { selected: false, value: "" },
          }}
          filterToggles={{
            statusOpened: false,
            categoryOpened: false,
            dateOpened: false,
          }}
          filterToggleChange={mockFilterToggleChange}
          handleDateSelection={mockHandleDateSelection}
          handleStatusChange={mockHandleStatusChange}
        />
      );
    });

    afterEach(() => {
      mockApplyFiltering.mockRestore();
      mockCloseHandler.mockRestore();
      mockDateCheckboxHandler.mockRestore();
      mockFilterToggleChange.mockRestore();
      mockHandleDateSelection.mockRestore();
      mockHandleStatusChange.mockRestore();
    });

    it("should call onClicks of badge clicks", () => {
      const dateFilters = {
        startDate: { selected: true, value: "" },
        endDate: { selected: false, value: "" },
      };

      wrapper.setProps({ dateFilters });

      wrapper.find("Badge").at(0).simulate("click");
      expect(mockApplyFiltering).toBeCalledWith("Newest");
      wrapper.find("Badge").at(1).simulate("click");
      expect(mockApplyFiltering).toBeCalledWith("Oldest");
      wrapper.find("Badge").at(3).simulate("click");
      expect(mockApplyFiltering).toBeCalledWith("A to Z");
      wrapper.find("Badge").at(4).simulate("click");
      expect(mockApplyFiltering).toBeCalledWith("Z to A");
      expect(mockApplyFiltering).toBeCalledTimes(4);

      wrapper.find("Badge").at(2).simulate("click");
      expect(mockFilterToggleChange).toBeCalledWith({
        statusOpened: true,
        categoryOpened: false,
        dateOpened: false,
      });
      wrapper.find("Badge").at(5).simulate("click");
      expect(mockFilterToggleChange).toBeCalledWith({
        categoryOpened: true,
        statusOpened: false,
        dateOpened: false,
      });
      wrapper.find("Badge").at(6).simulate("click");
      expect(mockFilterToggleChange).toBeCalledWith({
        dateOpened: true,
        categoryOpened: false,
        statusOpened: false,
      });
      expect(mockFilterToggleChange).toBeCalledTimes(3);
    });

    it("should show the date value next to start date", () => {
      const dateFilters = {
        startDate: { selected: true, value: "2020-01-01" },
        endDate: { selected: false, value: "" },
      };
      const filterToggles = {
        statusOpened: false,
        categoryOpened: false,
        dateOpened: true,
      };

      wrapper.setProps({ dateFilters, filterToggles });

      expect(wrapper.find("FormCheckbox").at(0).render().text()).toBe(
        "Start date: 2020-01-01"
      );
    });

    it("should show the date value next to end date", () => {
      const dateFilters = {
        startDate: { selected: false, value: "" },
        endDate: { selected: true, value: "2020-01-01" },
      };
      const filterToggles = {
        statusOpened: false,
        categoryOpened: false,
        dateOpened: true,
      };
      wrapper.setProps({ dateFilters, filterToggles });

      expect(wrapper.find("FormCheckbox").at(1).render().text()).toBe(
        "End date: 2020-01-01"
      );
    });

    it("should trigger mockDateCheckboxHandler and handleDateSelection", () => {
      const filterToggles = {
        statusOpened: false,
        categoryOpened: false,
        dateOpened: true,
      };
      wrapper.setProps({ filterToggles });

      wrapper.find("FormCheckbox").at(0).simulate("change");
      expect(mockDateCheckboxHandler).toBeCalledWith("startDate");
      wrapper.find("FormCheckbox").at(1).simulate("change");
      expect(mockDateCheckboxHandler).toBeCalledWith("endDate");
      const event = {
        target: { value: "2020/01/04" },
      };
      wrapper.find("FormInput").at(0).simulate("change", event.target.value);
      expect(mockHandleDateSelection).toBeCalledWith(event.target.value);
    });

    it("should call mockHandleStatusChange 3 times on simulate change", () => {
      const dateFilters = {
        startDate: { selected: false, value: "" },
        endDate: { selected: true, value: "2020-01-01" },
      };
      const filterToggles = {
        statusOpened: true,
        categoryOpened: false,
        dateOpened: false,
      };
      wrapper.setProps({ dateFilters, filterToggles });
      wrapper.find("FormCheckbox").at(0).simulate("change");
      expect(mockHandleStatusChange).toBeCalledWith("resolved");
      wrapper.find("FormCheckbox").at(1).simulate("change");
      expect(mockHandleStatusChange).toBeCalledWith("open");
      wrapper.find("FormCheckbox").at(2).simulate("change");
      expect(mockHandleStatusChange).toBeCalledWith("in_progess");
      expect(mockHandleStatusChange).toBeCalledTimes(3);
    });
  });
});
