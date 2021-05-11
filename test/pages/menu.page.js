import basePage from "./page"

/**
 * This page contains locators and selectors of Restaurant's menu page. 
 */
class MenuPage extends basePage {

    //Start of locators list***

    get lblRestaurantName() { return $('//div[@class="restaurant-name"]/h1') }
    get btnDishPrice() { return $('.button_add_value > h3') }
    get linkActiveDishType() { return $('div.menu-category-list a[class*="slide-active"]') }
    get ddSelectSideDish() { return $('select[id*="isidedishpulldown"]') }
    get inputSelectedSideDish() { return $('input[id*="isidedishselectvalue"]') }
    get txtDishQuantity() { return $('.basketproductnr') }
    get btnAddSideDish() { return $('.button-add-sidedish') }
    get btnRemoveSideDish() { return $('.button-remove-sidedish') }

    /**
     * Locator for dish type.
     * @param {string} dishType 
     * @example linkDishType('Drinks')
     * @returns 
     */
    linkDishType(dishType) {
        return $(`//div[@class='swiper-wrapper']/a[text()='${dishType}']`)
    }

    /**
     * Locator for dish name.
     * @param {string} dishName 
     * @example linkDishName('Pizza Salami')
     * @returns 
     */
    linkDishName(dishName) {
        return $(`//span[@data-product-name='${dishName}']`)
    }

    /**
     * Locator for side dish drop down option. locate side dish by value.
     * @param {string} sideDishValue 
     * @returns 
     */
    ddoSideDishByValue(sideDishValue) {
        return $(`select[id*="isidedishpulldown"] > option[value*='${sideDishValue}']`)
    }

    /**
     * Locator for side dish drop down option. locate side dish by text. 
     * @param {string} sideDishName 
     * @returns 
     */
    ddoSideDishByText(sideDishName) {
        return $(`//select[contains(@id,"isidedishpulldown")]//option[text()='${sideDishName}']`)
    }

    //End of locators list***

    //Start of Methods***

    /**
     * Selects dish from menu.
     * @param {string} dishName
     * @example selectDish('Pizza Salami') 
     */
    selectDish(dishName) {
        this.linkDishName(dishName).click()

    }

    /**
     * Clicks on add price button.
     * @example clickExtraPrice() 
     */
    clickExtraPrice() {
        this.btnDishPrice.click()
    }

    /**
     * Select side dish from drop down
     * @param {string} sideDishName 
     */
    selectSideDish(sideDishName) {
        this.ddSelectSideDish.selectByVisibleText(sideDishName)
    }


    /**
     * Add or remove dish quantity.
     * @param {number} quantity 
     */

    addDishQuantity(quantity) {
        quantity = parseInt(quantity)
        let currentQuantity = parseInt(this.txtDishQuantity.getText())
        let QuantityToAdd;
        if (quantity > currentQuantity) {
            QuantityToAdd = quantity - currentQuantity;
            for (let i = 1; i <= QuantityToAdd; i++) {
                this.btnAddSideDish.click()
            }
        }
        if (quantity < currentQuantity) {
            QuantityToAdd = currentQuantity - quantity;
            for (let i = 1; i <= QuantityToAdd; i++) {
                this.btnRemoveSideDish.click()
            }
        }
    }
    //End of Methods***
}

export default new MenuPage();