import React from "react";
import PropType from "prop-types";

import { FaBars, FaSearch } from "react-icons/fa";

import "./styles.scss";

export const SearchBar = ({
    onInputChangeHandler,
    advanceFilterHandler,
    simpleFilterHandler,
    currentSortingType
}) => {
  return (
    <div id='search__bill'>
      <span className='search__icon'>
        <FaSearch />
      </span>
      <input
        type='text'
        className='form-control border-0'
        onChange={onInputChangeHandler}
        placeholder='Search bill'
      />
      <span className='search__filter'>
        <span
          className='filter__bill'
          onClick={advanceFilterHandler}>
          <FaBars size={24} />
        </span>
        <span
          className='simple__sort'
          onClick={simpleFilterHandler}>
          {currentSortingType}{" "}
        </span>
      </span>
    </div>
  );
};

SearchBar.propTypes = {
    onInputChangeHandler: PropType.func.isRequired, // handler function for input change
    advanceFilterHandler: PropType.func.isRequired, // onclick handler for advance filter button click
    simpleFilterHandler: PropType.func.isRequired, // onclick handler for simple filter button click
    currentSortingType: PropType.string // current filter type as string
};
