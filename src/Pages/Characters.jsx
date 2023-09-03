import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--8v56f9bv5z26.code.run/characters?limit=${limit}&skip=${skip}&name=${searchQuery}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchQuery, skip, limit]);

  const handlePreviousPage = () => {
    setSkip(Math.max(0, skip - limit));
  };

  const handleNextPage = () => {
    if (skip + limit < data.count) {
      setSkip(skip + limit);
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  const maxPage = Math.ceil(data.count / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div>
      <Header />
      <div className="charactersContainer">
        <input
          type="text"
          placeholder="Chercher un personnage"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className="pagination-simple">
          <button onClick={handlePreviousPage} disabled={skip === 0}>
            Précédent
          </button>
          <span>
            Page {currentPage} sur {maxPage}
          </span>
          <button
            onClick={handleNextPage}
            disabled={skip + limit >= data.count || currentPage >= maxPage}
          >
            Suivant
          </button>
        </div>
        <div className="charactersGrid">
          {data.results.map((character) => (
            <div className="characters" key={character._id}>
              <Link to={`/character/${character._id}`}>
                <img
                  src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                  alt={`${character.name} thumbnail`}
                />
              </Link>
              <h3 className="Name">{character.name}</h3>
              {character.description === "" ? (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dignissim neque urna, et viverra tellus mattis eu.
                  Quisque sollicitudin in leo ac semper. Ut vitae libero a odio
                  porta tristique
                </p>
              ) : (
                <p>{character.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Characters;
