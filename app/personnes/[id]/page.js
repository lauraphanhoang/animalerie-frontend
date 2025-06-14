"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "../../page.module.css";

const Informations = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personRes = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/person/${id}`
        );
        setPerson(personRes.data);
        setAnimals(personRes.data.animals || []);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!person) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.liste}>
        <h1>
          {person.firstName} {person.lastName}
        </h1>
        <p>
          <strong>email :</strong> {person.email}
        </p>
        <p>
          <strong>téléphone :</strong> {person.phoneNumber}
        </p>

        <h2>Animaux </h2>
        {animals.length === 0 ? (
          <p>Aucun animal enregistré pour cette personne.</p>
        ) : (
          <div>
            {animals.map((animal) => (
              <div key={animal.id}>
                {animal.name} - {animal.species}, {animal.breed}
              </div>
            ))}
          </div>
        )}
        <br></br>
        <Link href="/personnes">
          <button className={styles.button}>← Retour à la liste</button>
        </Link>
      </div>
    </div>
  );
};
export default Informations;
