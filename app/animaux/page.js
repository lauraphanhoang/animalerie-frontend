"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../page.module.css";

const Animaux = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL;

        const response = await axios.get(`${API}/animal`);
        setData(response.data);
        // console.log(response.data.animals);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const goToPrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div>
            <main>
              <h1>Animaux</h1>
              <div className={styles.liste}>
                {currentData.map((animal) => (
                  <div key={animal.id}>
                    <Link
                      className={styles.lien}
                      href={`/animaux/${animal.id}`}
                    >
                      {animal.name} {animal.species}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination controls */}
              <div className={styles.pagination}>
                <button onClick={goToPrevious} disabled={currentPage === 1}>
                  Précédent
                </button>
                <span>
                  {" "}
                  Page {currentPage} / {totalPages}{" "}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </button>
              </div>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Animaux;
