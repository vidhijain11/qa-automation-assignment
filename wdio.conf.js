const fsExtra = require('fs-extra')
const { join } = require('path');
import allureReporter from '@wdio/allure-reporter'

let runTimeCapabilities = null

//Setting visual testing mode.
let visualTesting = process.env.VISUALTESTING || "true"

//Setting environment based on user input
let ENV = process.env.ENV || "Prod-Test1"

// Setting browser arguments and maximum browser instance based on user input
let runTimeBrowser = process.env.BROWSER || 'chrome'
let maxBrowserInstance = parseInt(process.env.THREADS) || 1

//Setting browser headless mode
let headless = process.env.HEADLESS || 'false'

//Setting browser arguments based on mode of run
let chrome_browser_args = {}
let firefox_browser_args = {}
if (headless == 'true') {
    chrome_browser_args = ['--headless', '--disable-extensions', '--allow-running-insecure-content', '--disable-dev-shm-usage', '--disable-gpu', '--no-sandbox', '--unlimited-storage', '--disable-notifications']
    firefox_browser_args = ['-headless', '-width 1280', '-height 800', '–window-size=1280,800']
} else {
    chrome_browser_args = ['--no-sandbox', '--unlimited-storage', 'disable-infobars']
    firefox_browser_args = []
}

//Setting firefox browser capabilities
let firefoxCapabilities = {
    browserName: 'firefox',
    acceptInsecureCerts: true,
    "moz:firefoxOptions": {
        args: firefox_browser_args,
        prefs: { 'permissions.default.geo': 1 }
    }
}

//Setting chrome browser capabilities
let chromeCapabilities = {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
        excludeSwitches: ["enable-automation"],
        useAutomationExtension: false,
        args: chrome_browser_args
    }
}

/**
 * Setting browser capabilities based on user input on browser.
 * If the browser input is not present, run on chrome
 * If the browser input has unsupported browser, run on chrome
 * If the browser input is 'multibrowser', all scripts will run on both firefox and chrome
 * If the browser input is 'chrome', all scripts will run on chrome
 * If the browser input is 'firefox', all scripts will run on firefox
 */

if (runTimeBrowser == 'chrome') {
    runTimeCapabilities = [chromeCapabilities]

} else if (runTimeBrowser == 'firefox') {
    runTimeCapabilities = [firefoxCapabilities]

} else if (runTimeBrowser == 'multibrowser') {
    runTimeCapabilities = [firefoxCapabilities, chromeCapabilities]

} else {
    console.log('Browser is undefined, using chrome browser to run the tests')
    runTimeCapabilities = [chromeCapabilities]
}

exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './test/specs/main/*.spec.js',
    ],

    suites : {
        orderFood : [ 
            './test/specs/main/01_orderFood_case1.spec.js',
            './test/specs/main/02_orderFood_case2.spec.js',
            './test/specs/main/03_orderFood_case3.spec.js',
        ],

        visualTest : [
            './test/specs/main/04_landingPage_VisualTest.spec.js'
        ]
    },
    //
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],
    //
    //Environment
    environment: ENV,

    browserMode: runTimeBrowser,

    isHeadlessMode: headless,
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: maxBrowserInstance,
    path: "/wd/hub",
    //capabilities : []
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.   
    capabilities: runTimeCapabilities,
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'error',
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    // baseUrl: 'http://automationpractice.com/index.php',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 5000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    services: ['selenium-standalone',

        ['image-comparison',
            // The options
            {
                // Some options, see the docs for more
                baselineFolder: join(process.cwd(), './test/baselineScreenShots/'),
                formatImageName: '{tag}-{1280}x{800}',
                screenshotPath: join(process.cwd(), '.tmp/'),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolBar: true,
            }],
    ],


    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    // specFileRetries: 1,
    //
    // Delay in seconds between the spec file retry attempts
    // specFileRetriesDelay: 0,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        //Abort ("bail") after first test failure 
        bail: true,
        //Specify test timeout threshold
        timeout: 12000000
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        console.log("Environment is: ", this.environment)
        console.log("Browser mode: ", runTimeBrowser)
        console.log("Max browser instance: ", maxBrowserInstance)
        console.log("Headless: ", headless)
        console.log("Visual Testing: ", visualTesting)

        //Deleting Old Report
        const dir1 = "./allure-report"
        const dir2 = "./allure-results"
        const dir3 = "./.tmp"

        if (fsExtra.existsSync(dir1)) {
            fsExtra.rmdir(dir1, { recursive: true })
            console.log(`${dir1} removed`)
        }

        if (fsExtra.existsSync(dir2)) {
            fsExtra.rmdir(dir2, { recursive: true })
            console.log(`${dir2} removed`)
        }

        if (fsExtra.existsSync(dir3)) {
            fsExtra.rmdir(dir3, { recursive: true })
            console.log(`${dir3} removed`)
        }
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs        List of spec file paths that are to be run
     * @param {Object}         browser      instance of created browser/device session
     */
    before: function () {
        require('expect-webdriverio').setOptions({ trim: true })
        browser.setTimeout({
            'implicit': 2000
        })

        //Declaring Allure Reporter Globally
        //globalThis.allureReporter = allureReporter

        //Over writing "Click" function
        browser.overwriteCommand('click', function (origClickFunction, { TIMEOUT = 10000
        } = {}) {
            this.waitForExist({
                timeout: TIMEOUT,
                timeoutMsg: 'Given element ' + this.selector + ' does NOT EXIST after ' + TIMEOUT + ' MiliSeconds'
            });
            this.scrollIntoView({ block: "center" })
            browser.pause(100)
            try {
                this.waitForClickable({
                    timeout: TIMEOUT,
                    timeoutMsg: 'Given element ' + this.selector + ' is NOT Clickable after ' + TIMEOUT + ' MiliSeconds'
                });

                return origClickFunction()
            } catch (err) {
                throw err
            }
        }, true)

        //Perform visual Testing if Flag is true
        browser.addCommand('checkImage', function (name) {
            if (visualTesting == "true") {
                let diffValue = browser.checkElement(this, name)
                if (diffValue <= 0.10) {
                    allureReporter.addStep(`Visual Test for Image - ${name}`, [], 'passed')
                    return true
                }
                else {
                    let data = fsExtra.readFileSync(`./.tmp/diff/desktop_${browser.capabilities.browserName}/${name}-{1280}x{800}.png`);
                    allureReporter.addStep(`Visual Test for Image - ${name} Failed`, [], 'failed')
                    allureReporter.addAttachment("Difference Screenshot", data);
                    return false
                }
            } else {
                console.log("Visual Testing is skipped")
                return true
            }
        }, true)
    },

    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    // beforeSuite: function (suite) {
    // },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    // beforeTest: function (test, context) {
    // },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    // afterTest: function(test, context, { error, result, duration, passed, retries }) {
    // },

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            browser.takeScreenshot();
        }
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {

    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    // onComplete: function (exitCode, config, capabilities, results) {

    // },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}
