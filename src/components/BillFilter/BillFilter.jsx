import React from "react";
import "./styles.scss";
import { Badge, FormCheckbox, FormInput } from "shards-react";
import { FaBars } from "react-icons/fa";

/**
 * @description the filter box when three horizontal lines clicked
 */
const BillFilter = ({
  dateFilters,
  filter,
  billStatusFilter,
  handleDateSelection,
  updateBills,
  setState,
}) => {
  const filterBadges = [
    { id: "descending", title: "Newest", onClick: () => updateBills("Newest") },
    { id: "ascending", title: "Oldest", onClick: () => updateBills("Oldest") },
    {
      id: "by__status",
      title: "Status",
      onClick: () =>
        setState({
          filter: {
            ...filter,
            statusOpened: true,
            categoryOpened: false,
            dateOpened: false,
          },
          dateFilters: {
            ...dateFilters,
            startDate: { ...dateFilters.startDate, selected: false },
            endDate: { ...dateFilters.endDate, selected: false },
          },
        }),
    },
    {
      id: "alphabetical__increasing",
      title: "A to Z",
      onClick: () => updateBills("A to Z"),
    },
    {
      id: "alphabetical__decreasing",
      title: "Z to A",
      onClick: () => updateBills("Z to A"),
    },
    {
      id: "by__category",
      title: "Category",
      onClick: () =>
        setState({
          filter: {
            ...filter,
            categoryOpened: true,
            statusOpened: false,
            dateOpened: false,
          },
          dateFilters: {
            ...dateFilters,
            startDate: { ...dateFilters.startDate, selected: false },
            endDate: { ...dateFilters.endDate, selected: false },
          },
        }),
    },
    {
      id: "by__date",
      title: "Date",
      onClick: () =>
        setState({
          filter: {
            ...filter,
            dateOpened: true,
            categoryOpened: false,
            statusOpened: false,
          },
        }),
    },
  ];

  const extraFilterSelected =
    filter.dateOpened === true ||
    filter.statusOpened === true ||
    filter.categoryOpened === true;

  return (
    filter.opened === true &&
    <div className="bill__filter__container">
      <div
        className="filter__header"
        onClick={() =>
          setState({
            filter: {
              ...filter,
              opened: false
            },
          })
        }
      >
        <FaBars size={24} />
        <span className="filter__header__title">Filters</span>
      </div>
      <div className="filter__selections__container">
        {filterBadges.map((badgeObject, key) => (
          <Badge
            key={key}
            outline
            pill
            id={badgeObject.id}
            onClick={badgeObject.onClick}
          >
            {badgeObject.title}
          </Badge>
        ))}
      </div>
      {extraFilterSelected && (
        <div className="advanced__filter__selection">
          {filter.dateOpened === true && (
            <div className="date__filter">
              <FormCheckbox
                checked={dateFilters.startDate.selected}
                onChange={() =>
                  setState({
                    dateFilters: {
                      ...dateFilters,
                      startDate: { ...dateFilters.startDate, selected: true },
                      endDate: { ...dateFilters.endDate, selected: false },
                    },
                  })
                }
              >
                Start date
                {dateFilters.startDate.value !== ""
                  ? `: ${dateFilters.startDate.value}`
                  : ""}
              </FormCheckbox>
              <FormCheckbox
                checked={dateFilters.endDate.selected}
                onChange={() =>
                  setState({
                    dateFilters: {
                      ...dateFilters,
                      startDate: { ...dateFilters.startDate, selected: false },
                      endDate: { ...dateFilters.endDate, selected: true },
                    },
                  })
                }
              >
                End date
                {dateFilters.endDate.value !== ""
                  ? `: ${dateFilters.endDate.value}`
                  : ""}
              </FormCheckbox>
              <FormInput
                type="date"
                onChange={(event) => handleDateSelection(event)}
                disabled={
                  dateFilters.endDate.selected === false &&
                  dateFilters.startDate.selected === false
                }
              />
            </div>
          )}
          {filter.statusOpened === true && (
            <div className="status__filter">
              <FormCheckbox
                checked={billStatusFilter.resolved}
                onChange={() =>
                  setState({
                    billStatusFilter: {
                      ...billStatusFilter,
                      resolved: true,
                      open: false,
                      in_progess: false,
                    },
                  })
                }
              >
                PAID
              </FormCheckbox>
              <FormCheckbox
                checked={billStatusFilter.open}
                onChange={() =>
                  setState({
                    billStatusFilter: {
                      ...billStatusFilter,
                      resolved: false,
                      open: true,
                      in_progess: false,
                    },
                  })
                }
              >
                UNPAID
              </FormCheckbox>
              <FormCheckbox
                checked={billStatusFilter.in_progess}
                onChange={() =>
                  setState({
                    billStatusFilter: {
                      ...billStatusFilter,
                      resolved: false,
                      open: false,
                      in_progess: true,
                    },
                  })
                }
              >
                ONGOING
              </FormCheckbox>
            </div>
          )}
          {filter.categoryOpened === true && (
            <div className="category__filter">
              <FormInput type="text" placeholder="Restaurant" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillFilter;
