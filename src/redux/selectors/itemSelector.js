import {createSelector} from "reselect";

const userActiveBill = (state) => state.bills.activeBill;
const userActiveItemId = (state) => state.items.activeItemId;

const getSelectedItem = (info, selectedItemId) => {
  return info.items.find((item) => item.itemId === selectedItemId);
};

export const getItemAssociationInformation = createSelector(
  [userActiveBill, userActiveItemId],
  (bill, activeItemId) => {
    if (activeItemId === -1) {
      return null;
    }

    const selectedItem = bill.items.find((item) => item.id === activeItemId);

    const itemInformation = {
      name: selectedItem.name,
      cost: selectedItem.cost,
      accounts: [],
    };

    bill.informationPerAccount
      .filter((info) => {
        return getSelectedItem(info, activeItemId);
      })
      .forEach((involvedInformationPerAccount) => {
        itemInformation.accounts.push({
          status: involvedInformationPerAccount.invitationStatus,
          firstName: involvedInformationPerAccount.account.firstName,
          percentage: getSelectedItem(
            involvedInformationPerAccount,
            activeItemId
          ).percentage,
        });
      });

    return itemInformation;
  }
);
