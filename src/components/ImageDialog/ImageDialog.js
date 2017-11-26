import React from "react";
import PropTypes from "prop-types";
import Img from "react-image";
import Dialog, { DialogContent, } from "material-ui/Dialog";

export default function ImageDialog({imageSource, onClose}) {
	return (
		<Dialog
			open={!!imageSource}
			onRequestClose={() => onClose && onClose()}
			maxWidth="md"
		>
			<DialogContent>
				{
					imageSource && (
						<Img
							className="wic_item-grid__expanded-image"
							src={encodeURI(imageSource)}
						/>
					)
				}
			</DialogContent>
		</Dialog>
	);
}

ImageDialog.propTypes = {
	imageSource: PropTypes.string,
	onClose: PropTypes.func.isRequired,
};
