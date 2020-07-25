import Sidebar from './Sidebar.jsx';
import { connect } from 'react-redux'
import {setUser} from "../../redux/actions/userActions";

const mapDispatchToProps = (dispatch) => ({
    setUser: (user={}) => dispatch(setUser(user))
})

export default connect(null,mapDispatchToProps)(Sidebar);
