import React, {useEffect, useState} from 'react';
import PropType from 'prop-types';
import './styles.scss';

//TODO: replace logo consts with 'src/assets/logo' images
const logoSmall = "https://via.placeholder.com/30x30.png?text=30x30+Logo";
const logoMed = "https://via.placeholder.com/60x60.png?text=60x60+Logo";
const logoLarge = "https://via.placeholder.com/100x100.png?text=100x100+Logo";

export const Logo = (prop) => {

    const [imgSrc, setImgSrc] = useState(logoSmall);

    useEffect(() => {
        switch (prop.size) {
            case 'medium':
                setImgSrc(logoMed);
                break;
            case 'large':
                setImgSrc(logoLarge);
                break;
            default:
                setImgSrc(logoSmall);
        }
    }, [prop.size]); // Empty array ensures that effect is only run on mount and unmount

    return (
        <img src={imgSrc} alt="Logo"/>
    )
};

Logo.propTypes = {
    size: PropType.string // options: small by default, 'medium', 'large'
};