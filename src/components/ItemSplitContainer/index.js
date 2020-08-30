import ItemSplitContainer from "./ItemSplitContainer";
import {connect} from "react-redux";
import {getItemAssociationInformation} from "../../redux/selectors/itemSelector";
import {setActiveItemId} from "../../redux/actions/itemAction";

const mapStateToProps = (state) => ({
  itemInformation: getItemAssociationInformation(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActiveItemId: (itemId) => dispatch(setActiveItemId(itemId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemSplitContainer);
