import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages

import Home from "./Pages/Home";
import Characters from "./Pages/Characters";
import Character from "./Pages/Character";
import Comics from "./Pages/Comics";
import Comic from "./Pages/Comic";
import Home2 from "./Pages/Home2";
import Favoris from "./Pages/Favoris";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home2 />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/character/:characterId" element={<Character />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:id" element={<Comic />} />{" "}
        <Route path="/favoris" element={<Favoris />} />
      </Routes>
    </Router>
  );
}

export default App;
