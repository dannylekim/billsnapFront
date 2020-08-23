import React from "react";
import "./styles.scss";
import { FaPencilAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake } from "react-icons/fa";

const capilizeFirstLetter = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export default ({ userInfo }) => {
  const {
    firstName,
    middleName,
    lastName,
    phoneNumber,
    birthDate,
    location,
    email,
  } = userInfo;
  const userFullName = `${capilizeFirstLetter(firstName)} ${capilizeFirstLetter(
    middleName
  )} ${capilizeFirstLetter(lastName)}`; 

  return (
    <div className="profile__section">
      <div className="header__profile"> </div> 

      <img className="profile__avatar" src="./billSnapIcon.png" alt="avatar" />
      <div className="user__name">
        <h1> {userFullName} </h1>
        <button className="edit__profile">
          <FaPencilAlt />
        </button>
      </div>

      <div className="profile__info">
        <div className="profile__element"> <span> <FaPhone/> </span> {phoneNumber} </div>
        <div className="profile__element"> <span> <FaMapMarkerAlt/> </span> {`${capilizeFirstLetter(location.city)}, ${capilizeFirstLetter(location.country)}`} </div>
        <div className="profile__element"> <span> <FaEnvelope/> </span> {email} </div>
        <div className="profile__element"> <span> <FaBirthdayCake/> </span> {birthDate} </div>
      </div>
      <hr className="end__profile"/>

    </div>
  );
};