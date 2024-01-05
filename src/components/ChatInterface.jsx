import { useState } from "react";

export const ChatInterface = () => {
	const [text, setText] = useState("");
	const [textArray, setTextArray] = useState([]);

	return (
		<>
			{textArray.map((element, index) => (
				<p key={index}>
					{element}
					<br />
				</p>
			))}

			<form
				onSubmit={(event) => {
					event.preventDefault();
					setTextArray((textArray) => [...textArray, text]);
					setText("");
				}}
			>
				<input
					type="text"
					id="input"
					placeholder="Enter a question"
					value={text}
					onChange={(event) => setText(event.target.value)}
				/>
				<input type="submit" value="Submit" />
			</form>
		</>
	);
};
