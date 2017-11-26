import { connect } from "react-redux";
import ItemGrid from "../components/ItemGrid";
import {
	setRank,
	fetchInventory,
} from "../redux/actions";

export default connect(
	function mapStateToProps(state) {
		const props = {};

		props.items = state.getIn(["inventory", "items"]);
		props.currentUser = state.getIn(["users", "current"]);
		props.inventoryIsFetched = state.getIn(["inventory", "isFetched"]);

		return props;
	},

	function mapDispatchToProps(dispatch) {
		return {
			setRank({ user, itemID, rank }) {
				dispatch(setRank({
					user,
					itemID,
					rank,
				}));
			},

			fetchInventory() {
				dispatch(fetchInventory());
			}
		};
	}
)(ItemGrid);
