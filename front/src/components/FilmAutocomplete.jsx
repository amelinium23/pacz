import { Autocomplete } from "@material-ui/lab";
import { TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    width: "100%",
    marginBottom: "1%",
    marginTop: "1.25%",
  },
}));

const FilmAutocomplete = ({ handleChange, options }) => {
  const classes = useStyles();
  const onChange = (event, newValue) => {
    handleChange(newValue);
  };
  return (
    <Autocomplete
      id="film-selection"
      disableClearable
      onChange={onChange}
      options={options}
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
export default FilmAutocomplete;
