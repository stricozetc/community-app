package com.battle.net.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Comparator;
import java.util.Objects;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Game implements Comparable {
    private Integer id;
    private Integer userId;
    private String appName;
    private String description = "Test game for testing";
    private Integer maxRoomPlayer = 2;
    private Integer maxRooms = 1;
    private String requestUrl = "http://localhost:8040";
    private Integer maxWaitingTime = 20;
    private String redirectUrl = "http://localhost:8040/home";
    private String registrationEventName = "onFlappyBirdTest";
    private String leaveEventName = "onLeaveFlappyBirdTest";
    private String updateRoomsInfoEventName = "onUpdateRoomsInfoFlappyBirdTest";
    private String notifyCountdown = "onNotifyCountdownFlappyBirdTest";
    private Boolean approve = true;
    private String appToken;
    private String updatedAt;
    private String createdAt;

    public Game(int userId, String appName) {
        this.userId = userId;
        this.appName = appName;
    }

    @Override
    public int compareTo(Object o) {
        return Comparator.comparing(Game::getId)
                .thenComparing(Game::getUserId)
                .thenComparing(Game::getAppName)
                .thenComparing(Game::getDescription)
                .thenComparing(Game::getMaxRoomPlayer)
                .thenComparing(Game::getMaxRooms)
                .thenComparing(Game::getRequestUrl)
                .thenComparing(Game::getMaxWaitingTime)
                .thenComparing(Game::getRedirectUrl)
                .thenComparing(Game::getRegistrationEventName)
                .thenComparing(Game::getLeaveEventName)
                .thenComparing(Game::getUpdateRoomsInfoEventName)
                .thenComparing(Game::getNotifyCountdown)
                .thenComparing(Game::getApprove)
                .compare(this, (Game) o);
    }

    @Override
    public boolean equals(Object o) {
        return compareTo(o) == 0 ? true : false;
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, userId, appName, description, maxRoomPlayer, maxRooms, requestUrl, maxWaitingTime, redirectUrl, registrationEventName, leaveEventName, updateRoomsInfoEventName, notifyCountdown, approve, appToken, updatedAt, createdAt);
    }
}
