import React, {useState, useEffect} from "react";
import LaundryPrices from "../landingPages/userComponents/LaundryPrices"
import DeliveryPrices from "../landingPages/userComponents/DeliveryPrices"
import DryCleaningPrices from "../landingPages/userComponents/DryCleaningPrices"
import DropOffPrices from "../landingPages/userComponents/DropOffPrices"

const DefaultPriceList = ({priceList, category})=>{
    //priceList is a complete list of prices
    //category is the name of the link the user has clicked on
    const [info, setInfo] = useState({
        prices:{},
        category: category
    })

    useEffect(()=>{
        const stateObject = {};
        for(let i in priceList){
            // cycle through priceList and filter out values listed immediately below:
            if(priceList[i] !== null && i !== "createdAt" && i !== "id" && i !== "updatedAt" && i !== "EstablishmentBusinessName"){
                //assign remaining values to stateobj
                stateObject[i] = priceList[i];
            }
        }
        setInfo({
            prices: stateObject,
            category: category
        })
    },[priceList, category])

    const prices = info.prices;
    const priceCategory = info.category;

    return(
        // Render specific component based on link the user has clicked.  Pass in prices as props.
        <>
            {priceCategory === "laundry" ? <LaundryPrices prices = {prices}/> : 
            priceCategory === "delivery" ? <DeliveryPrices prices = {prices}/> :
            priceCategory === "dropOff" ? <DropOffPrices prices = {prices}/> :
            <DryCleaningPrices prices = {prices}/> }
        </>
    )

}

export default DefaultPriceList;