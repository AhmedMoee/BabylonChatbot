import { useState } from "react";
import { DisplayArea } from "./DisplayArea";

export const ChatInterface = () => {
	const [text, setText] = useState("");
	const [textArray, setTextArray] = useState([]);

	return (
		<>
			<DisplayArea textArray={textArray} />

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
