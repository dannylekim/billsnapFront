import React from "react";
import LandingPage from "../../LandingPage";
import {createRegisterFormElements} from "../../../constants/FormElements";
import configureStore from 'redux-mock-store';
import {Provider} from "react-redux";

const mockStore = configureStore();

const store = mockStore({
    application: {
        showRegisterFirst: true,
        isBillLoading: false
    }
});

const store2 = mockStore({
    application: {
        showRegisterFirst: false,
        isBillLoading: false
    }
});

describe("LandingPage", () => {
    let mockFn;
    beforeEach(() => {
        mockFn = jest.fn();
    });

    describe("render", () => {
        describe("snapshots 📸", () => {
            it("LandingPage should match snap shot register", () => {
                createRegisterFormElements();
                matches(<Provider store={store}>
                    <LandingPage formType={'register'} toggleFormType={mockFn}/>
                </Provider>);
            });
            it("LandingPage should match snap shot login", () => {
                createRegisterFormElements();
                matches(<Provider store={store2}> <LandingPage formType={'login'} toggleFormType={mockFn}/>
                </Provider>);
            });
        });
    });
});

