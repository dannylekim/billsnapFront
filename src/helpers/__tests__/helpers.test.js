import { filterDateTime } from "../DateTime";
import { capilizeFirstLetter, formatUserFullName } from "../StringName";

describe("function", () => {
  it("formatUserFullName should return full name", () => {
    expect(formatUserFullName("bob", "charles", "smithsonian")).toBe("Bob Charles Smithsonian");
  })
  it("capilizeFirstLetter should capitilize name", () => {
    expect(capilizeFirstLetter("bob")).toBe("Bob");
  });

  it("filterDateTime should return correct format", () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0));
    expect(filterDateTime("05-03-2017 15:25:10 -0400")).toBe("05/03/2017");
    expect(filterDateTime("15-12-2017 15:25:10 -0400")).toBe("15/12/2017");
    expect(filterDateTime("11-10-2017 15:25:10 -0400")).toBe("11/10/2017");
    expect(filterDateTime(`01-01-${today.getFullYear()} 15:25:10 -0400`)).toBe(
      "01/01"
    );
    expect(filterDateTime(`15-01-${today.getFullYear()} 15:25:10 -0400`)).toBe(
      "15/01"
    );
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
});
