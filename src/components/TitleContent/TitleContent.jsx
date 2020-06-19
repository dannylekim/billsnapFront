import React from "react";
import "./styles.scss";
import {Button} from "shards-react";

export const TitleContent = () => {
    return (
        <div className="title">
            <div className="title__row">
                <h3 className="title__title">Welcome to Billsnap</h3>
            </div>
            <div className="title__row title__text">
                <p>
                    BillSnap is all about snapping away full bills into dust. The goal is to facilitate the process of
                    splitting bills with roommates, friends & family.
                </p>
            </div>
            <div className="title__row">
                <Button size="md" pill className="title__button">How it works</Button>
            </div>
        </div>
    );
};

export default TitleContent;
