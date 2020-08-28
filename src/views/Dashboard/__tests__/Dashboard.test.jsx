import React from "react";
import Dashboard from "../Dashboard";

jest.mock("../../BillDisplay", () => "BillDisplay");
jest.mock(
  "../../../components/PendingBillsContainer",
  () => "PendingBillsContainer"
);
jest.mock("../../../components/BillSummary", () => "BillSummary");
jest.mock("../../../components/SearchBar", () => "SearchBar");

describe("Dashboard", () => {
  describe("render", () => {
    beforeEach(() => {
      localStorage.setItem("billSnap_token", "token");
    });

    afterEach(() => {
      localStorage.clear();
    });

    describe("snapshots 📸", () => {
      it("Dashboard should match snap shot", () => {
        matches(<Dashboard history={{ push: jest.fn() }} hasUser={true} />);
      });

      it("Dashboard should match snap shot if no user logged", () => {
        matches(<Dashboard history={{ push: jest.fn() }} />);
      });

      it("Dashboard should match snap shot on notifications tab", () => {
        const wrapper = shallow(<Dashboard history={{ push: jest.fn() }} hasUser={true} />);

        wrapper.setState((prev) => ({
          ...prev,
          currentActiveTab: "owedToYou",
        }));

        matches(wrapper);
      });

      it("Dashboard should match snap shot on nothing", () => {
        const wrapper = shallow(<Dashboard history={{ push: jest.fn() }} hasUser={true}/>);

        wrapper.setState((prev) => ({
          ...prev,
          currentActiveTab: "",
        }));

        matches(wrapper);
      });
    });
  });
});
