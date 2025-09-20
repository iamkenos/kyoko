Feature: Exit Intent

  Background:
    Given I am on the "exit-intent" page

  Scenario: S01: Modal component
    When I move out of the viewport
    Then I expect the modal component to be displayed
      And I expect the modal component text to be:
      """
      It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something).
      """
    When I close the modal component
    Then I expect the modal component to not be displayed
