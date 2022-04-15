import React, { useState, useEffect } from "react";
// import icons// 
import { Icon } from '@iconify/react';
import atmIcon from '@iconify-icons/mdi/atm';
import sprayBottle from '@iconify-icons/mdi/spray-bottle';
import televisionClassic from '@iconify-icons/mdi/television-classic';
import controllerClassicOutline from '@iconify-icons/mdi/controller-classic-outline';
import creditCardCheckOutline from '@iconify-icons/mdi/credit-card-check-outline';
import truckFast from '@iconify-icons/mdi/truck-fast';
import basketIcon from '@iconify-icons/mdi/basket';
import wifiIcon from '@iconify-icons/mdi/wifi';
import tieIcon from '@iconify-icons/mdi/tie';
import babyFaceOutline from '@iconify-icons/mdi/baby-face-outline';
import bookOpenPageVariant from '@iconify-icons/mdi/book-open-page-variant';
import coffeeMaker from '@iconify-icons/mdi/coffee-maker';

const Highlights = ({options})=>{
    const [optionArray, setOptionArray] = useState(options);
    //The following are indexes used to slice parts of an array.
    //We slice 5 items at a time. Inital indexes are (0,5) and increment by 5 when button is clicked
    const [startIndex, setStartIndex] = useState(0);
    const [endIndex, setEndIndex] = useState(5);

    useEffect(()=>{
        //send option array to switchsort to create obj, label, and icon for each option..
        const optionObjects = switchSort(options);
        // then set state with those options
        setOptionArray(optionObjects);
    },[options])

  
    //Button Functionality (Increases start and end indexes)
    const clickManager = (pos)=>{
        // if clicking back, reduce indexes by 5 and set state
        if(pos === "back"){
            if(startIndex !== 0){
                setStartIndex((prevState)=>{
                    return prevState - 1
                });
                setEndIndex((prevState)=>{
                    return prevState - 1
                }); 
            }
        } else if(pos === "forward"){
            //if clicking forward, and if user is not at end of array, increase indexes by 5 and set state
            if(endIndex < optionArray.length){
                setStartIndex((prevState)=>{
                    return prevState + 1
                });
                setEndIndex((prevState)=>{
                    return prevState + 1
                }); 
            }
        }         
    }
    //Slice option array using start and end indexes and display available options....
    const optionArraySlice = [...optionArray].slice(startIndex, endIndex)

    // Sort option array & add label/icon
    const switchSort = (options) =>{
        let optionArray = [];
        options.forEach((val)=>{
            // add each option to Object, add label, add icon, and push to Array...
            let optionObject = {};
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
                case "Vending Machine":
                        optionObject.label = "Vending Machine";
                        optionObject.icon = "mdi:cup-water";
                        optionArray.push(optionObject);
                    break;
                default:
                    optionObject.label = "You do not currently list any amenities";
                    optionObject.icon = "mdi:pencil-outline";
                    optionArray.push(optionObject);
                    break;
            }             
        })
        //return option array for the next step 
        return optionArray;
    }

    // map over sliced array and return a card for display
    const optionCards = optionArraySlice.map((val => {            
        return (
            <div className="card">
                <div className="card-body option-body">
                    <Icon className = "card-img-top option-icon" icon={val.icon} />
                    <p className="card-title option-title">{val.label}</p>
                </div>
            </div>
        )
    }))
    
    return (
        <div className="card-group dashInput">
            <button className="btn btn-success highlight-btn" onClick={(e)=>clickManager("back")}><span className="highlight-arrow">&lt;&lt;</span></button>
                {optionCards}
            <button className="btn btn-success highlight-btn" onClick={(e)=>clickManager("forward")}><span className="highlight-arrow">&gt;&gt;</span></button>
        </div>

    )
}

export default Highlights;