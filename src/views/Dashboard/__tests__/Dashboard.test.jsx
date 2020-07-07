import React from "react";
import Dashboard from "../Dashboard";
import configureStore from 'redux-mock-store';
import { Provider } from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  application: {},
  bills: {
      bills: []
  }
});


describe("Dashboard", () => {
   describe("render", () => {
       describe("snapshots 📸", () => {
           it("Dashboard should match snap shot", () => {
               matches(
                <Provider store={store}>
                    <Dashboard/>
                </Provider>);
           });
       });
   });
});