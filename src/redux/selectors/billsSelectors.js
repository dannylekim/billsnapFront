import { createSelector } from 'reselect'

/**
 * Define different bills here
 */
const searchBillName = (state) => state.bills.searchInput;
const userActiveBills = (state) => state.bills.bills;

/**
 * Define selectors bellow
 */
export const getActiveBills = createSelector(
    [
        userActiveBills,
        searchBillName
    ],
    (bills, searchName) => {
        // compare input to bill name.
        return bills.filter((bill) => bill.name.toLowerCase().includes(searchName.toLowerCase()))
    }
)