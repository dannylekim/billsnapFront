import React from 'react';
import './styles.scss';
import {Nav, Navbar, NavItem, NavLink} from 'shards-react';

export default ({toggleSideBar}) => {

    const handleBurger = (e) => {
        e.preventDefault();
        toggleSideBar();
    };

    return (
        <Navbar type="light" expand="sm">
            <Nav navbar>
                <NavItem>
                    <NavLink href="#" onClick={handleBurger}>
                        About Us
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        href="#"
                    >
                        Features
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        Contact Us
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};
