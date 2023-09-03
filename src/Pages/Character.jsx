import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";
import Cookies from "js-cookie"; // Importez la bibliothèque Cookies

const Character = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState({});
  const [comicData, setComicData] = useState([]);
  const [favorites, setFavorites] = useState([]); // Ajoutez un état pour les favoris

  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--8v56f9bv5z26.code.run/comics/${characterId}`
        );
        console.log(response.data);
        setCharacterData(response.data);
        setComicData(response.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    // Récupérez la liste des favoris depuis les cookies au chargement
    const savedFavorites = Cookies.get("charactersfavorites");
    if (savedFavorites) {
      try {
        // Tentez de désérialiser la chaîne JSON depuis les cookies
        const parsedFavorites = JSON.parse(savedFavorites);

        // Assurez-vous que parsedFavorites est un tableau
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
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
  }, [characterId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const characterDescription = characterData.description
    ? characterData.description
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim neque urna, et viverra tellus mattis eu. Quisque sollicitudin in leo ac semper. Ut vitae libero a odio porta tristique.";

  const toggleFavorite = (characterId) => {
    let updatedFavorites;

    if (favorites.includes(characterId)) {
      updatedFavorites = favorites.filter((id) => id !== characterId);
    } else {
      updatedFavorites = [...favorites, characterId];
    }

    setFavorites(updatedFavorites);

    Cookies.set("charactersfavorites", JSON.stringify(updatedFavorites));
    // Affichez les favoris mis à jour dans la console
    console.log("Contenu des cookies (favoris) :", updatedFavorites);
  };

  return (
    <div>
      <Header />
      <div className="characterContainer">
        <div className="characterInfo">
          <div className="characterImage">
            <img
              src={`${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}`}
              alt={`${characterData.name} thumbnail`}
            />
          </div>
          <div className="characterDetails">
            <h1 className="Name">{characterData.name}</h1>
            <p>{characterDescription}</p>
            <button onClick={() => toggleFavorite(characterId)}>
              {favorites.includes(characterId)
                ? "Supprimer des favoris"
                : "Ajouter aux favoris"}
            </button>
          </div>
        </div>
        <h2>Comics:</h2>
        <div className="comicsGrid">
          {comicData.map((comic) => (
            <div className="comics" key={comic._id}>
              <Link to={`/comic/${comic._id}`}>
                <img
                  src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                  alt={`${comic.title} thumbnail`}
                />
              </Link>
              <h3 className="Name">{comic.title}</h3>
              {comic.description === null ? (
                <p className="descriptionPlaceholder">
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dignissim neque urna, et viverra tellus mattis eu.
                  Quisque sollicitudin in leo ac semper. Ut vitae libero a odio
                  porta tristique{" "}
                </p>
              ) : (
                <p>{comic.description}</p>
              )}
            </div>
          ))}
        </div>
        <Link to="/characters">Retour aux personnages</Link>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default Character;
