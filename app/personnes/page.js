"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "../page.module.css";

const Personnes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/person`
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page !== "..." && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <div>
            <main>
              <h1>Listes des personnes</h1>

              <div className={styles.liste}>
                {currentData.map((person) => (
                  <div className={styles.item} key={person.id}>
                    <Link
                      className={styles.lien}
                      href={`/personnes/${person.id}`}
                    >
                      {person.firstName} {person.lastName}
                    </Link>
                  </div>
                ))}
              </div>

              <div className={styles.pagination}>
                <button
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Précédent
                </button>

                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => changePage(page)}
                    disabled={page === "..."}
                    className={page === currentPage ? styles.activePage : ""}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => changePage(currentPage + 1)}
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

export default Personnes;
