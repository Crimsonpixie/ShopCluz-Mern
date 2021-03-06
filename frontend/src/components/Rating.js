import React from "react";
import PropTypes from "prop-types";
const Rating = ({ rating, text, color }) => {
	return (
		<div className="rating">
			<span>
				<i
					style={{ color }}
					className={
						rating >= 1
							? "fa-solid fa-star"
							: rating >= 0.5
							? "fa-solid fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						rating >= 2
							? "fa-solid fa-star"
							: rating >= 1.5
							? "fa-solid fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						rating >= 3
							? "fa-solid fa-star"
							: rating >= 2.5
							? "fa-solid fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						rating >= 4
							? "fa-solid fa-star"
							: rating >= 3.5
							? "fa-solid fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						rating >= 5
							? "fa-solid fa-star"
							: rating >= 4.5
							? "fa-solid fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>{text && text}</span>
		</div>
	);
};
Rating.defaultProps = {
	color: "#f8e856",
};
Rating.propTypes = {
	rating: PropTypes.number,
	text: PropTypes.string,
	color: PropTypes.string,
};
export default Rating;
