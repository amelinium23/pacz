import React, { useContext, useState } from "react";
import { Card, Button, makeStyles, Input } from "@material-ui/core";
import FilmContext from "../utils/FilmContext";
import axios from "axios";

const useStyles = makeStyles(() => ({
  info: {
    width: "400px",
    textAlign: "center",
    padding: "5px",
    border: "1px solid black",
    margin: "10px",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "white",
    border: "1px solid black",
    marginTop: "10px",
    marginBottom: "10px",
    margin: "2%",
  },
}));

const FilmInfo = ({ id, title, length }) => {
  const classes = useStyles();
  const [films, setFilms] = useContext(FilmContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newRuntime, setNewRuntime] = useState(length);
  const removeFilm = async (filmId) => {
    try {
      await fetch(`http://localhost:8080/films/${filmId}`, {
        method: "DELETE",
      });
      setFilms(films.filter((film) => film.id != filmId));
    } catch (err) {
      alert("Błąd przy usuwaniu");
    }
  };
  const handleUpdate = async (filmId) => {
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
    <Card key={id} className={classes.info}>
      {isEditing ? (
        <Input
          className={classes.input}
          name="name"
          value={newTitle}
          placeholder="Nazwa filmu"
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      ) : (
        <p>Tytuł: {title}</p>
      )}
      {isEditing ? (
        <Input
          className={classes.input}
          name="name"
          value={newRuntime}
          placeholder="Długość filmu"
          onChange={(e) => setNewRuntime(e.target.value)}
          required
        />
      ) : (
        <p>Długość filmu: {length} min</p>
      )}
      <Button
        className={classes.button}
        onClick={async () => {
          isEditing ? handleUpdate(id) : setIsEditing(true);
        }}
      >
        {isEditing ? "Zatwierdź zmiany" : "Edytuj"}
      </Button>
      <Button onClick={() => removeFilm(id)} className={classes.button}>
        Usuń
      </Button>
    </Card>
  );
};

export default FilmInfo;
