/**
 * This file will host application wide actions that will toggle states
 */

export const toggleLandingPageForm = () => ({
  type: ACTIONS.TOGGLE_LANDING_PAGE_FORM,
});

export const setBillLoading = (isBillLoading) => ({
  type: ACTIONS.SET_BILL_LOADING_STATUS,
  isBillLoading,
});

export const setActiveBillLoading = (isActiveBillLoading) => ({
  type: ACTIONS.SET_BILL_LOADING_STATUS,
  isActiveBillLoading,
});

export const ACTIONS = {
  TOGGLE_LANDING_PAGE_FORM: "TOGGLE_LANDING_PAGE_FORM",
  SET_BILL_LOADING_STATUS: "SET_BILL_LOADING_STATUS",
  SET_ACTIVE_BILL_LOADING_STATUS: "SET_ACTIVE_BILL_LOADING_STATUS",
};
