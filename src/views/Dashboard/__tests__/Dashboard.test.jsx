import React from "react";
import Dashboard from "../Dashboard";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  application: {},
  bills: {
    bills: [],
  },
});

describe("Dashboard", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Dashboard should match snap shot", () => {
        matches(
          <Provider store={store}>
            <Dashboard history={{ push: jest.fn() }} />
          </Provider>
        );
      });
    });
  });
});

/**
 *  it("should change selectedBill on click.", () => {
        wrapper.find("div.bill__card.card").at(0).simulate("click");
        expect(wrapper.state().selectedBill.bill).toBe(mockBills[0]);
        wrapper.find("div.bill__card.card").at(1).simulate("click");
        expect(wrapper.state().selectedBill.bill).toBe(mockBills[1]);
      });
  
      it("should change activeTab on click.", () => {
        expect(wrapper.state().currentActiveTab).toBe("allBills");
        wrapper.find("NavLink").at(1).simulate("click");
        expect(wrapper.state().currentActiveTab).toBe("owedToYou");
      });
  
      it("should call mock function on all bills", () => {
        wrapper.find("NavItem").at(0).simulate("click");
        expect(mockFetch).toHaveBeenCalled();
      });
 */