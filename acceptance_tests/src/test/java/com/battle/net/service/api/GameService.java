package com.battle.net.service.api;

import com.battle.net.model.Game;
import com.battle.net.model.User;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;

import static com.battle.net.utils.Constants.Uri.API;
import static com.battle.net.utils.Constants.Uri.ALL_GAMES;
import static com.battle.net.utils.Constants.Uri.BASE_URI;
import static com.battle.net.utils.Constants.Uri.MY_GAME;
import static io.restassured.RestAssured.given;
import static java.lang.String.format;

import org.hamcrest.Matchers;

@Slf4j
public class GameService {
    public static Response addGame(Game game) {
        log.debug("Add game ({})", game.toString());

        return given()
                .contentType(ContentType.JSON)
                .body(game)
                .when().post(BASE_URI + MY_GAME + "/add-game")
                .then().extract().response();
    }

    public static Response deleteGame(Game game) {
        log.debug("Delete game ({})", game.toString());

        return given()
                .contentType(ContentType.JSON)
                .body(game)
                .when().post(BASE_URI + MY_GAME + "/delete-game")
                .then().extract().response();
    }

    public static Response editGame(Game game) {
        log.debug("Edit game ({})", game.toString());

        return given()
                .contentType(ContentType.JSON)
                .body(game)
                .when().post(BASE_URI + MY_GAME + "/edit-game")
                .then().statusCode(200).extract().response();
    }

    public static Response getGames(User user) {
        log.debug("Get all games for user");

        return given()
                .contentType(ContentType.JSON)
                .param("userId", user.getId())
                .when().get(BASE_URI + MY_GAME + "/get-games")
                .then().statusCode(200).extract().response();
    }

    public static Game createNewGame(User user, String appName, String port) {
        log.debug("Create new game for {} with name {} on port {}", user.toString(), appName, port);

        return Game.builder()
                .userId(user.getId())
                .appName(appName)
                .description(appName)
                .maxRoomPlayer(5)
                .maxRooms(1)
                .maxWaitingTime(20)
                .approve(true)
                .requestUrl(format("http://localhost:%s", port))
                .redirectUrl(format("http://localhost:%s/home", port))
                .registrationEventName("on" + appName)
                .leaveEventName("onLeave" + appName)
                .updateRoomsInfoEventName("onUpdateRoomsInfo" + appName)
                .notifyCountdown("onNotifyCountdown" + appName)
                .build();
    }

    public static void setAppTokenToDB(Game game) {
        log.debug("Set app token to DB for: {}", game.toString());

        given()
                .contentType(ContentType.JSON)
                .pathParam("appToken", game.getAppToken())
                .when().get(game.getRequestUrl() + API + "/save-app-token/{appToken}")
                .then().statusCode(200).body("status", Matchers.equalTo("Saved"));
    }

    public static Response getAllGamesFromAllUsers() {
        log.debug("Get all games for all users");

        return given()
                .contentType(ContentType.JSON)
                .when().get(BASE_URI + ALL_GAMES + "/get-games")
                .then().statusCode(200).extract().response();
    }
}
