@API @GAME @UI
Feature: Enter to game

  Scenario: Check existing user can launch the game
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" creates game with name "FlappyBirdTestGame" on port "8030"
    And User sets new maxRoomPlayer "1" to game "FlappyBirdTestGame"
    And User sets redirectUrl "http://localhost:8000/home" to game "FlappyBirdTestGame"
    And User adds game with name "FlappyBirdTestGame" to App
    And User sets appToken for game "FlappyBirdTestGame" to DB
    And User edit the game "FlappyBirdTestGame"
    When Ui User "testuser" logs in to App
    And Ui User join the game "FlappyBirdTestGame"
    Then The user "testuser" is redirected to the game "FlappyBirdTestGame"

  Scenario:Check new user can launch the game
    Given Ui user registers to app
      | email             | password | name     |
      | testemail@mail.ru | 123456   | testuser |
    And Ui user go to admin console page
    And Ui user create the game
      | appName            | description        | requestUrl            | redirectUrl                | maxRoomPlayer |
      | FlappyBirdTestGame | FlappyBirdTestGame | http://localhost:8030 | http://localhost:8000/home | 1             |
    And Get appToken for game "FlappyBirdTestGame"
    And User sets appToken for game "FlappyBirdTestGame" to DB
    And Ui user go to main page
    When Ui User join the game "FlappyBirdTestGame"
    Then The user "testuser" is redirected to the game "FlappyBirdTestGame"


