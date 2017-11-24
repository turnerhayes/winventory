/* globals require */

import React from "react";
import Button from "material-ui/Button";
import Badge from "material-ui/Badge";
import OpenInNewIcon from "material-ui-icons/OpenInNew";
import Dialog, {
	DialogContent,
} from "material-ui/Dialog";
import "./ItemGrid.css";

function importAll(r) {
	let images = {};
	r.keys().map((item) => { images[item.replace("./", "")] = r(item); });
	return images;
}

const images = importAll(require.context("../../images", false, /\.(png|jpe?g|svg)$/i));

export default class ItemGrid extends React.PureComponent {
	state = {
		expandedImage: null,
		ranks: {
		},
	}

	renderImage = (src) => {
		return (
			<div
				key={src}
				className="wic_item-grid-item"
				onClick={() => this.setState({ ranks: Object.assign({}, this.state.ranks, { [src]: 1 }) })}
			>
				<Button
					className="wic_item-grid-expand-image-button"
					dense
					onClick={() => this.setState({ expandedImage: src })}
				>
					<OpenInNewIcon/>
				</Button>
				<img src={src} />
			</div>
		);
	}

	render() {
		return (
			<div
				className="wic_item-grid"
			>
				<Dialog
					open={!!this.state.expandedImage}
					onRequestClose={() => this.setState({ expandedImage: null })}
					maxWidth="md"
				>
					<DialogContent>
						<img
							className="wic_item-grid-expanded-image"
							src={this.state.expandedImage}
						/>
					</DialogContent>
				</Dialog>
				{
					Object.keys(images).map(
						(imgKey) => {
							const src = images[imgKey];
							return this.state.ranks[src] ?
								(
									<Badge
										key={`badged-${src}`}
										badgeContent={this.state.ranks[src]}
										color="primary"
									>
										{this.renderImage(src)}
									</Badge>
								) :
								this.renderImage(src);
						}
					)
				}
			</div>
		);
	}
}
