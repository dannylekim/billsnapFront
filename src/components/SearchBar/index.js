import SearchBar from './SearchBar';
import {connect} from "react-redux";

import {fetchMyBills} from "../../redux/actions/billActions";

const mapDispatchToProps = (dispatch) => ({
    fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
