import React, { useRef } from "react";
import { Badge, FormCheckbox, FormInput } from "shards-react";

import { useOutsideAlerter } from "../../helpers/ClickEvent";
import "./styles.scss";

/**
 * @description the filter box when three horizontal lines clicked
 */
const BillFilter = ({
  activeTab,
  applyFiltering,
  currentSorting,
  billStatusFilter,
  closeHandler,
  dateCheckboxHandler,
  dateFilters,
  filterToggles,
  filterToggleChange,
  handleDateSelection,
  handleStatusChange,
}) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, closeHandler);

  const filterBadges = [
    {
      id: "descending",
      title: "Newest",
      onClick: () => applyFiltering("Newest"),
    },
    {
      id: "ascending",
      title: "Oldest",
      onClick: () => applyFiltering("Oldest"),
    },
    {
      id: "by__status",
      title: "Status",
      onClick: () =>
        filterToggleChange({
          statusOpened: true,
          categoryOpened: false,
          dateOpened: false,
        }),
    },
    {
      id: "alphabetical__increasing",
      title: "A to Z",
      onClick: () => applyFiltering("A to Z"),
    },
    {
      id: "alphabetical__decreasing",
      title: "Z to A",
      onClick: () => applyFiltering("Z to A"),
    },
    {
      id: "by__category",
      title: "Category",
      onClick: () =>
        filterToggleChange({
          categoryOpened: true,
          statusOpened: false,
          dateOpened: false,
        }),
    },
    {
      id: "by__date",
      title: "Date",
      onClick: () =>
        filterToggleChange({
          dateOpened: true,
          categoryOpened: false,
          statusOpened: false,
        }),
    },
  ];

  const extraFilterSelected =
    filterToggles.dateOpened === true ||
    filterToggles.statusOpened === true ||
    filterToggles.categoryOpened === true;
  
  return (
    <div className='bill__filter__container' ref={wrapperRef}>
      <div className='filter__header'>
  <span className='filter__header__title'>Filters {activeTab}</span>
      </div>
      <div className='filter__selections__container'>
        {filterBadges.map((badgeObject, key) => (
          <Badge
            key={key}
            className={badgeObject.title === currentSorting && 'active'}
            outline
            pill
            id={badgeObject.id}
            onClick={badgeObject.onClick}>
            {badgeObject.title}
          </Badge>
        ))}
      </div>
      {extraFilterSelected && (
        <div className='advanced__filter__selection'>
          {filterToggles.dateOpened === true && (
            <div className='date__filter'>
              <FormCheckbox
                checked={dateFilters.startDate.selected}
                onChange={() => dateCheckboxHandler("startDate")}>
                Start date
                {dateFilters.startDate.value !== ""
                  ? `: ${dateFilters.startDate.value}`
                  : ""}
              </FormCheckbox>
              <FormCheckbox
                checked={dateFilters.endDate.selected}
                onChange={() => dateCheckboxHandler("endDate")}>
                End date
                {dateFilters.endDate.value !== ""
                  ? `: ${dateFilters.endDate.value}`
                  : ""}
              </FormCheckbox>
              <FormInput
                type='date'
                onChange={(event) => handleDateSelection(event)}
                disabled={
                  dateFilters.endDate.selected === false &&
                  dateFilters.startDate.selected === false
                }
              />
            </div>
          )}
          {filterToggles.statusOpened === true && (
            <div className='status__filter'>
              <FormCheckbox
                checked={billStatusFilter.resolved}
                onChange={() =>
                  handleStatusChange('resolved')
                }>
                PAID
              </FormCheckbox>
              <FormCheckbox
                checked={billStatusFilter.open}
                onChange={() =>
                  handleStatusChange('open')
                }>
                UNPAID
              </FormCheckbox>
              <FormCheckbox
                checked={billStatusFilter.in_progess}
                onChange={() =>
                  handleStatusChange('in_progess')
                }>
                ONGOING
              </FormCheckbox>
            </div>
          )}
          {filterToggles.categoryOpened === true && (
            <div className='category__filter'>
              <FormInput type='text' placeholder='Restaurant' />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillFilter;
