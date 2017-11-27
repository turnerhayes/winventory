import React from "react";
import PropTypes from "prop-types";
import Avatar from "material-ui/Avatar";

const MAX_AVATAR_STRING_LENGTH = 2;

export default function UserAvatar(props) {
	const {
		name,
		...otherProps,
	} = props;

	return (
		<Avatar
			{...otherProps}
		>{name.substring(0, MAX_AVATAR_STRING_LENGTH)}</Avatar>
	);
}

UserAvatar.propTypes = {
	name: PropTypes.string.isRequired,
};
