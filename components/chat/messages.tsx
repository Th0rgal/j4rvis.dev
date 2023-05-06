import Message from "@/components/messages/message";
import styles from "./chat.module.css";

export default function Messages({ messages }: { messages: Message[] }) {
  return (
    <div className={styles.messageWrapper}>
      {messages.map((msg, id) => (
        <Message key={id} bot={msg.bot} msg={msg.content} />
      ))}
    </div>
  );
}
