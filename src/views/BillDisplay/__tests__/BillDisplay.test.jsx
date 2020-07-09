import React from "react";
import BillDisplay from "../BillDisplay.jsx";
import { shallow } from "enzyme";
import { FaUtensils, FaShoppingCart, FaShoppingBag, FaCar, FaBus, FaQuestion } from 'react-icons/fa';
import { NavLink } from "shards-react";

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
      let wrapper, instance;
      let mockFetch;

      beforeEach(() => {
        mockFetch = jest.fn();

        wrapper = shallow(
          <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={true} />
        );

        instance = wrapper.instance();
      });
      afterEach(() => {
        mockFetch.mockRestore();
      });

      describe("render", () => {
          describe("snapshots 📸", () => {
            it("BillDisplay should match snap shot when loading", () => {
              matches(
                <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={true} />
              );
            });

            it("BillDisplay should match snap shot when done loading + no bills", () => {
              matches(
                <BillDisplay bills={[]} fetchBills={mockFetch} isBillLoading={false} />
              );
            });
          });
        });

      describe("components", () => {
        
        it("BillDisplay should match snap shot when done loading + bills", () => {
          const mockBills = [
            {
              id: 1,
              name: "BILL MOCK 1",
              status: "OPEN",
              category: "string",
              balance: 12.0,
            },
            {
              id: 2,
              name: "BILL MOCK 2",
              status: "OPEN",
              category: "string",
              balance: 15.0,
            },
          ];
          matches(
            <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} />
          );
        });
      });

      describe("functions", () => {
          it("fetchBill should be called 1 time", () => {
            expect(mockFetch).toBeCalledTimes(1);
          });

          it("filterDateTime should return correct format", () => {
            jest.spyOn(instance, 'filterDateTime'); // spy on the filterDateTime
            const date = new Date(new Date().setHours(0,0,0,0));
            expect(instance.filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
            expect(instance.filterDateTime(`01-01-${date.getFullYear()} 15:25:10 -0400`)).toBe("01/01");
            expect(instance.filterDateTime(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} 15:25:10 -0400`)).toBe("3:25 PM");
            expect(instance.filterDateTime(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} 3:25:10 -0400`)).toBe("3:25 AM");
          });

          it("fetchBill should return correct icon", () => {
            jest.spyOn(instance, 'billIcons'); // spy on the billIcons
            const color = "rgba(0, 0, 0, 0.96)";
            expect(instance.billIcons("food")).toStrictEqual(<FaUtensils color={color} size={24}/>);
            expect(instance.billIcons("transport")).toStrictEqual(<FaCar color={color} size={24}/>);
            expect(instance.billIcons("public-transport")).toStrictEqual(<FaBus color={color} size={24}/>);
            expect(instance.billIcons("grocery")).toStrictEqual(<FaShoppingCart color={color} size={24}/>);
            expect(instance.billIcons("shopping")).toStrictEqual(<FaShoppingBag color={color} size={24}/>);
            expect(instance.billIcons("unknown")).toStrictEqual(<FaQuestion color={color} size={24}/>);
          });
    });
});
