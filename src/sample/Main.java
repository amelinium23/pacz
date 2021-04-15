package sample;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.util.Objects;

public class Main extends Application {

    @Override
    public void start(Stage primaryStage) throws Exception{
        Parent root = FXMLLoader.load(Objects.requireNonNull(getClass().getResource("MainScreen.fxml")));
        primaryStage.setTitle("Podstawy analizy cyklu życia");
        primaryStage.setResizable(false);
        primaryStage.setScene(new Scene(root, 500, 150));
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
