@API
Feature: Change password

  Scenario: User change password after authorization
    Given User register to app first time
      | email             | password | name     | language |
      | testemail@mail.ru | 123456   | testuser | en       |
    And User login to App
    When User change password to "654321"
    Then Password is changed successfully
    When User login to App
    Then Check user is logged in successfully
