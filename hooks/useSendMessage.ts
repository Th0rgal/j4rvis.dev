"use client";
import { useState } from "react";
import { useCookie } from "./useCookie";

export const useSendMessage = (addMessage: (msg: Message) => void) => {
  const token = useCookie("token");
  const [waiting, setWaiting] = useState(false);

  const sendMessage = async (messageContent: string) => {
    setWaiting(true);

    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND + "/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? token : "",
      },
      body: JSON.stringify({ input: messageContent }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.error) {
        addMessage({ content: data.error, bot: true });
      } else {
        addMessage({ content: data.content, bot: true });
      }
    } else {
      console.error("Error sending message to the bot");
    }

    setWaiting(false);
  };

  return { sendMessage, waiting };
};
