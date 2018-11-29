package com.battle.net.utils;

import com.battle.net.model.Game;
import com.battle.net.model.Statistic;
import com.battle.net.model.User;
import io.restassured.response.Response;

import java.util.HashMap;
import java.util.Map;

public class Container {
    public Response response;
    public Map<String, User> userMap = new HashMap<>();
    public String token;
    public Map<String, Game> gameMap = new HashMap<>();
    public Map<String, Statistic> statisticMap = new HashMap<>();
}
