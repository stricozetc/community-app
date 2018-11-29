package com.battle.net.service.api;

import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

import com.battle.net.model.User;

import java.util.HashMap;
import java.util.Map;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;

import static com.battle.net.utils.Constants.Uri.API_COMMON;
import static com.battle.net.utils.Constants.Uri.API_USERS;
import static com.battle.net.utils.Constants.Uri.BASE_URI;
import static io.restassured.RestAssured.given;

@Slf4j
public class UserService {

    public static Response login(User user) {
        log.debug("Login as user: {}", user.toString());
        
        return given()
                .contentType(ContentType.JSON)
                .body(user)
                .when().post(BASE_URI + API_USERS + "/login")
                .then().extract().response();

    }

    public static Response register(User credentials) {
        log.debug("Register with credentials: {}", credentials.toString());

        JsonObject jObj = (JsonObject) new GsonBuilder().create().toJsonTree(credentials);
        jObj.addProperty("password2", credentials.getPassword());

        return given()
                .contentType(ContentType.JSON)
                .body(jObj.toString())
                .when().post(BASE_URI + API_USERS + "/register")
                .then().extract().response();
    }

    public static Response changePassword(String newPassword, User user, String token) {
        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("userId", user.getId());
        jsonMap.put("oldPassword", user.getPassword());
        jsonMap.put("newPassword", newPassword);
        jsonMap.put("repeatNewPassword", newPassword);

        log.debug("User change password from '{}' to '{}'", user.getPassword(), newPassword);

        return given()
                .contentType(ContentType.JSON)
                .header("Authorization", token)
                .body(jsonMap)
                .when().post(BASE_URI + API_COMMON + "/user-settings/change-password")
                .then().statusCode(200).extract().response();
    }

    public static Response selectLanguage(String language, User user) {
        log.debug("User: {} selected language: {}", user.toString(), language);

        Map<String, String> data = new HashMap<>();
        data.put("userEmail", user.getEmail());
        data.put("userLanguage", language);

        return given()
            .contentType(ContentType.JSON)
            .body(data)
            .when().post(BASE_URI + API_USERS + "/user-language");
    }

    public static Response getUserLanguage(User user) {
        log.debug("Get language for user: {}", user.toString());

        return given().queryParam("email", user.getEmail())
                      .when().get(BASE_URI + API_USERS + "/get-user-language")
                      .then().extract().response();
    }
}
