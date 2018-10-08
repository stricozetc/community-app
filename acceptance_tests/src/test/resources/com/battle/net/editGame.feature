@API @GAME
Feature: Edit the game

  Scenario: Edition the game
    Given User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User login to App
    And User add game with name "FlappyBirdForEditionTest"
    When User edit the game with new parameters
      | description   | this game is edited |
      | maxRoomPlayer | 2                   |
    Then The game is edited successfully