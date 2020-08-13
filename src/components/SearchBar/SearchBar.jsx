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
    } else {
      return null;
    }
  };

  updateBills(e) {
    console.log(e);
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
                this.updateBills(e);
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
  onInputChangeHandler: PropType.func.isRequired, // handler function for input change
};

export default SearchBar;
