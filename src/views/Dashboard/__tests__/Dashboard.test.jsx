import React from "react";
import Dashboard from "../Dashboard";
import BillDisplay from "../../BillDisplay";
import Loader from "../../../components/Loader";
import {shallow} from "enzyme";

import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  application: {},
  bills: {
    bills: [],
    activeBill:{id:1, responsible: {firstName: "Bob", lastName: "Smith"}}
  },
});

describe("Dashboard", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Dashboard should match snap shot when has NO user", () => {
        matches(
          <Provider store={store}>
            <Dashboard hasUser={false} history={{ push: jest.fn() }} />
          </Provider>
        );
      });

      it("Dashboard should match snap shot when has user", () => {
        matches(
          <Provider store={store}>
            <Dashboard hasUser={true} history={{ push: jest.fn() }} />
          </Provider>
        );
      });
    });

    describe("component", () => {
      const wrapper = shallow(<Dashboard hasUser={true} history={{ push: jest.fn() }}/>);
      it("should call setState on Click", () => {
        wrapper.find("NavLink").at(1).simulate("click");
        expect(wrapper.state().currentActiveTab).toBe("owedToYou");
      }) 
    })

    describe("function", () => {
      const wrapper = shallow(<Dashboard hasUser={true} history={{ push: jest.fn() }}/>);
      it("displayTab should return proper Components", () => {
        expect(wrapper.instance().displayTab("allBills")).toStrictEqual(<BillDisplay/>)
        expect(wrapper.instance().displayTab("owedToYou")).toBe("TODO");
        expect(wrapper.instance().displayTab("blahblah")).toStrictEqual(<Loader/>);
      })
    })
  });
});

