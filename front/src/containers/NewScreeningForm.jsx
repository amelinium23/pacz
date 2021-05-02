import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import NewScreeningModal from "../components/NewScreeningModal.jsx";

const NewScreeningForm = ({ open, setOpen, newScreeningHandler }) => {
  const [selectedFilm, setSelectedFilm] = useState(null); // TypeScript commits sudoku
  const [selectedScreeningRoom, setSelectedScreeningRoom] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const submitScreeningForm = (e) => {
    e.preventDefault();
    addScreening();
    setOpen(false);
    setSelectedFilm(null);
    setSelectedScreeningRoom(null);
    handleDateChange(new Date());
  };
  const addScreening = async () => {
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
