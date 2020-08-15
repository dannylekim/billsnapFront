import React from "react";
import SimpleFilter from "../SimpleFilter";

describe("SimpleFilter", () => {
  describe("render", () => {
    let handleMockFunction;
    let mockSortingType;
    // let wrapper;
    
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


// describe("simple sort onClicks", () => {
      
//   const sortingTitles = "li.sorting__titles";
//   it("should trigger a Mock function when A to Z is clicked.", () => {
//     wrapper.find(sortingTitles).at(0).simulate("click");
//     expect(mockSortAlphabetical).toHaveBeenCalled();
//     expect(wrapper.state().sorting.type).toBe("A to Z");
//   });

//   it("should trigger a Mock function when Z to A is clicked.", () => {
//     wrapper.find(sortingTitles).at(1).simulate("click");
//     expect(mockSortAlphabetical).toHaveBeenCalled();
//     expect(wrapper.state().sorting.type).toBe("Z to A");
//   });

//   it("should trigger a Mock function when Newest is selected after oldest is selected.", () => {
//     wrapper.find(sortingTitles).at(2).simulate("click");
//     expect(mockFetchBill).toHaveBeenCalled();
//     wrapper.find("span.simple__sort").simulate("click");
//     wrapper.update();
//     wrapper.find(sortingTitles).at(0).simulate("click");
//     expect(mockFetchBill).toHaveBeenCalled();
//   });
// });