import React from 'react';
import './styles.scss';
import { Logo } from '../../components/Logo/Logo.jsx';
import {Nav, Navbar, NavItem, NavLink} from 'shards-react';

export default () => {
    return (
        <Navbar type="light" expand="sm">
            <Nav navbar>
                <NavItem>
                    <NavLink href="#">
                        <Logo /> Billsnap Logo
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
                <NavItem>
                    <NavLink href="#">
                        About Us
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
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
