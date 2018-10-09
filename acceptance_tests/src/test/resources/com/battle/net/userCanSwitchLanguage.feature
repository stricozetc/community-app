@API
Feature: Switch language

  Scenario: User can switch language
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User "testuser" login to App
    When User "testuser" select en language
    Then The language for user "testuser" is en
    When User "testuser" select ru language
    Then The language for user "testuser" is ru
    When User "testuser" select en language
    Then The language for user "testuser" is en
