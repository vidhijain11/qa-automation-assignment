
import data from "../../testdata/dataSet"
import orderFood from '../core/orderFood.core'
import landing from "../../pages/landing.page"
import allureReporter from "@wdio/allure-reporter"


describe(`Scenario - Search Restaurant and place a order`, () => {

    before('Launching the Application', () => {
        allureReporter.addStep("Launching the Application")
        landing.open()
    })

    it(`Case:3 -Test user should able to select side dish and add extra quantity`, () => {
        allureReporter.addSeverity('normal')
        orderFood.execute(data.scenario_orderFood[2])
    })
})
