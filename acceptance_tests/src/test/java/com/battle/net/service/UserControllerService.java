package com.battle.net.service;

import com.battle.net.model.User;
import io.restassured.http.ContentType;
import io.restassured.response.Response;

import static com.battle.net.Constants.Uri.API_USERS;
import static com.battle.net.Constants.Uri.BASE_URI;
import static io.restassured.RestAssured.given;

public class UserControllerService {
    public static Response login() {
        return given().log().all()
                .contentType(ContentType.JSON)
                .body(new User())
                .when().post(BASE_URI + API_USERS + "login")
                .then().extract().response();

    }
}
