import landing from "../../pages/landing.page"
import allureReporter from "@wdio/allure-reporter"


describe(`Scenario - Visual Test for Landing Page`, () => {

    before('Launching the Application', () => {
        allureReporter.addStep("Launching the Application")
        landing.open()
    })

    it(`Testing Landing Page UI`, () => {
        allureReporter.addSeverity('normal')
        expect(landing.txtTitle).toBeDisplayed()
        expect(landing.imgTopBar.checkImage('imgTopBar')).toBeTruthy()
        expect(landing.imgTopHeader.checkImage('imgTopHeader')).toBeTruthy()
    })
})