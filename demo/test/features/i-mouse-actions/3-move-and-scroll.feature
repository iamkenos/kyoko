Feature: I. Mouse Actions - Move and scroll

  Background:
    Given I am on the "demo" site
      And I click the "I. Mouse Actions" navigation item
      And I expect the section header "I. Mouse Actions" to exist

  Scenario: S01: Show coordinates
    When I hover on the "#move-to" element
    Then I expect the "#move-to-result" element text to be "X: 763 | Y: 2078"
      But I hover on the "#move-to-result" element
      And I hover on the "#move-to" element with an offset of 5,10
    Then I expect the "#move-to-result" element text to not be "X: 763 | Y: 2078"

  Scenario: S02: Show element location
    When I scroll to the "#scroll-to" element
    Then I expect the "#scroll-to-result" element to be displayed within the viewport
      And I expect the "#scroll-to-result" element text to be "Left: 872.75 | Top: 773.29"
      But I scroll to the top of the page
    Then I expect the "#scroll-to-result" element to not be displayed within the viewport
      And I expect the "#scroll-to-result" element text to be empty
      But I scroll to the bottom of the page
    Then I expect the "#scroll-to-result" element text to not be empty
      But I scroll to the coordinates 500.500 of the page
    Then I expect the "#scroll-to-result" element text to be empty
