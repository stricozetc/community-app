package com.battle.net.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
public class Game {
    private Integer id;
    private Integer userId;
    private String appName;
    private String description = "Test game for testing";
    private int maxRoomPlayer = 2;
    private int maxRooms = 1;
    private String requestUrl = "http://localhost:8040";
    private int maxWaitingTime = 20;
    private String redirectUrl = "http://localhost:8040/home";
    private String registrationEventName = "onFlappyBirdTest";
    private String leaveEventName = "onLeaveFlappyBirdTest";
    private String updateRoomsInfoEventName = "onUpdateRoomsInfoFlappyBirdTest";
    private String notifyCountdown = "onNotifyCountdownFlappyBirdTest";
    private boolean approve = true;
    private String appToken;
    private String updatedAt;
    private String createdAt;

    public Game(int userId, String appName) {
        this.userId = userId;
        this.appName = appName;
    }
}
