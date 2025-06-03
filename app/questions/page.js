"use client";
import { useEffect, useState } from "react";

export default function QuestionsPage() {
  const [data, setData] = useState({});
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);

  const questions = [
    { key: "oldest", label: "Quel est l'animal le plus vieux ?" },
    {
      key: "mostRepresentedSpecies",
      label: "Quelle est l'espèce la plus représentée ?",
    },
    {
      key: "topOwner",
      label: "Quel est le propriétaire ayant le plus d'animaux ?",
    },
    {
      key: "topCatOwner",
      label: "Quel est le propriétaire ayant le plus de chats ?",
    },
    { key: "heaviestAnimal", label: "Quel est l'animal le plus lourd ?" },
    {
      key: "heaviestGroup",
      label: "Quel propriétaire a le groupe d’animaux le plus lourd ?",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const endpoints = {
          oldest: "/oldest",
          mostRepresentedSpecies: "/most-represented-species",
          topOwner: "/top-owner",
          topCatOwner: "/top-cat-owner",
          heaviestAnimal: "/heaviest-animal",
          heaviestGroup: "/heaviest-group",
        };

        const results = await Promise.all(
          Object.entries(endpoints).map(async ([key, url]) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/animal${url}`
            );
            const json = await res.json();
            return [key, json];
          })
        );

        setData(Object.fromEntries(results));
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "date inconnue";
    const date = new Date(dateString);
    if (isNaN(date)) return "date invalide";
    return date.toISOString().split("T")[0];
  }

  function getFormattedAnswer(key) {
    const answer = data[key];
    if (!answer) return "Aucune donnée disponible.";
    console.log("Données pour", key, answer);

    switch (key) {
      case "oldest":
        return `L'animal le plus vieux est ${answer.name}, un ${answer.color} ${
          answer.breed
        } ${answer.species} né le ${formatDate(answer.dateOfBirth)}. Il pèse ${
          answer.weight
        } grammes.`;

      case "mostRepresentedSpecies":
        return `L'espèce la plus représentée est ${answer.animal_species} avec ${answer.count} animaux.`;

      case "topOwner":
        return `Le propriétaire avec le plus d'animaux est ${answer.LastName} ${answer.FirstName} avec ${answer.count} animaux.`;

      case "topCatOwner":
        return `Le propriétaire avec le plus de chats est ${answer.LastName} ${answer.FirstName} avec ${answer.count} chats.`;

      case "heaviestAnimal":
        return `L'animal le plus lourd est ${answer.name}, un ${answer.color} ${answer.breed} ${answer.species} pesant ${answer.weight} grammes.`;

      case "heaviestGroup":
        return `Le propriétaire avec le groupe d'animaux le plus lourd est ${answer.LastName} ${answer.FirstName}, avec un poids total de ${answer.totalWeight} grammes.`;

      default:
        return JSON.stringify(answer, null, 2);
    }
  }

  if (loading) return <p>Chargement des questions...</p>;

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Questions fréquentes</h1>
      <div style={{ marginTop: "1rem" }}>
        {questions.map((q) => (
          <div key={q.key} style={{ marginBottom: "1rem" }}>
            <button
              onClick={() => setOpen(open === q.key ? null : q.key)}
              style={{
                background: "#f0f0f0",
                border: "1px solid #ccc",
                padding: "1rem",
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {q.label}
            </button>
            {open === q.key && (
              <div
                style={{
                  fontSize: "13px",
                  padding: "10px",
                  background: "#fafafa",
                  border: "1px solid #eee",
                  borderTop: "none",
                }}
              >
                <p>{getFormattedAnswer(q.key)}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
