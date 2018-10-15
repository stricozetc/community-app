@API @GAME
Feature: Get information about all games of all users

  Scenario: Get information about all games of all users
    Given Users register to app first time
      | email              | password | name      | language |
      | testemail1@mail.ru | 123456   | testuser1 | en       |
      | testemail2@mail.ru | 654321   | testuser2 | en       |
    And User "testuser1" creates game with name "FlappyBirdForTest1" on port "8040"
    And User adds game with name "FlappyBirdForTest1" to App
    And User "testuser2" creates game with name "FlappyBirdForTest2" on port "8050"
    And User adds game with name "FlappyBirdForTest2" to App
    When Get information about all games of all users
    Then Check information for game "FlappyBirdForTest1" is valid
    And Check information for game "FlappyBirdForTest2" is valid