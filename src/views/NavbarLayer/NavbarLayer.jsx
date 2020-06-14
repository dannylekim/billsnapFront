import React, { useState } from 'react';

import Navbar from '../../components/Navbar';
import SideBar from '../../components/Sidebar';
import { Logo } from '../../components/Logo/Logo.jsx';

import './styles.scss';

/**
 * Layer used to keep track of sidebar collapse state
 */
export default (props) => {
	const [collapseState, setCollapseState] = useState(false);

	return (
		<div className="billsnap-navbar-layer">
			<Logo />
			<Navbar className="App-navbar" toggleSideBar={() => setCollapseState(!collapseState)}/>
			<SideBar collapseState={collapseState}/>

		</div>
	);
};
