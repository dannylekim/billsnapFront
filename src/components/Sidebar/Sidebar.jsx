import React from 'react';
import {Face, Help, People, Receipt, Settings} from '@material-ui/icons';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'shards-react';

import './styles.scss';
//import {FaUserCircle} from "react-icons/all";

export default () => {
    return (

        <Navbar>
            <Nav className={"billSnap-SideBar"} vertical={true}>

                <NavbarBrand className={"billSnap-Logo"}>
                    <NavLink href="#">
                        Billsnap Logo
                    </NavLink>
                </NavbarBrand>

                <NavItem>
                    <NavLink href="#">
                        <Receipt/> Bills
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <Face/> Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <People/> Contacts
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <Settings/> Settings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <Help/> Help
                    </NavLink>
                </NavItem>
            </Nav>

        </Navbar>


    )
};