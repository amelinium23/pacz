import React, { useEffect, useState } from "react";
import axios from "axios";
import FilmAutocomplete from "../components/FilmAutocomplete.tsx";

const FilmSelector = ({ setSelectedFilm }) => {
  const [films, setFilms] = useState([]);
  const requestData = async () => {
    try {
      let json = await axios.get(`http://localhost:8080/films`);
      setFilms(json.data);
    } catch (err) {
      alert("Błąd połączenia");
    }
  };

  useEffect(() => requestData(), []);

  return <FilmAutocomplete handleChange={setSelectedFilm} options={films} />;
};

export default FilmSelector;
