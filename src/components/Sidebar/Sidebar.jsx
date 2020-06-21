import React from 'react';
import PropTypes from 'prop-types';
import {FaUserCircle} from 'react-icons/fa';
import {Nav, NavItem, NavLink} from 'shards-react';

import './styles.scss';

const SideBar = () => {
    return (
        <Nav className={"billSnap-SideBar"} vertical={true}>
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
    )
}

SideBar.propTypes = {
    // vertical or horizontal
    type: PropTypes.string,
}

SideBar.defaultProps = {
    type: "horizontal",
};

export default SideBar;