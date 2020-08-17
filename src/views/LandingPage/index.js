import LandingPage from "./LandingPage.jsx";
import {connect} from "react-redux";
import {toggleLandingPageForm} from "../../redux/actions/applicationActions";

const mapStateToProps = (state) => ({
  formType: state.application.showRegisterFirst ? "register" : "login",
  hasUser: (state.users && Object.keys(state.users.userInfo).length > 0) ? true : false,
});

const mapDispatchToProps = (dispatch) => ({
  toggleFormType: () => dispatch(toggleLandingPageForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
