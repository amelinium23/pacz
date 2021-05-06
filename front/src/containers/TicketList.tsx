import { useState, useEffect } from "react";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import AutoComplete from "@material-ui/lab/Autocomplete";
import { TextField } from "@material-ui/core";
import TicketTable from "../components/TicketTable";
import { Screening, Ticket } from "../utils/APIResponseTypes";

const useStyles = makeStyles({
  root: {
    width: "50%",
    margin: "auto",
  },
  button: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    marginBottom: "2%",
    marginTop: "2%",
    border: "1px solid black",
    backgroundColor: "white",
  },
});

const TicketList = (): JSX.Element => {
  const [screenings, updateScreenings] = useState([] as Screening[]);
  const [tickets, updateTickets] = useState([] as Ticket[]);
  const [selectedScreening, setSelectedScreening] = useState(
    {} as Screening | null
  );
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
        if (selectedScreening && selectedScreening.id !== undefined) {
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
        style={{ marginTop: "1.5%" }}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wybierz seans"
            variant="outlined"
            required
          />
        )}
      />
      <TicketTable tickets={tickets} />
    </div>
  );
};

export default TicketList;
