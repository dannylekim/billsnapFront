import Sidebar from "./Sidebar.jsx";
import {connect} from "react-redux";
import {setUser} from "../../redux/actions/userActions";
import { withRouter} from 'react-router-dom';

const mapDispatchToProps = (dispatch) => ({
  setUser: (user = {}) => dispatch(setUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(Sidebar));
