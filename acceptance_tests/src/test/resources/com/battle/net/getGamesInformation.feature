@API @GAME
Feature: Get games information

  Scenario: Get games information for the user
    Given User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User login to App
    And User add game with name "FlappyBirdForTest"
    When User get information about games
    Then Check games information is valid