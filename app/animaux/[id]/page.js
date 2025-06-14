"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import styles from "../../page.module.css";

const AnimalInformations = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/animal/${id}`
        );
        setAnimal(response.data);
        setOwner(response.data.owner);
      } catch (err) {
        console.error("Erreur chargement API :", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!animal) return <p>Animal non trouvé</p>;

  return (
    <div className={styles.container}>
      <div className={styles.liste}>
        <h1>{animal.name}</h1>
        <p>
          <strong>espèce :</strong> {animal.species}
        </p>
        <p>
          <strong>race :</strong> {animal.breed}
        </p>
        <p>
          <strong>couleur :</strong> {animal.color}
        </p>
        <p>
          <strong>poids :</strong> {animal.weight} g
        </p>

        <h2>Maître</h2>
        {owner ? (
          <div>
            <p>
              <strong>nom :</strong> {owner.firstName} {owner.lastName}
            </p>
            <p>
              <strong>email :</strong> {owner.email}
            </p>
            <p>
              <strong>téléphone :</strong> {owner.phoneNumber}
            </p>
          </div>
        ) : (
          <p>Aucun maître enregistré.</p>
        )}
        <Link href="/animaux">
          <button className={styles.button}>← Retour à la liste</button>
        </Link>
      </div>
    </div>
  );
};
export default AnimalInformations;
