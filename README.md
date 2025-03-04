<!-- markdownlint-disable MD033 -->
<h1 align="center">KYOKO</h1>

<p align="center" width="100%">
  <a href="https://github.com/iamkenos/kyoko/actions/workflows/unit-tests.yml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/iamkenos/kyoko/unit-tests.yml?label=unit%20tests&logo=github">
  </a>
  <a href="https://github.com/iamkenos/kyoko/actions/workflows/feature-tests.yml" target="_blank">
    <img src="https://img.shields.io/github/actions/workflow/status/iamkenos/kyoko/feature-tests.yml?label=feature%20tests&logo=github">
  </a>
  <br/>
  <a href="https://www.npmjs.com/package/@iamkenos/kyoko?activeTab=readme" target="_blank">
    <img alt="" src="https://img.shields.io/npm/v/@iamkenos/kyoko?label=version&logo=npm&logoColor=red&color=red">
  </a>
  <a href="https://www.npmjs.com/package/@iamkenos/kyoko?activeTab=readme" target="_blank">
    <img alt="" src="https://img.shields.io/npm/dm/@iamkenos/kyoko?label=downloads&logo=npm&logoColor=red&color=red">
  </a>
</p>

## About

[Playwright](https://playwright.dev/) & [CucumberJS](https://cucumber.io/docs/installation/javascript/) mixed with presets and additional features:

- write tests with [TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html) and [Cucumber](https://cucumber.io/docs/guides/overview/)
- gherkin statements that can be used out of the box powered by [cucumber expressions](https://github.com/cucumber/cucumber-expressions)
- page and element expected conditions
- generic classes for page objects support
- multiple locale support
- web components support
- internal polling and retries
- skip tests using cucumber tags
- reporters:
  - [built-in cucumber reporter plugins](https://cucumber.io/docs/cucumber/reporting/?sbsearch=reporting&lang=javascript)
  - [allure](https://allurereport.org/docs/cucumberjs/)

## Requirements

- NodeJS ≥ 20.10.0 or ≤ LTS
- JRE ≥ 8

## Get Started

You'll need a working knowledge of Playwright and Cucumber to be able to use this library. They have rich documentation so head on over the site and read on if you're not familiar with these yet.

1. Get it: `npm install @iamkenos/kyoko`

2. Run it: `npx kyoko init` and follow the prompt instructions.

3. Check it: `npm run report`

4. You can view other gherkin steps available out-of-the-box [here](./demo/test/features).

## License

ISC

## Todo

- Gherkin:
  - Request validation with JSON snapshot matching
  - Browser storage steps
- Unit Tests
- Full documentation
- Contributing guide
