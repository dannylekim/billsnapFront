import React from 'react';
import PropTypes from 'prop-types';
import {FaUserCircle} from 'react-icons/fa';

import './styles.scss';

const SideBar = ({collapseState}) => {
    return (
        <div className={`billSnap-SideBar billSnap-SideBar-${collapseState ? 'open' : 'close'}`}>
            <a href="/dashboard">
                <FaUserCircle/>
            </a>
            <a href="/dashboard">
                Profile
            </a>
            <a href="/dashboard">
                Settings
            </a>
            <a href="/dashboard">
                Log Out
            </a>
        </div>
    )
};

SideBar.propTypes = {
    // vertical or horizontal
    type: PropTypes.string,
};

SideBar.defaultProps = {
    type: "horizontal",
};

export default SideBar;