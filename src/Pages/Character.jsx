import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const Character = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characterData, setCharacterData] = useState({});
  const [comicData, setComicData] = useState([]);

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
  }, [characterId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Vérifier si la description du personnage est vide et afficher du Lorem ipsum sinon
  const characterDescription = characterData.description
    ? characterData.description
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum dignissim neque urna, et viverra tellus mattis eu. Quisque sollicitudin in leo ac semper. Ut vitae libero a odio porta tristique.";

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
