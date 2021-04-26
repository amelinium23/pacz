import FilmInfo from "./FilmInfo.jsx";
import "../films.css";
import { useContext } from "react";
import FilmContext from "./FilmContext";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  films: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
  },
}));

const FilmResults = () => {
  const classes = useStyles();
  const [films] = useContext(FilmContext);
  return (
    <div className={classes.films}>
      {films.map((i) => (
        <FilmInfo
          key={i.id}
          id={i.id}
          title={i.title}
          length={i.length}
          sty
        ></FilmInfo>
      ))}
    </div>
  );
};

export default FilmResults;
