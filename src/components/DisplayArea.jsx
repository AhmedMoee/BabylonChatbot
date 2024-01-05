/* eslint-disable react/prop-types */
export const DisplayArea = ({ textArray }) => {
	return (
		<div className="chat-container">
			{textArray.map((element, index) => (
				<p key={index} className="text-box">
					{element}
					<br />
				</p>
			))}
		</div>
	);
};
