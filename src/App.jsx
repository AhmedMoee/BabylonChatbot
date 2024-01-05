import "./App.css";
import { ChatInterface } from "./components/ChatInterface";
import { useState, useEffect } from "react";
import { getThread, createOpenAI, getAssistant } from "./utils.js";

function App() {
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

	useEffect(() => {
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
	}, [thread_id]);

	useEffect(() => {
		const listMessages = async () => {
			const threadMessages = await openai.beta.threads.messages.list(thread_id);

			console.log(threadMessages.data);
		};

		if (completed) {
			listMessages();
		}
	}, [completed]);

	return (
		<>
			<h1>Chatbot</h1>
			<ChatInterface />
		</>
	);
}

export default App;
