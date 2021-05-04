import { useContext, useState } from "react";
import FilmContext from "../utils/FilmContext";
import FilmCard from "../components/FilmCard";
import axios from "axios";

interface IProps {
  id: number;
  title: string;
  length: number;
}

const FilmInfo = ({ id, title, length }: IProps): JSX.Element => {
  const [films, setFilms] = useContext(FilmContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newRuntime, setNewRuntime] = useState(length);
  const removeFilm = async (filmId: number) => {
    try {
      await fetch(`http://localhost:8080/films/${filmId}`, {
        method: "DELETE",
      });
      setFilms(films.filter((film) => film.id != filmId));
    } catch (err) {
      alert("Błąd przy usuwaniu");
    }
  };
  const handleUpdate = async (filmId: number) => {
    try {
      await axios.put(`http://localhost:8080/films/${filmId}`, {
        title: newTitle,
        length: newRuntime,
      });
      setIsEditing(false);
      setFilms(
        films.map((film) =>
          film.id === id
            ? { id: id, title: newTitle, length: newRuntime }
            : film
        )
      );
    } catch (err) {
      alert("Błąd przy aktualizacji");
    }
  };
  return (
    <FilmCard
      id={id}
      title={title}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      newRuntime={newRuntime}
      setNewRuntime={setNewRuntime}
      length={length}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      handleUpdate={handleUpdate}
      removeFilm={removeFilm}
    />
  );
};

export default FilmInfo;
