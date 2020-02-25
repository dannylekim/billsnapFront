import React from 'react';
import './styles.scss';

export const Logo = () => {
    return (
        //TODO: change srcSet urls to 'src/assets/logos' image assets
        <picture>
            <source media="(min-width: 768px)" srcSet='https://via.placeholder.com/60x60.png?text=60x60+Logo'/>
            <source media="(min-width: 1024px)" srcSet='https://via.placeholder.com/80x80.png?text=80x80+Logo'/>
            <img src="https://via.placeholder.com/40x40.png?text=40x40+Logo" alt="Small logo"/>
        </picture>
    )
};
