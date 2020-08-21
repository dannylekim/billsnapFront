import LandingPage from "./LandingPage.jsx";
import {connect} from "react-redux";
import {toggleLandingPageForm} from "../../redux/actions/applicationActions";
import {getHasUser} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
  formType: state.application.showRegisterFirst ? "register" : "login",
  hasUser: getHasUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleFormType: () => dispatch(toggleLandingPageForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
