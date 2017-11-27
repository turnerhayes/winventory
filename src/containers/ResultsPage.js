import ResultsPage from "../components/ResultsPage";
import { connect } from "react-redux";
import {
	fetchInventory
} from "../redux/actions";

export default connect(
	function mapStateToProps(state) {
		const props = {};

		props.items = state.getIn(["inventory", "items"]);
		props.inventoryIsFetched = state.getIn(["inventory", "isFetched"]);

		return props;
	},

	function mapDispatchToProps(dispatch) {
		return {
			fetchInventory() {
				dispatch(fetchInventory());
			}
		};
	}
)(ResultsPage);
