"use client";
import chien from "../public/adorable-chien.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <main>
        <Image src={chien} alt="chien" width={1800} />
      </main>
    </div>
  );
}
