import React from "react";
import {
  FaBus,
  FaCar,
  FaQuestion,
  FaShoppingBag,
  FaShoppingCart,
  FaUtensils,
} from "react-icons/fa";

export const getBillIcons = (category) => {
    const color = "rgba(0, 0, 0, 0.96)";
    switch (category) {
      case "food":
        return <FaUtensils color={color} size={24} />;
      case "transport":
        return <FaCar color={color} size={24} />;
      case "public-transport":
        return <FaBus color={color} size={24} />;
      case "grocery":
        return <FaShoppingCart color={color} size={24} />;
      case "shopping":
        return <FaShoppingBag color={color} size={24} />;
      default:
        return <FaQuestion color={color} size={24} />;
    }
  };