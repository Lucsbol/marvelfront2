import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Pages/Header";
import Footer from "../Pages/Footer";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(100);
  const maxPage = 474;

  useEffect(() => {
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

  const handlePreviousPage = () => {
    setSkip(Math.max(0, skip - limit));
  };

  const handleNextPage = () => {
    if (skip + limit < maxPage * limit) {
      setSkip(skip + limit);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Header /> {/* Inclusion du composant Header */}
        <div>Loading...</div>
        <Footer /> {/* Inclusion du composant Footer */}
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  return (
    <div>
      <Header /> {/* Inclusion du composant Header */}
      <div className="comicsContainer">
        <h1>Comics</h1>
        <input
          type="text"
          placeholder="Search comics"
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
          {data.results.map((comics) => (
            <div className="comics" key={comics._id}>
              <Link to={`/comic/${comics._id}`}>
                <img
                  src={`${comics.thumbnail.path}/portrait_uncanny.${comics.thumbnail.extension}`}
                  alt={`${comics.title} thumbnail`}
                />
              </Link>
              <h3 className="comicsTitle">{comics.title}</h3>
              {comics.description === null ? (
                <p>
                  {" "}
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum dignissim neque urna, et viverra tellus mattis eu.
                  Quisque sollicitudin in leo ac semper. Ut vitae libero a odio
                  porta tristique{" "}
                </p>
              ) : (
                <p>{comics.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer /> {/* Inclusion du composant Footer */}
    </div>
  );
};

export default Comics;
