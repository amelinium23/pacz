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

import { useState, FormEvent } from "react";

const useStyles = makeStyles({
  input: {
    width: "600px",
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
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    width: "200px",
    margin: "10px auto",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "1px solid #3f50b5",
    boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
  },
  filmForm: {
    margin: "auto",
  },
});

interface IProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  title: string;
  updateTitle: (newTitle: string) => void;
  length: number;
  updateLength: (newLength: number) => void;
}

const NewFilmForm = ({
  handleSubmit,
  title,
  updateTitle,
  length,
  updateLength,
}: IProps): JSX.Element => {
  const classes = useStyles();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    handleSubmit(e);
    setIsExpanded(false);
  };
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Accordion
      expanded={isExpanded}
      style={{
        margin: "auto",
        width: "50%",
        boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
      }}
    >
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
            onChange={(e) => updateLength(parseInt(e.target.value))}
            required
          />
          <br />
          <Button
            type="submit"
            color="primary"
            fullWidth
            className={classes.button}
          >
            Zatwierdź
          </Button>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default NewFilmForm;
