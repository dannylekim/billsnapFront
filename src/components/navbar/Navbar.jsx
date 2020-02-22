import React from 'react';
import './styles.scss';
import {Nav, NavItem, NavLink} from "shards-react";
import {FaBars, FaHome, FaMoneyBillWave} from 'react-icons/fa';
// FaBars FaHome FaMoneyBillWave
export default () => {
    return (
        <Nav tabs>
            <NavItem>
                <NavLink href="#">
                    <FaBars/>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#">
                    <FaHome/>
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink>
                    <FaMoneyBillWave/>
                </NavLink>
            </NavItem>
        </Nav>
    )
}