import React, {useState, useEffect} from "react";
import PriceList from "../userComponents/DefaultPriceList";

const DefaultPrices = (props)=>{
    const [priceControls, setPriceControls] = useState({priceList: {}, priceCategory: "laundry", buttons: false})

    //Deliver indicates whether delivery is offered
    const [deliver, setDeliver] = useState(false);

    useEffect(()=>{
        //Count tallies the number of Price Lists available
        let count = 0;

        //btnBool is t/f that indicates if buttons are displayed
        let btnBool = false;

        //Array of Price Labels
        let _categories = [];

        // Cycle over props and... 
        for(let i in props){
            if(i !== "deliver"){
                if(props[i] !== null ){
                    //for each price available, increment count, and push label to array 
                    _categories.push(i)
                    count++
                }    
            }      
        }
        //If there is only one price list available, do not display buttons, and instead display prices and label
        if(count >= 2){
            btnBool = true;    
        } 
        
        if(props.deliver){
            setDeliver(true)
        }
        // set pricelist / price category to the first price in the array
        setPriceControls({
            priceList: props[_categories[0]],
            priceCategory: _categories[0],
            buttons: btnBool   
        })
    },[props])

    //if the button boolean is set to true, call this function to display buttons
    const btnGenerator = ()=>{
        const tempProps = props;
        //For each price list, return a button w/ an onClick handler
        const _buttons = Object.keys(tempProps).map((key, index)=>{
            if(key !== "deliver"){
                //Label based on "Service"
                let label = key === "delivery" ? "Delivery Service" : key === "dropOff" ? "Drop Off Service" : key === "dryCleaning" ? "Dry Cleaning" : "Self-Service Laundry";
                //if not null, return button  
                if(tempProps[key]){
                    return(
                        <button id={key} className="price-btn btn btn-danger dashInput" style={{border: "1px solid white", textShadow: "1px 1px black"}} key={index} onClick={()=> btnHandler(key) }>{label}</button>
                    )   
                }    
            }  
        })
        return _buttons;   
    }

    //Price Button Functionality
    const btnHandler = (key)=>{
        // select prices to pass as props using key as index & change category to determine which price to display in PriceList.js
        setPriceControls((prevState)=>{
            return{
                priceList: props[key],
                priceCategory: key,
                buttons: prevState.buttons
            }
        })
    }
    return(        
        <div className="container-fluid default-page-wrapper" id="default-pricing">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center blueBGheader">Services/Prices</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-12 btn-div" >
                    <div className="btn-group" role="group" aria-label="Basic example">
                        {priceControls.buttons && btnGenerator()}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 offset-md-1 col-md-10">
                    <div className="card default-price-card">
                        <PriceList priceList = {priceControls.priceList} category = {priceControls.priceCategory} delivery = {deliver}/>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <hr style={{margin: "30px 0px", borderTop: "1px solid rgb(0 0 0 / 15%)"}}></hr>
                </div>
            </div>
        </div>       
    )
}

export default DefaultPrices;

