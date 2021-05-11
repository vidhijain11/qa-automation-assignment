import basePage from "./page"

/**
 * This page contains locators and methods of basket side panel.
 */
class BasketComponent extends basePage {

    //Start of locators list***

    get lblSubtotal() { return $('//div[@id="sum"]//span[text()="Sub-total"]/following-sibling::span') }
    get lblDeliveryCost() { return $('//div[@id="sum"]//span[text()="Delivery costs"]/following-sibling::span') }
    get lblTotalCost() { return $('//div[@id="sum"]//span[text()="Total"]/following-sibling::span') }
    get btnOrder() { return $('//button[contains(text(),"Order")]') }

    /**
     * Locator for dish price for given dish name.
     * @param {string} dishName
     * @example txtDishPrice('Pizza Salami') 
     * @returns 
     */
    txtDishPrice(dishName) {
        return $(`//div[@id='products']//span[text()= '${dishName}']/../span[@class='cart-meal-price notranslate']`)
    }

    /**
     * Locator for discount price for given dish name.
     * @param {string} dishName
     * @example txtDiscountPrice('Pizza Salami')
     * @returns 
     */
    txtDiscountPrice(dishName) {
        return $(`//div[@id='discounts']//child::span[contains(text(),'${dishName}')]//following-sibling::span[@class='cart-meal-price']`)
    }

    /**
     * Locator for dish quantity added in basket.
     * @param {string} dishName 
     * @returns 
     */
    txtDishQuantity(dishName) {
        return $(`//div[@id='products']//span[text()= '${dishName}']//preceding-sibling::span[contains(@class,'cart-meal-amount')]`)
    }

    //End of locators list***

    //Start of methods***

    /**
     * Clicks on Order button.
     * @example clickOrder()
     */
    clickOrder() {
        this.btnOrder.click()
    }

    //End of methods***
}

export default new BasketComponent();