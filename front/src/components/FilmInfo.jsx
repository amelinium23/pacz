import React, { useContext } from "react";
import { Card, Button, makeStyles } from "@material-ui/core";
import FilmContext from "./FilmContext";

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
  async function removeFilm(filmId) {
    await fetch(`http://localhost:8080/films/${filmId}`, {
      method: "DELETE",
    });
    setFilms(films.filter((film) => film.id != filmId));
  }
  return (
    <Card key={id} className={classes.info}>
      <p>Tytuł: {title}</p>
      <p>Długość filmu: {length} min</p>
      <Button className={classes.button}>Edytuj</Button>
      <Button onClick={() => removeFilm(id)} className={classes.button}>
        Usuń
      </Button>
    </Card>
  );
};

export default FilmInfo;
