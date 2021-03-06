import React, {Component} from "react";
import PropType from "prop-types";

import {FaBars, FaSearch} from "react-icons/fa";
import {Button, FormInput} from "shards-react";

import BillFilter from "../BillFilter";
import SimpleFilter from "../SimpleFilter";

import "./styles.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      // TODO
      // categoryFilter: ''
    };
  }

  /**
   * Convert sorting type into REST params string
   */
  static getSortingParams = (type) => {
    switch (type) {
      case "Newest":
        return `sort_by=CREATED&order_by=DESC`;
      case "Oldest":
        return `sort_by=CREATED&order_by=ASC`;
      case "A to Z":
        return "sort_by=NAME&order_by=ASC";
      case "Z to A":
        return "sort_by=NAME&order_by=DESC";
      default:
        return "";
    }
  };

  clearFilter = () => {
    this.setState({
      filterToggles: {
        statusOpened: false,
        categoryOpened: false,
        dateOpened: false,
      },
      dateFilters: {
        startDate: { selected: false, value: "" },
        endDate: { selected: false, value: "" },
      },
      statusFilter: { resolved: false, open: false, in_progess: false },
    });
  };

  /**
   * Close all opened filterToggles/sorting popups
   */
  closeHandler = () => {
    this.setState({
      toggle: {
        short: false,
        long: false,
      },
    });
  };

  /**
   * Convert filtering data into REST params string
   */
  getDateParams = () => {
    let params = "";

    const { dateFilters } = this.state;

    if (dateFilters.startDate.value) {
      params = `start=${this.state.dateFilters.startDate.value}`;
    }

    if (dateFilters.startDate.value && dateFilters.endDate.value) {
      params += `&`;
    }

    if (dateFilters.endDate.value) {
      params += `end=${this.state.dateFilters.endDate.value}`;
    }

    return params;
  };

  getAllBillFilter = () => {
    const { resolved, open, in_progess } = this.state.statusFilter;

    // If none of the filters are on, skip
    if (!resolved && !open && !in_progess) {
      return "";
    }

    let params = "statuses=";

    if (resolved) {
      params += "RESOLVED,";
    }
    if (open) {
      params += "OPEN,";
    }
    if (in_progess) {
      params += "IN_PROGRESS";
    }

    return params;
  };

  /**
   * Get the REST sorting params and immediately fetch bills according to activeTab
   */
  applySorting = (type) => {
    this.setState({
      currentSorting: type,
    });
    this.closeHandler();

    const params = this.constructor.getSortingParams(type);

    switch (this.props.activeTab) {
      case "allBills":
        return this.props.fetchBills(`?${params}`);
      case "owedToYou":
        return this.props.fetchPendingBills(`?invitation_status=PENDING&${params}`);
      default:
        return;
    }
  };

  /**
   * Similar to applySorting() above, however the bill filtering params will also be included in the REST call.
   *
   * @param {String} sortingType
   */
  applyFiltering = (sortingType) => {
    this.setState({
      currentSorting: sortingType,
    });
    this.closeHandler();
    const sortingParams = this.constructor.getSortingParams(sortingType);
    const dateParams = this.getDateParams();
    let filterParams;
    let totalParams;

    switch (this.props.activeTab) {
      case "allBills":
        filterParams = this.getAllBillFilter();
        totalParams = `?${sortingParams}&${dateParams}&${filterParams}`;
        return this.props.fetchBills(`${totalParams}`);
      case "owedToYou":
        filterParams = this.getAllBillFilter();
        totalParams = `?${sortingParams}&${dateParams}&${filterParams}&invitation_status=PENDING`;
        return this.props.fetchPendingBills(`${totalParams}`);
      default:
        return;
    }
  };

  /**
   * Change date state on handler event
   */
  handleDateSelection = (event) => {
    event.preventDefault();
    const date = event.target.value;

    if (date !== "") {
      if (
        this.state.dateFilters.startDate.selected === true &&
        this.state.dateFilters.endDate.selected === false
      ) {
        this.setState({
          dateFilters: {
            ...this.state.dateFilters,
            startDate: { ...this.state.dateFilters.startDate, value: date },
          },
        });
      }

      if (
        this.state.dateFilters.endDate.selected === true &&
        this.state.dateFilters.startDate.selected === false
      ) {
        this.setState({
          dateFilters: {
            ...this.state.dateFilters,
            endDate: { ...this.state.dateFilters.endDate, value: date },
          },
        });
      }
    }
  };

  /**
   * Date checkbox handler to enable date modification. It can only be start XOR end.
   */
  dateCheckboxHandler = (startOrEnd, selected = true) => {
    const oppositeDate = startOrEnd === "startDate" ? "endDate" : "startDate";
    this.setState((prev) => ({
      dateFilters: {
        ...prev.dateFilters,
        [startOrEnd]: {
          ...prev.dateFilters[startOrEnd],
          selected,
        },
        [oppositeDate]: {
          ...prev.dateFilters[oppositeDate],
          selected: !selected,
        },
      },
    }));
  };

  /**
   * Switch focus between status, category XOR date filter.
   */
  filterToggleChange = (filterToggles) => {
    this.setState((prev) => ({
      filterToggles,
      dateFilters: {
        ...prev.dateFilters,
        startDate: { ...prev.dateFilters.startDate, selected: false },
        endDate: { ...prev.dateFilters.endDate, selected: false },
      },
    }));
  };

  statusFilterHandler = (status) => {
    this.setState((prev) => ({
      statusFilter: {
        ...prev.statusFilter,
        [status]: !prev.statusFilter[status],
      },
    }));
  };

  onInputChangeHandler = (e) => {
    const value = e.target.value;
    this.props.updateBillNameSearch(value);
  };

  render() {
    const {
      dateFilters,
      filterToggles,
      statusFilter,
      currentSorting,
    } = this.state;

    return (
      <div id="search__bill">
        <div id="search__bill-bar">
          <span className="search__icon">
            <FaSearch />
          </span>
          <FormInput
            type="text"
            onChange={this.onInputChangeHandler}
            placeholder="Search bill"
            value={this.props.billNameSearch}
          />
          {this.props.billNameSearch && (
            <Button
              onClick={() => this.props.updateBillNameSearch()}
              theme="light"
            >
              Clear
            </Button>
          )}
          <span className="search__filter">
            <span
              className="filter__bill"
              onClick={() =>
                this.setState((prev) => ({
                  toggle: { ...prev.toggle, long: true },
                }))
              }
            >
              <FaBars size={24} />
            </span>
            <span
              className="simple__sort"
              onClick={() =>
                this.setState((prev) => ({
                  toggle: { ...prev.toggle, short: true },
                }))
              }
            >
              {currentSorting}
            </span>
          </span>
        </div>
        <div id="search__bill-options">
          {this.state.toggle.long && (
            <BillFilter
              activeTab={this.props.activeTab}
              currentSorting={currentSorting}
              applyFiltering={this.applyFiltering}
              billStatusFilter={statusFilter}
              closeHandler={this.closeHandler}
              dateFilters={dateFilters}
              dateCheckboxHandler={this.dateCheckboxHandler}
              filterToggles={filterToggles}
              filterToggleChange={this.filterToggleChange}
              handleDateSelection={this.handleDateSelection}
              handleStatusChange={this.statusFilterHandler}
            />
          )}
          {this.state.toggle.short && (
            <SimpleFilter
              applyFilter={this.applySorting}
              closeHandler={this.closeHandler}
              currentActive={this.state.currentSorting}
            />
          )}
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  activeTab: PropType.string,
};

export default SearchBar;
