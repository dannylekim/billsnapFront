import React from "react";
import SearchBar from "../SearchBar";

describe("SearchBar", () => {
  describe("render", () => {
    let handleMockFunction,
      mockSortAlphabetical,
      mockSortingType,
      mockUpdateSearch,
      mockFetchBill,
      mockFetchPendingBill,
      wrapper;

    beforeEach(() => {
      handleMockFunction = jest.fn();
      mockUpdateSearch = jest.fn((e) => e);
      mockFetchBill = jest.fn();
      mockSortingType = jest.fn();
      mockSortingType = "";
      mockFetchPendingBill = jest.fn();

      wrapper = shallow(
        <SearchBar
          updateBillNameSearch={mockUpdateSearch}
          fetchPendingBills={mockFetchPendingBill}
          fetchBills={mockFetchBill}
          orderAlphabetical={mockSortAlphabetical}
          billNameSearch=""
          activeTab="allBills"
        />
      );
    });

    describe("snapshots 📸", () => {
      it("SearchBar should match snap shot without sorting type", () => {
        matches(wrapper);
      });
      it("SearchBar should match snap shot when sorting type is set", () => {
        wrapper.setState({ currentSorting: "A to Z" });
        matches(wrapper);
      });

      it("SearchBar should match snap shot when short filter is visible", () => {
        wrapper.setState((prev) => ({
          toggle: {
            ...prev.toggle,
            short: true,
          },
        }));
        matches(wrapper);
      });

      it("SearchBar should match snap shot when long filter is visible", () => {
        wrapper.setState((prev) => ({
          toggle: {
            ...prev.toggle,
            long: true,
          },
        }));
        matches(wrapper);
      });
    });

    describe("components", () => {
      it("should change seachedQuery state on form search.", () => {
        const event = {
          target: { value: "hahahhahahahha" },
        };

        wrapper.find("FormInput").simulate("change", event);
        expect(mockUpdateSearch).toBeCalledWith(event.target.value);
      });

      it("should call updateBillNameSearch prop on button click.", () => {
        wrapper.setProps({
          billNameSearch: "hahahhahahahha",
        });

        wrapper.find("Button").simulate("click");
        expect(mockUpdateSearch).toBeCalledWith();
      });

      describe("short filter onClicks", () => {
        it("should set short filter as true", () => {
          wrapper.find("span.simple__sort").simulate("click");
          expect(wrapper.state().toggle.short).toBeTruthy();
        });
      });

      describe("long filter onClicks", () => {
        it("should set long filter as true", () => {
          wrapper.find("span.filter__bill").simulate("click");
          expect(wrapper.state().toggle.long).toBeTruthy();
        });
      });

      describe("Functions", () => {
        const DEFAULT_STATE = {
          currentSorting: "Newest",
          dateFilters: {
            startDate: { selected: false, value: "" },
            endDate: { selected: false, value: "" },
          },
          statusFilter: { resolved: false, open: false, in_progess: false },
          toggle: {
            short: false,
            long: false,
          },
          filterToggles: {
            statusOpened: false,
            categoryOpened: false,
            dateOpened: false,
          },
        };

        describe("getSortingParams", () => {
          it("should return correct case for Newest", () => {
            expect(SearchBar.getSortingParams("Newest")).toEqual(
              "sort_by=CREATED&order_by=DESC"
            );
          });

          it("should return correct case for Oldest", () => {
            expect(SearchBar.getSortingParams("Oldest")).toEqual(
              "sort_by=CREATED&order_by=ASC"
            );
          });

          it("should return correct case for 'A to Z'", () => {
            expect(SearchBar.getSortingParams("A to Z")).toEqual(
              "sort_by=NAME&order_by=ASC"
            );
          });

          it("should return correct case for 'Z to A'", () => {
            expect(SearchBar.getSortingParams("Z to A")).toEqual(
              "sort_by=NAME&order_by=DESC"
            );
          });

          it("should return correct case for invalid type", () => {
            expect(SearchBar.getSortingParams("Z 2 A")).toEqual("");
          });
        });

        describe("clearFilter", () => {
          it("should clear all the filter to default value", () => {
            wrapper.setState((prev) => ({
              ...prev,
              statusFilter: { resolved: false, open: true, in_progess: false },
              filterToggles: {
                statusOpened: false,
                categoryOpened: true,
                dateOpened: false,
              },
              dateFilters: {
                startDate: { selected: true, value: "2020-06-13" },
                endDate: { selected: false, value: "" },
              },
            }));

            wrapper.instance().clearFilter();
            expect(wrapper.state()).toEqual(DEFAULT_STATE);
          });
        });

        describe("closeHandler", () => {
          it("should clear toggles", () => {
            wrapper.setState({
              toggle: {
                short: true,
                long: false,
              },
            });

            wrapper.instance().closeHandler();
            expect(wrapper.state()).toEqual(DEFAULT_STATE);
          });
        });

        describe("handleDateSelection", () => {
          const EXPECTED_DATE = "2020-01-01";
          const event = {
            preventDefault: jest.fn(),
            target: {
              value: EXPECTED_DATE,
            },
          };

          it("should not change date value is empty despite value is valid", () => {
            const BLANK_VALUE_EVENT = {
              preventDefault: jest.fn(),
              target: {
                value: "",
              },
            };
            wrapper.setState((prev) => ({
              dateFilters: {
                ...prev.dateFilters,
                startDate: {
                  selected: true,
                  value: "",
                },
                endDate: {
                  selected: true,
                  value: "",
                },
              },
            }));

            wrapper.instance().handleDateSelection(BLANK_VALUE_EVENT);

            expect(wrapper.state().dateFilters.startDate.value).toEqual("");
            expect(wrapper.state().dateFilters.endDate.value).toEqual("");
          });

          it("should not change date value if neither start/end date is selected", () => {
            wrapper.instance().handleDateSelection(event);

            expect(wrapper.state().dateFilters.startDate.value).toEqual("");
            expect(wrapper.state().dateFilters.endDate.value).toEqual("");
          });

          it("should not change date value if both start and end date are selected", () => {
            wrapper.setState((prev) => ({
              dateFilters: {
                ...prev.dateFilters,
                startDate: {
                  selected: true,
                  value: "",
                },
                endDate: {
                  selected: true,
                  value: "",
                },
              },
            }));
            wrapper.instance().handleDateSelection(event);

            expect(wrapper.state().dateFilters.startDate.value).toEqual("");
            expect(wrapper.state().dateFilters.endDate.value).toEqual("");
          });

          it("should change start date value if start date is selected", () => {
            wrapper.setState((prev) => ({
              dateFilters: {
                ...prev.dateFilters,
                startDate: {
                  selected: true,
                  value: "",
                },
              },
            }));

            wrapper.instance().handleDateSelection(event);

            expect(wrapper.state().dateFilters.startDate.value).toEqual(
              EXPECTED_DATE
            );
            expect(wrapper.state().dateFilters.endDate.value).toEqual("");
          });

          it("should change end date value if end date is selected", () => {
            wrapper.setState((prev) => ({
              dateFilters: {
                ...prev.dateFilters,
                endDate: {
                  selected: true,
                  value: "",
                },
              },
            }));

            wrapper.instance().handleDateSelection(event);

            expect(wrapper.state().dateFilters.startDate.value).toEqual("");
            expect(wrapper.state().dateFilters.endDate.value).toEqual(
              EXPECTED_DATE
            );
          });
        });

        describe("dateCheckboxHandler", () => {
          it("should switch selected value to the opposite after getting called on opposeite end", () => {
            wrapper.setState({
              dateFilters: {
                startDate: {
                  selected: false,
                  value: "",
                },
                endDate: {
                  selected: false,
                  value: "",
                },
              },
            });

            wrapper.instance().dateCheckboxHandler("startDate");

            expect(wrapper.state().dateFilters.startDate.selected).toBeTruthy();
            expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();

            wrapper.instance().dateCheckboxHandler("endDate");

            expect(wrapper.state().dateFilters.endDate.selected).toBeTruthy();
            expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
          });
        });

        describe("filterToggleChange", () => {
          it("should set filter toggle and set date selection to false", () => {
            const EXPECTED_CATEGORY_FILTERS = {
              statusOpened: false,
              categoryOpened: true,
              dateOpened: false,
            };
            wrapper.setState({
              dateFilters: {
                startDate: {
                  selected: true,
                  value: "",
                },
                endDate: {
                  selected: false,
                  value: "",
                },
              },
            });

            wrapper.instance().filterToggleChange(EXPECTED_CATEGORY_FILTERS);

            expect(wrapper.state().dateFilters.startDate.selected).toBeFalsy();
            expect(wrapper.state().dateFilters.endDate.selected).toBeFalsy();
            expect(wrapper.state().filterToggles).toEqual(
              EXPECTED_CATEGORY_FILTERS
            );
          });
        });

        describe("onInputChangeHandler", () => {
          it("should call update search prop", () => {
            const TEST_STRING = "🔥🔥🔥🔥🔥🔥🔥🔥";
            const event = {
              preventDefault: jest.fn(),
              target: {
                value: TEST_STRING,
              },
            };

            wrapper.instance().onInputChangeHandler(event);

            expect(mockUpdateSearch).toHaveBeenCalledWith(TEST_STRING);
          });
        });

        describe("statusFilterHandler", () => {
          it("should set status filter value", () => {
            const EXPECTED_STATUS_FILTER = {
              resolved: true,
              open: false,
              in_progess: true,
            };

            wrapper.instance().statusFilterHandler("resolved");
            wrapper.instance().statusFilterHandler("in_progess");

            expect(wrapper.state().statusFilter).toEqual(
              EXPECTED_STATUS_FILTER
            );
          });
        });

        describe("getDateParams", () => {
          it("should return REST params from states if only if start is defined", () => {
            wrapper.setState({
              dateFilters: {
                startDate: {
                  selected: false,
                  value: "2020-04-20",
                },
                endDate: {
                  selected: false,
                  value: "",
                },
              },
            });

            const params = wrapper.instance().getDateParams();
            expect(params).toEqual("start=2020-04-20");
          });
          it("should return REST params from states if both start and end are defined", () => {
            wrapper.setState({
              dateFilters: {
                startDate: {
                  selected: false,
                  value: "2020-04-20",
                },
                endDate: {
                  selected: false,
                  value: "2020-04-25",
                },
              },
            });

            const params = wrapper.instance().getDateParams();
            expect(params).toEqual("start=2020-04-20&end=2020-04-25");
          });
        });

        describe("getAllBillFilter", () => {
          it("should not return filter REST params if none of the filter is true", () => {
            wrapper.setState({
              statusFilter: {
                resolved: false,
                open: false,
                in_progess: false,
              },
            });

            const params = wrapper.instance().getAllBillFilter();
            expect(params).toEqual("");
          });

          it("should return filter REST params from states if 1 of the filter is true", () => {
            wrapper.setState({
              statusFilter: {
                resolved: false,
                open: true,
                in_progess: false,
              },
            });

            const params = wrapper.instance().getAllBillFilter();
            expect(params).toEqual("statuses=OPEN,");
          });

          it("should return filter REST params from states if all of the filter are true", () => {
            wrapper.setState({
              statusFilter: {
                resolved: true,
                open: true,
                in_progess: true,
              },
            });

            const params = wrapper.instance().getAllBillFilter();
            expect(params).toEqual("statuses=RESOLVED,OPEN,IN_PROGRESS");
          });
        });

        describe("applySorting", () => {
          const mockValue = "🧢";
          const mockCloseHandler = jest.fn();
          let mockGetSortingParams;

          beforeEach(() => {
            mockGetSortingParams = jest.fn().mockReturnValue(mockValue);
            SearchBar.getSortingParams = mockGetSortingParams;
            wrapper.instance().closeHandler = mockCloseHandler;
          });

          afterEach(() => {
            mockCloseHandler.mockRestore();
            mockGetSortingParams.mockRestore();
          });

          it("should call the appropriate functions with allBills params", () => {
            const SAMPLE_PARAMS = "🚶‍♂️";
            wrapper.instance().applySorting(SAMPLE_PARAMS);

            const expectedParams = `?${mockValue}`;

            expect(wrapper.state().currentSorting).toBe(SAMPLE_PARAMS);
            expect(mockCloseHandler).toHaveBeenCalled();
            expect(mockGetSortingParams).toHaveBeenCalled();
            expect(mockFetchBill).toHaveBeenCalledWith(expectedParams);
          });

          it("should call the appropriate functions with allBills params for fetchPendingBills", () => {
            const SAMPLE_PARAMS = "🚶‍♂️";
            wrapper.setProps({ activeTab: "owedToYou" });
            wrapper.instance().applySorting(SAMPLE_PARAMS);
            const expectedParams = `?invitation_status=PENDING&${mockValue}`;

            expect(wrapper.state().currentSorting).toBe(SAMPLE_PARAMS);
            expect(mockCloseHandler).toHaveBeenCalled();
            expect(mockGetSortingParams).toHaveBeenCalled();
            expect(mockFetchPendingBill).toHaveBeenCalledWith(expectedParams);
          });

          it("should not call any fetching if activeTab does not exist in switch case", () => {
            const SAMPLE_PARAMS = "🚶‍♂️";
            wrapper.setProps({
              activeTab: "🔥",
            });

            wrapper.instance().applySorting(SAMPLE_PARAMS);

            /**
             *
             * Add more fetchBills mock that have not been called
             */
            expect(mockFetchBill).not.toHaveBeenCalled();
          });
        });

        describe("applyFiltering", () => {
          const mockValue = "🧢";
          const mockDate = "start=2021-03-03";

          const mockCloseHandler = jest.fn();
          let mockGetSortingParams;
          let mockGetDateParams;

          beforeEach(() => {
            mockGetSortingParams = jest.fn().mockReturnValue(mockValue);
            mockGetDateParams = jest.fn().mockReturnValue(mockDate);
            SearchBar.getSortingParams = mockGetSortingParams;
            wrapper.instance().closeHandler = mockCloseHandler;
            wrapper.instance().getDateParams = mockGetDateParams;
          });

          afterEach(() => {
            mockCloseHandler.mockRestore();
            mockGetSortingParams.mockRestore();
            mockGetDateParams.mockRestore();
          });

          it("should call the appropriate functions with allBills params", () => {
            const SAMPLE_PARAMS = "🚶‍♂️";
            const TEST_PARAMS_FOR_FILTER = "🔥";
            const TEST_PARAMS_FOR_DATES = "📆";
            const mockGetAllBillFilter = jest
              .fn()
              .mockReturnValue(TEST_PARAMS_FOR_FILTER);
            mockGetDateParams = jest
              .fn()
              .mockReturnValue(TEST_PARAMS_FOR_DATES);

            wrapper.instance().getAllBillFilter = mockGetAllBillFilter;
            wrapper.instance().getDateParams = mockGetDateParams;

            wrapper.setProps({
              activeTab: "allBills",
            });

            wrapper.instance().applyFiltering(SAMPLE_PARAMS);

            const expectedParams = `?${mockValue}&${TEST_PARAMS_FOR_DATES}&${TEST_PARAMS_FOR_FILTER}`;

            expect(wrapper.state().currentSorting).toBe(SAMPLE_PARAMS);
            expect(mockCloseHandler).toHaveBeenCalled();
            expect(mockGetSortingParams).toHaveBeenCalled();
            expect(mockGetDateParams).toHaveBeenCalled();

            expect(mockGetAllBillFilter).toHaveBeenCalled();

            expect(mockFetchBill).toHaveBeenCalledWith(expectedParams);
          });

          it("should call the appropriate functions with pendingBills params", () => {
            const SAMPLE_PARAMS = "🚶‍️";
            const TEST_PARAMS_FOR_FILTER = "🔥";
            const TEST_PARAMS_FOR_DATES = "📆";
            const mockGetAllBillFilter = jest
              .fn()
              .mockReturnValue(TEST_PARAMS_FOR_FILTER);
            mockGetDateParams = jest
              .fn()
              .mockReturnValue(TEST_PARAMS_FOR_DATES);

            wrapper.instance().getAllBillFilter = mockGetAllBillFilter;
            wrapper.instance().getDateParams = mockGetDateParams;

            wrapper.setProps({
              activeTab: "owedToYou",
            });

            wrapper.instance().applyFiltering(SAMPLE_PARAMS);

            const expectedParams = `?${mockValue}&${TEST_PARAMS_FOR_DATES}&${TEST_PARAMS_FOR_FILTER}&invitation_status=PENDING`;

            expect(wrapper.state().currentSorting).toBe(SAMPLE_PARAMS);
            expect(mockCloseHandler).toHaveBeenCalled();
            expect(mockGetSortingParams).toHaveBeenCalled();
            expect(mockGetDateParams).toHaveBeenCalled();

            expect(mockGetAllBillFilter).toHaveBeenCalled();

            expect(mockFetchPendingBill).toHaveBeenCalledWith(expectedParams);
          });

          it("should not call any fetch function when activeTab props is invalid", () => {
            wrapper.setProps({
              activeTab: "💩",
            });
            wrapper.instance().applyFiltering("");

            /**
             * Add more fetchBills mock that have not been called
             */
            expect(mockFetchBill).not.toHaveBeenCalled();
          });
        });
      });
    });
  });
});
