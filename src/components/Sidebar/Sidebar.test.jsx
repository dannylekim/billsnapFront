import React from "react";
import Sidebar, {DEFAULT_ACTIVE_STATE} from "./Sidebar.jsx";
import SidebarComponent from "../Sidebar";
import {NavLink} from "shards-react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore();

const store = mockStore({});

describe("Sidebar", () => {
  let wrapper;
  let handleMockFunction, mockSetUser,mockSetActiveState, mockSetComponent;

  const STARTING_ACTIVE_STATE = {
    ...DEFAULT_ACTIVE_STATE,
    bills: true
  };

  mockSetActiveState = (activeState) => wrapper.setProps({activeState});

  beforeEach(() => {
    handleMockFunction = jest.fn();
    mockSetUser = jest.fn();
    mockSetComponent= jest.fn();
    wrapper = shallow(<Sidebar setUser={mockSetUser} activeState={STARTING_ACTIVE_STATE} setActiveState={mockSetActiveState} setComponent={mockSetComponent}/>);
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Sidebar should match snap shot", () => {
        matches(<Sidebar activeState={STARTING_ACTIVE_STATE} setActiveState={mockSetActiveState} setComponent={mockSetComponent}/>);
      });

      it("SidebarComponent should match snap shot", () => {
        matches(
          <Provider store={store}>
            <SidebarComponent setUser={mockSetUser} activeState={STARTING_ACTIVE_STATE} setActiveState={mockSetActiveState} setComponent={mockSetComponent}  />
          </Provider>
        );
      });

      it("Sidebar should match snap shot", () => {
        const EXPECTED_STATE = {
          ...DEFAULT_ACTIVE_STATE,
          contacts: true,
        };
        wrapper = shallow(<Sidebar setUser={mockSetUser} activeState={EXPECTED_STATE} setActiveState={mockSetActiveState} setComponent={mockSetComponent} />);
        matches(wrapper);
      });
    });
    describe("interactions", () => {
      it("Navlink should call all click handles on click", () => {
        const mockHandleClick = jest.fn();
        const mockHandleLogoutClick = jest.fn();

        wrapper.instance().handleClick = mockHandleClick;
        wrapper.instance().handleLogoutClick = mockHandleLogoutClick;
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__bills")
          .simulate("click");
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__profile")
          .simulate("click");
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__contacts")
          .simulate("click");
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__settings")
          .simulate("click");
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__help")
          .simulate("click");
        wrapper
          .find(NavLink)
          .filter("#billSnap-SideBar__logout")
          .simulate("click");
        expect(mockHandleClick).toHaveBeenCalledTimes(5);
        expect(mockHandleLogoutClick).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("function", () => {
    describe("handleClick", () => {
      it("should not change props if parameter does not exist in this props", () => {
        wrapper.instance().handleClick("starlord");
        expect(wrapper.find(NavLink).at(0).prop("active")).toBeTruthy();
      });
      it("should change props if parameter does exist in this props", () => {
        wrapper.instance().handleClick("contacts");
        expect(wrapper.find(NavLink).at(0).prop("active")).toBeFalsy();
        expect(wrapper.find(NavLink).at(2).prop("active")).toBeTruthy();
      });
    });
    describe("handleLogoutClick", () => {
      it("should clear local storage", () => {
        const EXPECTED_LENGTH = 0;
        wrapper.setProps({
          setUser: mockSetUser,
        });
        wrapper.instance().handleLogoutClick();
        const ACTUAL_LENGTH = localStorage.length;
        expect(ACTUAL_LENGTH).toEqual(EXPECTED_LENGTH);
      });
    });
  });
});
