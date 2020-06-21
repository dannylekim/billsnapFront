import React from 'react';
import Background from '../Background.jsx';
import { shallow } from "enzyme";

describe('Background', () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("Background should match snap shot if no prop provided", () => {
                matches(<Background />);
            });
            it("Background should match snap shot if wave prop provided", () => {
                matches(<Background showWave/>);
            });
        });
    });

});