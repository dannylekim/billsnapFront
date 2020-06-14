import React from 'react';
import PropTypes from 'prop-types';
import {FaUserCircle} from 'react-icons/fa';

import './styles.scss';

const SideBar = ({collapseState}) => {
    return (
        <div className={`billSnap-SideBar billSnap-SideBar-${collapseState ? 'open' : 'close'}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
                <FaUserCircle/>
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
                Profile
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#">
                Settings
            </a>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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