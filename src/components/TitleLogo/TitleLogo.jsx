import React from "react";
import "./styles.scss";

export const TitleLogo = () => {
  return (
    <div className="title__row">
      <div className="title__title">
        <h1>Billsnap</h1>
      </div>
      <div className="title__logo">
        <img
          src="http://via.placeholder.com/150x100.png?text=150x100+Logo"
          alt="Logo"
        />
      </div>
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
