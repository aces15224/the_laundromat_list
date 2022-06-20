import React, {useState, useEffect} from "react";
import LaundryPrices from "./LaundryPrices"
import DeliveryPrices from "./DeliveryPrices"
import DryCleaningPrices from "./DryCleaningPrices"
import DropOffPrices from "./DropOffPrices"

const DefaultPriceList = ({priceList, category, delivery})=>{
    const [info, setInfo] = useState({
        prices:{},
        category: category
    })

    useEffect(()=>{
        const stateObject = {}; 
        // Cycle through props and assign all price related values to stateobj
        for(let i in priceList){
            console.log(i)
            console.log(priceList[i])
            if(priceList[i] !== null && i !== "createdAt" && i !== "id" && i !== "updatedAt" && i !== "EstablishmentBusinessName"){
                stateObject[i] = priceList[i];
            }
        }
        //setstate w/ stateobj and props.category
        setInfo({
            prices: stateObject,
            category: category
        })
 
    },[priceList, category])
    console.log(category)
    //Prices to pass as props
    const prices = info.prices;

    //category determines which price list to render
    const priceCategory = info.category;

    return(
        <>
            {priceCategory === "laundry" ? <LaundryPrices prices = {prices}/> : 
            priceCategory === "delivery" ? <DeliveryPrices prices = {prices}/> :
            priceCategory === "dropOff" ? <DropOffPrices prices = {prices}/> :
            <DryCleaningPrices prices = {prices} deliver={delivery}/> }
        </>
    )

}

export default DefaultPriceList;
