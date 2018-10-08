@API
Feature: Removing the game

    Scenario: Removing the game
        Given User register to app first time
            | email             | password | name     | language |
            | testemail@mail.ru | 123456   | testuser | en       |
        And User login to App
        And User add game with name "FlappyBirdRemovingTestGame"
        When User remove the game "FlappyBirdRemovingTestGame"
        Then Game is removed successfully
