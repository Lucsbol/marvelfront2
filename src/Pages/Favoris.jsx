import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import axios from "axios"; // Importez axios si vous ne l'avez pas déjà fait

const Favoris = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);
  const [characterData, setCharacterData] = useState([]); // Les données des personnages depuis votre source de données
  const [comicData, setComicData] = useState([]); // Les données des comics depuis votre source de données

  // Récupérer les comics préférés depuis les cookies
  const comicsFavoritesCookie = Cookies.get("comicsfavorites");
  useEffect(() => {
    if (comicsFavoritesCookie) {
      const parsedComicsFavorites = JSON.parse(comicsFavoritesCookie);
      setFavoriteComics(parsedComicsFavorites);
    }
  }, [comicsFavoritesCookie]);

  // Récupérer les personnages préférés depuis les cookies
  const charactersFavoritesCookie = Cookies.get("charactersfavorites");
  useEffect(() => {
    if (charactersFavoritesCookie) {
      const parsedCharactersFavorites = JSON.parse(charactersFavoritesCookie);
      setFavoriteCharacters(parsedCharactersFavorites);
    }
  }, [charactersFavoritesCookie]);

  // Récupérer les détails des personnages préférés depuis l'API
  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterDetails = await Promise.all(
          favoriteCharacters.map(async (characterId) => {
            const response = await axios.get(
              `https://site--marvelback--8v56f9bv5z26.code.run/characters/${characterId}`
            );
            return response.data;
          })
        );
        setCharacterData(characterDetails);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des personnages :",
          error
        );
      }
    };

    if (favoriteCharacters.length > 0) {
      fetchCharacterDetails();
    }
  }, [favoriteCharacters]);

  // Récupérer les détails des comics préférés depuis l'API
  useEffect(() => {
    const fetchComicDetails = async () => {
      try {
        const comicDetails = await Promise.all(
          favoriteComics.map(async (comicId) => {
            const response = await axios.get(
              `https://site--marvelback--8v56f9bv5z26.code.run/comic/${comicId}`
            );
            return response.data;
          })
        );
        setComicData(comicDetails);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des comics :",
          error
        );
      }
    };

    if (favoriteComics.length > 0) {
      fetchComicDetails();
    }
  }, [favoriteComics]);

  return (
    <div className="container-favori">
      <Header />
      <div className="favoris">
        <h1 className="persopref"> Mes personnages préférés sont : </h1>
        <div className="charactersGrid">
          {characterData.map((character) => (
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
        <h1 className="comicpref"> Mes comics préférés sont : </h1>
        <div className="comicsGrid">
          {comicData.map((comic) => (
            <div className="comics" key={comic._id}>
              <Link to={`/comic/${comic._id}`}>
                <img
                  src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                  alt={`${comic.title} thumbnail`}
                />
              </Link>
              <h3 className="Title">{comic.title}</h3>
              {comic.description === "" ? (
                <p>Description indisponible.</p>
              ) : (
                <p>{comic.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favoris;
