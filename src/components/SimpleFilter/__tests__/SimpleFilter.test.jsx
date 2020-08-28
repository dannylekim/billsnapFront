import React from "react";
import SimpleFilter from "../SimpleFilter";

describe("SimpleFilter", () => {
  describe("render", () => {
    let handleMockFunction;
    let mockSortingType;
    
    beforeEach(() => {
        handleMockFunction = jest.fn();
        mockSortingType = "";
    });

    describe("snapshots 📸", () => {
      it("SimpleFilter should match snap shot without sorting type", () => {
        matches(
            <SimpleFilter
                applyFilter={handleMockFunction}
                currentActive={mockSortingType}
            />
        );
      });
      it("SimpleFilter should match snap shot when sorting type is set", () => {
        mockSortingType = 'A to Z';

        matches(
            <SimpleFilter
                applyFilter={handleMockFunction}
                currentActive={mockSortingType}
            />
        );
      });
    });

    describe("interactions", () => {
      it("should call prop handler on click", () => {
        const wrapper = shallow(<SimpleFilter
            applyFilter={handleMockFunction}
            currentActive={mockSortingType}
        />);

        wrapper.find(".sorting__titles").at(1).simulate('click');

        expect(handleMockFunction).toHaveBeenCalled();
      });
    });
  });
});
