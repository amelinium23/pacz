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
    width: "650px",
  },
  container: {
    display: "flex",
    alignSelf: "center",
  },
  cell: {
    width: "250px",
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
  const [selectedScreening, setSelectedScreening] = useState({});
  const classes = useStyles();

  async function requestScreening() {
    const res = await axios.get(`http://localhost:8080/screenings`);
    updateScreenings(res.data);
  }

  useEffect(() => {
    requestScreening();
  }, [selectedScreening]);

  return (
    <div className={classes.root}>
      <AutoComplete
        id="screening-selection"
        onChange={(event, newValue) => {
          console.log(newValue);
          setSelectedScreening(newValue);
        }}
        options={screenings}
        getOptionLabel={(option) => option.screeningDate}
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
            <TableCell>Bilety</TableCell>
            <TableCell>Film</TableCell>
            <TableCell>Data seansu</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          }
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default TicketList;
