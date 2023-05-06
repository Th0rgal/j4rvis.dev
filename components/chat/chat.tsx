"use client";
import { useState } from "react";
import styles from "./chat.module.css";
import Messages from "./messages";
import Input from "./input";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello Thomas, how may I help you?", bot: true },
  ]);

  const addMessage = (msg: Message) => {
    setMessages((prevMessages) => [...prevMessages, msg]);
  };

  return (
    <div className={styles.chatContainer}>
      <Messages messages={messages} />
      <Input addMessage={addMessage} />
    </div>
  );
}
