@API @GAME
Feature: Addition new game
  Scenario: Addition new game
    Given User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User login to App
    When User add game with name "FlappyBirdTestGame"
    Then Game is added for the user