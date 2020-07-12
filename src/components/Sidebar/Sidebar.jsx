import React from 'react';
import {MdFace, MdHelp, MdPeople, MdReceipt, MdSettings} from 'react-icons/md';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'shards-react';

import './styles.scss';
//import {FaUserCircle} from "react-icons/all";

const DEFAULT_ACTIVE_STATE = {
    bills: false,
    profile: false,
    contacts: false,
    settings: false,
    help: false
}

class Sidebar extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            activeState: {
                ...DEFAULT_ACTIVE_STATE
            }
        }
        this.handleClick=this.handleClick.bind(this)
    }

    handleClick(link) {
        this.setState({
            activeState: {
                ...DEFAULT_ACTIVE_STATE,
                [link]:true
            }
        })
    }

    render() {
        return (

            <Navbar>
                <Nav tabs className={"billSnap-SideBar"} vertical={true}>

                    <NavbarBrand className={"sideLogo"}>
                        Billsnap Logo
                    </NavbarBrand>

                    <NavItem>
                        <NavLink onClick={()=>this.handleClick("bills")} active={this.state.activeState.bills}>
                            <MdReceipt/> Bills
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={()=>this.handleClick("profile")} active={this.state.activeState.profile}>
                            <MdFace/> Profile
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <MdPeople/> Contacts
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <MdSettings/> Settings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">
                            <MdHelp/> Help
                        </NavLink>
                    </NavItem>
                </Nav>

            </Navbar>


        )
    }
}

export default Sidebar
