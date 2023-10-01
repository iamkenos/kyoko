Feature: II. Form Elements - Radio

  Background:
    Given I am on the "demo" site
      And I click the "II. Form Elements" navigation item
      And I expect the section header "II. Form Elements" to exist

  Scenario: S01: Radio options
    When I select the "#input-radio-1" radio button
    Then I expect the "#input-radio-1" radio button to be selected
      But I select the "#input-radio-2" radio button
    Then I expect the "#input-radio-1" radio button to not be selected
      And I expect the "#input-radio-2" radio button to be selected
