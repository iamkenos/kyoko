Feature: I. Mouse Actions - Drag and drop

  Background:
    Given I am on the "demo" site
      And I click the "I. Mouse Actions" navigation item
      And I expect the section header "I. Mouse Actions" to exist

  Scenario: S01: Drag an element to another element
    When I drag the "#drag-drop-source" element to the "#drag-drop-target" element
      And I expect the "#drag-drop-source" element location at x axis to be 848.5
      And I expect the "#drag-drop-source" element location at y axis to be 1354.27
      But I drag the "#drag-drop-source" element to the "#move-to-result" element
    Then I expect the "#drag-drop-source" element location at x axis to not be 848.5
      And I expect the "#drag-drop-source" element location at y axis to not be 1354.27
