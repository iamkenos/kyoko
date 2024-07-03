Feature: Login

  Background:
    Given I am on the "login" page

  Scenario: S01: Login with valid credentials
    When I type on the fields:
      | Field    | Value                |
      | Username | tomsmith             |
      | Password | SuperSecretPassword! |
      And I click the "Login" button
    Then I expect to be on the "secure" page
      And I expect the "Flash Message" element text to contain "You logged into a secure area!"

  Scenario: S02: Login with invalid credentials
    When I type on the fields:
      | Field    | Value  |
      | Username | foobar |
      | Password | barfoo |
      And I click the "Login" button
    Then I expect to still be on the "login" page
      And I expect the "Flash Message" element text to contain "Your username is invalid!"
