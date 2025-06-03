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
          `https://animalerie-backend.onrender.com/animal/${id}`
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
      <h1>{animal.name}</h1>
      <p>
        <strong>Espèce :</strong> {animal.species}
      </p>
      <p>
        <strong>Race :</strong> {animal.breed}
      </p>
      {animal.color && (
        <p>
          <strong>Couleur :</strong> {animal.color}
        </p>
      )}
      {animal.weight && (
        <p>
          <strong>Poids :</strong> {animal.weight}g
        </p>
      )}
      <h2>Maître</h2>
      {owner ? (
        <div>
          <p>
            <strong>Nom :</strong> {owner.firstName} {owner.lastName}
          </p>
          <p>
            <strong>Email :</strong> {owner.email}
          </p>
          <p>
            <strong>Téléphone :</strong> {owner.phoneNumber}
          </p>
        </div>
      ) : (
        <p>Aucun maître enregistré.</p>
      )}
      <Link href="/animaux">
        <button className={styles.button}>← Retour à la liste</button>
      </Link>
    </div>
  );
};
export default AnimalInformations;
