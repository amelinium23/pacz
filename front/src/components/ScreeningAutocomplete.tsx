import { Autocomplete } from "@material-ui/lab";
import { TextField } from "@material-ui/core";
import { Screening } from "../utils/APIResponseTypes";

interface IProps {
  screenings: Screening[];
  isSeatSelectorOpen: boolean;
  setIsSelectorOpen: (newValue: boolean) => void;
  setSelectedScreening: (newValue: Screening | null) => void;
}

const ScreeningAutocomplete = ({
  screenings,
  isSeatSelectorOpen,
  setIsSelectorOpen,
  setSelectedScreening,
}: IProps): JSX.Element => {
  return (
    <Autocomplete
      id="combo-box-screenings"
      disableClearable
      options={screenings}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => `${option.screeningDate} ${option.startTime}`}
      onChange={(event, newValue) => {
        if (!isSeatSelectorOpen) {
          setIsSelectorOpen(true);
        }
        setSelectedScreening(newValue);
      }}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Seans" variant="outlined" required />
      )}
    />
  );
};

export default ScreeningAutocomplete;
