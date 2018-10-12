package com.battle.net.service;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import com.battle.net.model.Statistic;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;

import static com.battle.net.utils.Constants.Uri.API_COMMON;
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
            .when().post(BASE_URI + API_COMMON + "/statistic/set-game-result")
            .then().statusCode(200).extract().response();
    }
}
