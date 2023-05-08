"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./Lock.module.css";
import { useCookie } from "@/hooks/useCookie"; // Adjust the import path accordingly

export default function Lock() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const token = useCookie("token");
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      setHasCheckedToken(true);
    }
  }, [token]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/create_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      }
    );

    const data = await response.json();

    if (data.error) {
      setError(data.error);
    } else {
      document.cookie = `token=${data.token}; path=/`;
      window.location.reload();
    }
  };

  if (!hasCheckedToken) {
    return null;
  }

  return token ? null : (
    <div className={styles.overlay}>
      <div className={styles.lockContainer}>
        <h2 className={styles.title}>Enter Password</h2>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className={styles.passwordInput}
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button type="submit" className={styles.unlockButton}>
            Unlock
          </button>
        </form>
      </div>
    </div>
  );
}
