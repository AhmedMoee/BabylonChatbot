export const DisplayArea = ({ textArray }) => {
	return (
		<>
			{textArray.map((element, index) => (
				<p key={index} className="text-box">
					{element}
					<br />
				</p>
			))}
		</>
	);
};
