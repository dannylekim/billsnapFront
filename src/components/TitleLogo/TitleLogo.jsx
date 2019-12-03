import React from 'react';
import './styles.scss';



export const TitleLogo = () => {
   return (
       <div className="title__row">
        <div className="title__title">
            Billsnap
        </div>
        <div className="title__logo">
            Image
        </div>
    </div>
   )
};

export default () => {
    return (
        <div className="title">
            <TitleLogo/>
            <div className="title__row title__text">
                <p>Placeholder paragraph text Placeholder paragraph text Placeholder paragraph text</p>
            </div>
        </div>
    )
};