import data from "../../testdata/dataSet"
import orderFood from '../core/orderFood.core'
import landing from "../../pages/landing.page"
import allureReporter from "@wdio/allure-reporter"


describe(`Scenario - Search Restaurant and place a order`, () => {

    before('Launching the Application', () => {
        allureReporter.addStep("Launching the Application")
        landing.open()
    })

    it(`Case:1 -On checkout page test user can pay with near by Price`, () => {
        allureReporter.addSeverity('critical')
        orderFood.execute(data.scenario_orderFood[0])
    })
})
