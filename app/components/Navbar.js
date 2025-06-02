"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.home}>
          ANIMALERIE
        </Link>
        <div className={styles.links}>
          <Link href="/personnes" className={styles.link}>
            Personnes
          </Link>
          <Link href="/animaux" className={styles.link}>
            Animaux
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
