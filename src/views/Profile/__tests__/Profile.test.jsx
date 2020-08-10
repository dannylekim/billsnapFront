import React from "react";
import Profile from "../../Profile";
import {mockUserInfo} from "../../../constants/mockObjects";

describe("Profile", () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("Profile should match snap shot", () => {
                matches(
                    <Profile
                    userInfo = {mockUserInfo}
                    />)
            });
        });
    });
});