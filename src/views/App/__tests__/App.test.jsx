import React from "react";
import ReactDOM from "react-dom";
import App from "../App.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createRegisterFormElements} from "../../../constants/FormElements";

jest.mock("../../Dashboard", () => "Dashboard")

const mockStore = configureStore();

const store = mockStore({
  application: {},
});

// NOTE this test will be updated quite often.

describe("App", () => {
  describe("render", () => {
    it("renders without crashing", () => {
      const div = document.createElement("div");
      createRegisterFormElements();
      ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
  });

  describe("functional", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("should call getUser if token exists", () => {
      const mockGetUser = jest.fn();
      localStorage.setItem("billSnap_token", "token");

      mount(
        <Provider store={store}>
          <App getUser={mockGetUser} />
        </Provider>
      );

      expect(mockGetUser).toHaveBeenCalled();
    });
  });
});
