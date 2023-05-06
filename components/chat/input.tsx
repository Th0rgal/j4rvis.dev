"use client";
import { useEffect, useState } from "react";
import autosize from "autosize";
import styles from "./chat.module.css";
import { DotLoader } from "react-spinners";

export default function Input({
  addMessage,
}: {
  addMessage: (msg: Message) => void;
}) {
  const [userInput, setUserInput] = useState("");
  const [waiting, setWaiting] = useState(false);

  const handleSendMessage = () => {
    const messageContent = userInput.trim();
    if (messageContent) {
      const messageWrapper = document.querySelector(
        `.${styles.messageWrapper}`
      );
      const shouldScrollToBottom =
        messageWrapper &&
        messageWrapper.scrollHeight - messageWrapper.scrollTop ===
          messageWrapper.clientHeight;

      addMessage({ content: messageContent, bot: false });
      setUserInput("");
      if (shouldScrollToBottom && messageWrapper) {
        setTimeout(() => {
          messageWrapper.scrollTop =
            messageWrapper.scrollHeight - messageWrapper.clientHeight;
        }, 0);
      }

      (async () => {
        setWaiting(true);
        // Send the POST request to /api/bot
        const response = await fetch("/api/bot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input: messageContent }),
        });

        if (response.ok) {
          const data = await response.json();
          addMessage({ content: data.content, bot: true });
        } else {
          console.error("Error sending message to the bot");
        }
        setWaiting(false);
        if (shouldScrollToBottom && messageWrapper) {
          setTimeout(() => {
            messageWrapper.scrollTop =
              messageWrapper.scrollHeight - messageWrapper.clientHeight;
          }, 0);
        }
      })();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const textarea = document.querySelector(`.${styles.userInput}`);
    if (textarea) {
      autosize.update(textarea);
    }
  }, [userInput]);

  return (
    <div className={styles.inputWrapper}>
      <textarea
        className={`${styles.userInput} ${waiting ? styles.disabled : ""}`}
        placeholder={waiting ? "Jarvis is thinking" : "Type your message..."}
        rows={1}
        value={userInput}
        disabled={waiting}
        onChange={(e) => {
          setUserInput(e.target.value);
          autosize(e.target);
        }}
        onKeyDown={handleKeyPress}
      />
      {waiting ? (
        <DotLoader color="#dee0e4" size={24} className={styles.loading} />
      ) : (
        <SendIcon onMsg={handleSendMessage} />
      )}
    </div>
  );
}

function SendIcon({ onMsg }: { onMsg: () => void }) {
  return (
    <svg
      className={styles.sendButton}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      onClick={onMsg}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      ></path>
    </svg>
  );
}
