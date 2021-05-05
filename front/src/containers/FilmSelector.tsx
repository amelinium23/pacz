import { useEffect, useState } from "react";
import axios from "axios";
import FilmAutocomplete from "../components/FilmAutocomplete";
import { Film } from "../utils/APIResponseTypes";

const FilmSelector = ({
  setSelectedFilm,
}: {
  setSelectedFilm: (newFilm: Film) => void;
}): JSX.Element => {
  const [films, setFilms] = useState([] as Film[]);
  const requestData = async () => {
    try {
      const json = await axios.get(`http://localhost:8080/films`);
      setFilms(json.data as Film[]);
    } catch (err) {
      alert("Błąd połączenia");
    }
  };

  useEffect(() => void requestData(), []);

  return <FilmAutocomplete handleChange={setSelectedFilm} options={films} />;
};

export default FilmSelector;
