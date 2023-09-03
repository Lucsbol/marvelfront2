import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import Cookies from "js-cookie";

const Comic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const { id } = useParams();

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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--8v56f9bv5z26.code.run/comic/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const toggleFavorite = (comicId) => {
    if (favoriteTab.includes(comicId)) {
      setFavoriteTab((prevFavorites) =>
        prevFavorites.filter((id) => id !== comicId)
      );
    } else {
      setFavoriteTab((prevFavorites) => [...prevFavorites, comicId]);
    }
  };

  useEffect(() => {
    Cookies.set("comicsfavorites", JSON.stringify(favoriteTab), {
      expires: 365,
    });
  }, [favoriteTab]);

  if (isLoading) {
    return (
      <div>
        <Header />
        <div className="comic-container">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <Header />
        <div className="comic-container">
          <p>No data available</p>
        </div>
        <Footer />
      </div>
    );
  }

  const isFavorite = favoriteTab.includes(data._id);

  return (
    <div>
      <Header />
      <div className="comic-container">
        <div className="comicInfo">
          <div className="comic-image">
            <img
              src={`${data.thumbnail.path}/portrait_uncanny.${data.thumbnail.extension}`}
              alt={`${data.title} thumbnail`}
              className="comic-image"
            />
          </div>
          <div className="comic-details">
            <div className="comic-title">
              <h1>{data.title}</h1>
            </div>
            <div className="comic-description">
              {data.description === null ? (
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dignissim neque urna, et viverra tellus mattis eu.
                  Quisque sollicitudin in leo ac semper. Ut vitae libero a odio
                  porta tristique
                </p>
              ) : (
                <p>{data.description}</p>
              )}
            </div>
            <button
              className="boutonfavoris"
              onClick={() => toggleFavorite(data._id)}
            >
              {isFavorite
                ? "💔 Supprimer des favoris"
                : "❤️ Ajouter aux favoris"}
            </button>
          </div>
        </div>
        <button to="/comics" className="return-link">
          Retour aux comics
        </button>
      </div>
      <Footer className="footer-container" />
    </div>
  );
};

export default Comic;
