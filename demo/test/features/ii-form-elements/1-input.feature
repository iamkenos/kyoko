Feature: II. Form Elements - Input

  Background:
    Given I am on the "demo" site
      And I click the "II. Form Elements" navigation item
      And I expect the section header "II. Form Elements" to exist

  Scenario: S01: Input element: Name
    When I type "Sam Porter" on the "#input-text" field
    Then I expect the "#input-text" field value to contain "Sam"
      And I expect the "#input-text" field value to be "Sam Porter"
      And I expect the "#input-text" field value to not be empty
      But I clear the "#input-text" field
    Then I expect the "#input-text" field value to not contain "Sam"
      And I expect the "#input-text" field value to not be "Sam Porter"
      And I expect the "#input-text" field value to be empty

  Scenario: S02: Input element: Email
    When I type on the "demo" page's fields:
      | Field        | Value     |
      | #input-email | samporter |
      And I press the "Tab" key
    Then I expect the "#input-email" field "class" attribute to contain "invalid"
      And I expect the "#input-email" field "class" attribute to be "validate invalid"
      But I append "@bridges.com" on the "#input-email" field
      And I press the "Tab" key
    Then I expect the "#input-email" field "class" attribute to not contain "invalid"
      And I expect the "#input-email" field "class" attribute to not be "validate invalid"

  Scenario: S03: Input element: Password
    When I type "unger" on the "#input-password" field
    Then I expect the "#input-password" field value to be "unger"
      And I expect the "#input-password" field value to not be "*****"

  Scenario: S04: Text area
    When I type a multi line value on the "#input-text-area" field:
      """
      setting a multi

      line value
      """
    Then I expect the "#input-text-area" field value to contain:
      """
      setting
      """
      And I expect the "#input-text-area" field value to be:
      """
      setting a multi

      line value
      """
      But I clear the "#input-text-area" field
    Then I expect the "#input-text-area" field value to not contain:
      """
      setting
      """
      And I expect the "#input-text-area" field value to not be:
      """
      setting a multi

      line value
      """

  Scenario: S05: Input file
    When I upload the "fixtures/files/demo.txt" file to the "#input-file" field
    Then I expect the "#input-file" field value to contain "demo.txt"

  Scenario: S06: Request interception
    When I type on the fields:
      | Field           | Value                 |
      | #input-text     | Sam Porter            |
      | #input-email    | samporter@bridges.com |
      | #input-password | unger                 |
      And I start recording the network requests
      And I click the "#input-submit" button

