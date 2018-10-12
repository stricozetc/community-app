@API @GAME
Feature: Edit the game

  Background: Login
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App

  Scenario: Edition the game
    And User "testuser" creates game with name "FlappyBirdForEditionTest" on port "8040"
    And User adds game with name "FlappyBirdForEditionTest" to App
    When User sets new description "This game is edited" to game "FlappyBirdForEditionTest"
    And User sets new maxRoomPlayer "2" to game "FlappyBirdForEditionTest"
    And User edit the game "FlappyBirdForEditionTest"
    And User "testuser" get information about games
    Then Check information for game "FlappyBirdForEditionTest" is valid

  Scenario: Editing one of two games
    And User "testuser" creates game with name "FlappyBirdForEditionTest1" on port "8040"
    And User "testuser" creates game with name "FlappyBirdForEditionTest2" on port "8050"
    And User adds game with name "FlappyBirdForEditionTest1" to App
    And User adds game with name "FlappyBirdForEditionTest2" to App
    When User sets new maxRoomPlayer "2" to game "FlappyBirdForEditionTest1"
    And User edit the game "FlappyBirdForEditionTest1"
    And User "testuser" get information about games
    Then Check information for game "FlappyBirdForEditionTest1" is valid
    Then Check information for game "FlappyBirdForEditionTest2" is valid
