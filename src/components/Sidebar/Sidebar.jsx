import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const SideBar = ({ collapseState }) => {
    return (
        <div className={`billSnap-SideBar billSnap-SideBar-${collapseState ? 'open' : 'close' }`}>
            <a href="#" >Home</a>
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