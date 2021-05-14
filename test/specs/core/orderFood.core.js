
import basket from "../../pages/basket.co"
import landing from "../../pages/landing.page"
import checkout from "../../pages/checkout.page"
import orderConfirm from "../../pages/orderConfirm.page"
import snippet from "../../helpers/snippet"
import data from "../../testdata/dataSet"
import allureReporter from "@wdio/allure-reporter"

class OrderFood {

    /**
     * End to end script to order food.
     * 1) Accept cookie 2) Search delivery area 3) Select restaurant 4) Add a dish to basket 5) Select default delivery time 
     * 6) Select pay with option by index 6) Order food 7) validate reference number is generated
     * @param {object} dataOrderFood 
     */
    execute(dataOrderFood) {

        expect(landing.txtTitle).toBeDisplayed()
        allureReporter.addStep("Accept the Cookie")
        snippet.acceptCookies()


        allureReporter.addStep(`Search location using pin code - ${data.searchByAddress[1].location} and select the delivery Area ${data.searchByAddress[1].deliveryArea}`)
        snippet.searchAndSelectDeliveryArea(data.searchByAddress[1])


        allureReporter.addStep(`Search restaurant - ${dataOrderFood.restaurantName} and select it`)
        snippet.searchAndSelectRestaurant(dataOrderFood.restaurantName)

        allureReporter.addStep(`Validate Order button is disabled`)
        expect(basket.btnOrder).toHaveAttrContaining('class','btn-disabled')

        allureReporter.addStep(`Add dish - ${dataOrderFood.dish.name} to basket. Validate subtotal, delivery and total cost of dish`)
        snippet.addDishToBasket(dataOrderFood.dish)
        expect(basket.lblSubtotal).toHaveText(dataOrderFood.cost.subTotal)
        expect(basket.lblDeliveryCost).toHaveText(dataOrderFood.cost.delivery)
        expect(basket.lblTotalCost).toHaveText(dataOrderFood.cost.total)
        expect(basket.btnOrder).toBeClickable()


        allureReporter.addStep(`Fill delivery details and user information. Validate default delivery time and paysWith option`)
        basket.clickOrder()
        checkout.fillAddressForm(data.deliveryAddress[1], data.user[1])
        expect(checkout.getSelectedDeliveryTime()).toEqual(data.deliveryTime.defaultText)

        allureReporter.addStep(`Validate first available delivery time is - ${checkout.getClosestDeliveryTime()} `)
        expect(checkout.txtDeliveryTime(2)).toHaveText(checkout.getClosestDeliveryTime())

        expect(checkout.getSelectedPaysWith()).toEqual(`Exact amount: ${dataOrderFood.cost.total}`)

        if (dataOrderFood.cost.paysWith?.priceIndex != undefined) {
            allureReporter.addStep(`Select pays with drop down option ${dataOrderFood.cost.paysWith.priceIndex}`)
            checkout.selectPayWithByIndex(dataOrderFood.cost.paysWith.priceIndex)
            expect(checkout.getSelectedPaysWith()).toEqual(dataOrderFood.cost.paysWith.optionText)
        }


        allureReporter.addStep('Validate default payment mode - Cash payment is selected')
        expect(checkout.selectedPaymentMode).toHaveText(data.paymentMode.defaultMode)


        allureReporter.addStep('Click on order and pay button to place the Order')
        expect(checkout.btnOrderAndPay).toBeClickable()
        checkout.clickOrderAndPay()


        allureReporter.addStep(`Validate restaurant name - ${dataOrderFood.restaurantName}  , on order confirmation page`)
        expect(orderConfirm.txtRestaurantName(dataOrderFood.restaurantName)).toBeDisplayed()


        allureReporter.addStep(`Validate dish name - ${dataOrderFood.dish.name} , on order confirmation page`)
        expect(orderConfirm.txtOrderedProductName(dataOrderFood.dish.name)).toBeDisplayed()


        allureReporter.addStep('Validate dish quantity on order confirmation page')

        if (dataOrderFood.dish.extra?.quantity != undefined) {
            expect(orderConfirm.txtDishQuantity(dataOrderFood.dish.name)).toHaveText(dataOrderFood.dish.extra.quantity)
        }
        else
            expect(orderConfirm.txtDishQuantity(dataOrderFood.dish.name)).toHaveText('1')

        allureReporter.addStep('Validate reference number is generated and get the reference number')
        expect(orderConfirm.txtOrderRefNum).toBeDisplayed()
        expect(orderConfirm.txtOrderRefNum.getText()).toHaveLength(6)
        allureReporter.addStep(`Reference number is - ${orderConfirm.txtOrderRefNum.getText()}`)

        allureReporter.addStep('Validate track order is displayed')
        expect(orderConfirm.txtTrackOrder).toBeDisplayed()
        expect(orderConfirm.btnAcceptOrder).toBeClickable()
        expect(orderConfirm.imgTrackOrderMap).toBeDisplayed()
        expect(orderConfirm.txtThankYouMsg).toBeDisplayed()
    }
}
export default new OrderFood();
