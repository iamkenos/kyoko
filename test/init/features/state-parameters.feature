Feature: State Parameters
  Examples of shared state parameters between different steps.
  The scenarios below show how we can access and modify the value of an object between steps.
  This feature is built-in within cucumber but is generally not recommended since it increases step dependencies which is considered to be an anti-pattern.

  Background:
    Given I am on the "the-internet" page

  Scenario: S01: Set from context
    When I set the something parameter to "anything"
    Then I expect the something parameter value to be "anything"

  Scenario: S02: Update from page
    When I set the something parameter to "anything"
      But I update the something parameter from the page
    Then I expect the something parameter value to not be "anything"
