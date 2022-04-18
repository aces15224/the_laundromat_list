import React, {useEffect, useState} from "react";

const LaundryPrices = ({prices})=>{
    const [priceList, setPriceList] = useState({
        washPrices:{},
        dryPrices:{}
    })

    useEffect(()=>{
        const washer = {};
        const dryer = {}; 
        // cycle through prices and sort data between washer and dryer prices
        for(let i in prices){
            if(prices[i] !== null){
                if(i.includes("washer")){
                    //Capture Size of Washer ("single, double, etc.") and create label
                    const label = i.split(/r/)[1]
                    // eslint-disable-next-line default-case
                    switch(label){
                        //assign key/values to washer object
                        case "Single":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Double":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Triple":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Four":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Five":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Six":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Seven":
                            washer[`${label} Load`] = prices[i];
                            break;
                        case "Eight":
                            washer[`${label} Load`] = prices[i];
                            break;
                    }
                } else if(i.includes("dryer")){
                    //Capture Dryer Rate ("1,2, etc.") and create label
                    const label = i.split(/dryerRate/)[1]
                    // eslint-disable-next-line default-case
                    switch(label){
                        //assign key/values to washer object
                        case "1":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "2":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "3":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "4":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "5":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "6":
                            dryer[`${label}X`] = prices[i];
                            break;
                        case "7":
                            dryer[`${label}X`] = prices[i];
                            break;
                    }
                }    
            }
        }
        setPriceList({
            washPrices: washer,
            dryPrices: dryer

        })
    },[prices])
   
    //create reference to washer/dryer objects
    const washPrices = priceList.washPrices;
    const dryPrices = priceList.dryPrices;
    
    //Create array of keys for washer and map over them...
    const wash = Object.keys(washPrices).map((price, index)=>{
        // return a card w/ label (washer size) and price per wash
        return(
            <div className="card individual-price-card">
                <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                    <p className="cardText">{`${price} Washers`}</p>
                    <p className="cardText">{`${washPrices[price]}/wash`}</p >
                </div>
            </div>
        )
    })

    //Create array of keys for dryer and map over them...
    const dry = Object.keys(dryPrices).map((price, index)=>{
        // return a card w/ label (dryer size) and price per 5 minutes
        return(
            <div className="card individual-price-card">
                <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                    <p className="cardText">{`${price} Dryers`}</p>
                    <p className="cardText">{`${dryPrices[price]}/5 Minutes`}</p >
                </div>
            </div>
        )
    })
    
    return(
        <>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2>{"Self-Service Laundry"}</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <p className="price-card-info">{prices.laundryAddInfo}</p>
                </div> 
            </div>
            <div className="row price-div">
                <div className="col-12 col-sm-12 col-md-6 wash_col">
                    {wash}
                </div>
                <div className="col-12 col-sm-12 col-md-6 dry_col">
                    {dry}
                </div>
            </div>
        </>
        
    )
}
export default LaundryPrices;