import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import Cookies from "js-cookie";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const maxPage = 474;

  const [favoriteTab, setFavoriteTab] = useState(() => {
    const savedFavorites = Cookies.get("comicsfavorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);

        if (Array.isArray(parsedFavorites)) {
          return parsedFavorites;
        } else {
          console.error(
            "La valeur des cookies n'est pas un tableau JSON valide."
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la désérialisation JSON des cookies:",
          error
        );
      }
    }
    return [];
  });

  useEffect(() => {
    console.log(
      "Cookies présents au chargement initial (Comics) : ",
      Cookies.get()
    );

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--8v56f9bv5z26.code.run/comics?limit=${limit}&skip=${skip}&title=${searchQuery}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [searchQuery, skip, limit]);

  useEffect(() => {
    console.log("Favorites mis à jour (Comics) : ", favoriteTab);

    Cookies.set("comicsfavorites", JSON.stringify(favoriteTab), {
      expires: 365,
    });
  }, [favoriteTab]);

  const handlePreviousPage = () => {
    setSkip(Math.max(0, skip - limit));
  };

  const handleNextPage = () => {
    if (skip + limit < maxPage * limit) {
      setSkip(skip + limit);
    }
  };

  const toggleFavorite = (comicId) => {
    if (favoriteTab.includes(comicId)) {
      setFavoriteTab((prevFavorites) =>
        prevFavorites.filter((id) => id !== comicId)
      );
    } else {
      setFavoriteTab((prevFavorites) => [...prevFavorites, comicId]);
    }
  };

  const isFavorite = (comicId) => {
    return favoriteTab.includes(comicId);
  };

  if (isLoading) {
    return (
      <div>
        <Header />
        <div>Chargement...</div>
        <Footer />
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div>
      <Header />
      <div className="comicsContainer">
        <input
          type="text"
          placeholder="Chercher un comic"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <div className="pagination-simple">
          <button onClick={handlePreviousPage} disabled={skip === 0}>
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={skip + limit >= data.total || currentPage >= totalPages}
          >
            Suivant
          </button>
        </div>
        <div className="comicsGrid">
          {data.results.map((comic) => (
            <div className="comics" key={comic._id}>
              <Link to={`/comic/${comic._id}`}>
                <img
                  src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                  alt={`${comic.title} thumbnail`}
                />
              </Link>
              <h3 className="comicsTitle">{comic.title}</h3>
              {comic.description === null ? (
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dignissim neque urna, et viverra tellus mattis eu.
                  Quisque sollicitudin in leo ac semper. Ut vitae libero a odio
                  porta tristique{" "}
                </p>
              ) : (
                <p>{comic.description}</p>
              )}
              <button onClick={() => toggleFavorite(comic._id)}>
                {isFavorite(comic._id)
                  ? "💔 Supprimer des favoris"
                  : "❤️ Ajouter aux favoris"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Comics;
