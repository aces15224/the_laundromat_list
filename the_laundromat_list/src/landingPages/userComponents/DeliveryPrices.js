import React, {useState, useEffect} from "react";
import PriceCard from "../userComponents/PriceCard";

const DeliveryPrices = ({prices})=>{
    console.log(prices)
    const [info, setInfo] = useState({
        deliveryPrices: {},
        pickUpFee: null,
        freePickUp: false,
        directions: null,
        minimum: null,
        sameDay: false,
        sameDayInfo: null,
        pickUpHours: null,
        deliveryHours: null
    })

    useEffect(()=>{
        //Reference to prop (prices)
        const priceList = prices;

        //Object to be assigned price values
        const deliveryPrices = {};

        //Variables used to set state
        let pickUpFee;
        let freePickUp;
        let directions;
        let minimum;
        let sameDay;
        let sameDayInfo;
        let pickUpHours;
        let deliveryHours;

        // Cycle over prop and assign values to corresponding variables
        for(let i in priceList){
            if(priceList[i] !== null){
                if(i.includes("Minimum")){
                    minimum = priceList[i];
                } else if(i.includes("AddInfo")){
                    directions = priceList[i];
                } else if(i.includes("pickUpFee")){
                    pickUpFee = priceList[i];
                } else if(i.includes("freePickUp")){
                    freePickUp = priceList[i];
                } else if(i.includes("Hours")){
                    //if i is related to hours, determine if delivery or pickup, and assign value to object
                    if(i.includes("delivery")){
                        deliveryHours = priceList[i];
                    } else{
                        pickUpHours = priceList[i];  
                    }
                } else if(i.includes("sameDayService")){
                    sameDay = priceList[i];
                } else if(i.includes("sameDayInfo")){
                    sameDayInfo = priceList[i];
                } else if(i === "deliveryPricePerLbs"){
                    deliveryPrices[`Laundry (Clothing) - One-Time Pickup`] = priceList[i]
                } else if(i === "deliveryPricePerLbsDiscounted"){
                    deliveryPrices[`Laundry (Clothing) - Weekly Pickup`] = priceList[i]
                } else if (i.includes("deliveryPrices")){
                    //split value and assign object a key/value 
                    const label = priceList[i].split("-");
                    deliveryPrices[label[0]] = label[1]
                }    
            }                
        }
        //set state with values
        setInfo({
            deliveryPrices,
            pickUpFee,
            freePickUp,
            directions,
            minimum,
            sameDay,
            sameDayInfo,
            pickUpHours,
            deliveryHours,
        })
    },[prices])
        
    //create array of keys and map over delivery prices...
    const priceList = Object.keys(info.deliveryPrices).map((price, index)=>{
        //return a card w/ label and price
        let _price = `${info.deliveryPrices[price]} ${price.includes("Pickup") ? "/lb" : "/ea"}`;
        return(
            <PriceCard item={price} price={_price}/>

            // <div className="card individual-price-card">
            //     <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
            //         <p className="cardText">{price}</p>
            //         {/* determine if cost is per lb or per item and append to price */}
            //         <p className="cardText">{`${info.deliveryPrices[price]} ${price.includes("Pickup") ? "/lb" : "/ea"}`}</p >
            //     </div>
            // </div>
        )
    })
    
    return(
        <>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2>Delivery Service</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    <p className="price-card-info">{info.directions}</p>
                </div>                        
            </div>
            <div className="row">
                <div className="col-12 text-center">
                    {/* if no free pick up, display price.  Otherwise, display "free pick up" */}
                    <h6>{info.freePickUp ? "Free Pick Up & Delivery" : (info.freePickUp && info.pickUpFee !== null) ? `Pick up charge: ${info.pickUpFee}`: "Please call about a pick up charge" }</h6>
                </div>                        
            </div>
            <div className="row  price-div">
                <div className="col-12 text-center">
                    {priceList}
                </div>                        
            </div>
            <div className="row ">
                <div className="offset-1 col-10 text-center">
                    <p className="_asterisks" style={{marginBottom: 5}}><span style={{color: "red"}}>**</span>Pick ups are made {info.pickUpHours}.</p>
                    <p className="_asterisks" style={{marginBottom: 5}}><span style={{color: "red"}}>**</span>Deliveries are made {info.deliveryHours}</p>
                </div>                        
            </div>
            
            {info.minimum !== undefined && 
                <div className="row">
                    <div className="offset-1 col-10 text-center">
                        <p className="_asterisks" style={{marginBottom: 5}}><span style={{color: "red"}}>**</span>Minimum of {info.minimum} per delivery</p>
                    </div>                        
                </div> 
            }
            {info.sameDay === true &&
                <div className="price-div">
                    <div className="row ">
                        <div className="col-12 text-center">
                            <h5><u>Same Day</u></h5>
                        </div>                        
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            {info.sameDayInfo ? info.sameDayInfo : "We offer same day service!  Please call for details!"}
                        </div>
                    </div>
                </div>
            }
            
        </>
    )
}
export default DeliveryPrices;