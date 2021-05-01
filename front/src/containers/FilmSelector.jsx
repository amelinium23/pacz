import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
}));

const FilmSelector = ({ setSelectedFilm }) => {
  const classes = useStyles();
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

  return (
    <Autocomplete
      id="film-selection"
      disableClearable
      onChange={(event, newValue) => {
        setSelectedFilm(newValue);
      }}
      options={films}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField
          className={classes.input}
          {...params}
          label="Wybierz film"
          variant="outlined"
          required
        />
      )}
      required
    />
  );
};

export default FilmSelector;
