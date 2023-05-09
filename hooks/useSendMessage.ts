"use client";
import { useState } from "react";
import { useCookie } from "./useCookie";
import { useNotifications } from "./useNotifications";

export const useSendMessage = (addMessage: (msg: Message) => void) => {
  const token = useCookie("token");
  const [waiting, setWaiting] = useState(false);
  let failed = false;

  const { showError } = useNotifications();

  const customFetch = async (
    url: string,
    options: RequestInit,
    timeout: number
  ) => {
    const controller = new AbortController();
    const { signal } = controller;

    options = { ...options, signal };

    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, options);
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timed out");
      }
      throw error;
    }
  };

  const sendMessage = async (messageContent: string) => {
    setWaiting(true);
    try {
      const response = await customFetch(
        process.env.NEXT_PUBLIC_BACKEND + "/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? token : "",
          },
          body: JSON.stringify({ input: messageContent }),
        },
        600000
      ); // Set the timeout to 10 minutes

      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          showError(data.error);
        } else {
          addMessage({ content: data.content, bot: true });
        }
      } else failed = true;
    } catch (error) {
      if (error instanceof Error && error.message === "Request timed out") {
        showError("The request took too long to complete. Please try again.");
      } else {
        failed = true;
      }
    }

    if (failed) {
      showError("Error sending message to the bot");
    }

    setWaiting(false);
  };

  return { sendMessage, waiting };
};
