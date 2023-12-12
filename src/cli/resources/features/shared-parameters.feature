Feature: Shared Parameters

  Background:
    Given I am on the "the-internet" page

  Scenario: S01: Set from world
    When I set the something parameter to "anything"
    Then I expect the something parameter value to be "anything"

  Scenario: S02: Update from page
    When I set the something parameter to "anything"
      But I update the something parameter from the page
    Then I expect the something parameter value to not be "anything"
