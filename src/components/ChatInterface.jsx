import { useState, useEffect } from "react";
import { getThread, createOpenAI, getAssistant } from "../utils.js";
import "../App.css";

export const ChatInterface = () => {
	const [text, setText] = useState("");
	const [textArray, setTextArray] = useState([]);
	const [thread_id, setThreadID] = useState("");
	const openai = createOpenAI();
	const assistant = getAssistant();

	useEffect(() => {
		const func = async () => {
			const thread = await getThread(openai);
			setThreadID(thread);
		};
		func();
	}, []);

	const cycle = async (message, thread_id, assistant, openai) => {
		await openai.beta.threads.messages.create(thread_id, {
			role: "user",
			content: message,
		});
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
				printMessages(thread_id, openai);
				return;
			}
			timeElapsed += 1;
		}
		console.log("failed to respond in time");
	};

	const printMessages = async (thread_id, openai) => {
		const threadMessages = await openai.beta.threads.messages.list(thread_id);
		let textArr = [];

		for (let i = threadMessages.data.length - 1; i >= 0; i--) {
			textArr.push({
				role: threadMessages.data[i].role,
				message: threadMessages.data[i].content[0].text.value,
			});
		}

		setTextArray(textArr);
	};

	return (
		<>
			<div className="chat-container">
				<p className="assistant">Hi! 👋 How can I help you today?</p>
				<p className="assistant">
					Ask me anything about Babylon Micro-Farms' product, the Galleri
					Micro-Farm.
				</p>
				{textArray.map((element, index) => (
					<p key={index} className={element.role}>
						{element.message}
					</p>
				))}
			</div>

			<form
				onSubmit={(event) => {
					event.preventDefault();
					setTextArray((textArray) => [
						...textArray,
						{ role: "user", message: text },
					]);
					setText("");
					cycle(text, thread_id, assistant, openai);
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
