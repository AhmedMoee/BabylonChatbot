import "./App.css";
import { ChatInterface } from "./components/ChatInterface";
import { useState, useEffect } from "react";
import { getThread, createOpenAI, getAssistant } from "./utils.js";

function App() {
  const openai = createOpenAI();
  const [thread_id, setThreadID] = useState(null);
  const assistant = getAssistant();

  useEffect(() => {
    const func = async () => {
      const thread = await getThread(openai);
      setThreadID(thread);
    };
    func();
  }, []);

  useEffect(() => {
	const run = async () => {
		try {
			const run = await openai.beta.threads.runs.create(thread_id, {
				assistant_id: assistant,
			});
			console.log(run)
		} catch(error) {
			console.log(error);
		}

		run();
	}
	console.log(run)
  }, [])

  return (
    <>
      <h1>Chatbot</h1>
      <ChatInterface />
    </>
  );
}

export default App;
