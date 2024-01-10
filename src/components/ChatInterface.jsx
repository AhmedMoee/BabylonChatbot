import { useState, useEffect, useRef } from "react";
import { getThread, createOpenAI, getAssistant } from "../utils.js";
import "../App.css";

export const ChatInterface = () => {
  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([]);
  const [thread_id, setThreadID] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const openai = createOpenAI();
  const assistant = getAssistant();
  const bottomRef = useRef(null);

  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true; 
    recognition.lang = 'en-US'; 

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript); 
    };

    recognition.start();

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error", event.error);
    };
  };

  useEffect(() => {
    const func = async () => {
      const thread = await getThread(openai);
      setThreadID(thread);
    };
    func();
  }, []);

  useEffect(() => {
    if (isListening) {
      handleSpeechToText();
    }
  }, [isListening]);

  const cycle = async (message, thread_id, assistant, openai) => {
    await openai.beta.threads.messages.create(thread_id, {
      role: "user",
      content: message,
    });
    const run = await openai.beta.threads.runs.create(thread_id, {
      assistant_id: assistant,
    });

    let timeElapsed = 0;
    while (timeElapsed < 1000) {
      const retreiveRun = await openai.beta.threads.runs.retrieve(
        thread_id,
        run.id
      );
      if (retreiveRun.status === "completed") {
        printMessages(thread_id, openai);
        setDisabled(false);
        setLoading(false);
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [textArray]);

  return (
    <>
      <div className="flex items-center justify-center text-base font-medium sm:text-lg md:text-xl lg:text-xl">
        <div className="space-y-5">
          <div className="max-h-[58vh] min-h-[58vh] min-w-[90vw] max-w-[90vw] space-y-10 overflow-y-auto rounded-3xl bg-gray-200 bg-opacity-30 p-5 shadow-2xl backdrop-blur-sm sm:max-h-[70vh] sm:min-h-[70vh] sm:min-w-[60vw] sm:max-w-[60vw] md:max-h-[70vh] md:min-h-[70vh] md:min-w-[60vw] md:max-w-[60vw] lg:max-h-[70vh] lg:min-h-[70vh] lg:min-w-[60vw] lg:max-w-[60vw]">
            <div className="mr-[67.5px] flex items-start justify-start space-x-5">
              <img
                className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
                src="/src/assets/Babylon-Profile-Image.jpg"
                alt="logo"
              />
              <p
                className={
                  "w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
                }
              >
                Hi! 👋 How can I help you today?
              </p>
            </div>
            <div className="mr-[67.5px] flex items-start justify-start space-x-5">
              <img
                className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
                src="/src/assets/Babylon-Profile-Image.jpg"
                alt="logo"
              />
              <p
                className={
                  "w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
                }
              >
                Ask me anything about Babylon Micro-Farms.
              </p>
            </div>

            {textArray.map((element, index) =>
              element.role === "assistant" ? (
                <div
                  key={index}
                  className="mr-[67.5px] flex items-start justify-start space-x-5"
                >
                  <img
                    className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
                    src="/src/assets/Babylon-Profile-Image.jpg"
                    alt="logo"
                  />
                  <p
                    style={{ whiteSpace: "pre-line" }}
                    className={
                      "w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg"
                    }
                  >
                    {element.message}
                  </p>
                </div>
              ) : (
                <div
                  key={index}
                  className="ml-[67.5px] flex items-start justify-end space-x-5"
                >
                  <p
                    className={
                      "bg-babylon-blue-dark dark:bg-babylon-blue-light w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-md p-4 text-white drop-shadow-lg"
                    }
                  >
                    {element.message}
                  </p>
                  <div className="bg-babylon-blue-light dark:bg-babylon-blue-dark inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ring ring-white sm:text-base md:h-12 md:w-12 md:text-lg lg:h-12 lg:w-12 lg:text-xl">
                    AF
                  </div>
                </div>
              )
            )}
            <div ref={bottomRef} />
            {loading && (
              <div className="message assistant-message">
                <div className="loading-spinner" role="status">
                  <svg
                    aria-hidden="true"
                    className="h-10 w-10 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>

          <div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setTextArray((textArray) => [
                  ...textArray,
                  { role: "user", message: text },
                ]);
                setText("");
                setLoading(true);
                cycle(text, thread_id, assistant, openai);
                setDisabled(true);
                console.log("submitting form")
              }}
            >
              {disabled ? (
                <div className="flex items-center justify-center space-x-5">
                  <input
                    disabled
                    className=" flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black"
                    type="text"
                    id="input"
                    placeholder="Enter a question"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <input
                    disabled
                    type="submit"
                    value="Enter"
                    className=" bg-babylon-blue-dark dark:bg-babylon-blue-light hidden rounded-xl p-3 text-white md:block lg:block"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-5">
                  <input
                    className=" flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black"
                    type="text"
                    id="input"
                    placeholder="Enter a question"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                  />
                  <button type="button" onClick={() => setIsListening(true)}>
                    <img
                      className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
                      src={isListening ? "/src/assets/Microphone-Active-Icon.png" : "/src/assets/Microphone-Icon.png"} 
                      alt="Microphone"
                    ></img>
                  </button>                  
                  <input
                    type="submit"
                    value="Enter"
                    className=" dark:bg-babylon-blue-light bg-babylon-blue-dark hidden rounded-xl p-3 text-white md:block lg:block"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
