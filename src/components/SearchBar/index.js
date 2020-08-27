import SearchBar from './SearchBar';
import {connect} from "react-redux";

import {fetchMyBills, fetchPendingBills, updateSearchBillName} from "../../redux/actions/billActions";

const mapStateToProps = (state) => ({
    billNameSearch: state.bills.searchInput,
  });

const mapDispatchToProps = (dispatch) => ({
    fetchBills: (queryParam = "") => dispatch(fetchMyBills(queryParam)),
    fetchPendingBills: (queryParam = "?invitation_status=PENDING") => dispatch(fetchPendingBills(queryParam)),
    updateBillNameSearch: (input = "") => dispatch(updateSearchBillName(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
