import React from 'react';
import './styles.scss';
import { Nav, Navbar,  NavItem, NavLink } from 'shards-react';
import { FaBars, FaHome, FaMoneyBillWave } from 'react-icons/fa';

export default ({ toggleSideBar }) => {

    const handleBurger = (e) => {
        e.preventDefault();
        toggleSideBar();
    }

	return (
		<Navbar type="light" expand="sm">
			<Nav navbar>
				<NavItem>
					<NavLink href="#" onClick={handleBurger}>
						<FaBars />
					</NavLink>
				</NavItem>
				<NavItem>
                    <NavLink
                        href="#"
                    >
						<FaHome />
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink>
						<FaMoneyBillWave />
					</NavLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
};
