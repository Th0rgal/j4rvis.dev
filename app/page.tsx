"use client";
import styles from "./page.module.css";
import Chat from "@/components/chat/chat";
import Lock from "@/components/lock/lock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Lock />
      <Chat />
      <ToastContainer />
    </main>
  );
}
