import React from 'react';
import './styles.scss';
import {Nav, Navbar, NavItem, NavLink} from 'shards-react';

export default () => {
    return (
        <Navbar type="light" expand="sm">
            <Nav navbar>
                <NavItem>
                    <NavLink href="#">
                        Billsnap Logo
                    </NavLink>
                </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
                <NavItem>
                    <NavLink href="#">
                        About us
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        Features
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink>
                        Contact us
                    </NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};
