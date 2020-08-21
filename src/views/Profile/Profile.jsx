import React from "react";
import "./styles.scss";
import { FaPencilAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBirthdayCake } from "react-icons/fa";
import {capilizeFirstLetter, userFullName} from "../../helpers/Functions";

export default ({ history, userInfo,hasUser }) => {
  const {
    firstName,
    middleName,
    lastName,
    phoneNumber,
    birthDate,
    location,
    email,
  } = userInfo;

  return (
    <>
    {hasUser ?
      <div className="profile__section">
        <div className="header__profile"> </div> 
        <img className="profile__avatar" src="./billSnapIcon.png" alt="avatar" />
        <div className="user__name">
          <h1> {userFullName(hasUser, firstName, middleName, lastName)} </h1>
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
      : 
      history.push("/")
      }
    </>
  );
};