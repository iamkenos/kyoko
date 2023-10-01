Feature: II. Form Elements - Checkbox

  Background:
    Given I am on the "demo" site
      And I click the "II. Form Elements" navigation item
      And I expect the section header "II. Form Elements" to exist

  Scenario: S01: Checkboxes
    When I select the "#input-checkbox-1" check box
    Then I expect the "#input-checkbox-1" check box to be selected
      But I deselect the "#input-checkbox-1" check box
    Then I expect the "#input-checkbox-1" check box to not be selected
      And I expect the "#input-checkbox-2" check box to be selected
