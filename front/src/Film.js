import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import "./films.css";

export default function Film() {
  const [films, setFilms] = useState([]);

  async function requestsFilms() {
    const res = await fetch(`http://localhost:8080/films`);
    const json = await res.json();
    console.log(json);
    setFilms(json);
  }

  useEffect(() => {
    requestsFilms();
  }, [films]);

  return films.map((i) => (
    <div class="films">
      <p class="title">Tytuł: {i.title}</p>
      <p class="length">Długość filmu: {i.length} min</p>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginLeft: "22.5%",
          marginTop: "10px",
        }}
      >
        Zedytuj mnie
      </Button>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginLeft: "4%",
          marginTop: "10px",
        }}
      >
        Usuń mnie
      </Button>
    </div>
  ));
}
