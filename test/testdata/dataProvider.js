export default class DataProvider {

    get txtCookie() {
        return "We use cookies and other techniques to improve and personalise your experience and ads together with third parties. Manage preferences"
    }

    get searchByAddress() {
        return {
            1: {
                location: "8888",
                deliveryArea: "8888 Alpha",
                lblDeliveryArea: "8888-alpha"
            }
        }
    }

    get deliveryAddress() {
        return {
            1: {
                street: "main street 2415",
                postCode: "8888AA",
                city: "Enschede"
            }
        }
    }


    get user() {
        return {
            1: {
                name: "TestUSer",
                phoneNumber: "1234567890",
                email: "testuser@test.test"
            }

        }
    }

    get restaurant() {
        return {
            name1: "RealPizza Test"
        }
    }

    get cuisine() {
        return {
            all: "All",
            sushi: "Sushi"
        }
    }

    get dish() {
        return {
            1: {
                name: "Pizza Salami",
                extra: {},
                price: "€ 6,00",
                discountPrice: "-€ 0,60"
            },
            2: {
                name: "Coca-Cola",
                price: "€ 2,00"
            },

            3: {
                name: "Pizza Margherita",
                extra: {
                    sideDishName: "Onion",
                    quantity: "2"
                },
                price: "€ 10,00",
                discountPrice: "-€ 1,00"

            }
        }
    }

    get cost() {
        return {
            1: {
                subTotal: "€ 5,40",
                delivery: "Free",
                total: "€ 5,40",
                paysWith: {
                    optionText: "€ 5,50",
                    priceIndex: 1  //closest price
                }
            },
            2: {
                subTotal: "€ 2,00",
                delivery: "Free",
                total: "€ 2,00"
            },
            3: {
                subTotal: "€ 9,00",
                delivery: "Free",
                total: "€ 9,00",
                paysWith: {
                    optionText: "€ 20,00",
                    priceIndex: 2
                }
            }
        }
    }

    get deliveryTime() {
        return {
            defaultText: "As soon as possible"
        }
    }

    get paymentMode() {
        return {
            defaultMode: "Cash payment"
        }
    }

}
