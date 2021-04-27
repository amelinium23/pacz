import {
  Accordion,
  AccordionDetails,
  Input,
  AccordionSummary,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FilmResults from "./FilmResults.jsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilmContext from "./FilmContext";

const useStyles = makeStyles(() => ({
  root: {
    width: "90%",
  },
}));

const FilmScreen = () => {
  const classes = useStyles();
  const [title, updateTitle] = useState("");
  const [length, updateLength] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const filmState = useState([]);
  const [films, setFilms] = filmState; // I don't like it, but oh well
  useEffect(() => {
    requestFilms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestFilms = async () => {
    const json = await axios.get(`http://localhost:8080/films`);
    setFilms(json.data);
  };

  const addFilm = async () => {
    const res = await axios.post("http://localhost:8080/films", {
      title: title,
      length: length,
    });
    setFilms([...films, res.data]);
  };
  return (
    <FilmContext.Provider value={filmState}>
      <div className={classes.root}>
        <Accordion expanded={isExpanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: "10px 10px 0 0px" }}
          >
            <Typography>Dodaj film</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form
              id="addFilm"
              onSubmit={(e) => {
                e.preventDefault();
                addFilm();
                setIsExpanded(false);
              }}
              className={classes.root}
            >
              <Input
                name="title"
                placeholder="Wpisz tytuł"
                style={{
                  width: "500px",
                }}
                onChange={(e) => updateTitle(e.target.value)}
                required
              />{" "}
              <br />
              <Input
                placeholder="Wpisz długość w minutach"
                style={{
                  width: "200px",
                }}
                type="number"
                name="length"
                onChange={(e) => updateLength(e.target.value)}
                required
              />
              <br />
              <Button type="submit" color="primary" fullWidth>
                Zatwierdź
              </Button>
            </form>
          </AccordionDetails>
        </Accordion>
        <FilmResults />
      </div>
    </FilmContext.Provider>
  );
};

export default FilmScreen;
