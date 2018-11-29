@API @GAME
Feature: Addition new game

  Scenario: Addition new game
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    When User "testuser" creates game with name "FlappyBirdTestGame" on port "8040"
    And User adds game with name "FlappyBirdTestGame" to App
    Then Game is added for the user