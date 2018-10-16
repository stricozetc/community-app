@API @GAME @GAME_STATISTIC
Feature: Get best users

    Scenario: Get best users
        Given User registers to app first time
            | email              | password | name      | language |
            | testemail1@mail.ru | 1234561  | testuser1 | en       |
            | testemail2@mail.ru | 1234562  | testuser2 | en       |
            | testemail3@mail.ru | 1234563  | testuser3 | en       |
            | testemail4@mail.ru | 1234564  | testuser4 | en       |

        And User "testuser1" login to App
        And User "testuser1" creates game with name "FlappyBirdTestGame" on port "8040"
        And User adds game with name "FlappyBirdTestGame" to App
        And Set results of the game "FlappyBirdTestGame" for user "testuser1"
            | playedTime | resultStatus | participationStatus | scores |
            | 2          | 2            | 2                   | 280    |
        And Set results of the game "FlappyBirdTestGame" for user "testuser2"
            | playedTime | resultStatus | participationStatus | scores |
            | 2          | 2            | 2                   | 281    |
        And Set results of the game "FlappyBirdTestGame" for user "testuser3"
            | playedTime | resultStatus | participationStatus | scores |
            | 2          | 2            | 2                   | 279    |
        And Set results of the game "FlappyBirdTestGame" for user "testuser4"
            | playedTime | resultStatus | participationStatus | scores |
            | 1          | 3            | 2                   | 0      |
        When Get best users
        Then Best users are:
            | testuser2 |
            | testuser1 |
            | testuser3 |
