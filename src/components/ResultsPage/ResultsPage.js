import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import Img from "react-image";
import { Link } from "react-router-dom";
import Badge from "material-ui/Badge";
import TopBar from "../TopBar";
import "./ResultsPage.css";

function sortItems(items) {
	return items.sort(
		(a, b) => {
			if (a.get("ranks").isEmpty()) {
				if (b.get("ranks").isEmpty()) {
					return 0;
				}

				return 1;
			}
			else if (b.get("ranks").isEmpty()) {
				return -1;
			}

			return (a.get("ranks").reduce((sum, rank) => sum + rank, 0) / a.get("ranks").size) -
				(b.get("ranks").reduce((sum, rank) => sum + rank, 0) / b.get("ranks").size);
		}
	);
}

export default function ResultsPage({ items, inventoryIsFetched, fetchInventory }) {
	if (!inventoryIsFetched) {
		fetchInventory && fetchInventory();

		return null;
	}

	return (
		<div
			className="wic_results-page"
		>
			<TopBar>
				<Link
					to="/"
				>Back</Link>
			</TopBar>
			{
				items && sortItems(items).map(
					(item, name) => (
						<div
							key={name}
							className="wic_results-page__item"
							onClick={() => this.onImageClick(name)}
						>
							<Img src={encodeURI(`/api/inventory/${name}/image`)} />
							{
								item.get("ranks") && !item.get("ranks").isEmpty() &&
									item.get("ranks").sort((a, b) => a - b).map(
									(rank, user) => (
										<dl
											key={user}
											className="wic_results-page__rank-list"
										>
											<dt>{user}</dt>
											<dd>
												<Badge
													badgeContent={rank}
													color="primary"
													classes={{
														badge: "wic_results-page__rank-badge"
													}}
												>
													<span />
												</Badge>
											</dd>
										</dl>
									)
								).toArray()
							}
						</div>
					)
				).toArray()
			}
		</div>
	);
}

ResultsPage.propTypes = {
	items: ImmutablePropTypes.mapOf(
		ImmutablePropTypes.map,
		PropTypes.string
	),
	inventoryIsFetched: PropTypes.bool,
	fetchInventory: PropTypes.func,
};
