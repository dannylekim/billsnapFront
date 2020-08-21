import React from "react";
import Sidebar from "./Sidebar.jsx";
import { DEFAULT_ACTIVE_STATE } from "../Sidebar";
import { NavLink } from "shards-react";

describe("Sidebar", () => {
  let wrapper;
  let mockSetUser, mockSetActiveState, mockFilterComponent, mockHistoryPush;

  const STARTING_ACTIVE_STATE = {
    ...DEFAULT_ACTIVE_STATE,
    bills: true,
  };

  mockSetActiveState = (activeState) => wrapper.setProps({ activeState });

  beforeEach(() => {
    mockSetUser = jest.fn();
    mockFilterComponent = jest.fn();
    mockHistoryPush = jest.fn();
    wrapper = shallow(
      <Sidebar
        setUser={mockSetUser}
        activeState={STARTING_ACTIVE_STATE}
        setActiveState={mockSetActiveState}
        filterComponentFromNav={mockFilterComponent}
        history={{
          push: mockHistoryPush,
        }}
      />
    );
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Sidebar should match snap shot", () => {
        matches(<Sidebar history={{ push: mockHistoryPush }} />);
      });

      it("Sidebar should match snap shot is another row is active", () => {
        const activeState = {
          ...DEFAULT_ACTIVE_STATE,
          contacts: true,
        };
        wrapper.setState({
          activeState,
        });
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
      it("should not change state if parameter does not exist as a activeState key", () => {
        const startingState = {
          dashboard: false,
          profile: false,
          contacts: false,
          settings: false,
          help: false,
        };
        wrapper.setState({
          activeState: startingState,
        });
        wrapper.instance().handleClick("starlord");
        expect(wrapper.state("activeState")).toEqual(startingState);

        wrapper.instance().handleClick("profile");
        expect(wrapper.state("activeState")).toEqual({
          ...startingState,
          profile: true,
        });
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
