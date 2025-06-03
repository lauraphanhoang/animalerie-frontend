"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
import Image from "next/image";
import CatPaw from "../../public/icons8-empreinte-de-chat-100.png";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.home}>
          ANIMALERIE
        </Link>
        <Link href="/" className={styles.home}>
          <Image
            src={CatPaw}
            alt="Empreinte de chat"
            width={50}
            height={50}
            priority
          />
        </Link>
        <div className={styles.links}>
          <Link href="/personnes" className={styles.link}>
            Personnes
          </Link>
          <Link href="/animaux" className={styles.link}>
            Animaux
          </Link>
          <Link href="/questions" className={styles.link}>
            Questions
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
