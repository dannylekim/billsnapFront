import React from "react";
import Profile from "../../Profile";
import {mockUserInfo} from "../constant/mockObjects";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore();

const store = mockStore({
  users: {userInfo: mockUserInfo}
});

describe("Profile", () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("Profile should match snap shot", () => {
                matches(
                    <Provider store={store}>
                        <Profile
                            userInfo = {mockUserInfo}
                        />
                    </Provider>   )
            });
        });
    });
});