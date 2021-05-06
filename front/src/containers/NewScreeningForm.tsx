import { useState, FormEvent } from "react";
import axios from "axios";
import { format } from "date-fns";
import NewScreeningModal from "../components/NewScreeningModal";
import { Screening, ScreeningRoom, Film } from "../utils/APIResponseTypes";

interface IProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
  newScreeningHandler: (newScreening: Screening) => void;
}

const NewScreeningForm = ({
  open,
  setOpen,
  newScreeningHandler,
}: IProps): JSX.Element => {
  const [selectedFilm, setSelectedFilm] = useState(null as Film | null);
  const [selectedScreeningRoom, setSelectedScreeningRoom] = useState(
    null as ScreeningRoom | null
  );
  const [selectedDate, handleDateChange] = useState(new Date() as Date | null);
  const submitScreeningForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void addScreening();
    setOpen(false);
    setSelectedFilm(null);
    setSelectedScreeningRoom(null);
    handleDateChange(new Date());
  };
  const addScreening = async () => {
    if (selectedFilm && selectedScreeningRoom && selectedDate) {
      try {
        const json = await axios.post(`http://localhost:8080/screenings`, {
          filmId: selectedFilm.id,
          screeningRoomId: selectedScreeningRoom.id,
          startTime: format(selectedDate, "HH:mm"),
          screeningDate: format(selectedDate, "yyyy-MM-dd"),
        });
        newScreeningHandler(json.data);
      } catch (err) {
        alert("Błąd przy dodawaniu seansu");
      }
    }
  };

  return (
    <NewScreeningModal
      open={open}
      setOpen={setOpen}
      handleSubmit={submitScreeningForm}
      selectedDate={selectedDate}
      handleDateChange={handleDateChange}
      setSelectedFilm={setSelectedFilm}
      setSelectedScreeningRoom={setSelectedScreeningRoom}
    />
  );
};

export default NewScreeningForm;
