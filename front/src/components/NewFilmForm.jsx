import {
  Accordion,
  AccordionDetails,
  Input,
  AccordionSummary,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import React, { useState } from "react";

const useStyles = makeStyles({
  input: {
    width: "700px",
    margin: "10px 1% 10px 1%",
  },
  table: {
    width: "900px",
  },
  container: {
    marginLeft: "14%",
    width: "100%",
  },
  cell: {
    width: "300px",
  },
  button: {
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    border: "1px solid black",
    backgroundColor: "white",
  },
  submit: {
    margin: "10px 1% 10px 1%",
    width: "100%",
    border: "1px solid black",
  },
  filmForm: {
    margin: "auto",
  },
});

const NewFilmForm = ({
  handleSubmit,
  title,
  updateTitle,
  length,
  updateLength,
}) => {
  const classes = useStyles();
  const onSubmit = (e) => {
    handleSubmit(e);
    setIsExpanded(false);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion expanded={isExpanded} style={{ margin: "auto", width: "50%" }}>
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
        <form id="addFilm" onSubmit={onSubmit} className={classes.filmForm}>
          <Input
            className={classes.input}
            value={title}
            name="title"
            placeholder="Wpisz tytuł"
            onChange={(e) => updateTitle(e.target.value)}
            required
          />{" "}
          <br />
          <Input
            className={classes.input}
            placeholder="Wpisz długość w minutach"
            value={length}
            type="number"
            name="length"
            onChange={(e) => updateLength(e.target.value)}
            required
          />
          <br />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className={classes.submit}
          >
            Zatwierdź
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default NewFilmForm;
