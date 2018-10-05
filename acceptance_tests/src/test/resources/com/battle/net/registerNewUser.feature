@API
Feature: Register new user to App

  Scenario: Register new user to App
    When User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    Then Check user is registered successfully