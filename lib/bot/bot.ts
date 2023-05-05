import "server-only";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";

export async function getData() {
  const chat = new ChatOpenAI({ temperature: 0 });

  const response = await chat.call([
    new HumanChatMessage(
      "Translate this sentence from English to French. I love programming."
    ),
  ]);

  return response;
}
