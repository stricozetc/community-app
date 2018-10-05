package com.battle.net.service;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import com.battle.net.model.User;

import java.util.HashMap;
import java.util.Map;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;

import static com.battle.net.utils.Constants.Uri.API_USERS;
import static com.battle.net.utils.Constants.Uri.BASE_URI;
import static io.restassured.RestAssured.given;

@Slf4j
public class UserControllerService {

    public static Response login(User user) {
        log.debug("Login as user: {}", user.toString());
        return given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post(BASE_URI + API_USERS + "login")
                .then().extract().response();

    }

    public static Response register(User credentials) {
        log.debug("Register with credentials: {}", credentials.toString());

        JsonObject jObj = (JsonObject) new GsonBuilder().create().toJsonTree(credentials);
        jObj.addProperty("password2", credentials.getPassword());
        jObj.addProperty("language", "en");

        return given()
                .contentType(ContentType.JSON)
                .body(jObj.toString())
                .when().post(BASE_URI + API_USERS + "register")
                .then().extract().response();
    }

    public static Response selectLanguage(String lang, User user) {
        log.debug("User with email {} selected language: {}", user.getEmail(), lang);
        Map<String, String> data = new HashMap<>();
        data.put("userEmail", user.getEmail());
        data.put("userLanguage", lang);
        return given()
            .contentType(ContentType.JSON)
            .body(data)
            .when().post(BASE_URI + API_USERS + "user-language");
    }

    public static Response getUserLanguage(User user) {
        log.debug("Get language by email: {}", user.getEmail());
        return given().queryParam("email", user.getEmail())
                      .when().get(BASE_URI + API_USERS + "get-user-language")
                      .then().extract().response();
    }
}
