import React, { useRef, useEffect } from "react";
import PropType from "prop-types";
import {useOutsideAlerter} from '../../helpers/ClickEvent'; 
import "./styles.scss";

export const SHORT_FILTER_OPTIONS = ["Newest", "A to Z", "Z to A", "Oldest"];

const SimpleFilter = ({
    applyFilter,
    currentActive,
    closeHandler
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeHandler);

  return (
    <div className='quick__sorting__container' ref={wrapperRef}>
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
    closeHandler: PropType.func.isRequired,
    currentActive: PropType.string
};

export default SimpleFilter;