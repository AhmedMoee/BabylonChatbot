import "./App.css";
import { ChatInterface } from "./components/ChatInterface";
import { useState, useEffect } from "react";
import { getThread, createOpenAI, getAssistant } from "./utils.js";

function App() {
  const openai = createOpenAI();
  const [thread_id, setThreadID] = useState("");

  useEffect(() => {
    const func = async () => {
      const thread = await getThread(openai);
      setThreadID(thread);
    };
    func();
  }, []);
  console.log(thread_id);
  const assistant = getAssistant();

  const run = async () => {
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant,
    });
    return run;
  };

  run();

  return (
    <>
      <h1>Chatbot</h1>
      <ChatInterface />
    </>
  );
}

export default App;
