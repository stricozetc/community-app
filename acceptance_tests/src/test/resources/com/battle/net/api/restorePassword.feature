@API
Feature: Restore password

  Scenario: User can restore the password
    Given User registers to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    When User "testuser" restores the password
    Then The password is restored successfully