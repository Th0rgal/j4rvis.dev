import styles from "./page.module.css";
import Chat from "@/components/chat/chat";

export default function Home() {
  return (
    <main className={styles.main}>
      <Chat />
    </main>
  );
}
