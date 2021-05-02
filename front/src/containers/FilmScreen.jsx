import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FilmResults from "./FilmResults.jsx";
import FilmContext from "../utils/FilmContext";
import NewFilmForm from "../components/NewFilmForm.jsx";

const FilmScreen = () => {
  const [title, updateTitle] = useState("");
  const [length, updateLength] = useState(0);
  const filmState = useState([]);
  const [films, setFilms] = filmState; // I don't like it, but oh well
  useEffect(() => {
    const requestFilms = async () => {
      try {
        const json = await axios.get(`http://localhost:8080/films`);
        setFilms(json.data);
      } catch (err) {
        alert("Bład połączenia");
      }
    };
    requestFilms();
  }, [setFilms]);

  const addFilm = async () => {
    try {
      const res = await axios.post("http://localhost:8080/films", {
        title: title,
        length: length,
      });
      setFilms([...films, res.data]);
    } catch (err) {
      alert("Błąd przy dodawaniu filmu");
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    addFilm();
    updateTitle("");
    updateLength(null);
  };
  return (
    <FilmContext.Provider value={filmState}>
      <div style={{ width: "100%", marginLeft: "6%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <NewFilmForm
              handleSubmit={submitForm}
              title={title}
              updateTitle={updateTitle}
              length={length}
              updateLength={updateLength}
            />
          </Grid>
          <FilmResults />
        </Grid>
      </div>
    </FilmContext.Provider>
  );
};

export default FilmScreen;
