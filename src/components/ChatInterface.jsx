import { DisplayArea } from "./DisplayArea";
import { useState, useEffect } from "react";
import { getThread, createOpenAI, getAssistant } from "../utils.js";

const cycle = async (message, thread_id, assistant, openai, setCompleted) => {
	const addMessage = async () => {
		await openai.beta.threads.messages.create(thread_id, {
			role: "user",
			content: message,
		});
	};
	addMessage();

	const run = async () => {
		const run = await openai.beta.threads.runs.create(thread_id, {
			assistant_id: assistant,
		});

		let timeElapsed = 0;
		while (timeElapsed < 100) {
			const retreiveRun = await openai.beta.threads.runs.retrieve(
				thread_id,
				run.id
			);
			if (retreiveRun.status === "completed") {
				setCompleted(true);
				return;
			}

			timeElapsed += 1;
		}
	};
	run();
};

const printMessages = async (thread_id, completed, openai) => {
	const listMessages = async () => {
		const threadMessages = await openai.beta.threads.messages.list(thread_id);

		console.log("-".repeat(100));

		for (let i = threadMessages.data.length - 1; i >= 0; i--) {
			console.log(threadMessages.data[i].content[0].text.value);
		}
	};

	if (completed) {
		listMessages();
	}
};

export const ChatInterface = () => {
	const [text, setText] = useState("");
	const [textArray, setTextArray] = useState([]);

	const openai = createOpenAI();
	const assistant = getAssistant();
	const [thread_id, setThreadID] = useState("");
	const [completed, setCompleted] = useState(false);

	useEffect(() => {
		const func = async () => {
			const thread = await getThread(openai);
			setThreadID(thread);
		};
		func();
	}, []);

	return (
		<>
			<DisplayArea textArray={textArray} />

			<form
				onSubmit={(event) => {
					event.preventDefault();
					setTextArray((textArray) => [...textArray, text]);
					setText("");
					printMessages(thread_id, completed, openai);
					cycle(text, thread_id, assistant, openai, setCompleted);
				}}
			>
				<input
					type="text"
					id="input"
					placeholder="Enter a question"
					value={text}
					onChange={(event) => setText(event.target.value)}
					className="input-box"
				/>
				<input type="submit" value="Submit" className="submit-box" />
			</form>
		</>
	);
};
