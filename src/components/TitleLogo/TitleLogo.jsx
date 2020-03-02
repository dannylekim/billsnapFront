import React from "react";
import "./styles.scss";

export const TitleLogo = () => {
  return (
    <div className="title__row">
        <h1 className="title__title">Billsnap</h1>
        <img
          className="title__logo"
          src="https://via.placeholder.com/150x100.png?text=150x100+Logo"
          alt="Logo"
        />
    </div>
  );
};

export default () => {
  return (
    <div className="title">
      <TitleLogo />
      <div className="title__row title__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque
          dignissimos eos error quo, repellendus repudiandae sunt. Amet
          asperiores atque commodi, deleniti dicta expedita ipsa modi nemo, quos
          rem voluptate voluptates.
        </p>
      </div>
    </div>
  );
};
