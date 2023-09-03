import Header from "./Header";
import Footer from "./Footer";

const Favoris = () => {
  return (
    <div>
      <Header />
      <div>
        <h1 className="persopref"> Mes personnages préférés sont : </h1>{" "}
      </div>
      <h1 className="comicpref"> Mes comics préférés sont : </h1> <Footer />
    </div>
  );
};

export default Favoris;
