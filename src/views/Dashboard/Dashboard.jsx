import React, {Component} from "react";
import {Button, Nav, NavItem, NavLink} from "shards-react";

import navItems from "../../constants/BillDisplayNav.json";

import BillDisplay from "../BillDisplay";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";
import BillSummary from "../../components/BillSummary";

import "./styles.scss";
import PendingBillsContainer from "../../components/PendingBillsContainer";
import LargeBillCard from "../../components/BillCard/LargeBillCard";

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
        return <PendingBillsContainer />;
      default:
        return <Loader />;
    }
  };

  render() {
    const { currentActiveTab } = this.state;
    const { activeBill } = this.props;

    return (
      <>
        {this.props.hasUser ? (
          <div className="dashboard__flexbox">
            <div className="bill__wrapper">
              <div className="bill__section">
                <SearchBar activeTab={currentActiveTab} />
                <Button id="add__bill__button"> {"+ Add bill"} </Button>
                <Nav tabs>
                  {navItems.map((item, key) => (
                    <NavItem key={key}>
                      <NavLink
                        active={this.state.currentActiveTab === item.name}
                        onClick={() =>
                          this.setState({ currentActiveTab: item.name })
                        }
                      >
                        {item.title}
                      </NavLink>
                    </NavItem>
                  ))}
                </Nav>

                <div className="bill__list__section">
                  {this.displayTab(this.state.currentActiveTab)}
                </div>
              </div>
              <div className="specific__bill__section">
                <BillSummary />
                {activeBill && <LargeBillCard selectedBill={activeBill} />}
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
