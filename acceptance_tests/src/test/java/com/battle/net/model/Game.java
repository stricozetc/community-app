package com.battle.net.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
@Builder
@AllArgsConstructor
public class Game implements Comparable {
    private Integer id;
    private Integer userId;
    private String appName;
    private String description;
    private Integer maxRoomPlayer;
    private Integer maxRooms;
    private String requestUrl;
    private Integer maxWaitingTime;
    private String redirectUrl;
    private String registrationEventName;
    private String leaveEventName;
    private String updateRoomsInfoEventName;
    private String notifyCountdown;
    private Boolean approve;
    private String appToken;
    private String updatedAt;
    private String createdAt;

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
