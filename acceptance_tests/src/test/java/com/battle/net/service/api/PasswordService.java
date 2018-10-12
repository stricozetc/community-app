package com.battle.net.service.api;

import com.battle.net.model.User;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;

import static com.battle.net.utils.Constants.Uri.BASE_URI;
import static com.battle.net.utils.Constants.Uri.RESTORE_PASSWORD;
import static io.restassured.RestAssured.given;

@Slf4j
public class PasswordService {
    public static Response restorePassword(User user) {
        log.debug("Restore password for user: {}", user.toString());

        Map<String, Object> jsonMap = new HashMap<>();
        jsonMap.put("userEmail", user.getEmail());

        return given()
                .contentType(ContentType.JSON)
                .body(jsonMap)
                .when().post(BASE_URI + RESTORE_PASSWORD + "/send-mail")
                .then().extract().response();

    }
}
