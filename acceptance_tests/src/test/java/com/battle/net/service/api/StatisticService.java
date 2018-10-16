package com.battle.net.service.api;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.battle.net.model.Statistic;
import com.battle.net.model.User;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;
import org.hamcrest.Matchers;

import static com.battle.net.utils.Constants.Uri.API_STATISTIC;
import static com.battle.net.utils.Constants.Uri.BASE_URI;
import static io.restassured.RestAssured.given;

@Slf4j
public class StatisticService {

    public static Response setGameResults(String userToken, String appToken, Statistic statistic) {
        JsonObject jObj = (JsonObject) new GsonBuilder().create().toJsonTree(statistic);
        jObj.addProperty("userToken", userToken);
        JsonArray arr = new JsonArray();
        arr.add(jObj);

        return given()
                .contentType(ContentType.JSON)
                .header("Authorization", appToken)
                .body(arr.toString())
                .when().post(BASE_URI + API_STATISTIC + "/set-game-result")
                .then().statusCode(200).extract().response();
    }

    public static Response getLeaders(String appName) {
        log.debug("Get leaders of game: {}", appName);

        return given()
                .contentType(ContentType.JSON)
                .param("appName", appName)
                .when().get(BASE_URI + API_STATISTIC + "/get-leaders")
                .then().statusCode(200)
                .body("size()", Matchers.lessThan(11))
                .extract().response();
    }

    public static Response getRecentGames(String token, User user) {
        return given()
            .contentType(ContentType.JSON)
            .header("Authorization", token)
            .param("userId", user.getToken())
            .when().get(BASE_URI + API_STATISTIC + "/recent-games")
            .then().statusCode(200).extract().response();
    }
    public static Response getBestUsers(String token){
        return given()
            .contentType(ContentType.JSON)
            .header("Authorization", token)
            .when().get(BASE_URI + API_STATISTIC + "/best-users")
            .then().statusCode(200).extract().response();
    }
}
