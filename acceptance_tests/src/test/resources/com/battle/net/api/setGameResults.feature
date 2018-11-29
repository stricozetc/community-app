@API @GAME @STATISTIC
Feature: Set game results

  Scenario: Set game results
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    And User "testuser" creates game with name "FlappyBirdTestGame" on port "8040"
    And User adds game with name "FlappyBirdTestGame" to App
    When Set results of the game "FlappyBirdTestGame" for user "testuser" in the top ten
      | playedTime | resultStatus | participationStatus |
      | 2          | 2            | 2                   |
    Then Game results are set successfully

