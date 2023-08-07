Feature: II. Form Elements - Select

  Background:
    Given I am on the "demo" site
      And I click the "II. Form Elements" navigation item
      And I expect the section header "II. Form Elements" to exist

  Scenario: S01: Select option
    When I select the option with label "Option 1" from the "#input-select" dropdown
    Then I expect the 1st option from the "#input-select" dropdown to not be selected
      And I expect the 2nd option from the "#input-select" dropdown to be selected
      But I select the 4th option from the "#input-select" dropdown
    Then I expect the option with label "Option 1" from the "#input-select" dropdown to not be selected
      And I expect the option with value "3" from the "#input-select" dropdown to be selected

  Scenario: S02: Multiple select
    When I select the options from the "#input-select-multi" multi select dropdown:
      | Context | Value |
      | value   | 1     |
      | index   | 2     |
    Then I expect the options from the "#input-select-multi" multi select dropdown to be selected:
      | Context | Value    |
      | label   | Option 1 |
      | index   | 2        |
      And I expect the options from the "#input-select-multi" multi select dropdown to not be selected:
      | Context | Value    |
      | label   | Option 3 |

  Scenario: S03: Option groups
    When I select the 2nd option from the "#input-select-groups" dropdown
      And I select the option with label "Option 4" from the "#input-select-groups" dropdown
    Then I expect the option with label "Option 1" from the "#input-select-groups" dropdown to not be selected
      And I expect the option with value "4" from the "#input-select-groups" dropdown to be selected
