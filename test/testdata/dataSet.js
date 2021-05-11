import dataProvider from '../testdata/dataProvider'

class DataSet extends dataProvider {

    get scenario_orderFood() {
        return [
            {
                testName: "PaysWith value as - Near by Price",
                dish: this.dish[1],
                cost: this.cost[1],
                restaurantName: this.restaurant.name1

            },
            {
                testName: "PaysWith value as - Default Price",
                dish: this.dish[2],
                cost: this.cost[2],
                restaurantName: this.restaurant.name1
            },
            {
                testName: "select side dish and add extra quantity",
                dish: this.dish[3],
                cost: this.cost[3],
                restaurantName: this.restaurant.name1
            }
        ]
    }

}

export default new DataSet()

