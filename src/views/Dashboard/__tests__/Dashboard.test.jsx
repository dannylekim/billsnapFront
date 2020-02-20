import React from "react";
import Dashboard from "../Dashboard";

describe("Dashboard", () => {
   describe("render", () => {
       describe("snapshots 📸", () => {
           it("LandingPage should match snap shot", () => {
               matches(<Dashboard/>);
           });
       });
   });
});