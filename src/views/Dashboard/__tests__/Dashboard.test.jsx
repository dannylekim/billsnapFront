import React from "react";
import Dashboard from "../Dashboard";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {mockUserInfo} from "../../../constants/mockObjects";
const mockStore = configureStore();

const store = mockStore({
  application: {},
  bills: {
    bills: [],
  },
  users: {
    userInfo: mockUserInfo
  }
});

describe("Dashboard", () => {
  describe("render", () => {
    let wrapper, instance
    beforeEach(() => {     
      localStorage.setItem("billSnap_token", "token")
      wrapper = shallow( <Dashboard history={{ push: jest.fn() }} userInfo={mockUserInfo} /> );
      instance = wrapper.instance();
    });
    afterEach(()=> {
      localStorage.removeItem("billSnap_token")
    })
    
    describe("snapshots 📸", () => {
      it("Dashboard should match snap shot when token exist", () => {
        matches(
          <Provider store={store}>
            <Dashboard history={{ push: jest.fn() }} userInfo={mockUserInfo} />
          </Provider>
        );
      });

      it("Dashboard should match snap shot when token does not exist", () => {
        localStorage.removeItem("billSnap_token")
        
        matches(
          <Provider store={store}>
            <Dashboard history={{ push: jest.fn() }} userInfo={mockUserInfo} />
          </Provider>
        );
      });
  
    });

    describe("functions", () => {
      it("should call setComponent when filterComponentNav is called" , () => {
        const spy = jest.spyOn(instance, "setComponent"); 
        instance.filterComponentFromNav("bills");

        expect(spy).toHaveBeenCalledTimes(1);
      })
  
    })
  });
});
