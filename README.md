<!-- markdownlint-disable MD033 -->
<h1 align="center">KYOKO</h1>

<!-- TODO: CHANGE THIS -->
<p align="center">
  <a href="https://github.com/iamkenos/hornet/actions/workflows/unit-tests.yml">
      <img alt="Unit Tests" src="https://github.com/iamkenos/hornet/actions/workflows/unit-tests.yml/badge.svg">
  </a>
</p>

## About

[Playwright](https://playwright.dev/) & [CucumberJS](https://cucumber.io/docs/installation/javascript/) mixed with presets and additional features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and [Cucumber](https://cucumber.io/docs/guides/overview/)
- gherkin statements that can be used out of the box
- page and element expected conditions
- generic classes for page objects support
- multiple locale support
- web components support
- internal polling and retries
- reporters:
  - [built-in cucumber reporter plugins](https://cucumber.io/docs/cucumber/reporting/?sbsearch=reporting&lang=javascript)
  - [allure](https://allurereport.org/docs/cucumberjs/)

## Requirements

- NodeJS ≥ 20.10.0 or ≤ LTS
- JRE ≥ 8

## Get Started

You'll need a working knowledge of Playwright and Cucumber to be able to use this library. They have rich documentation so head on over the site and read on if you're not familiar with it yet.

1. Get it: `npm install @iamkenos/kyoko`

2. Setup npm scripts, add the following inside your `package.json` file:

   ```json
   "scripts": {
     "test": "cucumber-js -c cucumber.js || exit 0",
     "posttest": "allure -q generate results/allure/ -c -o results/allure/html",
     "report": "allure open results/allure/html/"
   },
   ```

3. Create a `tsconfig.json` file:

   ```json
   {
     "compilerOptions": {
       "baseUrl": "./",
       "checkJs": true,
       "downlevelIteration": true,
       "esModuleInterop": true,
       "lib": ["ESNext", "DOM"],
       "module": "commonjs",
       "moduleResolution": "node",
       "outDir": "build",
       "skipLibCheck": true,
       "target": "ESNext"
     },
     "include": ["./**/**.ts", "./**/**.js"]
   }
   ```

4. Create your CucumberJS config file: `cucumber.js`

   ```js
   const { configure } = require("@iamkenos/kyoko/config");

   // you can set most of the cucumber config props from here, leave some that are restricted.
   exports.default = configure({
     baseURL: "https://the-internet.herokuapp.com/",
   });
   ```

5. Create your page object classes:

   ```ts
   // fixtures/pages/the-internet/the-internet.page.ts
   import { PageObject } from "@iamkenos/kyoko/core";

   export class TheInternetPage extends PageObject {
     url = "/";
     title = "The Internet";
   }

   // fixtures/pages/login/login.page.ts
   import { TheInternetPage } from "../the-internet/the-internet.page";

   export class LoginPage extends TheInternetPage {
     url = "/login";

     divFlashMessage = this.page.locator("#flash");
     tfUsername = this.page.locator("#username");
     tfPassword = this.page.locator("#password");
     btnLogin = this.page.locator("//button[@type='submit']");
   }

   // fixtures/pages/secure/secure.page.ts
   import { TheInternetPage } from "../the-internet/the-internet.page";

   export class SecurePage extends TheInternetPage {
     url = "/secure";
   }
   ```

6. Create your feature file: `features/login.feature`

   ```gherkin
   Feature: Login

    Background:
      Given I am on the "login" page

    Scenario: S01: Login with valid credentials
      When I type on the fields:
        | Field      | Value                |
        | tfUsername | tomsmith             |
        | tfPassword | SuperSecretPassword! |
        And I click the "btnLogin" button
      Then I expect to be on the "secure" page
        And I expect the "divFlashMessage" element text to contain "You logged into a secure area!"

    Scenario: S02: Login with invalid credentials
      When I type on the fields:
        | Field      | Value  |
        | tfUsername | foobar |
        | tfPassword | barfoo |
        And I click the "btnLogin" button
      Then I expect to still be on the "login" page
        And I expect the "divFlashMessage" element text to contain "Your username is invalid!"
   ```

7. Run it: `npm test`

8. Check the results: `npm run report`

9. You can view other gherkin steps available out-of-the-box [here](./demo/test/features).

## License

ISC

## TODO

- complete gherkin
  - request validation
  - browser storage
- full UTs
- full docs
- npm init
- contrib guide
