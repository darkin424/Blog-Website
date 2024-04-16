Feature: Creating a new recipe post

  Scenario: Create a new recipe post with a valid token
    Given I have a valid token
    When I create a new recipe with title "Delicious Pasta" and body "A simple pasta recipe"
    Then I should receive a successful response with the created recipe

  Scenario: Attempt to create a new recipe post with an invalid token
    Given I have an invalid token
    When I attempt to create a new recipe with title "Delicious Pasta" and body "A simple pasta recipe"
    Then I should receive an ok response with status code 200