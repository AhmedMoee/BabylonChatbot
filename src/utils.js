import OpenAI from "openai";

// Contains functions you can call from Component (‘jsx’) files.
// These functions will handle creating threads, runs, messages, and receiving the response from the assistant.
const assistant = import.meta.env.VITE_ASSISTANT_ID;
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const createOpenAI = () => {
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
};

export const getThread = async (openai) => {
  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: "Say hi",
        file_ids: [],
      },
    ],
  });
  return thread.id;
};

export const getAssistant = () => {
  return assistant;
};
