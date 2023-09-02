import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const Comic = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelback--8v56f9bv5z26.code.run/comic/${id}`
        );
        console.log("response data ==> ", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data: ", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <Header /> {/* Inclusion du composant Header */}
        <div className="comic-container">
          <p>Loading...</p>
        </div>
        <Footer /> {/* Inclusion du composant Footer */}
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <Header /> {/* Inclusion du composant Header */}
        <div className="comic-container">
          <p>No data available</p>
        </div>
        <Footer /> {/* Inclusion du composant Footer */}
      </div>
    );
  }

  return (
    <div>
      <Header /> {/* Inclusion du composant Header */}
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
          </div>
        </div>

        {/* Le lien "Retour aux comics" est déplacé ici, à la fin de la page */}
        <Link to="/comics" className="return-link">
          Retour aux comics
        </Link>
      </div>
      <Footer /> {/* Inclusion du composant Footer */}
    </div>
  );
};

export default Comic;
