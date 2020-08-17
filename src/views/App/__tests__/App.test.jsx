import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createRegisterFormElements} from "../../../constants/FormElements";

const mockStore = configureStore();

const store = mockStore({
  application: {},
  bills: {bills: [] , activeBill: {id: 1, responsible: { firstName: "Bob", lastName: "Smith"}}, searchInput: ""},
  users: {userInfo: {firstName: "Bob"}}
});

// NOTE this test will be updated quite often.

describe("App", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      createRegisterFormElements();
      ReactDOM.render(
        <Provider store={store}>
          <App/>
        </Provider>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });
});
