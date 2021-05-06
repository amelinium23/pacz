import { Card, Button, makeStyles, Input } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  info: {
    width: "400px",
    textAlign: "center",
    padding: "5px",
    border: "1px solid black",
    margin: "10px 10px 10px 10px",
    boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "white",
    border: "1px solid black",
    marginTop: "10px",
    marginBottom: "10px",
    margin: "2%",
    boxShadow: "6px 2px 4px 2px rgba(154,154,154,0.64)",
  },
}));

interface IProps {
  id: number;
  title: string;
  newTitle: string;
  setNewTitle: (newTitle: string) => void;
  newRuntime: number;
  setNewRuntime: (newRuntime: number) => void;
  length: number;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  handleUpdate: (filmId: number) => void;
  removeFilm: (filmId: number) => void;
}

const FilmCard = ({
  id,
  title,
  newTitle,
  setNewTitle,
  newRuntime,
  setNewRuntime,
  length,
  isEditing,
  setIsEditing,
  handleUpdate,
  removeFilm,
}: IProps): JSX.Element => {
  const classes = useStyles();
  return (
    <Card key={id} className={classes.info}>
      {isEditing ? (
        <Input
          name="name"
          value={newTitle}
          placeholder="Nazwa filmu"
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
      ) : (
        <p>Tytuł: {title}</p>
      )}
      {isEditing ? (
        <Input
          name="name"
          value={newRuntime}
          placeholder="Długość filmu"
          onChange={(e) => setNewRuntime(parseInt(e.target.value) || 0)}
          required
        />
      ) : (
        <p>Długość filmu: {length} min</p>
      )}
      <Button
        className={classes.button}
        onClick={() => {
          isEditing ? handleUpdate(id) : setIsEditing(true);
        }}
      >
        {isEditing ? "Zatwierdź zmiany" : "Edytuj"}
      </Button>
      <Button onClick={() => removeFilm(id)} className={classes.button}>
        Usuń
      </Button>
    </Card>
  );
};

export default FilmCard;
