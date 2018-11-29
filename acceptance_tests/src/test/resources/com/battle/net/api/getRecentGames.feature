@API @GAME @STATISTIC
Feature: Get recent games

    Scenario: Get recent games
        Given User registers to app first time
            | email             | password | name     | language |
            | testemail@mail.ru | 123456   | testuser | en       |
        And User "testuser" login to App
        And User "testuser" creates game with name "FlappyBirdTestGame" on port "8040"
        And User adds game with name "FlappyBirdTestGame" to App
        And Set results of the game "FlappyBirdTestGame" for user "testuser" in the top ten
            | playedTime | resultStatus | participationStatus |
            | 2          | 2            | 2                   |
        When Get recent games for user "testuser"
        Then User has recent game "FlappyBirdTestGame" with scores "10" and result "2"



