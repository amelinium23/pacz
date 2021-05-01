import { Card, Button, makeStyles, Input } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  info: {
    width: "400px",
    textAlign: "center",
    padding: "5px",
    border: "1px solid black",
    margin: "10px",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "white",
    border: "1px solid black",
    marginTop: "10px",
    marginBottom: "10px",
    margin: "2%",
  },
}));

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
}) => {
  const classes = useStyles();
  return (
    <Card key={id} className={classes.info}>
      {isEditing ? (
        <Input
          className={classes.input}
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
          className={classes.input}
          name="name"
          value={newRuntime}
          placeholder="Długość filmu"
          onChange={(e) => setNewRuntime(e.target.value)}
          required
        />
      ) : (
        <p>Długość filmu: {length} min</p>
      )}
      <Button
        className={classes.button}
        onClick={async () => {
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
