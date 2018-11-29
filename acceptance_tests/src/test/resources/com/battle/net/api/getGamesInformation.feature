@API @GAME
Feature: Get games information

  Scenario: Get games information for the user
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    And User "testuser" creates game with name "FlappyBirdForTest" on port "8040"
    And User adds game with name "FlappyBirdForTest" to App
    When User "testuser" get information about games
    Then Check information for game "FlappyBirdForTest" is valid
