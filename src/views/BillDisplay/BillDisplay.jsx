import React, {Component} from "react";
import './styles.scss';
import { getBill } from "../../utils/requests/BillRequests";
import SmallBillCard from "../../components/BillCard/SmallBillCard";
import LargeBillCard from "../../components/BillCard/LargeBillCard";
import loading from "./gif/loading.gif" 
import { Nav, NavItem, NavLink } from "shards-react";
import { FaUtensils, FaShoppingCart, FaShoppingBag, FaCar, FaBus, FaQuestion, FaSearch } from 'react-icons/fa';
import {navItems} from "../../constants/BillDisplayNav";
class BillDisplay extends Component {

    state = {   user:   { firstName:  "",
                        lastName: ""
                },
                bills:  [],
                billsLoaded: false,
                currentActiveTab: "allBills"
    };

    /**
     * @description calls the getBill function to get all bills for a user, then sets the bills states.
     */
    fetchBill = async () => {
                            const bills =  await getBill();
                            this.setState({...this.state, bills, billsLoaded: true})
    };

    componentDidMount = async () => {
                            await this.fetchBill();
    };

    billIcons = category => {
        const color = "rgba(0, 0, 0, 0.96)";
        switch(category){
            case "food":
                return <FaUtensils color={color} size={24}/>;
            case "transport":
                return <FaCar color={color} size={24}/>;
            case "public-transport":
                return <FaBus color={color} size={24}/>;
            case "grocery":
                return <FaShoppingCart color={color} size={24}/>;
            case "shopping":
                return <FaShoppingBag color={color} size={24}/>;
            default:
                return <FaQuestion color={color} size={24}/>;   
        };
    };
   
    filterDateTime = (timestamp) => {
        let dateTime = "";
        const date  = timestamp.split(" ")[0];
        const time  = timestamp.split(" ")[1];
        const dateArray = date.split("-");
        const year = parseInt(dateArray[2]);
        const month = parseInt(dateArray[1]) - 1;
        const day = parseInt(dateArray[0]);
 
        const dateCreated = new Date(year, month, day).setHours(0,0,0,0);
        const todayDate = new Date().setHours(0,0,0,0);
        if(dateCreated < todayDate){
            const dateString = (year < new Date(todayDate).getFullYear() ) ? `${day < 10 ? "0"+day : day}/${month+1 < 10 ? "0"+(month+1) : month+1}/${year}` : `${day < 10 ? "0"+day : day}/${month+1 < 10 ? "0"+(month+1) : month+1}`;
            dateTime =  dateString;
        } 
        else {
            const hour = parseInt(time.split(":")[0]);
            const minute = parseInt(time.split(":")[1]);
            const AMPM = hour >= 12 ? "PM" : "AM";
            dateTime = `${(hour > 12 || hour === 0) ? Math.abs(hour - 12) : hour}:${minute} ${AMPM}`;
        }
        return dateTime;
    }

    render = () => {
    
    const searchBill = 
        <div id="search__bill">
                <span className="search__icon"><FaSearch /> </span>
                <input type="text" className="form-control"  placeholder= "Search bill"/>
        </div>
      
    const NavigationTabs = tabItems => 
        <Nav tabs>
            { tabItems.map((item, key) =>
            <NavItem key={key}>
                <NavLink active= {this.state.currentActiveTab === item.name ? true : false} onClick= {() => this.setState({currentActiveTab : item.name})}>
                    {item.title}
                </NavLink>
            </NavItem>
            )}
        </Nav>

    const BillsList = (bills) => (
            <div className="bill__container">
                { bills.map((bill,key) =>(
                    <span key = {key}>
                        <SmallBillCard bill={bill} filterDateTime={this.filterDateTime} billIcons={this.billIcons}/>
                    </span>)
                )
                }   
            </div>
    );

    const BillsSummary = (bills) => (
        <div className="bill__summary">
                <h5> Split by : Unknown </h5>
                <h5> Status : OPEN</h5>
                <h5> Total Amount Owed : <span id="amount__owed"> {bills.reduce((a, b) => (a +  parseFloat(b.balance)), 0).toFixed(2)} $</span> </h5>
                <h5> Total of bills : {bills.length} </h5>
        </div>
    );

    const {billsLoaded, bills} = this.state;
    
        return (
            <div className="bill__wrapper"> 
                {!billsLoaded ? 
                <div className="bill__loading">
                    <img src= {loading} alt="loading gif" className="loading__gif"/>
                </div>
                : 
                bills.length > 0  ? 
                <div className="bill__section"> 
                    <div className= "bill__list__section">
                        {searchBill}
                        {NavigationTabs(navItems)}
                        {BillsList(bills)}
                    </div>
                    <div className= "specific__bill__section"> 
                        {BillsSummary(bills)}
                        <span id="more__details"> More details</span>
                        <LargeBillCard />
                    </div>
                </div>
                :
                    <p> No Bills Found</p>
                }
            </div>
        );
    };
};

export default BillDisplay

