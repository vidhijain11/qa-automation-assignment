import basePage from "./page";

/**
 * This page contains locators of Restaurants list page.
 */
class RestaurantPage extends basePage {

    //Start of locators list***

    get btnDeliveryArea() { return $("//div[@class='topbar__title-container']//button") }
    get listOfRestaurants() { return $$('//div[contains(@id,"irestaurant") and @class="restaurant js-restaurant"]') }
    get lblTotalRestaurants() { return $('h1 > span.restaurant-amount') }
    get lblTotalRestaurantsCardFilter() { return $('div.card-filter > span.restaurant-amount') }
    get linkActiveCuisine() { return $('a[data-type="Cuisine"][class*="filter-label-selected"] > span') }
    get inputSearchRestaurant() { return $('input[placeholder="Search for restaurants"]') }

    /**
     * Locator for restaurant name.
     * @param {string} restaurantName 
     * @example linkRestaurantName('RealPizza Test')
     * @returns 
     */
    linkRestaurantName(restaurantName) {
        return $(`//*[@class='restaurantname']/a[text()='${restaurantName}']`);
    }

    /**
     * Locator for cuisine name.
     * @param {string} cuisineType
     * @example linkCuisineType('Sushi') 
     * @returns 
     */
    linkCuisineType(cuisineType) {
        return $(`//span[text()='${cuisineType}'][@class='swiper-slide__context']`);
    }

    //End of locators list***
}

export default new RestaurantPage();
