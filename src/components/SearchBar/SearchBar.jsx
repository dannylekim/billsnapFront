import React, { Component } from "react";
import PropType from "prop-types";

import { FaBars, FaSearch } from "react-icons/fa";

import BillFilter from "../BillFilter";
import SimpleFilter from "../SimpleFilter";

import "./styles.scss";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSorting: "Newest",
      filter: {
        type: "",
        statusOpened: false,
        categoryOpened: false,
        dateOpened: false,
      },
      dateFilters: {
        startDate: { selected: false, value: "" },
        endDate: { selected: false, value: "" },
      },
      billStatusFilter: { resolved: false, open: false, in_progess: false },

      toggle: {
        short: false,
        long: false,
      },
    };
  }

  /**
   * Close all opened filter/sorting popups
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

  updateBills_TEST = (type) => {
    this.setState((prev) => ({
      sorting: { type, opened: false },
      filter: {
        ...prev.filter,
        opened: false,
        categoryOpened: false,
        statusOpened: false,
        dateOpened: false,
      },
      dateFilters: {
        ...prev.dateFilters,
        startDate: { ...prev.dateFilters.startDate, selected: false },
        endDate: { ...prev.dateFilters.endDate, selected: false },
      },
    }));

    if (type !== "A to Z" && type !== "Z to A") {
      const startDate = `start=${this.state.dateFilters.startDate.value}`;
      const endDate = `end=${this.state.dateFilters.endDate.value}`;

      const filterQueryParam = {
        Newest: `?${startDate}&${endDate}&sort_by=CREATED&order_by=DESC`,
        Oldest: `?${startDate}&${endDate}&sort_by=CREATED&order_by=ASC`,
      };
      this.props.fetchBills(filterQueryParam[type]);
    } else this.props.orderAlphabetical(type, this.props.bills);
  };

  updateBills(e) {
    console.log(e);
  }

  /**
   * Convert filtering data into REST params string
   */
  getFilterParams = () => {
    
  }

  /**
   * Convert sorting type into REST params string
   */
  static getSortingParams = (type) => {
    switch(type) {
      case "Newest":
        return `sort_by=CREATED&order_by=DESC`;
      case "Oldest":
        return `sort_by=CREATED&order_by=ASC`;
      case "A to Z":
        return 'sort_by=NAME&order_by=ASC';
      case "Z to A":
        return 'sort_by=NAME&order_by=DESC';
      default:
        return '';
    }
  }

  applySorting = (type) => {
    this.setState({
      currentSorting: type,
    });
    this.closeHandler();

    const params = this.constructor.getSortingParams(type);

    switch(this.props.activeTab) {
      case 'allBills':
        return this.props.fetchBills(`?${params}`);
      default:
        break;
    }

  }

  render() {
    const {
      onInputChangeHandler,
    } = this.props;

    const { dateFilters, filter, billStatusFilter, currentSorting } = this.state;

    return (
      <div id='search__bill'>
        <div id='search__bill-bar'>
          <span className='search__icon'>
            <FaSearch />
          </span>
          <input
            type='text'
            className='form-control border-0'
            onChange={onInputChangeHandler}
            placeholder='Search bill'
          />
          <span className='search__filter'>
            <span
              className='filter__bill'
              onClick={() =>
                this.setState((prev) => ({
                  toggle: { ...prev.toggle, long: true },
                }))
              }>
              <FaBars size={24} />
            </span>
            <span
              className='simple__sort'
              onClick={() =>
                this.setState((prev) => ({
                  toggle: { ...prev.toggle, short: true },
                }))
              }>
              {currentSorting}{" "}
            </span>
          </span>
        </div>
        <div id='search__bill-options'>
          {this.state.toggle.long && (
            <BillFilter
              dateFilters={dateFilters}
              filter={filter}
              billStatusFilter={billStatusFilter}
              handleDateSelection={this.handleDateSelection}
              updateBills={this.updateBills}
              setState={this.setState.bind(this)}
              closeHandler={this.closeHandler}
            />
          )}
          {this.state.toggle.short && (
            <SimpleFilter
              applyFilter={(e) => {
                /** TODO change bill filter */
                this.applySorting(e);
              }}
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
