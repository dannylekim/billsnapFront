import React, { Component } from "react";
import { Button, Nav, NavItem, NavLink } from "shards-react";

// import { DEFAULT_ACTIVE_STATE } from "../../components/Sidebar/Sidebar.jsx";
import navItems from "../../constants/BillDisplayNav.json";

import BillDisplay from "../BillDisplay";
// import BillFilter from "../../components/BillFilter";
import SimpleFilter from "../../components/SimpleFilter";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";

import "./styles.scss";

// export default ({history,userInfo}) =>
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedQuery: "",
      selectedBill: { bill: null, id: 0 },
      currentActiveTab: "allBills",
      sorting: { opened: false, type: "Newest" },
      filter: {
        opened: false,
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
    };
  }

  resetFilters = () => {
    this.setState({
      sorting: { opened: false, type: "Newest" },
      dateFilters: {
        startDate: { selected: false, value: "" },
        endDate: { selected: false, value: "" },
      },
      billStatusFilter: { resolved: false, open: false, in_progess: false },
    });
  };

  displayTab = (navType) => {
    switch (navType) {
      case "allBills":
        return <BillDisplay />;
      case "owedToYou":
        return "TODO";
      default:
        return <Loader />;
    }
  };

  render() {
    const { dateFilters, filter, billStatusFilter } = this.state;

    return (
      <>
        {localStorage.getItem("billSnap_token") ? (
          <div className='dashboard__flexbox'>
            {/* 
                  <BillFilter
                    dateFilters={dateFilters}
                    filter={filter}
                    billStatusFilter={billStatusFilter}
                    handleDateSelection={this.handleDateSelection}
                    updateBills={this.updateBills}
                    setState={this.setState.bind(this)}
                  />
                  */}
            <div className='bill__wrapper'>
              <div className='bill__section'>
                <SearchBar
                  onInputChangeHandler={(e) =>
                    this.setState({ searchedQuery: e.target.value })
                  }
                  advanceFilterHandler={() => {}}
                  simpleFilterHandler={() => {}}
                  currentSortingType={this.state.sorting.type}
                />
                <Button id='add__bill__button'> {"+ Add bill"} </Button>
                <Nav tabs>
                  {navItems.map((item, key) => (
                    <NavItem
                      key={key}
                      onClick={() => key === 0 && this.resetFilters()}>
                      <NavLink
                        active={this.state.currentActiveTab === item.name}
                        onClick={() =>
                          this.setState({ currentActiveTab: item.name })
                        }>
                        {item.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>
                {this.state.sorting.opened && (
                  <SimpleFilter
                    applyFilter={() => {
                      /** TODO change bill filter */
                    }}
                    currentActive={this.state.sorting.type}
                  />
                )}
                <div className='bill__list__section'>
                  {this.displayTab(this.state.currentActiveTab)}
                  {/* TODO: display bills/pending bills based on button selected */}
                </div>
              </div>
              <div className='specific__bill__section'>
                {/* {BillsSummary(bills)}
                      <span id="more__details"> More details</span>
                      <LargeBillCard selectedBill={this.state.selectedBill} /> */}
              </div>
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </>
    );
  }
}
