"use client";
import { useState } from "react";
import { useCookie } from "./useCookie";
import { useNotifications } from "./useNotifications";

export const useSendMessage = (addMessage: (msg: Message) => void) => {
  const token = useCookie("token");
  const [waiting, setWaiting] = useState(false);
  let failed = false;

  const { showError } = useNotifications();

  const sendMessage = async (messageContent: string) => {
    setWaiting(true);
    try {
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
          showError(data.error);
        } else {
          addMessage({ content: data.content, bot: true });
        }
      } else failed = true;
    } catch {
      failed = true;
    }

    if (failed) {
      showError("Error sending message to the bot");
    }

    setWaiting(false);
  };

  return { sendMessage, waiting };
};
