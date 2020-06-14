import React from 'react';
import PropTypes from 'prop-types';
import {FaUserCircle} from 'react-icons/fa';

import './styles.scss';

const SideBar = ({collapseState}) => {
    return (
        <div className={`billSnap-SideBar billSnap-SideBar-${collapseState ? 'open' : 'close'}`}>
            <a href="#">
                <FaUserCircle/>
            </a>
            <a href="#">
                Profile
            </a>
            <a href="#">
                Settings
            </a>
            <a href="#">
                Log Out
            </a>
        </div>
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