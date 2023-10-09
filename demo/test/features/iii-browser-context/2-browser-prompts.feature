Feature: III. Browser Context - Browser prompts

  Background:
    Given I am on the "demo" site
      And I click the "III. Browser Context" navigation item
      And I expect the section header "III. Browser Context" to exist

  Scenario: S01: Show alert prompt
    When I always auto accept the page dialogs
      And I click the "#show-alert-prompt" button
    Then I expect an alert to have been opened
      And I expect the alert text to contain "Show alert"
      And I expect the alert text to be "Show alert prompt result"

  Scenario: S02: Show confirm prompt
    When I auto accept the page dialog
      And I click the "#show-confirm-prompt" button
    Then I expect a confirm box to have been opened
      And I expect the confirm box text to contain "Show confirm prompt"
      And I expect the confirm box text to be "Show confirm prompt result"
      And I expect the "#show-confirm-prompt-result" element text to be "true"
      And I auto dismiss the page dialog
    When I click the "#show-confirm-prompt" button
      And I expect the "#show-confirm-prompt-result" element text to be "false"

  Scenario: S03: Show input prompt
    When I auto accept and type "lorem ipsum" on the page dialog
      And I click the "#show-input-prompt" button
    Then I expect a prompt to have been opened
      And I expect the "#show-input-prompt-result" element text to be "lorem ipsum"
