@API
Feature: Switch language

    Scenario: User can switch language
    User can login to BattleNet
        Given User register to app first time
            | email             | password | name     |
            | testemail@mail.ru | 123456   | testuser |
        When User select 'en' language
        Then User language is 'en'
        When User select 'ru' language
        Then User language is 'ru'
        When User select 'en' language
        Then User language is 'en'
