import React, { Component } from "react";
// import Sidebar from "../../components/Sidebar";
// import { DEFAULT_ACTIVE_STATE } from "../../components/Sidebar/Sidebar.jsx";

import BillDisplay from "../BillDisplay";
import Loader from "../../components/Loader";

import "./styles.scss";

// export default ({history,userInfo}) =>
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   activeState: {
    //     ...DEFAULT_ACTIVE_STATE,
    //     bills: true,
    //   },
    // };
  }
  //testing with @testing-library to be learnt later
  // const [activeState, setActiveState] = useState(
  //                                               {
  //                                                 ...DEFAULT_ACTIVE_STATE,
  //                                                 bills: true
  //                                               }
  //                                             );
  // const [component, setComponent] = useState(<BillDisplay />);

  // filterComponentFromNav = (navType) => {
  //   const filterKeyVal = {
  //     bills: <BillDisplay />,
  //     profile: (
  //       <div>
  //         {" "}
  //         Profile <p> {JSON.stringify(this.props.userInfo)} </p>{" "}
  //       </div>
  //     ), //temporary please allow
  //     contacts: <div> Contacts </div>,
  //     settings: <div> Settings </div>,
  //     help: <div> Help </div>,
  //   };
  //   // setComponent(filterKeyVal[navType]);
  // };

  render() {
    return (
      <div>
        {localStorage.getItem("billSnap_token") ? (
          <div className='dashboard__flexbox'>
            <div className='dashboard__content'>
              {/* {searchBill}
                  {AddBillButton}
                  {NavigationTabs(navItems)}
                  <BillFilter
                    dateFilters={dateFilters}
                    filter={filter}
                    billStatusFilter={billStatusFilter}
                    handleDateSelection={this.handleDateSelection}
                    updateBills={this.updateBills}
                    setState={this.setState.bind(this)}
                  />
                  {this.state.sorting.opened && simpleSort} */}
              <div className='bill__wrapper'>
                {this.props.isBillLoading ? (
                  <Loader />
                ) : (
                  <div className='bill__section'>
                    <div className='bill__list__section'></div>
                  </div>
                )}
                <div className='specific__bill__section'>
                  {/* {BillsSummary(bills)}
                      <span id="more__details"> More details</span>
                      <LargeBillCard selectedBill={this.state.selectedBill} /> */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          this.props.history.push("/")
        )}
      </div>
    );
  }
}
