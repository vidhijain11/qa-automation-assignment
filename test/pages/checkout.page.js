import basePage from "./page"

/**
 * This page contains locators and method of checkout page. 
 * Fill delivery address, user details,  select delivery time and pay with option.
 */
class CheckOut extends basePage {

    //Start of locators list***

    get inputAddress() { return $('#iaddress') }
    get inputPostcode() { return $('#ipostcode') }
    get inputCity() { return $('#itown') }
    get inputName() { return $('#isurname') }
    get inputPhoneNumber() { return $('#iphonenumber') }
    get inputEmail() { return $('#iemail') }
    get ddDeliveryTime() { return $('#ideliverytime') }
    get ddPayWith() { return $('#ipayswith') }
    get btnOrderAndPay() { return $('input[value="Order and pay"]') }
    get selectedPaymentMode() { return $('div[class*="paymentbuttonchecked"] .radiobutton_form_label') }

    txtDeliveryTime(value) {
        return $(`//select[@id="ideliverytime"]/option[@value="${value}"]`)
    }

    txtPaysWith(value) {
        return $(`//select[@id="ipayswith"]/option[@value="${value}"]`)
    }

    txtPaysWithByIndex(priceIndex) {
        return $(`//select[@id="ipayswith"]/option[${priceIndex}]`)
    }

    //End of locators list***

    //Start of methods***

    /**
     * Enters delivery address details - street, postcode, city.
     * Enters user details - name, email, phone number.
     * @param {object} address 
     * @param {object} user 
     */
    fillAddressForm(address, user) {
        this.inputAddress.setValue(address.street)
        this.inputPostcode.setValue(address.postCode)
        this.inputCity.setValue(address.city)
        this.inputName.setValue(user.name)
        this.inputEmail.setValue(user.email)
        this.inputPhoneNumber.setValue(user.phoneNumber)
    }

    /**
     * Selects pay with option using index.
     * @param {number} index - index of drop down option
     * @example selectPayWithByIndex(2) - selects 2nd option from drop down
     */
    selectPayWithByIndex(index) {
        this.ddPayWith.selectByIndex(index)
    }

    /**
     * Clicks on order and pay button
     */
    clickOrderAndPay() {
        this.btnOrderAndPay.click()
    }

    //End of methods***
}

export default new CheckOut();