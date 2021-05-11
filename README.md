## qa-automation-assignment

This repository contains TEST-SUITE for Sample Project.
This test framework is designed using a feature-rich test UI automation tool webdriverIO with  Mocha test framework. It is written in javascript language.

### Based on

This suite is currently based on:
- **WebdriverIO:** `7.2.1` https://webdriver.io
- **Mocha:** `7.2.1` https://mochajs.org/
- **allure-reporter** `7.5.7`https://webdriver.io/docs/allure-reporter/ 

## Required software

Make sure nodejs is installed on your Operating system.
Install from the site - https://nodejs.org/en/  take the LTS version based on your Operating system. Please make sure you install NodeJS globally.
- **Node:** `v14.##.#`

### How to setup run test suite

Install the dependencies 
```
npm install
```

To run all the tests [This will by default run all specs on chrome browser in serial mode]
```
npm test
```

Generated allure Report can be accessed using command.
```
npm run report
```

Following environment variables can be set before running the test suite as per the requirement.

To set browser
Options : chrome, firefox, multibrowser
```
$env.BROWSER='multibrowser'
```

To set maximum browser instance for parallel execution
```
$env.THREADS=4
```

To run browser in headless mode
```
$env.HEADLESS='true'
```

To run on given environment.
```
$env.ENV='Prod-Test1'
```

