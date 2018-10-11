@API @GAME
Feature: Enter to game

  Scenario: Check user can launch the game
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" creates game with name "FlappyBirdTestGame" on port "8030"
    And User adds game with name "FlappyBirdTestGame" to App
    And User sets new maxRoomPlayer "1" to game "FlappyBirdTestGame"
    And User sets redirectUrl "http://localhost:8000/home" to game "FlappyBirdTestGame"
    And User sets appToken for game "FlappyBirdTestGame" to DB
    And User edit the game "FlappyBirdTestGame"
    When Ui User "testuser" logs in to App
    And Ui User join the game "FlappyBirdTestGame"
    Then The user "testuser" is redirected to the game "FlappyBirdTestGame"

