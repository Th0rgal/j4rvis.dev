import styles from "./page.module.css";
import Chat from "@/components/chat/chat";
import Lock from "@/components/lock/lock";

export default function Home() {
  return (
    <main className={styles.main}>
      <Lock />
      <Chat />
    </main>
  );
}
