import React, {Component} from "react";
import "./styles.scss";
// import Loader from "../../components/Loader";
import SmallBillCard from "../../components/BillCard/SmallBillCard";
import LargeBillCard from "../../components/BillCard/LargeBillCard";
import BillFilter from "../../components/BillFilter";
import {Button, Nav, NavItem, NavLink} from "shards-react";
import {FaBars, FaBus, FaCar, FaQuestion, FaSearch, FaShoppingBag, FaShoppingCart, FaUtensils,} from "react-icons/fa";
import navItems from "../../constants/BillDisplayNav.json";

class BillDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seachedQuery: "",
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

  componentDidMount = async () => {
    await this.props.fetchBills();
  };

  static billIcons = (category) => {
    const color = "rgba(0, 0, 0, 0.96)";
    switch (category) {
      case "food":
        return <FaUtensils color={color} size={24} />;
      case "transport":
        return <FaCar color={color} size={24} />;
      case "public-transport":
        return <FaBus color={color} size={24} />;
      case "grocery":
        return <FaShoppingCart color={color} size={24} />;
      case "shopping":
        return <FaShoppingBag color={color} size={24} />;
      default:
        return <FaQuestion color={color} size={24} />;
    }
  };

  static filterDateTime = (timestamp) => {
    let dateTime;
    const date = timestamp.split(" ")[0];
    const time = timestamp.split(" ")[1];
    const dateArray = date.split("-");
    const year = parseInt(dateArray[2]);
    const month = parseInt(dateArray[1]) - 1;
    const day = parseInt(dateArray[0]);

    const dateCreated = new Date(year, month, day).setHours(0, 0, 0, 0);
    const todayDate = new Date().setHours(0, 0, 0, 0);
    if (dateCreated < todayDate) {
      dateTime =
        year < new Date(todayDate).getFullYear()
          ? `${day < 10 ? "0" + day : day}/${
              month + 1 < 10 ? "0" + (month + 1) : month + 1
            }/${year}`
          : `${day < 10 ? "0" + day : day}/${
              month + 1 < 10 ? "0" + (month + 1) : month + 1
            }`;
    } else {
      const hour = parseInt(time.split(":")[0]);
      const minute = parseInt(time.split(":")[1]);
      const AMPM = hour >= 12 ? "PM" : "AM";
      dateTime = `${
        hour > 12 || hour === 0 ? Math.abs(hour - 12) : hour
      }:${minute} ${AMPM}`;
    }
    return dateTime;
  };

  updateBills = (type) => {
    this.setState({
      sorting: { type, opened: false },
      filter: {
        ...this.state.filter,
        opened: false,
        categoryOpened: false,
        statusOpened: false,
        dateOpened: false,
      },
      dateFilters: {
        ...this.state.dateFilters,
        startDate: { ...this.state.dateFilters.startDate, selected: false },
        endDate: { ...this.state.dateFilters.endDate, selected: false },
      },
    });
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

  render = () => {
    const { bills, isBillLoading, count } = this.props;

    /**
     * @description the search bar of the bill
     */
    const searchBill = (
      <div id="search__bill">
        <span className="search__icon">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control border-0"
          onChange={(event) =>
            this.setState({ seachedQuery: event.target.value })
          }
          placeholder="Search bill"
        />
        <span className="search__filter">
          <span
            className="filter__bill"
            onClick={() =>
              this.setState({
                filter: {
                  ...this.state.filter,
                  opened: !this.state.filter.opened,
                },
                sorting: {
                  ...this.state.sorting,
                  opened: false,
                },
              })
            }
          >
            <FaBars size={24} />
          </span>
          <span
            className="simple__sort"
            onClick={() =>
              this.setState({
                filter: {
                  ...this.state.filter,
                  opened: false,
                },
                sorting: {
                  ...this.state.sorting,
                  opened: !this.state.sorting.opened,
                },
              })
            }
          >
            {this.state.sorting.type}{" "}
          </span>
        </span>
      </div>
    );

    /**
     * @description the sorting box when furthest right is clicked
     */
    const simpleSort = (
      <div className="quick__sorting__container">
        <ul className="sorting__content">
          {["Newest", "A to Z", "Z to A", "Oldest"]
            .filter((title) => title !== this.state.sorting.type)
            .map((title, key) => (
              <li
                className="sorting__titles"
                onClick={() => this.updateBills(title)}
                key={key}
              >
                {title}
              </li>
            ))}
        </ul>
      </div>
    );

    /**
     * @description the add new bill button (add new bill)
     */
    const AddBillButton = (
      <Button id="add__bill__button"> {"+ Add bill"} </Button>
    );

    const resetFilters = () => {
      this.props.fetchBills();
      this.setState({
        sorting: { opened: false, type: "Newest" },
        dateFilters: {
          startDate: { selected: false, value: "" },
          endDate: { selected: false, value: "" },
        },
        billStatusFilter: { resolved: false, open: false, in_progess: false },
      });
    };

    const NavigationTabs = (tabItems) => (
      <Nav tabs>
        {tabItems.map((item, key) => (
          <NavItem key={key} onClick={() => key === 0 && resetFilters()}>
            <NavLink
              active={this.state.currentActiveTab === item.name}
              onClick={() => this.setState({ currentActiveTab: item.name })}
            >
              {item.title}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    );
    /**
     * @description returns the list of bills as cards.
     * @param {Array} billsVar the variable bills,
     */
    const BillsList = (billsVar) => {
      billsVar =
        this.state.seachedQuery.trim() !== ""
          ? billsVar.filter((bill) =>
              bill.name.includes(this.state.seachedQuery)
            )
          : billsVar;

      return (
        <div className="bill__container">
          {billsVar.length > 0 ? (
            billsVar.map((bill, key) => (
              <div
                className="bill__card card"
                key={key}
                onClick={() =>
                  this.setState({ selectedBill: { bill, id: key + 1 } })
                }
              >
                <SmallBillCard
                  activeBill={this.state.selectedBill.bill}
                  bill={bill}
                  filterDateTime={this.constructor.filterDateTime}
                  billIcons={this.constructor.billIcons}
                />
                {key !== billsVar.length - 1 && (
                  <hr className="card__seperator" />
                )}
              </div>
            ))
          ) : (
            <p> {`No bills found titled: ${this.state.seachedQuery}`}</p>
          )}
        </div>
      );
    };

    const BillsSummary = (billsVar) => {
      return this.state.selectedBill.bill === null ? (
        <div className="bill__summary">
          <h5>
            {" "}
            Total Amount Owed :{" "}
            <span id="amount__owed">
              {" "}
              {billsVar
                .reduce((a, b) => a + parseFloat(b.balance), 0)
                .toFixed(2)}{" "}
              $
            </span>{" "}
          </h5>
          <h5> Total of bills : {count} </h5>
        </div>
      ) : (
        <div className="bill__summary">
          <h5>
            {`Split by : ${this.state.selectedBill.bill.responsible.firstName} ${this.state.selectedBill.bill.responsible.lastName}`}
          </h5>
          <h5> {`Status : ${this.state.selectedBill.bill.status}`}</h5>
          <h5>
            Amount Owed :{" "}
            <span id="amount__owed">
              {this.state.selectedBill.bill.balance} $
            </span>{" "}
          </h5>
        </div>
      );
    };

    const { dateFilters, filter, billStatusFilter } = this.state;
    return (
      <div className="bill__wrapper">
        {isBillLoading ? (
          // <Loader />
          "nice"
        ) : bills.length > 0 ? (
          <div className="bill__section">
            <div className="bill__list__section">
              {searchBill}
              {AddBillButton}
              {NavigationTabs(navItems)}
              {BillsList(bills)}
              <BillFilter
                dateFilters={dateFilters}
                filter={filter}
                billStatusFilter={billStatusFilter}
                handleDateSelection={this.handleDateSelection}
                updateBills={this.updateBills}
                setState={this.setState.bind(this)}
              />
              {this.state.sorting.opened === true && simpleSort}
            </div>
            <div className="specific__bill__section">
              {BillsSummary(bills)}
              <span id="more__details"> More details</span>
              <LargeBillCard selectedBill={this.state.selectedBill} />
            </div>
          </div>
        ) : (
          <p> No Bills Found</p>
        )}
      </div>
    );
  };
}

export default BillDisplay;
