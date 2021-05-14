import basePage from "./page"

/**
 * This page contains locators and method of checkout page. 
 * Fill delivery address, user details,  select delivery time and pay with option.
 */

class CheckOut extends basePage {

    //Start of locators list***

    get ddPayWithLocator() { return '#ipayswith'}
    get ddDeliveryTimeLocator() { return '#ideliverytime'}

    get inputAddress() { return $('#iaddress') }
    get inputPostcode() { return $('#ipostcode') }
    get inputCity() { return $('#itown') }
    get inputName() { return $('#isurname') }
    get inputPhoneNumber() { return $('#iphonenumber') }
    get inputEmail() { return $('#iemail') }
    get ddDeliveryTime() { return $(this.ddDeliveryTimeLocator) }
    get ddPayWith() { return $(this.ddPayWithLocator) }
    get btnOrderAndPay() { return $('input[value="Order and pay"]') }
    get selectedPaymentMode() { return $('div[class*="paymentbuttonchecked"] .radiobutton_form_label') }

    /**
     * Locator for delivery time for a given index.
     * @param {number} index 
     * @returns 
     */
    txtDeliveryTime(index){
        return $(`${this.ddDeliveryTimeLocator} option:nth-child(${index})`)
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

    /**
     * Get selected paysWith drop down option visible text
     * @returns 
     */
    getSelectedPaysWith(){
        return this.getTextSelectedDropDownOption(this.ddPayWithLocator)
    }

    /**
     * Get selected delivery time drop down option visible text
     * @returns 
     */
    getSelectedDeliveryTime(){
        return this.getTextSelectedDropDownOption(this.ddDeliveryTimeLocator)
    }

    /**
     * Select delivery time option from drop down by visible text
     * @param {string} text 
     * @returns 
     */
    selectDeliveryTime(text) {
        return this.ddDeliveryTime.selectByVisibleText(text)
    }

     /**
     * Get first available delivery time.
     */
      getClosestDeliveryTime() {
        let todayDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Amsterdam" })

        let hours = new Date(todayDate).getHours()
        let minutes = new Date(todayDate).getMinutes()
        let timeStr = '';

        if (minutes >= 8 && minutes <= 22) {
            timeStr = this.getDeliveryTimeHours(hours) + ':00';
        } else if (minutes >= 23 && minutes <= 37) {
            timeStr = this.getDeliveryTimeHours(hours) + ':15';
        } else if (minutes >= 38 && minutes <= 52) {
            timeStr = this.getDeliveryTimeHours(hours) + ':30';
        } else if (minutes >= 53 && minutes <= 59) {
            timeStr = this.getDeliveryTimeHours(hours) + ':45';
        } else if ((minutes <= 7 && minutes >= 0)) {
            if (hours >= 0 && hours <= 9) {
                hours = '0' + hours.toString();
            } else hours.toString()
            timeStr = hours + ':45';
        }
        return timeStr;
    }

    /**
     * To get hours of first delivery time option. 
     * @param {number} hours 
     * @returns {string} hours 
     */
    getDeliveryTimeHours(hours) {
        if (hours == 23) {
            return '00'
        } else if (hours <= 8 && hours >= 0) {
            return '0' + (hours + 1).toString()
        } else {
            return (hours + 1).toString();
        }
    }

    /**
     * Get list of available delivery time options.
     * @returns {Array} deliveryTime
     */
    getListDeliveryTime(){
        let deliveryTimeArr = new Array();
        let timeStr = getClosestDeliveryTime();
        deliveryTimeArr.push(dataSet.deliveryTime.defaultText)
        deliveryTimeArr.push(timeStr)
         for(let i=0; i<15; i++){
             let hours = parseInt(timeStr.split(':')[0])
             let minutes = parseInt(timeStr.split(':')[1])
             if(minutes==0 || minutes==15 || minutes==30){
                 minutes = minutes +15;
                 time =  timeStr.split(':')[0] + ':' + minutes.toString();
             } else if (minutes==45){
                 time = getDeliveryTimeHours(hours) + ':00'
             }
             timeStr = time;
             deliveryTimeArr.push(time)
         }
         return deliveryTimeArr;
     }
     
    //End of methods***
}

export default new CheckOut();