import React, { Component } from "react";
import { Button, Nav, NavItem, NavLink } from "shards-react";

// import { DEFAULT_ACTIVE_STATE } from "../../components/Sidebar/Sidebar.jsx";
import navItems from "../../constants/BillDisplayNav.json";

import BillDisplay from "../BillDisplay";
import BillFilter from "../../components/BillFilter";
import SimpleFilter from "../../components/SimpleFilter";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";

import "./styles.scss";

const BillsSummary = ({ billsVar, activeBill = null }) => {
  return activeBill === null ? (
    <div className='bill__summary'>
      <h5>
        {" "}
        Total Amount Owed :{" "}
        <span id='amount__owed'>
          {" "}
          {billsVar.reduce((a, b) => a + parseFloat(b.balance), 0).toFixed(2)} $
        </span>{" "}
      </h5>
      <h5> Total of bills : {billsVar.length} </h5>
    </div>
  ) : (
    <div className='bill__summary'>
      <h5>
        {`Split by : ${activeBill.responsible.firstName} ${activeBill.responsible.lastName}`}
      </h5>
      <h5> {`Status : ${activeBill.status}`}</h5>
      <h5>
        Amount Owed : <span id='amount__owed'>{activeBill.balance} $</span>{" "}
      </h5>
    </div>
  );
};

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

  updateBills = (type) => {
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

  render() {
    const { dateFilters, filter, billStatusFilter } = this.state;

    return (
      <>
        {localStorage.getItem("billSnap_token") ? (
          <div className='dashboard__flexbox'>
            <div className='bill__wrapper'>
              <div className='bill__section'>
                <SearchBar
                  onInputChangeHandler={(e) =>
                    this.setState({ searchedQuery: e.target.value })
                  }
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

                <div className='bill__list__section'>
                  {this.displayTab(this.state.currentActiveTab)}
                  {/* TODO: display bills/pending bills based on button selected */}
                </div>
              </div>
              <div className='specific__bill__section'>
                {/* { BillsSummary(this.props.bills, this.state.selectedBill.bill) } */}
                {/* <span id="more__details"> More details</span>
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
