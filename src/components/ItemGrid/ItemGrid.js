import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import {
	List
} from "immutable";
import Img from "react-image";
import Button from "material-ui/Button";
import Badge from "material-ui/Badge";
import OpenInNewIcon from "material-ui-icons/OpenInNew";
import ImageDialog from "../ImageDialog";
import "./ItemGrid.css";

function getImagePath(id) {
	return `/api/inventory/${id}/image`;
}

export default class ItemGrid extends React.PureComponent {
	static propTypes = {
		items: ImmutablePropTypes.mapOf(
			ImmutablePropTypes.map,
			PropTypes.string
		),
		currentUser: PropTypes.string,
		inventoryIsFetched: PropTypes.bool,
		setRank: PropTypes.func,
		fetchInventory: PropTypes.func,
	}

	state = {
		expandedImage: null,
	}

	componentDidMount() {
		if (!this.props.inventoryIsFetched) {
			this.props.fetchInventory && this.props.fetchInventory();
		}
	}

	onImageClick = (name) => {
		if (!this.props.setRank) {
			return;
		}

		const itemRank = this.props.items.getIn([name, "ranks", this.props.currentUser]);

		if (itemRank) {
			this.props.setRank({
				user: this.props.currentUser,
				itemID: name,
				rank: undefined,
			});
			return;
		}

		let assignedRanks = this.props.items.reduce(
			(items, item) => {
				const currentRank = item.getIn(["ranks", this.props.currentUser]);

				if (currentRank) {
					return items.set(currentRank - 1, true);
				}

				return items;
			},
			List([...Array(this.props.items.size)])
		);

		const firstEmptyIndex = assignedRanks.findIndex((el) => el === undefined);

		if (firstEmptyIndex < 0) {
			return;
		}

		this.props.setRank({
			user: this.props.currentUser,
			itemID: name,
			rank: firstEmptyIndex + 1,
		});
	}

	renderImage = (name) => {
		return (
			<div
				key={name}
				className="wic_item-grid__item"
				onClick={() => this.onImageClick(name)}
			>
				<Button
					className="wic_item-grid__expand-image-button"
					dense
					onClick={() => this.setState({ expandedImage: name })}
				>
					<OpenInNewIcon/>
				</Button>
				<Img src={encodeURI(getImagePath(name))} />
			</div>
		);
	}

	render() {
		const {
			items,
			inventoryIsFetched,
			currentUser,
		} = this.props;

		return inventoryIsFetched ? (
			<div
				className="wic_item-grid"
			>
				<ImageDialog
					onClose={() => this.setState({ expandedImage: null })}
					imageSource={this.state.expandedImage && getImagePath(this.state.expandedImage)}
				/>
				{
					items.map(
						(item, name) => {
							const rank = item.getIn(["ranks", currentUser]);
							return rank >= 1 ?
								(
									<Badge
										key={`badged-${name}`}
										classes={{
											badge: "wic_item-grid__image-badge",
										}}
										badgeContent={rank}
										color="primary"
									>
										{this.renderImage(name)}
									</Badge>
								) :
								this.renderImage(name);
						}
					).toArray()
				}
			</div>
		) : null;
	}
}
