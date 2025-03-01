Feature: II. Form Elements - Links

  Background:
    Given I am on the "demo" site
      And I click the "II. Form Elements" navigation item
      And I expect the section header "II. Form Elements" to exist

  Scenario: S01: Internal path
    Then I expect the "internal path" link to open on a new window
      And I expect the "internal path" link to point to a path "/iframe.html"
      And I expect the "internal path" link to point to the "iframe" page

  Scenario: S02: External path
    Then I expect the "external domain" link to open on the parent frame
      And I expect the "external domain" link to point to an absolute url "https://otherdomain.com/external/path"

  Scenario: S03: Same page reference
    Then I expect the "same page reference" link to open on the same frame
      And I expect the "same page reference" link to point to a section "#key-press"

  Scenario: S04: Mail to
    Then I expect the "email address" link to open on a named frame "framename"
      And I expect the "email address" link to point to a mail scheme "someone@example.com"

  Scenario: S05: Tel
    Then I expect the "phone number" link to open on the top frame
      And I expect the "phone number" link to point to a tel scheme "+4733378901"

  Scenario: S06: Javascript
    When I auto dismiss the page dialog
      And I click the "javascript function" link 2 times
    Then I expect the "javascript function" link to open without a target
      And I expect the "javascript function" link to point to "javascript:alert('Javascript link result');"
      And I expect an alert box to have been opened
      And I expect the "#link-6" element "href" attribute to exist
      And I expect the "#link-6" element "target" attribute to not exist
