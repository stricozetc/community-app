@API
Feature: Check getting user language

  Scenario: Getting user language
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | ru       |
    When User "testuser" login to App
    Then The language for user "testuser" is ru

