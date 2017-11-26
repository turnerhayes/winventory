import { connect } from "react-redux";
import UserPicker from "../components/UserPicker";
import { setCurrentUser } from "../redux/actions";

export default connect(
	function mapStateToProps(state) {
		const props = {};

		props.currentUser = state.getIn(["users", "current"]);

		props.users = state.getIn(["users", "all"]);

		return props;
	},

	function mapDispatchToProps(dispatch) {
		return {
			onUserSelect({ user }) {
				dispatch(setCurrentUser({ user }));
			},
		};
	}
)(UserPicker);
