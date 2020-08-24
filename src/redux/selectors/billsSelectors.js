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
    (bills, searchName = "") => {
        // compare input to bill name.
        return bills.length > 0 ? bills.filter((bill) => bill.name.toLowerCase().includes(searchName.toLowerCase())) : []
    }
)

export const getTotalAmountOwe = createSelector(
    [
        userActiveBills
    ],
    (bills) => {
        return bills.reduce((arr, value) => {
            return arr + parseFloat(value.balance)
        }, 0).toFixed(2);
    }
)

export const getCountOfBills = createSelector(
    [
        userActiveBills
    ],
    (bills) => {
        return bills.length;
    }
)