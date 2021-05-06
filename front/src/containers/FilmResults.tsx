import FilmInfo from "./FilmInfo";
import { useContext } from "react";
import FilmContext from "../utils/FilmContext";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "auto",
  },
  gridCell: {
    marginLeft: "20px",
    marginRight: "52px",
  },
}));

const FilmResults = (): JSX.Element => {
  const classes = useStyles();
  const [films] = useContext(FilmContext);
  return (
    <Grid container className={classes.root}>
      {films.map((i) => (
        <Grid item xs={3} key={i.id} className={classes.gridCell}>
          <FilmInfo id={i.id} title={i.title} length={i.length} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FilmResults;
