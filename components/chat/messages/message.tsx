import styles from "./message.module.css";

export default function Message({
  bot,
  msg,
}: {
  bot: boolean;
  msg: string;
}) {
  return (
    <div className={bot ? styles.botMessage : styles.userMessage}>
      <p>{msg}</p>
    </div>
  );
}
