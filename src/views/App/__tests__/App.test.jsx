import React from "react";
import ReactDOM from "react-dom";
import App from "../App.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {createRegisterFormElements} from "../../../constants/FormElements";

jest.mock("../../Dashboard", () => "Dashboard");

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

    it("should call getUser if token exists and not expired", () => {
      const mockGetUser = jest.fn();
      localStorage.setItem(
        "billSnap_token",
        "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtYW55QGJpbGxzLmNvbSIsImV4cCI6MTExMjg1NTgyNjEsInJvbGVzIjpbIjM4IiwiMzkiLCI0OCIsIjQ5IiwiNTAiLCI1MSIsIjUyIiwiNTMiLCI1NCIsIjU1IiwiNTYiLCI1NyIsIjU4IiwiNTkiLCI2MCIsIjYxIiwiNzciLCI3OCIsIjc5IiwiODAiLCI4MSIsIjgyIiwiODMiLCI4NCIsIjk3IiwiOTgiLCI5OSIsIlJFU1BPTlNJQkxFXzQ4IiwiUkVTUE9OU0lCTEVfNDkiLCJSRVNQT05TSUJMRV81MCIsIlJFU1BPTlNJQkxFXzUxIiwiUkVTUE9OU0lCTEVfNTIiLCJSRVNQT05TSUJMRV81MyIsIlJFU1BPTlNJQkxFXzU0IiwiUkVTUE9OU0lCTEVfNTUiLCJSRVNQT05TSUJMRV81NiIsIlJFU1BPTlNJQkxFXzU3IiwiUkVTUE9OU0lCTEVfNTgiLCJSRVNQT05TSUJMRV81OSIsIlJFU1BPTlNJQkxFXzYwIiwiUkVTUE9OU0lCTEVfNjEiXX0.jKJiqw0qg_5TLT-6xcfOjJru4NLRHFYMJFicB2OJaquJGjSsB3BuaGVl425N4BwnnVjg309YSnIK6qgNlzq1mQ"
      );

      mount(
        <Provider store={store}>
          <App getUser={mockGetUser} />
        </Provider>
      );

      expect(mockGetUser).toHaveBeenCalled();
    });
  });
});
