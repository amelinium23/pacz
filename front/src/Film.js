import { useState } from "react";
import { Button } from "@material-ui/core";
import "./films.css";

const FILMS = [
  {
    id: 1,
    name: "chuj",
    length: 100,
  },
  {
    id: 2,
    name: "chuj",
    length: 100,
  },
  {
    id: 3,
    name: "chuj",
    length: 100,
  },
  {
    id: 4,
    name: "chuj",
    length: 100,
  },
];

export default function Film(props) {
  const [films, setFilms] = useState([]);
  const { name, length } = props;

  return FILMS.map((i) => (
    <div class="films">
      <p class="title">Tytuł: {i.name}</p>
      <p class="length">Długość filmu: {i.length} min</p>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginLeft: "22.5%",
        }}
      >
        Zedytuj mnie
      </Button>
      <Button
        style={{
          alignSelf: "center",
          backgroundColor: "white",
          border: "1px solid black",
          marginLeft: "12px",
        }}
      >
        Usuń mnie
      </Button>
    </div>
  ));
}
