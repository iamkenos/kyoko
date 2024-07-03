Feature: III. Browser Context - Browser windows

  Background:
    Given I am on the "demo" site
      And I click the "III. Browser Context" navigation item
      And I expect the section header "III. Browser Context" to exist

  Scenario: S01: Open on same window
    When I click the "#open-same-window" button
    Then I expect the tab count to be 1
      And I expect to be on the "iframe" page
      But I navigate back from the current page
    Then I expect to be on the "demo" site
    When I navigate forward from the current page
    Then I expect to be back to the "iframe" page

  Scenario: S02: Open on new window
    When I open the "demo" page's url on a new window
    Then I expect the tab count to be more than 1
      And I expect the tab count to be less than 3
      But I close the last opened window
    Then I expect the tab count to not be more than 1
      And I expect the tab count to not be less than 1
    When I click the "#open-new-window" button
    Then I expect to still be on the "demo" page
      But I focus on the last opened window
    Then I expect to be on the "iframe" page
      And I expect the page title to be "Demo Iframe"
      And I expect the page title to contain "Iframe"
      And I expect the page title to match the "iframe" page's title
      And I expect the page title to contain the "iframe" page's title
      And I expect the url to match the "iframe" page's url
      And I expect the url to contain the "iframe" page's url
      And I expect the url to be "/iframe.html"
      And I expect the url to contain "/iframe"

  Scenario: S03: Snapshot comparison
    When I click the "#open-new-window" button
      And I focus on the last opened window
    Then I expect the "#card-1" element to match the snapshot "iii-browser-context/3-browser-windows/card"
      And I expect the viewport to match the snapshot "iii-browser-context/3-browser-windows/viewport"
      But I close all the other windows
    Then I expect the page title to not be "Demo Iframe"
      And I expect the page title to not contain "Iframe"
      And I expect the page title to not match the "iframe" page's title
      And I expect the page title to not contain the "iframe" page's title
      And I expect the url to not match the "iframe" page's url
      And I expect the url to not contain the "iframe" page's url
      And I expect the url to not be "/iframe.html"
      And I expect the url to not contain "/iframe"
      And I expect the page to match the snapshot "iii-browser-context/3-browser-windows/page"

  Scenario: S04: Iframe locators
    When I focus on the "#iframe" iframe
    Then I expect the "iframe" page's "tabs" elements text array to contain:
      | Values |
      | Tab 1  |
      | Tab 3  |
      And I expect the "iframe" page's "tabs" elements text array to be:
      | Values |
      | Tab 1  |
      | Tab 2  |
      | Tab 3  |
      And I expect the "iframe" page's "tabs" elements text array to not contain:
      | Values |
      | Tab 4  |
      | Tab 5  |
      And I expect the "iframe" page's "tabs" elements text array to not be:
      | Values |
      | Tab 1  |
      | Tab 3  |
    When I switch to the parent context
    Then I expect the "iframe" page's "tabs" element to not exist
