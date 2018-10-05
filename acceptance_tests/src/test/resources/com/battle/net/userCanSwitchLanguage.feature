@API
Feature: Switch language

  Scenario: User can switch language
    Given User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    When User select en language
    Then User language is en
    When User select ru language
    Then User language is ru
    When User select en language
    Then User language is en
