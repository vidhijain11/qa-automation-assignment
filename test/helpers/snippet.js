import landing from "../pages/landing.page"
import restaurant from "../pages/restaurant.page"
import menu from "../pages/menu.page"
import basket from "../pages/basket.co"
import data from "../testdata/dataSet"
import allureReporter from "@wdio/allure-reporter"

/**
 * This class contains functions to perform set of actions.
 * Every function has validation of expected output.
 */

class Snippet {

    /**
     * Accepts cookies. 
     * @example acceptCookies()
     */
    acceptCookies() {
        landing.clickAcceptCookies()
        allureReporter.addStep(`Validate accept cookies button not to be displayed after accepting cookies.`)
        expect(restaurant.btnAcceptCookies).not.toBeDisplayed()
    }

    /**
     * Search location using postcode and select delivery area from drop down list.
     * @param {object} address - has location, deliveryArea, top bar delivery area label.
     */
    searchAndSelectDeliveryArea(address) {
        landing.searchDeliveryArea(address.location)
        expect(landing.ddDeliveryArea(address.deliveryArea)).toBeDisplayed()

        landing.ddDeliveryArea(address.deliveryArea).click()

        allureReporter.addStep(`Validate delivery area label - ${address.lblDeliveryArea} displayed at top bar.`)
        expect(restaurant.btnDeliveryArea).toHaveText(address.lblDeliveryArea)
        expect(restaurant.lblTotalRestaurants).toBeDisplayed()

        allureReporter.addStep(`Number of Restaurants displayed: ${restaurant.lblTotalRestaurants.getText()}`)
        //validate Total number of restaurants to be greater than zero.
        expect(parseInt(restaurant.lblTotalRestaurants.getText())).toBeGreaterThan(0)
        //validate label Total number of restaurants = total number of restaurants displayed on web page.
        expect(restaurant.listOfRestaurants).toBeElementsArrayOfSize(parseInt(restaurant.lblTotalRestaurants.getText()))
        expect(restaurant.lblTotalRestaurants).toHaveText(restaurant.lblTotalRestaurantsCardFilter.getText())
        //validate default cuisine type selected as 'All'.
        expect(restaurant.linkActiveCuisine).toHaveText(data.cuisine.all)
    }

    /**
     * Search restaurant name in search bar and select restaurant.
     * @param {string} restaurantName
     * @example  searchAndSelectRestaurant('RealPizza Test')
     */
    searchAndSelectRestaurant(restaurantName) {
        restaurant.inputSearchRestaurant.setValue(restaurantName)
        expect(restaurant.linkRestaurantName(restaurantName)).toBeClickable()

        restaurant.linkRestaurantName(restaurantName).click()
        //validate restaurant name is displayed on menu page.
        expect(menu.lblRestaurantName).toHaveText(restaurantName)
    }

    /**
     * Add dish to the basket.
     * @param {object} dish - has dish name, price
     */
    addDishToBasket(dish) {

        expect(menu.linkDishName(dish.name)).toBeDisplayed()
        menu.selectDish(dish.name)

        if (dish.extra != undefined) {
            if (dish.extra.sideDishName != undefined) {
                expect(menu.ddSelectSideDish).toBeDisplayed()
                expect(menu.ddoSideDishByText(dish.extra.sideDishName)).toBeExisting()

                allureReporter.addStep(`Select side dish - ${dish.extra.sideDishName}`)
                menu.selectSideDish(dish.extra.sideDishName)
                //validate selected side dish name
                expect(menu.getSelectedSideDish()).toEqual(dish.extra.sideDishName)

                allureReporter.addStep(`Add dish quantity - ${dish.extra.quantity}`)
                menu.addDishQuantity(dish.extra.quantity)
                expect(menu.txtDishQuantity).toHaveText(dish.extra.quantity)
            }
            expect(menu.btnDishPrice).toHaveTextContaining(dish.price)
            menu.clickExtraPrice()
        }

        allureReporter.addStep(`Validate dish name and price in basket`)
        expect(basket.txtDishPrice(dish.name)).toBeDisplayed()
        expect(basket.txtDishPrice(dish.name)).toHaveText(dish.price)

        if (dish.discountPrice != undefined) {
            allureReporter.addStep(`Validate dish discount price in basket`)
            expect(basket.txtDiscountPrice(dish.name)).toBeDisplayed()
            expect(basket.txtDiscountPrice(dish.name)).toHaveText(dish.discountPrice)
        }

        allureReporter.addStep(`Validate dish quantity in basket`)
        if (dish.extra?.quantity != undefined) {
            expect(basket.txtDishQuantity(dish.name)).toHaveText(dish.extra.quantity + "x")
        }
        else expect(basket.txtDishQuantity(dish.name)).toHaveText("1x")
    }
}

export default new Snippet();