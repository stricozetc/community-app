@API
Feature: Login to application as test user

  Scenario: User can login to BattleNet
    Given User register to app first time
      | email             | password | name     |
      | testemail@mail.ru | 123456   | testuser |
    When User login to App
    Then Check user is logged in successfully