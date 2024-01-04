import { useState } from "react";

export const InputField = () => {
	const [state, setState] = useState("");
	const [text, setText] = useState([]);

	return (
		<>
			{text.map((element, index) => (
				<p key={index}>
					{element}
					<br />
				</p>
			))}

			<input
				type={"text"}
				id={"name"}
				value={state}
				placeholder="Enter a question"
				onChange={(event) => setState(event.target.value)}
				onKeyUp={(key) => {
					if (key.key === "Enter") {
						setText((text) => [...text, state]);
					}
				}}
			/>

			<button
				onClick={() => {
					setText((text) => [...text, state]);
				}}
			>
				Enter
			</button>
		</>
	);
};
