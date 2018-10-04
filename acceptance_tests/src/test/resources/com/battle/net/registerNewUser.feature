Feature: Register new user to App

  Scenario: Register new user to App
    When User register to app first time
      | email             | password | name     |
      | testemail@mail.ru | 123456   | testuser |
    Then Check user is registered successfully