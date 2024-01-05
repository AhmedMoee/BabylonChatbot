export const DisplayArea = ({ textArray }) => {
	return (
		<>
			{textArray.map((element, index) => (
				<p key={index}>
					{element}
					<br />
				</p>
			))}
		</>
	);
};
