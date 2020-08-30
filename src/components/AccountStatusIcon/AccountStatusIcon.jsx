import {MdAccountCircle, MdClear, MdDone, MdHourglassFull,} from "react-icons/md/index";
import React from "react";
import "./styles.scss";

/**
 *
 * Takes percent
 *
 * @param status
 * @param sizeMultiplier
 * @returns {JSX.Element}
 */
const getStatusIcons = (status, sizeMultiplier) => {
  switch (status) {
    case "ACCEPTED":
      return (
        <MdDone
          className="status_icon"
          size={40 * sizeMultiplier}
          color="#47E5B6"
        />
      );
    case "DECLINED":
      return (
        <MdClear
          className="status_icon"
          size={30 * sizeMultiplier}
          color="red"
        />
      );
    case "PENDING":
      return (
        <MdHourglassFull
          className="status_icon"
          size={30 * sizeMultiplier}
          color="#FFB400"
        />
      );
    default:
      return <span />;
  }
};

const AccountStatusIcon = ({ status, name, sizeMultiplier = 1 }) => {
  return (
    <div>
      <div className="accounts__icons">
        <MdAccountCircle size={50 * sizeMultiplier} />
        {getStatusIcons(status, sizeMultiplier)}
      </div>
      <p className="icon__name">{name}</p>
    </div>
  );
};

export default AccountStatusIcon;
