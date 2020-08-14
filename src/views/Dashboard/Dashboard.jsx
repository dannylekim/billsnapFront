import React, { Component } from "react";
import { Button, Nav, NavItem, NavLink } from "shards-react";

// import { DEFAULT_ACTIVE_STATE } from "../../components/Sidebar/Sidebar.jsx";
import navItems from "../../constants/BillDisplayNav.json";

import BillDisplay from "../BillDisplay";
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
      currentActiveTab: "allBills",
    };
  }

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
    const { currentActiveTab } = this.state;

    return (
      <>
        {localStorage.getItem("billSnap_token") ? (
          <div className='dashboard__flexbox'>
            <div className='bill__wrapper'>
              <div className='bill__section'>
                <SearchBar activeTab={currentActiveTab} />
                <Button id='add__bill__button'> {"+ Add bill"} </Button>
                <Nav tabs>
                  {navItems.map((item, key) => (
                    <NavItem key={key}>
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
                </div>
              </div>
              <div className='specific__bill__section'>{/* GL HF */}</div>
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </>
    );
  }
}
