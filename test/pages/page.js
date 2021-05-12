import env from '../testdata/environment'
import allureReporter from '@wdio/allure-reporter'
import {config} from '../../wdio.conf'
export default class Page {

    /**
     * Add environment details in allure report.- Environment type, test url, test browser, number of parallel browsers.
     * Launch given URL on browser.
     * Maximize browser window.
     * @param {string} url
     * @example open() - launch base url 
     */
    open(url = env.baseURL) {
        allureReporter.addEnvironment("Environment Name", config.environment)
        allureReporter.addEnvironment("URL", url)
        allureReporter.addEnvironment("Headless mode", config.isHeadlessMode)
        allureReporter.addEnvironment("Browser Mode", config.browserMode)
        allureReporter.addEnvironment("Max Browser Threads", config.maxInstances)
        browser.url(url)
    }

    /**
     * Get selected drop down option visible text
     * @param {string} locator - css selector
     * @example getSelectedDropDownValue('#ipayswith')
     * @returns 
     */
    getSelectedDropDownValue(locator){
        let selectedOption = browser.execute( (locator)=>{
            var value = document.querySelector(locator);  
            return value.options[value.selectedIndex].text;
        }, locator
        )
        return selectedOption;
    }
}