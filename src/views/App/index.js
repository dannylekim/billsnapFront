import App from "./App.jsx";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    hasUser: Object.keys(state.users.userInfo).length > 0 ? true : false,
});

export default connect(mapStateToProps)(App);
