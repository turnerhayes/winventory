import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import UserAvatar from "../UserAvatar";
import Button from "material-ui/Button";
import Popover from "material-ui/Popover";
import List, { ListItem, ListItemText } from "material-ui/List";

export default class UserPicker extends React.PureComponent {
	static propTypes = {
		currentUser: PropTypes.string,
		users: ImmutablePropTypes.listOf(PropTypes.string),
		onUserSelect: PropTypes.func,
	}

	state = {
		popoverAnchorEl: null,
		isPopoverOpen: false,
	}

	handleUserSelect = ({ user }) => {
		this.props.onUserSelect && this.props.onUserSelect({ user });
		this.setState({ isPopoverOpen: false });
	}

	render() {
		const {
			users,
			currentUser,
		} = this.props;

		return (
			<div
				className="wic_user-picker"
			>
				<Button>
					<UserAvatar
						name={currentUser}
						title={`Current User (${currentUser})`}
						onClick={(event) => this.setState({ popoverAnchorEl: event.currentTarget, isPopoverOpen: true })}
					/>
				</Button>
				<Popover
					open={this.state.isPopoverOpen}
					onRequestClose={() => this.setState({ isPopoverOpen: false })}
					anchorEl={this.state.popoverAnchorEl}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
					transformOrigin={{ vertical: "top", horizontal: "left" }}
				>
					<List>
						{
							users.map(
								(user) => (
									<ListItem
										key={user}
										button
										onClick={() => this.handleUserSelect({ user })}
									>
										<UserAvatar
											name={user}
										/>
										<ListItemText
											primary={user}
										/>
									</ListItem>
								)
							)
						}
					</List>
				</Popover>
			</div>
		);
	}
}

