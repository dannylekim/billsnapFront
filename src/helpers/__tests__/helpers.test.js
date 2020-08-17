import React from "react";
import {filterDateTime} from "../DateTime";
import {getBillIcons} from "../Components";
import {FaBus, FaCar, FaQuestion, FaShoppingBag, FaShoppingCart, FaUtensils,} from "react-icons/fa";

describe("function", () => {
    it("filterDateTime should return correct format", () => {
      const today = new Date(new Date().setHours(0, 0, 0, 0));
      expect(filterDateTime("05-03-2017 15:25:10 -0400")).toBe(
        "05/03/2017"
      );
      expect(filterDateTime("15-12-2017 15:25:10 -0400")).toBe(
        "15/12/2017"
      );
      expect(filterDateTime("11-10-2017 15:25:10 -0400")).toBe(
        "11/10/2017"
      );
      expect(
        filterDateTime(
          `01-01-${today.getFullYear()} 15:25:10 -0400`
        )
      ).toBe("01/01");
      expect(
        filterDateTime(
          `15-01-${today.getFullYear()} 15:25:10 -0400`
        )
      ).toBe("15/01");
      expect(
        filterDateTime(
          `${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()} 15:25:10 -0400`
        )
      ).toBe("3:25 PM");
      expect(
        filterDateTime(
          `${today.getDate()}-${
            today.getMonth() + 1
          }-${today.getFullYear()} 3:25:10 -0400`
        )
      ).toBe("3:25 AM");
    });

    it("getBillIcons should return correct Icons", () => { 
      const color = "rgba(0, 0, 0, 0.96)";
      expect(getBillIcons("food")).toStrictEqual(
        <FaUtensils color={color} size={24} />
      );
      expect(getBillIcons("transport")).toStrictEqual(
        <FaCar color={color} size={24} />
      );
      expect(getBillIcons("public-transport")).toStrictEqual(
        <FaBus color={color} size={24} />
      );
      expect(getBillIcons("grocery")).toStrictEqual(
        <FaShoppingCart color={color} size={24} />
      );
      expect(getBillIcons("shopping")).toStrictEqual(
        <FaShoppingBag color={color} size={24} />
      );
      expect(getBillIcons("unknown")).toStrictEqual(
        <FaQuestion color={color} size={24} />
      );
    })
});