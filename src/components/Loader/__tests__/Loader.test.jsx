import React from 'react';
import Background from '../Loader';

describe('Loader', () => {
    describe("render", () => {
        describe("snapshots 📸", () => {
            it("Loader should match snap shot", () => {
                matches(<Background />);
            });
        });
    });

});