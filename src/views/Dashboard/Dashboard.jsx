import React, { Component } from "react";
import { Button, Nav, NavItem, NavLink } from "shards-react";

import navItems from "../../constants/BillDisplayNav.json";

import BillDisplay from "../BillDisplay";
import SearchBar from "../../components/SearchBar";
import Loader from "../../components/Loader";
import BillSummary from '../../components/BillSummary';

import "./styles.scss";

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
              <div className='specific__bill__section'>
				  <BillSummary />
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
