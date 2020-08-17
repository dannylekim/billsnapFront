import React from "react";
import Profile from "../../Profile";
import { mockUserInfo } from "../constant/mockObjects";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  users: { userInfo: mockUserInfo },
});

const store2 = mockStore({
  users: { userInfo: {} },
});

describe("Profile", () => {
  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Profile should match snap shot when no users", () => {
        matches(
          <Provider store={store2}>
            <Profile
              userInfo={{ userInfo: {} }}
              hasUsers={false}
              history={{ push: jest.fn() }}
            />
          </Provider>
        );
      });

      it("Profile should match snap shot", () => {
        matches(
          <Provider store={store}>
            <Profile
              userInfo={mockUserInfo}
              hasUsers={true}
              history={{ push: jest.fn() }}
            />
          </Provider>
        );
      });
    });
  });
});
