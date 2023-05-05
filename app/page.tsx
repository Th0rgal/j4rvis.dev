"use client";
import { useEffect } from "react";
import autosize from "autosize";
import Message from "@/components/messages/message";
import styles from "./page.module.css";

export default function Home() {
  useEffect(() => {
    const textarea = document.querySelector(`.${styles.userInput}`);
    if (textarea) {
      autosize(textarea);
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.chatContainer}>
        <div className={styles.messageWrapper}>
          <Message bot={true} msg={"Hey Thomas, how may I help you?"} />
        </div>
        <div className={styles.inputWrapper}>
          <textarea
            className={styles.userInput}
            placeholder="Type your message..."
            rows={1}
          />
          <svg
            className={styles.sendButton}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            onClick={() => console.log("hey")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            ></path>
          </svg>
        </div>
      </div>
    </main>
  );
}
