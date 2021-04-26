import React, { useContext } from "react";
import { Card, Button } from "@material-ui/core";
import FilmContext from "./FilmContext";

const FilmInfo = ({ id, title, length }) => {
  const [films, setFilms] = useContext(FilmContext);
  async function removeFilm(filmId) {
    await fetch(`http://localhost:8080/films/${filmId}`, {
      method: "DELETE",
    });
    setFilms(films.filter((film) => film.id != filmId));
  }
  return (
    <Card
      key={id}
      style={{
        width: "400px",
        textAlign: "center",
        padding: "10px",
        border: "1px solid black",
      }}
    >
      <p>Tytuł: {title}</p>
      <p>Długość filmu: {length} min</p>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Edytuj
      </Button>
      <Button
        onClick={() => removeFilm(id)}
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginLeft: "4%",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        Usuń
      </Button>
    </Card>
  );
};

export default FilmInfo;
