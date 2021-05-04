import FilmInfo from "./FilmInfo";
import "../films.css";
import { useContext } from "react";
import FilmContext from "../utils/FilmContext";
import { Grid } from "@material-ui/core";

const FilmResults = (): JSX.Element => {
  const [films] = useContext(FilmContext);
  return (
    <Grid container>
      {films.map((i) => (
        <Grid item xs={3} key={i.id}>
          <FilmInfo id={i.id} title={i.title} length={i.length} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FilmResults;
