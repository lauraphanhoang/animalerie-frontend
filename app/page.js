"use client";
import Link from "next/link";

// import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.container}></main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
