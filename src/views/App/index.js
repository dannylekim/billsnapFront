import App from "./App.jsx";
import {connect} from "react-redux";
import {getHasUser} from "../../redux/selectors/userSelectors";

const mapStateToProps = (state) => ({
    hasUser: getHasUser(state),
});

export default connect(mapStateToProps)(App);
