Feature: Remove the game

  @API
  Scenario: Removing the game
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    And User "testuser" creates game with name "FlappyBirdRemovingTestGame" on port "8040"
    And User adds game with name "FlappyBirdRemovingTestGame" to App
    When User "testuser" remove the game "FlappyBirdRemovingTestGame"
    Then Game "FlappyBirdRemovingTestGame" is removed successfully

  @API @GAME
  Scenario: Removing one of two games
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    And User "testuser" creates game with name "FlappyBirdRemovingTestGame1" on port "8040"
    And User "testuser" creates game with name "FlappyBirdRemovingTestGame2" on port "8050"
    And User adds game with name "FlappyBirdRemovingTestGame1" to App
    And User adds game with name "FlappyBirdRemovingTestGame2" to App
    When User "testuser" remove the game "FlappyBirdRemovingTestGame1"
    Then Game "FlappyBirdRemovingTestGame1" is removed successfully
    When User "testuser" get information about games
    Then User "testuser" has 1 game
    And Check information for game "FlappyBirdRemovingTestGame2" is valid
