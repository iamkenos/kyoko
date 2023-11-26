# Feature: III. Browser Context - Browser storage

#   Background:
#     Given I am on the "demo" site
#       And I click the "III. Browser Context" navigation item
#       And I expect the section header "III. Browser Context" to exist

#   Scenario: S01: Show cookies
#     When I delete the site cookies
#       And I set the "cookie-1" site cookie value to "value-1"
#       And I set the "cookie-2" site cookie value to "value-2"
#       And I set the "cookie-3" site cookie value to "value-3"
#       And I delete the "cookie-2" site cookie
#       And I click the "#show-cookies" button
#     Then I expect the "#show-cookies-result" element text to be:
#       """
#       {
#         "cookie-1": "value-1",
#         "cookie-3": "value-3"
#       }
#       """

#   Scenario: S02: Show local storage
#     When I set the "local-item-1" local storage item value to "local-value-1"
#       And I set the "local-item-2" local storage item value to "local-value-2"
#       And I set the "local-item-3" local storage item value to "local-value-3"
#       And I click the "#show-lstorage" button
#     Then I expect the "#show-lstorage-result" element text to be:
#       """
#       {
#         "local-item-3": "local-value-3",
#         "local-item-1": "local-value-1",
#         "local-item-2": "local-value-2"
#       }
#       """
#       But I clear the local storage
#       And I click the "#show-lstorage" button
#     Then I expect the "#show-lstorage-result" element text to be "{}"

#   Scenario: S03: Show session storage
#     When I set the "session-item-1" session storage item value to "session-value-1"
#       And I set the "session-item-2" session storage item value to "session-value-2"
#       And I set the "session-item-3" session storage item value to "session-value-3"
#       And I click the "#show-sstorage" button
#     Then I expect the "#show-sstorage-result" element text to be:
#       """
#       {
#         "session-item-2": "session-value-2",
#         "session-item-3": "session-value-3",
#         "session-item-1": "session-value-1"
#       }
#       """
#       But I clear the session storage
#       And I click the "#show-sstorage" button
#     Then I expect the "#show-sstorage-result" element text to be "{}"
