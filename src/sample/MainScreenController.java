package sample;

import javafx.scene.control.Button;
import javafx.stage.Stage;

public class MainScreenController {
    public Button quitButton;

    public void quit() {
        Stage stage = (Stage) quitButton.getScene().getWindow();
        stage.close();
    }
}
