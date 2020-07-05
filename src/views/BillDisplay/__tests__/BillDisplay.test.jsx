import React from "react";
import BillDisplay from "../BillDisplay";
import { shallow } from "enzyme";
import { FaUtensils, FaShoppingCart, FaShoppingBag, FaCar, FaBus, FaQuestion } from 'react-icons/fa';

jest.mock("../../../utils/requests/BillRequests", () => {
  return {
    getBill: jest.fn().mockResolvedValue(["bill1", "bill2"]),
  };
});

describe("BillDisplay", () => {
      let wrapper, instance;
      let mockFetch;

      const mockBills = [
        {
          id: 1,
          name: "BILL MOCK 1",
          status: "OPEN",
          category: "string",
          created:  "05-03-2018 15:25:10 -0400",
          balance: 12.0,
        },
        {
          id: 2,
          name: "BILL MOCK 2",
          status: "OPEN",
          category: "string",
          created:  "05-03-2018 15:25:10 -0400",
          balance: 15.0,
        },
      ];

      beforeEach(() => {
        mockFetch = jest.fn();

        wrapper = shallow(
          <BillDisplay bills={mockBills} fetchBills={mockFetch} isBillLoading={false} />
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

          it("should change seachedQuery state on form search.", () => {
            const event = {
              target: { value: 'hahahhahahahha' }
            };

            wrapper.find('input.form-control.border-0').simulate('change', event);
            expect(wrapper.state().seachedQuery).toBe(event.target.value);
          })

          it("should change selectedBill on click.", () => {
            wrapper.find('div.bill__card.card').at(0).simulate('click');
            expect(wrapper.state().selectedBill.bill).toBe(mockBills[0]);
            wrapper.find('div.bill__card.card').at(1).simulate('click');
            expect(wrapper.state().selectedBill.bill).toBe(mockBills[1]);
          })
        });

      describe("components", () => {

        it("BillDisplay should match snap shot when done loading + bills", () => {

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

            const today = new Date(new Date().setHours(0,0,0,0));
            expect(BillDisplay.filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
            expect(BillDisplay.filterDateTime(`01-01-${today.getFullYear()} 15:25:10 -0400`)).toBe("01/01");
            expect(BillDisplay.filterDateTime(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} 15:25:10 -0400`)).toBe("3:25 PM");
            expect(BillDisplay.filterDateTime(`${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} 3:25:10 -0400`)).toBe("3:25 AM");
          });

          it("fetchBill should return correct icon", () => {
            const color = "rgba(0, 0, 0, 0.96)";
            expect(BillDisplay.billIcons("food")).toStrictEqual(<FaUtensils color={color} size={24}/>);
            expect(BillDisplay.billIcons("transport")).toStrictEqual(<FaCar color={color} size={24}/>);
            expect(BillDisplay.billIcons("public-transport")).toStrictEqual(<FaBus color={color} size={24}/>);
            expect(BillDisplay.billIcons("grocery")).toStrictEqual(<FaShoppingCart color={color} size={24}/>);
            expect(BillDisplay.billIcons("shopping")).toStrictEqual(<FaShoppingBag color={color} size={24}/>);
            expect(BillDisplay.billIcons("unknown")).toStrictEqual(<FaQuestion color={color} size={24}/>);
          });
    });
});