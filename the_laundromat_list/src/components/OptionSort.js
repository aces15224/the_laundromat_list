const optionSort = (options) =>{
    let optionArray = [];
    options.map((val)=>{
        console.log(val)
        let optionObject = {};
        // eslint-disable-next-line default-case
        switch(val){
            case "wifi":
                    optionObject.label = "Free Wifi";
                    optionObject.icon = wifiIcon
                    optionArray.push(optionObject)
                break;

            case "card":
                    optionObject.label = "Credit Accepted";
                    optionObject.icon = creditCardCheckOutline;
                    optionArray.push(optionObject)
                break;

            case "atm":
                    optionObject.label = "ATM";
                    optionObject.icon = atmIcon;
                    optionArray.push(optionObject)
                break;

            case "delivery":
                    optionObject.label = "Delivery Service";
                    optionObject.icon = truckFast;
                    optionArray.push(optionObject)
                break;

            case "dropOff":
                    optionObject.label = "Drop Off Service";
                    optionObject.icon = basketIcon;
                    optionArray.push(optionObject)
                break;

            case "dryCleaning":
                    optionObject.label = "Dry Cleaning Service";
                    optionObject.icon = tieIcon;
                    optionArray.push(optionObject)
                break;

            case "supplies":
                    optionObject.label = "Supplies";
                    optionObject.icon = sprayBottle;
                    optionArray.push(optionObject)
                break;

            case "Television":
                optionObject.label = "Television";
                optionObject.icon = televisionClassic;
                optionArray.push(optionObject)
                break;

            case "Arcade":
                    optionObject.label = "Arcade";
                    optionObject.icon = controllerClassicOutline;
                    optionArray.push(optionObject);
                break;    
            case "Toys":
                    optionObject.label = "Toys";
                    optionObject.icon = babyFaceOutline;
                    optionArray.push(optionObject);
                break;
            case "Magazines":
                    optionObject.label = "Magazines";
                    optionObject.icon = bookOpenPageVariant;
                    optionArray.push(optionObject);
                break;
            case "Coffee":
                    optionObject.label = "Coffee";
                    optionObject.icon = coffeeMaker;
                    optionArray.push(optionObject);
                break;
        }             
    })
    return optionArray;
}

module.exports = {optionSort};