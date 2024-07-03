Feature: III. Browser Context - Keyboard events

  Background:
    Given I am on the "demo" site
      And I click the "III. Browser Context" navigation item
      And I expect the section header "III. Browser Context" to exist

  Scenario: S01: Show key
    Then I expect the "#key-press" element to not be focused
    When I focus on the "#key-press" field
    Then I expect the "#key-press" element to be focused
    When I press the "Escape" key
      And I expect the "#key-press-result" element text to be "27"
      But I press the "a" key
    Then I expect the "#key-press-result" element text to not be "27"

  Scenario: S02: Key chords
    When I type "lorem ipsum" on the "#key-chords" field
      And I press the "Shift+Insert" keys 2 times
    Then I expect the "#key-chords" field value to be "Shift+Insert"
