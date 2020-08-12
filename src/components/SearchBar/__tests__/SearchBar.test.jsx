import React from "react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  describe("render", () => {
    let handleMockFunction;
    let mockSortingType;
    
    beforeEach(() => {
        handleMockFunction = jest.fn();
        mockSortingType = "";
    });

    describe("snapshots 📸", () => {
      it("SearchBar should match snap shot without sorting type", () => {
        matches(
            <SearchBar
                onInputChangeHandler={handleMockFunction}
                advanceFilterHandler={handleMockFunction}
                simpleFilterHandler={handleMockFunction}
                currentSortingType={mockSortingType}
            />
        );
      });
      it("SearchBar should match snap shot when sorting type is set", () => {
        mockSortingType = 'A to Z';

        matches(
            <SearchBar
                onInputChangeHandler={handleMockFunction}
                advanceFilterHandler={handleMockFunction}
                simpleFilterHandler={handleMockFunction}
                currentSortingType={mockSortingType}
            />
        );
      });
    });
  });
});
