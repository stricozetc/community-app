@API @GAME @STATISTIC
Feature: Get leaders of the game

  Scenario: Get leaders of the game
    Given Users register to app first time
      | email              | password | name      | language |
      | testemail1@mail.ru | 123456   | testuser1 | en       |
      | testemail2@mail.ru | 654321   | testuser2 | en       |
    And User "testuser1" login to App
    And User "testuser1" creates game with name "FlappyBirdTestGame" on port "8030"
    And User adds game with name "FlappyBirdTestGame" to App
    When Set results of the game "FlappyBirdTestGame" for user "testuser1" in the top ten
      | playedTime | resultStatus | participationStatus |
      | 2          | 2            | 2                   |
    And Set results of the game "FlappyBirdTestGame" for user "testuser2" in the top ten
      | playedTime | resultStatus | participationStatus |
      | 2          | 1            | 2                   |
    And Get leaders of the game "FlappyBirdTestGame"
    Then Check user "testuser1" is in the top ten
    And Check user "testuser2" is in the top ten

  Scenario: Set game's results out of the top ten
    Given Users register to app first time
      | email              | password | name      | language |
      | testemail1@mail.ru | 123456   | testuser1 | en       |
      | testemail2@mail.ru | 654321   | testuser2 | en       |
    And User "testuser1" login to App
    And User "testuser1" creates game with name "FlappyBirdTestGame" on port "8030"
    And User adds game with name "FlappyBirdTestGame" to App
    When Set results of the game "FlappyBirdTestGame" for user "testuser1" in the top ten
      | playedTime | resultStatus | participationStatus |
      | 2          | 2            | 2                   |
    And Set results of the game "FlappyBirdTestGame" for user "testuser2" in the top ten
      | playedTime | resultStatus | participationStatus |
      | 2          | 1            | 2                   |
    And Get leaders of the game "FlappyBirdTestGame"
    Then Check user "testuser1" is in the top ten
    And Check user "testuser2" is in the top ten
    When User "testuser2" change scores out of the top ten for game "FlappyBirdTestGame"
    And Get leaders of the game "FlappyBirdTestGame"
    Then Check scores of the user "testuser2" is not changed in the top ten
