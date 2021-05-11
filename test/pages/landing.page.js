import basePage from "./page"

/**
 * This page contains locators and selectors of landing page.
 */
class LandingPage extends basePage {

    //Start of locators list***

    get btnAcceptCookies() { return $("button.js-btn-ok=OK") }
    get txtCookie() { return $("p.cc-banner__text") }
    get inputSearchAddress() { return $("#imysearchstring") }
    get btnShow() { return $("#submit_deliveryarea") }
    get txtTitle() { return $("h1[class='header__title']") }


    /**
     * Selects delivery area from the drop down list
     * @param {string} deliveryArea
     * @example ddDeliveryArea('8888 Alpha')
     * @returns 
     */
    ddDeliveryArea(deliveryArea) {
        return $(`//span[contains(text(),'${deliveryArea}')]`)
    }

    //End of locators list***


    //Start of Methods***

    /**
     * Provide postcode or address
     * @param {string} address 
     * @example searchDeliveryArea('8888')
     */
    searchDeliveryArea(address) {
        this.inputSearchAddress.click()
        this.inputSearchAddress.clearValue()
        this.inputSearchAddress.setValue(address)
        browser.keys('Enter')
    }

    /**
     * Clicks on accept cookies 'ok' button
     * @example clickAcceptCookies()
     */
    clickAcceptCookies() {
        if (this.btnAcceptCookies.isDisplayed()) {
            this.btnAcceptCookies.click()
        }

    }

    //End of Methods***
}

export default new LandingPage();