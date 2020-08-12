import React from "react";
import PropType from "prop-types";

import "./styles.scss";

export const SHORT_FILTER_OPTIONS = ["Newest", "A to Z", "Z to A", "Oldest"];

const SimpleFilter = ({
    applyFilter,
    currentActive
}) => {
  return (
    <div className='quick__sorting__container'>
      <ul className='sorting__content'>
        { SHORT_FILTER_OPTIONS
          .filter((title) => title !== currentActive)
          .map((title, key) => (
            <li
              className='sorting__titles'
              onClick={() => applyFilter(title)}
              key={key}>
              {title}
            </li>
          ))}
      </ul>
    </div>
  );
};

SimpleFilter.propTypes = {
    applyFilter: PropType.func.isRequired,
    currentActive: PropType.string
};

export default SimpleFilter;