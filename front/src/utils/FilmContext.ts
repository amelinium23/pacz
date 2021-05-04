import { createContext } from "react";
import { Film } from "./APIResponseTypes";

const FilmContext = createContext<[Film[], (films: Film[]) => void]>([
  [] as Film[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  () => {},
]);

export default FilmContext;
