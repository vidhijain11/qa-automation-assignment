import basePage from "./page"

/**
 * This page contains locators and method of order confirmation page. 
 */
class OrderConfirmation extends basePage {

    //Start of locators list***

    get txtOrderRefNum() { return $('span.order-purchaseid') }
    get txtTrackOrder() {return $('header=Track your order')}
    get btnAcceptOrder() {return $('button=Accept')}
    get txtThankYouMsg() {return $('h1=Thank you for your order!')}
    get imgTrackOrderMap() {return $('[aria-label=Map]')}

    /**
     * Locator for ordered dish name
     * @param {string} dishName 
     * @returns 
     */
    txtOrderedProductName(dishName) {
        return $(`//div[contains(text(),'${dishName}')]`)
    }

    /**
     * Locator for restaurant name
     * @param {string} restaurantName 
     * @returns 
     */
    txtRestaurantName(restaurantName) {
        return $(`//div[contains(text(),'${restaurantName}')]`)
    }

    /**
     * Locator for ordered dish quantity
     * @param {string} dishName 
     * @returns 
     */
    txtDishQuantity(dishName) {
        return $(`//div[contains(text(),'${dishName}')]//preceding-sibling::div[@class='product__main-amount']`)
    }

    //End of locators list***
}

export default new OrderConfirmation();