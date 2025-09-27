# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.9.0](https://github.com/iamkenos/kyoko/compare/v0.8.0...v0.9.0) (2025-09-27)


### Features

* **commands:** locator.previous ([840f992](https://github.com/iamkenos/kyoko/commit/840f9926143909bdaffb3945a2d6b74d330dd87b))


### Bug Fixes

* attach docstrings for allure2 ([2480245](https://github.com/iamkenos/kyoko/commit/24802458b1515355c4193b93d8ce8cae70dfc8c1))

## [0.8.0](https://github.com/iamkenos/kyoko/compare/v0.7.0...v0.8.0) (2025-09-25)


### Chore

* add generate report step on ft yml ([52d5760](https://github.com/iamkenos/kyoko/commit/52d576066d3f2356c0d686f3689c1b256a938e6a))
* generate allure as single file ([e7e2bc9](https://github.com/iamkenos/kyoko/commit/e7e2bc992f604d34540c391b8e9a7e04b905a4c2))
* use single file on init reports ([eaeab79](https://github.com/iamkenos/kyoko/commit/eaeab7964eb9656971d75cf4cc44e51f12666bf3))


### Refactor

* **config:** rework logger class and remove logger prop from config ([0220d1f](https://github.com/iamkenos/kyoko/commit/0220d1faad7064568380690e7b9384f44dd19307))
* remove support for custom env vars... ([32cff28](https://github.com/iamkenos/kyoko/commit/32cff289b7f4e6cb926d20fe64231df26181465f))

## [0.7.0](https://github.com/iamkenos/kyoko/compare/v0.6.0...v0.7.0) (2025-09-21)


### Features

* **commands:** update init examples writeup and file names ([2e49c4f](https://github.com/iamkenos/kyoko/commit/2e49c4fc568173c18a589b937ea0cb22a42e0952))


### Bug Fixes

* component command overrides ([f3ffa33](https://github.com/iamkenos/kyoko/commit/f3ffa33bdd200e5a02e48cbf85d70c36ad53c0cb))


### Refactor

* move demo tests location ([9b28e7c](https://github.com/iamkenos/kyoko/commit/9b28e7c3540e7601153a779073c4ff69c8f9477f))
* move init resources location ([81b2c42](https://github.com/iamkenos/kyoko/commit/81b2c42f9340673279c547b191aa063462550864))

## [0.6.0](https://github.com/iamkenos/kyoko/compare/v0.5.2...v0.6.0) (2025-09-18)


### ⚠ BREAKING CHANGES

* file and folder structure

### Features

* **fixtures:** expose logger on component ([a2fa00b](https://github.com/iamkenos/kyoko/commit/a2fa00b488d8d402c5010db41a0c64bfd1f7a950))
* plugins ([4007edc](https://github.com/iamkenos/kyoko/commit/4007edce22db9981b098afe496f70ea312cf27e8))


### Bug Fixes

* cucumber, allure, playwright api mismatches ([92decb9](https://github.com/iamkenos/kyoko/commit/92decb947ce8001ab54d8d793138eb0689ce903d))
* **fixtures:** component prototype ([98093f2](https://github.com/iamkenos/kyoko/commit/98093f267ad01432d60b08caf500317870444213))
* **fixtures:** revert component prototype, proxy breaks ([0876aeb](https://github.com/iamkenos/kyoko/commit/0876aeb5b7b7bf640be40b9878f7dacb97c6fe04))
* recurse issue on modal demo ([c361e74](https://github.com/iamkenos/kyoko/commit/c361e747ffb62033e68044774b08e80c57bd7d3f))


### Refactor

* file and folder structure ([125609e](https://github.com/iamkenos/kyoko/commit/125609ea89cedd13f5362cff04a88342a4fe4a7a))
* **fixtures:** eureka, component works! ([1c42b8a](https://github.com/iamkenos/kyoko/commit/1c42b8ad0fb51a24ce169bc5bcd6365a275d9c86))
* rework fixtures into plugins using playwright extras ([8d4f56c](https://github.com/iamkenos/kyoko/commit/8d4f56c6f50271387ca4d59613a70a63fac50ca6))
* use ctx over world for shared context references ([d29a44e](https://github.com/iamkenos/kyoko/commit/d29a44eb76fd2edbb2f661fc30513cb5f9b0e21f))
* use pwe dropin by default, enable stealth by default ([e0fb880](https://github.com/iamkenos/kyoko/commit/e0fb880bbc761b2b164e996fe78d9d5b3c4184a3))


### Chore

* **deps:** cucumber, playwright, allure updates ([923905e](https://github.com/iamkenos/kyoko/commit/923905e0aee542c0dd6bb5087d86989050ce07ca))
* **deps:** remaining dependency bumps ([3200275](https://github.com/iamkenos/kyoko/commit/3200275fbf6af5940bb3a3135308e380585fe4b9))
* **deps:** revert yargs ([ffe86ef](https://github.com/iamkenos/kyoko/commit/ffe86ef4e2c874f9e35492b992e9becaedcaf2d4))
* **deps:** typescript and eslint updates ([e6d958e](https://github.com/iamkenos/kyoko/commit/e6d958e2428fec350ff5bc111b2ef40d35adaf53))

### [0.5.2](https://github.com/iamkenos/kyoko/compare/v0.5.1...v0.5.2) (2025-06-09)


### Features

* stealth ([d0b8f56](https://github.com/iamkenos/kyoko/commit/d0b8f56bcbfd9d9d05604e4e357df6ea71b5ce54))

### [0.5.1](https://github.com/iamkenos/kyoko/compare/v0.5.0...v0.5.1) (2025-03-05)


### ⚠ BREAKING CHANGES

* renamed given to waitUntil

### Features

* allow adding expected conditions ([6d9daca](https://github.com/iamkenos/kyoko/commit/6d9daca758e158213ff29f0b0f807046622e758c))


### Bug Fixes

* component command type ([66f8ba0](https://github.com/iamkenos/kyoko/commit/66f8ba05332a9c6ee02db4b1121144859206f364))
* move timeout to conditions class ([6b563ed](https://github.com/iamkenos/kyoko/commit/6b563ed06d48f323834b4d70bb0386898990e9e3))


### Chore

* update tsconfig ([ab557dd](https://github.com/iamkenos/kyoko/commit/ab557dd09e81b4ff7ba5fc97f919c502473149fe))


### Refactor

* moved non-page expected conditions out of page conditions ([28929ef](https://github.com/iamkenos/kyoko/commit/28929ef99bb0ae1673850fde5b0362f2dba1b351))
* renamed given to waitUntil ([e76ecf0](https://github.com/iamkenos/kyoko/commit/e76ecf0e36759d8f74972f06311b03564572418e))

## [0.5.0](https://github.com/iamkenos/kyoko/compare/v0.4.7...v0.5.0) (2025-03-01)


### Features

* added support for video recordings ([fe89268](https://github.com/iamkenos/kyoko/commit/fe892688fbe12b74b29bfb6dc7e65505da1b4b6a))


### Bug Fixes

* throw error on findPageObject when both persisted page object and page identifier is undefined ([089026b](https://github.com/iamkenos/kyoko/commit/089026bb9353772be6edbb9b59a07a2ba9a349c4))


### Refactor

* expected conditions kwargs ([d52757e](https://github.com/iamkenos/kyoko/commit/d52757e90c9dd2789b0d85efceff18f744795c56))
* updated fixture typings ([54a8f0a](https://github.com/iamkenos/kyoko/commit/54a8f0a0965fd0a55f1e83b2b04c249adcebac35))

### [0.4.7](https://github.com/iamkenos/kyoko/compare/v0.4.6...v0.4.7) (2025-02-14)

### [0.4.6](https://github.com/iamkenos/kyoko/compare/v0.4.5...v0.4.6) (2025-02-14)


### Refactor

* only print caller file when logger is called from a named function ([c7d05d9](https://github.com/iamkenos/kyoko/commit/c7d05d9797700ae54ff5e83dfeaf013892246070))

### [0.4.5](https://github.com/iamkenos/kyoko/compare/v0.4.4...v0.4.5) (2025-02-14)


### Features

* allow access to cucumber config ([59bb4c8](https://github.com/iamkenos/kyoko/commit/59bb4c8dbd8c6db004d48958de0c5faa95477725))


### Chore

* audit fixes ([0ed71ec](https://github.com/iamkenos/kyoko/commit/0ed71ec0707ea7d5eda68ebdc636683716d7f94b))
* ci upload artifact ([6d8dff3](https://github.com/iamkenos/kyoko/commit/6d8dff37073e2343a8e50e97639431c7a87ac115))
* typecast buffer on snapshot match ([cb05c64](https://github.com/iamkenos/kyoko/commit/cb05c64eff89f306d6534e26166a9d87547be8d8))

### [0.4.4](https://github.com/iamkenos/kyoko/compare/v0.4.3...v0.4.4) (2024-08-24)


### Features

* chromium install ([d7421dc](https://github.com/iamkenos/kyoko/commit/d7421dce143a86d96f674a144611a88e517f3d9a))
* skip tests with cucumber tags ([2102d47](https://github.com/iamkenos/kyoko/commit/2102d47b782ea39b0d4be456b4a2248dde477d08))


### Bug Fixes

* image tolerance option ([88fcba8](https://github.com/iamkenos/kyoko/commit/88fcba8710e130f66d1e7c5160defd6e916dfba4))

### [0.4.3](https://github.com/iamkenos/kyoko/compare/v0.4.2...v0.4.3) (2024-08-23)


### Bug Fixes

* broken glob ([e5e3ec8](https://github.com/iamkenos/kyoko/commit/e5e3ec8545b7fe7f21b1e7eb77e27f844bc8b33a))
* husky permissions ([bf1c327](https://github.com/iamkenos/kyoko/commit/bf1c32703826525e19712bafbc71cb90639f5c34))


### Refactor

* config file ([41623f3](https://github.com/iamkenos/kyoko/commit/41623f3887d9e141a6be3cebd69a2a03450684ce))

### [0.4.2](https://github.com/iamkenos/kyoko/compare/v0.4.1...v0.4.2) (2024-08-23)


### Features

* remove downloads dir before start of process ([eb75e93](https://github.com/iamkenos/kyoko/commit/eb75e935f99dd0ba87041709fbbc7eccbe287791))


### Bug Fixes

* use suggestedfilename of downloaded file by default ([c3f7168](https://github.com/iamkenos/kyoko/commit/c3f716800f3c39afc5d0cfef5da99325001063a5))

### [0.4.1](https://github.com/iamkenos/kyoko/compare/v0.4.0...v0.4.1) (2024-07-12)


### Refactor

* fixtures ([dbd1893](https://github.com/iamkenos/kyoko/commit/dbd18936a60ddbab23202d9286fb5331b6e33d26))

## [0.4.0](https://github.com/iamkenos/kyoko/compare/v0.3.5...v0.4.0) (2024-07-12)

### [0.3.5](https://github.com/iamkenos/kyoko/compare/v0.3.4...v0.3.5) (2024-07-12)


### Features

* support for function args when getting page object prop ([fb6e855](https://github.com/iamkenos/kyoko/commit/fb6e8554d283d576da56a43a0a07276f6847fbe8))


### Bug Fixes

* add locator on the expected conditions result ([c306e23](https://github.com/iamkenos/kyoko/commit/c306e23ac330b5a91a4e1c54c9dda77c3e90f1e0))

### [0.3.4](https://github.com/iamkenos/kyoko/compare/v0.3.3...v0.3.4) (2024-07-11)


### Features

* component filters ([c125083](https://github.com/iamkenos/kyoko/commit/c1250839a11b62053d8227c3dca9442854eaf7cf))

### [0.3.3](https://github.com/iamkenos/kyoko/compare/v0.3.2...v0.3.3) (2024-07-10)


### Bug Fixes

* component chaining ([e1d2f54](https://github.com/iamkenos/kyoko/commit/e1d2f54ab2649d7fe88395580b29077ff021f9af))

### [0.3.2](https://github.com/iamkenos/kyoko/compare/v0.3.1...v0.3.2) (2024-07-09)


### Refactor

* default extension for step definitions ([5b4a09a](https://github.com/iamkenos/kyoko/commit/5b4a09a5edfade783346dd161679c76681295064))
* web components ([98315ab](https://github.com/iamkenos/kyoko/commit/98315ab88469365c1d5ac3badb8d675604fd4cb3))

### [0.3.1](https://github.com/iamkenos/kyoko/compare/v0.3.0...v0.3.1) (2024-07-04)


### Refactor

* prefer cucumber expressions over regex ([68f5327](https://github.com/iamkenos/kyoko/commit/68f53277134670da3a032a6f4ebf71d6de360b19))

## [0.3.0](https://github.com/iamkenos/kyoko/compare/v0.2.3...v0.3.0) (2024-07-02)


### Chore

* dependency upgrades ([6d78326](https://github.com/iamkenos/kyoko/commit/6d7832668bc0b326a097e2587b2863e2216e55b7))


### Refactor

* use typed globalThis ([9784127](https://github.com/iamkenos/kyoko/commit/97841276de06d1d3d8d88a9760e3cf5d0ebaab12))

### [0.2.3](https://github.com/iamkenos/kyoko/compare/v0.2.2...v0.2.3) (2024-07-02)


### Features

* locator search limit ([fb00658](https://github.com/iamkenos/kyoko/commit/fb006587ffbb82d9ec6fabb0783bf0434f054cbb))

### [0.2.2](https://github.com/iamkenos/kyoko/compare/v0.2.1...v0.2.2) (2024-07-01)


### Bug Fixes

* component command return types ([de6a425](https://github.com/iamkenos/kyoko/commit/de6a42552fb6b52800cb1cdd8b2135c4cb7ac630))
* **config:** parallel and tags env overrride ([a224f95](https://github.com/iamkenos/kyoko/commit/a224f954cb6534b43700bd2a34a3fb8ea7c56406))


### Refactor

* web components ([c80d605](https://github.com/iamkenos/kyoko/commit/c80d605c4111744ed96ea9a38c746c87e3aa807a))

### [0.2.1](https://github.com/iamkenos/kyoko/compare/v0.2.0...v0.2.1) (2024-06-27)


### Features

* object utils ([0d5e7eb](https://github.com/iamkenos/kyoko/commit/0d5e7ebd3802f684fa1af236ff3cd4fa3c6a16f9))

## [0.2.0](https://github.com/iamkenos/kyoko/compare/v0.1.1...v0.2.0) (2024-06-26)


### Features

* remove logger name formatter ([4acf61a](https://github.com/iamkenos/kyoko/commit/4acf61a417005e33f73454699138661c8b315e8f))


### Bug Fixes

* cucumber keywords on logging ([3b41b22](https://github.com/iamkenos/kyoko/commit/3b41b221cf9349ab13f6d6b26d7d499ddf38a56a))
* env variable config overrides ([5666f73](https://github.com/iamkenos/kyoko/commit/5666f73753455a121da2c7d79f6cee0e027605c5))
* npm audit ([ee17e3c](https://github.com/iamkenos/kyoko/commit/ee17e3c1ad293e90e5676d68d65d796236ba60b4))
* remove unecessary options on debugger config ([bb0cd5c](https://github.com/iamkenos/kyoko/commit/bb0cd5cc2a70e26a93a1c52283111ba2409f56c7))


### Refactor

* hide __proto property ([3d9d8a8](https://github.com/iamkenos/kyoko/commit/3d9d8a89fabd672335b742399d470148b9cd2fff))
* simplified component api ([8217b58](https://github.com/iamkenos/kyoko/commit/8217b58eeb66606782bd9d0ed373af0501c2fd47))

### [0.1.1](https://github.com/iamkenos/kyoko/compare/v0.1.0...v0.1.1) (2024-04-07)


### Bug Fixes

* page object parameters type and default xpath root ([c49e551](https://github.com/iamkenos/kyoko/commit/c49e55125e3ca8d4d2300b8253795f6acb9727f4))

## [0.1.0](https://github.com/iamkenos/kyoko/compare/v0.0.11...v0.1.0) (2024-04-07)


### Bug Fixes

* **conditions:** return results or throw error after polling ([4bd6443](https://github.com/iamkenos/kyoko/commit/4bd644352797efd3989dfaa97fa232ff7f8aaf69))

### [0.0.11](https://github.com/iamkenos/kyoko/compare/v0.0.10...v0.0.11) (2024-01-22)


### Features

* add interval option on expected conditions ([736b044](https://github.com/iamkenos/kyoko/commit/736b0443ebebc925e6e4a6f7c5f807caed14777c))


### Chore

* update cli package.json ([5bf957f](https://github.com/iamkenos/kyoko/commit/5bf957f48e3912c5303f204c780733434c7d3bd8))

### [0.0.10](https://github.com/iamkenos/kyoko/compare/v0.0.9...v0.0.10) (2024-01-22)


### Bug Fixes

* package exports and minor bugs ([8713c26](https://github.com/iamkenos/kyoko/commit/8713c261684da89d89e036ba183a945d35ae0645))

### [0.0.9](https://github.com/iamkenos/kyoko/compare/v0.0.8...v0.0.9) (2024-01-21)


### Bug Fixes

* use link selector when providing link text arg from gherkin ([008f178](https://github.com/iamkenos/kyoko/commit/008f1788c4c41ebe594c2a5e15712f2d1d35e9c2))


### Chore

* normalize repo url ([83172aa](https://github.com/iamkenos/kyoko/commit/83172aa64ccd2f5baeff330c281a9b0da2a27363))

### [0.0.8](https://github.com/iamkenos/kyoko/compare/v0.0.7...v0.0.8) (2024-01-20)


### Chore

* npm audit ([d527e9e](https://github.com/iamkenos/kyoko/commit/d527e9e29a23a960f06b7a494be85498dd6bb51f))

### [0.0.7](https://github.com/iamkenos/kyoko/compare/v0.0.6...v0.0.7) (2023-12-13)

### [0.0.6](https://github.com/iamkenos/kyoko/compare/v0.0.5...v0.0.6) (2023-12-13)


### Features

* **core:** url from base ([695f918](https://github.com/iamkenos/kyoko/commit/695f918b748adfe48fe027ca21db798558ebffc3))
* **core:** use playwright's check and uncheck methods for element select and deselect ([49176a5](https://github.com/iamkenos/kyoko/commit/49176a51d669a5176508f1fefa52e3216085746d))
* rework logger ([6f04a91](https://github.com/iamkenos/kyoko/commit/6f04a9122b9fa2a3f86142b2589246688c3390f2))


### Bug Fixes

* playwright goto resolves from baseURL origin, not from the href ([6237521](https://github.com/iamkenos/kyoko/commit/6237521951f97892d49aa3879efb8598a3bdb220))


### Refactor

* rename world private methods ([05f7443](https://github.com/iamkenos/kyoko/commit/05f744337bc5d9a13a9d5322502969a0cc2b8914))

### [0.0.5](https://github.com/iamkenos/kyoko/compare/v0.0.4...v0.0.5) (2023-12-12)


### Bug Fixes

* cli init gitignore file ([1499d3a](https://github.com/iamkenos/kyoko/commit/1499d3ac29f752fffd111bf2f94f8ae1bf08f463))
* reporter attachments, world parameters, typings ([21ab39e](https://github.com/iamkenos/kyoko/commit/21ab39ea91d0ab2aaa96bc279a107b28b4159759))

### [0.0.4](https://github.com/iamkenos/kyoko/compare/v0.0.3...v0.0.4) (2023-12-11)


### Features

* gherkin for element count ([e8821d2](https://github.com/iamkenos/kyoko/commit/e8821d21beb6a630db2db4ff1ab67f1facb2c852))
* update samples ([3d0438f](https://github.com/iamkenos/kyoko/commit/3d0438f794602527b7caa9e31565e529c5fcd24b))

### [0.0.3](https://github.com/iamkenos/kyoko/compare/v0.0.2...v0.0.3) (2023-12-11)


### Features

* cli module and init command ([5749348](https://github.com/iamkenos/kyoko/commit/57493484f203bae276d90a92e181f25791e27b3f))
* complex, nested components ([b92147c](https://github.com/iamkenos/kyoko/commit/b92147cb4219474dbb513a8e95ead864e5d1836b))
* load .env from baseDir ([0c97a2c](https://github.com/iamkenos/kyoko/commit/0c97a2cb5717d719d3fbd75b818fc99a88fdb1ac))
* multi-locales support ([66643bc](https://github.com/iamkenos/kyoko/commit/66643bcad178f2e8e76d09c2b9349f7e0a5dbf28))
* support web components ([eedb92d](https://github.com/iamkenos/kyoko/commit/eedb92d70f3b945857d222f4ecae2d6b2b3d076c))


### Bug Fixes

* build component instance and proper prototype ([e5ccba3](https://github.com/iamkenos/kyoko/commit/e5ccba31e7dadc60ef427a29a96d8fdb5396413a))


### Refactor

* remove implicit public accessors ([b7b0d76](https://github.com/iamkenos/kyoko/commit/b7b0d76d6393b0d9f792fa3d7999b2604ac61ac3))


### Chore

* improve component method typings ([2fc9c98](https://github.com/iamkenos/kyoko/commit/2fc9c98a0bd0d6840c44dde206fa6746be7be21f))

### [0.0.2](https://github.com/iamkenos/kyoko/compare/v0.0.1...v0.0.2) (2023-12-08)


### Bug Fixes

* fixes for windows paths ([d03d7ef](https://github.com/iamkenos/kyoko/commit/d03d7ef48d32acfd8f06b28fff05cb7cad9e9789))

### [0.0.1](https://github.com/iamkenos/kyoko/compare/v0.0.0...v0.0.1) (2023-12-07)


### Chore

* **deps:** dependency housekeeping ([52fcce1](https://github.com/iamkenos/kyoko/commit/52fcce1fdc407067fdda21d9f17ed4cd693d9f8c))

## 0.0.0 (2023-12-07)


### Features

* frame controls ([f78495b](https://github.com/iamkenos/kyoko/commit/f78495b81bd5f7dae98510367cf51a47a165bddb))
* init commit ([2898a04](https://github.com/iamkenos/kyoko/commit/2898a041de922961ac13f28f684dd4543ec135e9))
* logger ([d3396b5](https://github.com/iamkenos/kyoko/commit/d3396b5d27ff0d6270e8a79513e790084e21d45a))
* new window ([e7e574a](https://github.com/iamkenos/kyoko/commit/e7e574abb785da175e0611e71b258bc2a1a98df1))
* override options for select, fill ([1bc9401](https://github.com/iamkenos/kyoko/commit/1bc9401b86ded8a701a08a8e0e5e0720cd65ae3f))
* override paths via env ([d3750e2](https://github.com/iamkenos/kyoko/commit/d3750e22e5aa66a1e39c342ae7ffa19feea06f1e))
* page dialogs ([015eb31](https://github.com/iamkenos/kyoko/commit/015eb31a2ae2581f9d65b0ef36b8e0c1a95b52c7))
* parameterize browser and context options ([1d2d972](https://github.com/iamkenos/kyoko/commit/1d2d972882c5b88d1a9a69d01050bbf5ca74c591))
* replace serenity reports with allure ([9e9b873](https://github.com/iamkenos/kyoko/commit/9e9b873f697adbe474c98153c844303b93d91088))
* request interceptor ([53e8aa1](https://github.com/iamkenos/kyoko/commit/53e8aa19909ab8305e5c14338ca0073917e4475b))
* serenity reports ([dcafd0c](https://github.com/iamkenos/kyoko/commit/dcafd0cf2dcf58254ab33f0a45538634140eb2c2))


### Bug Fixes

* add babel setup ([f1bb312](https://github.com/iamkenos/kyoko/commit/f1bb3126f39584d2630059ef7e41e3f3586c88a4))
* allure attachments ([460a0cb](https://github.com/iamkenos/kyoko/commit/460a0cb31f0e1b3156dc373e1fa9ef5d8f12f8bb))
* changes for packaged version ([5b9cf91](https://github.com/iamkenos/kyoko/commit/5b9cf9107fc01bffb19a3aa41748dc092cf8b969))
* **conditions:** babel issue with page eval scripts ([c813018](https://github.com/iamkenos/kyoko/commit/c8130182317c5684326066a2c1df2e203e5a0e6a))
* linting on cucumber config file ([955457e](https://github.com/iamkenos/kyoko/commit/955457e515f8039e36232d2bae80d8d4fed90c6a))
* transpile code to es6/esnext to handle Class constructor World cannot be invoked without new ([560ba6e](https://github.com/iamkenos/kyoko/commit/560ba6e3292fe3b132e36edad6fb83878c3c49d9))


### Refactor

* base world ([aefa263](https://github.com/iamkenos/kyoko/commit/aefa263c636b6d337eedc62d9396c58188720797))
* commands ([fc50ecf](https://github.com/iamkenos/kyoko/commit/fc50ecfd813140f4a9ca1a103e3a9fe298cca36d))
* commands folders ([75276fe](https://github.com/iamkenos/kyoko/commit/75276fe498b5a02e86694474f0cc9e92362019ea))
* expected conditions ([6e6dd5b](https://github.com/iamkenos/kyoko/commit/6e6dd5bc4b7507230820183fd93d2bc17c592582))
* generics and gherkin ([a2c732f](https://github.com/iamkenos/kyoko/commit/a2c732fcfb1748ec47946c7c2a49fea3437b172d))
* move to src ([0005249](https://github.com/iamkenos/kyoko/commit/00052497899a687feef98b3087338f5be33f499f))
* rework config ([4da5118](https://github.com/iamkenos/kyoko/commit/4da5118d78d2235265fbe45dd533d6840e2cb24b))
* rework expected conditions result ([6cbe8ed](https://github.com/iamkenos/kyoko/commit/6cbe8edf92fd10dc10369aa1217505d6eefe554b))


### Chore

* build scripts ([6b3d15b](https://github.com/iamkenos/kyoko/commit/6b3d15b2a2f7bb17dd68acd8155c93faa81f7e34))
* **deps:** install standard version ([95f664a](https://github.com/iamkenos/kyoko/commit/95f664a04ef0f4220cdcfa599250fad0d9b2a8f4))
* prep for npm pack ([a18a751](https://github.com/iamkenos/kyoko/commit/a18a751fbd06e8652e8fea711f8adbbcec387111))
* transpile code ([29e6e3d](https://github.com/iamkenos/kyoko/commit/29e6e3d3351b1e8712d1a5860bdc2c2d9d7ee0b3))
* upgrade to node 20 lts ([7adab4d](https://github.com/iamkenos/kyoko/commit/7adab4d0ca6ba4abcd64b0c3d316afc4ac1ba03a))
