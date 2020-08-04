import React from "react";
import Navbar from "./Navbar.jsx";

describe("Navbar", () => {
  let wrapper;
  let handleMockFunction;

  beforeEach(() => {
    handleMockFunction = jest.fn();
    wrapper = shallow(<Navbar />);
  });

  describe("render", () => {
    describe("snapshots 📸", () => {
      it("Navbar should match snap shot", () => {
        matches(<Navbar />);
      });
    });
  });
});
