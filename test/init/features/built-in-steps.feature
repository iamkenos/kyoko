Feature: Built-in Steps
  Examples of using built-in steps.
  The scenarios below interact with the following page objects:
    • 'login' - found on the LoginPage class
    • 'secure' - found on the SecurePage class
  The following class properties are also refenced and resolved as locator instances:
    • "Login" button - LoginPage's login prop
    • "Flash Message" element - LoginPage's flashMessage prop

  Background:
    Given I am on the "login" page

  Scenario: S01: Login with valid credentials and validate page url
    When I type on the fields:
      | Field    | Value                |
      | Username | tomsmith             |
      | Password | SuperSecretPassword! |
      And I click the "Login" button
    Then I expect to be on the "secure" page
      And I expect the "Flash Message" element text to contain "You logged into a secure area!"

  Scenario: S02: Login with invalid credentials and validate page url
    When I type on the fields:
      | Field    | Value  |
      | Username | foobar |
      | Password | barfoo |
      And I click the "Login" button
    Then I expect to still be on the "login" page
      And I expect the "Flash Message" element text to contain "Your username is invalid!"
