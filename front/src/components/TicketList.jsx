import React, { useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  TableBody,
  Paper,
} from "@material-ui/core";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  table: {
    marginRight: "30px",
    marginTop: "10px",
    width: "84.5%",
  },
  container: {
    display: "flex",
    alignSelf: "center",
  },
  cell: {
    width: "auto",
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    margin: "10px auto",
    border: "1px solid black",
    backgroundColor: "white",
  },
});

const TicketList = () => {
  const [screenings, updateScreenings] = useState([]);
  const [tickets, updateTickets] = useState([]);
  const [selectedScreening, setSelectedScreening] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const requestScreenings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/screenings`);
        updateScreenings(res.data);
      } catch (err) {
        alert("Błąd pobierania seansów");
      }
    };
    requestScreenings();
  }, []);
  useEffect(() => {
    const requestTickets = async () => {
      try {
        if (selectedScreening.id !== undefined) {
          const res = await axios.get(
            `http://localhost:8080/tickets?screeningId=${selectedScreening.id}`
          );
          console.log(res.data);
          updateTickets(res.data);
        }
      } catch (err) {
        alert("Błąd pobierania biletów");
      }
    };
    requestTickets();
  }, [selectedScreening]);

  return (
    <div className={classes.root}>
      <AutoComplete
        id="screening-selection"
        onChange={(event, newValue) => {
          setSelectedScreening(newValue);
        }}
        options={screenings}
        getOptionLabel={(option) =>
          `${option.film.title} - ${option.screeningDate} - ${option.startTime}`
        }
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            className={classes.input}
            {...params}
            label="Wybierz seans"
            variant="outlined"
            required
          />
        )}
      />
      <TableContainer className={classes.table} component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Ilość miejsc</TableCell>
            <TableCell align="right">Cena</TableCell>
            <TableCell align="right">Film</TableCell>
            <TableCell align="right">Data seansu</TableCell>
            <TableCell align="right">Godzina rozpoczęcia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets.map((i) => (
            <TableRow key={i.id}>
              <TableCell>{i.reservedSeats.length}</TableCell>
              <TableCell>{i.price.toFixed(2)} zł</TableCell>
              <TableCell align="right">{i.screening.film.title}</TableCell>
              <TableCell align="right">{i.screening.screeningDate}</TableCell>
              <TableCell align="right">{i.screening.startTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default TicketList;
