package com.battle.net.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Statistic {

    private int playedTime;
    private int scores;
    private int resultStatus;
    private int participationStatus;
}
