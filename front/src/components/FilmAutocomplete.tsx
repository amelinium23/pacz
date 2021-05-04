import { Autocomplete } from "@material-ui/lab";
import { TextField, makeStyles } from "@material-ui/core";
import { Film } from "../utils/APIResponseTypes";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
}));

interface IProps {
  handleChange: (newFilm: Film) => void;
  options: Film[];
}

const FilmAutocomplete = ({ handleChange, options }: IProps): JSX.Element => {
  const classes = useStyles();
  const onChange = (event: unknown, newValue: Film) => {
    handleChange(newValue);
  };
  return (
    <Autocomplete
      id="film-selection"
      disableClearable
      onChange={onChange}
      options={options}
      getOptionSelected={(option: Film, value: Film) => option.id === value.id}
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
    />
  );
};
export default FilmAutocomplete;
