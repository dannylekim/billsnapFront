import React from 'react';
import {FaUserCircle} from 'react-icons/fa';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'shards-react';

import './styles.scss';

export default () => {
    return (

        <Navbar>
            <Nav className={"billSnap-SideBar"} vertical={true}>

                <NavbarBrand>
                    <NavLink href="#">
                        Billsnap Logo
                    </NavLink>
                </NavbarBrand>

                <NavItem>
                    <NavLink href="#">
                        <FaUserCircle/>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Settings
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Log Out
                    </NavLink>
                </NavItem>
            </Nav>

        </Navbar>


    )
};