import {FaBus, FaCar, FaQuestion, FaShoppingBag, FaShoppingCart, FaUtensils,} from "react-icons/fa/index";
import React from "react";

const BillIcon = ({category}) => {
  const color = "rgba(0, 0, 0, 0.96)";
  switch (category.toLowerCase()) {
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

export default BillIcon;
