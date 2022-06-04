import React, {useState, useEffect} from "react";
import DeliveryHoursInfo from "../components/DeliveryInfoHours";
import Deleter from "./DashboardDeleter";


const DashboardDelivery = ({delivery, name, update, verify, claimed})=>{
    const liStyle = { width: "100%" };
    const [tableExists, setTableExists] = useState(false)
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [edit3, setEdit3] = useState(false);
    const [deliveryAddInfo, setDeliveryAddInfo] = useState(null);
    const [deliveryAddInfo2, setDeliveryAddInfo2] = useState(null);
    const [sameDayInfo, setSameDayInfo] = useState(null);
    const week = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [size, setSize] = useState();
    //Change inputs based on size of window//
    const inputAnswer = (window.innerWidth >= 991 && window.innerWidth <= 1190) || window.innerWidth <= 412 ? "Yes/No" : "Select Answer";
    const inputMinimum = (window.innerWidth >= 991 && window.innerWidth <= 1190) || window.innerWidth <= 412 ? "Minimum" : "Insert Minimum";
    //
    const [freePickUp, setFreePickUp] = useState(false);
    const [pickUpFee, setPickUpFee] = useState(null);
    const [pickUpMinimum, setPickUpMinimum] = useState(null);
    const [deliveryPricePerLbs, setDeliveryPricePerLbs] = useState(null);
    const [deliveryPricePerLbsDiscounted, setDeliveryPricePerLbsDiscounted] = useState(null);   

    const [deliveryInfo, setDeliveryInfo] = useState({
        // available: false,
        deliveryPricePerLbs: null,
        deliveryPricePerLbsDiscounted: null,
        prices:{
            deliveryPrices1: null,
            deliveryPrices2: null,
            deliveryPrices3: null,
            deliveryPrices4: null,
            deliveryPrices5: null,
            deliveryPrices6: null,
            deliveryPrices7: null,
            deliveryPrices8: null,
            deliveryPrices9: null,
            deliveryPrices10: null,
            deliveryPrices11: null,
            deliveryPrices12: null
        },
        freePickUp: false,
        pickUpFee: null,
        pickUpHours: [],
        deliveryHours: [],
        pickUpMinimum: null,
        sameDayService: false
    })
 
    const servicePrices = deliveryInfo.prices;

    useEffect(()=>{ 
        window.addEventListener("resize", windowSize);
        //set size to manage to control width of children components
        setSize(window.innerWidth); 
        //send prop to listMaker to create list of prices
        listMaker(delivery)  
        return ()=>{
            window.removeEventListener("resize", windowSize)
        }
    },[delivery])

    const listMaker = (obj)=>{
        //if prices exist...
        if(obj !== null){
            const deliveryPrices = {};
            const stateObj = {};
            // cycle through obj and sort data...
            for(let i in obj){
                if(i !== "createdAt" && i !== "id" && i !== "updatedAt" && i !== "EstablishmentBusinessName" && !i.includes("Info")){
                    if(i.includes("deliveryPrices")){
                        //add prices
                        deliveryPrices[i] = obj[i];
                    } else if(i === "deliveryHours"){
                        //add hours if they exist...
                        let tempArray = [];
                        if(obj[i] !== null){
                            // if list has more than one day, split and push individual days into temp array
                            let day = obj[i].split(",");
                            for(let j = 0; j < day.length; j++){
                                tempArray.push(day[j].trim())
                            }    
                        }
                        //add to stateobj
                        stateObj[i] = tempArray;
                    } else if(i === "pickUpHours"){
                        //add hours if they exist...
                        let tempArray = [];
                        if(obj[i] !== null){
                            // if list has more than one day, split and push individual days into temp array
                            let day = obj[i].split(",");
                            for(let j = 0; j < day.length; j++){
                                tempArray.push(day[j].trim())
                            }    
                        }
                        //add to stateobj
                        stateObj[i] = tempArray;

                    } else{
                        //add remaining data to stateobj
                        stateObj[i] = obj[i]
                    }
                }  
            }
            
            stateObj.prices = deliveryPrices;
            // stateObj.available = true;
            //set state
            setDeliveryInfo(stateObj);
            setDeliveryAddInfo(obj.deliveryAddInfo);
            setDeliveryAddInfo2(obj.deliveryAddInfo2);
            setSameDayInfo(obj.sameDayInfo);
            //set tableExists to true to indicate price list exists
            setTableExists(true);
        }; 
    }

    //converts number to floating number (EX. 2.50)
    const priceConversion = (e)=>{
        const newVal = parseFloat(e.target.value).toFixed(2);
        e.target.value = newVal;
    }

    const submitHandler = ()=>{
        const prev = deliveryInfo;
        const data = Object.assign({}, deliveryInfo);
        data.freePickUp = freePickUp === "Select Answer" ? prev.freePickUp : freePickUp !== prev.freePickUp ? freePickUp : prev.freePickUP;
        data.pickUpFee = pickUpFee === null ? prev.pickUpFee : `$${pickUpFee}`;
        data.pickUpMinimum = pickUpMinimum === null ? prev.pickUpMinimum : `${pickUpMinimum} lbs.`;;
        data.deliveryPricePerLbs = deliveryPricePerLbs === null ? prev.deliveryPricePerLbs : `$${deliveryPricePerLbs}`;
        data.deliveryPricePerLbsDiscounted = deliveryPricePerLbsDiscounted === null ? prev.deliveryPricePerLbsDiscounted : `$${deliveryPricePerLbsDiscounted}`;
        data.deliveryAddInfo = deliveryAddInfo; 
        data.deliveryAddInfo2 = deliveryAddInfo2;        
        data.sameDayInfo = sameDayInfo;        
        postData(data);
    }
    
    const updatePrices = (e, title, action)=>{
        e.preventDefault();
        if(action !== "remove"){
            // if adding a value
            //capture input values and create string to assign to object
            const label = document.getElementById("serviceItem").value;
            const price = document.getElementById("servicePrice").value;
            const dataString = `${label}-$${price}`;
            //update indicates when to switch from updating deliveryPrices to updating other values in state...
            let updated = false;
            const priceObj = {};
            const stateObj = {};
            // cycle through state and....
            for(let i in deliveryInfo){
                if(i === "prices"){
                    //if prices create copy of object and cycle through it....
                    const priceList = deliveryInfo.prices;
                    for(let j in priceList){
                        if(priceList[j] !== dataString){
                            if(priceList[j] === null && updated === false){
                                // if price slot is available, assign price to object
                                priceObj[j] = dataString;
                                //set update to prevent remaining non price values from being assigned to deliveryPrices
                                updated = true;
                            } else{
                                //and assign non-price values to non-price slots
                                priceObj[j] = priceList[j]
                            }
                        }
                    }
                } else{
                    //assign non-price or perlb values to state object
                    stateObj[i] = deliveryInfo[i]
                }
            }
            // send data to database
            stateObj.prices = priceObj;
            postData(stateObj);
        } else{
            //if removing a value
            const priceObj = {};
            const stateObj = {};
            // cycle through state and...
            for(let i in deliveryInfo){
                if(i === "prices"){
                    //if prices create copy of object and cycle through it....
                    const priceList = deliveryInfo.prices;
                    for(let j in priceList){
                        // if price has property name (title)
                        if(priceList[j] === title){
                            // set to null
                            priceObj[j] = null;
                        } else{
                            // otherwise keep value and add to priceObj
                            priceObj[j] = priceList[j]
                        }    
                    }
                } else{
                    //assign non-price or perlb values to state object
                    stateObj[i] = deliveryInfo[i]
                }
            }
            // send data to database
            stateObj.prices = priceObj;
            postData(stateObj);
        }
    };

    const priceList = ()=>{
        //check if prices exist...
        const prices = Object.keys(servicePrices);
        const priceBoolean = prices.every((val)=>{
            if(servicePrices[val] === null){
                return true;    
            } else{
                return false;
            }
        })
        // it they do,  map over them and...
        if(!priceBoolean){
            return prices.map((item)=>{
                if(servicePrices[item] !== null){
                    //split them into label and price segments and return list w/ button to remove
                    const splitItem = servicePrices[item].split("-");
                    const label = splitItem[0];
                    const price = splitItem[1];            
                    return (
                        <li className="optionLi list-group-item">
                            <div className="options-div">
                                <p className="li-p" style={liStyle}>{label}</p>
                                <p className="li-p" style={liStyle}>{price}</p>
                                <button className="link-buttons li-p" style={liStyle} onClick={(e)=> updatePrices(e, servicePrices[item], "remove")}>Remove</button>    
                            </div>
                        </li>
                    )     
                } 
            })    
        } else{
            //otherwise display message
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li> 
            )
        }    
    }
    
    // function for setting t/f booleans and textarea inputs
    const editInfo = (e, category)=>{
        //if category has not selected edit button, do not allow edit, and return false;
        if((category === "deliveryAddInfo" && !edit)||(category === "deliveryAddInfo2" && !edit2)||(category === "sameDayInfo" && !edit3)) return;

        //if category requires t/f value, return that, otherwise return text
        const response = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;

        //return corresponding response based on category
        if(category === "deliveryAddInfo"){
            setDeliveryAddInfo(response);
        } else if (category === "deliveryAddInfo2"){
            setDeliveryAddInfo2(response);
        } else if (category === "sameDayInfo"){
            setSameDayInfo(response);
        } else {
            //do nothing if sameday service isn't offered and response is also false....
            if(response === false && deliveryInfo.sameDayService === false) return;
            // otherwise, set sameday, send sameday and prevState to database, and setState
            setDeliveryInfo(prevState =>{
                const obj = {};
                for(let i in deliveryInfo){
                    if (i === category){
                        obj[i] = response;
                    } else{
                        obj[i] = prevState[i];
                    }    
                }
                postData(obj)
                return obj;
            })
        }
    
    }

    //submit button functionality for multiple components....
    const infoHandler = (category)=>{
        //create a copy of deliveryInfo
        const data = Object.assign({}, deliveryInfo);
        //setting edit to false will make text un-editable until edit button is clicked
        if(category === "deliveryAddInfo"){
            setEdit(!edit)
        } else if(category === "deliveryAddInfo2"){
            setEdit2(!edit2)
        } else{
            setEdit3(!edit3)
        } 
        //add all existing state to delivery info and send to database...
        data.deliveryAddInfo = deliveryAddInfo; 
        data.deliveryAddInfo2 = deliveryAddInfo2;        
        data.sameDayInfo = sameDayInfo;
        postData(data);
    }
    
    //send data to database
    const postData = (obj)=>{
        // if business isn't verified don't allow the user to edit
        if(!verify || !claimed) return false;

        const dataObj = {};
        //sort data between prices, hours, and [all else]
        for(let i in obj){
            if(i !== "prices" && !i.includes("Hours")){
                dataObj[i] = obj[i];
            } else if(i === "prices"){
                for(let j in obj.prices){
                    dataObj[j] = obj.prices[j]
                }
            } else{
                if(obj[i].length !== 0){
                    const stringHours = obj[i].join(",");
                    dataObj[i] = stringHours;    
                } else{
                    dataObj[i] = null;    
                }
                
            }
        }
        //if table already exists, update, and then update dashboard to re-render
        if(tableExists){
            fetch(`/api/delivery-prices/${name}`, {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                update();
            })     
        } else{
            // if priceLists don't exist, create a new table, and update dash to re-render
            //set establishment name as a foreign key to reference parent table
            dataObj.EstablishmentBusinessName = name;
            fetch(`/api/delivery-prices`, {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(data=> {
                console.log(data);
                update();
            })
        }   
    }
    
    const updateHours=(e, category, day, open, close, action)=>{
        e.preventDefault();
        const timeObj = {};
        //reference to delivery info
        const infoRef = deliveryInfo;
        //Delineate which type of hours to update
        let prevHours = category === "delivery" ? infoRef.deliveryHours : infoRef.pickUpHours; 

        let tempArray = [];
        let newArray = [];
        let count = 0;
        let prevTime = "";

        if(open === close){
            // console.log("No")
        }

        //First handle previously existing hours by....
        for(let i = 0; i < prevHours.length; i++){
        // cycling over hours and splitting each entry into day/hour segments...
            const firstSplit = prevHours[i].split("/");
            const times = firstSplit[1];

            //if firstSplit includes a dash it is a range of days (EX. m-f)
            if(firstSplit[0].includes("-")){
                //split by dash, and use the start and end as indexes....
                const rangeSplit = firstSplit[0].split("-");
                const start = week.indexOf(rangeSplit[0]);
                const end = week.indexOf(rangeSplit[1]);
                // ..to slice values (days) from the week array (mon, tue, wed...)
                const range = week.slice(start, end + 1);
                //cycle over sliced array.... 
                for(let j = 0; j < range.length; j++){
                    if(action !== "remove"){
                        // keep days/times or...
                        timeObj[range[j]] = times;
                    } else{
                        if(range[j] !== day){
                            timeObj[range[j]] = times;
                        }
                    }
                }
            } else{
                //if firstSplit isn't a range, keep days/times or...
                if(action !== "remove"){
                    timeObj[firstSplit[0]] = times;

                } else{
                    // or filter out day; keeping existing times
                    if(firstSplit[0] !== day){
                        timeObj[firstSplit[0]] = times;
                    }
                }
            }   
        }
        
        //This segment adds and edits NEW times
        if(action !== "remove"){
            if(timeObj.hasOwnProperty(day)){
                for(let i in timeObj){
                    //if day is listed, find, and edit with new time....
                    if(i === day){
                        timeObj[i] = `${open}-${close}`;
                    }
                };    
            } else{
                // otherwise add day and time to timeOBJ
                timeObj[day] = `${open}-${close}`;
            }    
        }

        //Create array consisting of included days...
        const timeArray = Object.keys(timeObj);
        
        //format days/times (if consecutive days Mo-Fr/10:00am-4:00pm, else Mo/10-4, Th/5-7) 
        week.forEach((day)=>{    
            //increase count for each day... 
            count ++
            if(timeArray.includes(day)){
                //collect time from timeObj
                var currentTime = timeObj[day];
                //If prevTime is empty, this is the first index of the array and..
                if(prevTime === ""){
                    // set prevTime to the current iteration of time
                    prevTime = currentTime;
                    if(count < 7){
                        //if count < 7, more times may be included, so push time to a storage array,
                        //for next step in process
                        tempArray.push(day)
                    } else{
                        // if count = 7, there are no more days/times, so push time to finished array
                        const time = `${day}/${currentTime}`
                        newArray.push(time)
                    }
                } else{
                    //if prevTimes != currentTime, this means they cannot be formated in a consecutive fashion..
                    //Days may be consecutive still, but times will be different (EX.  Mo/10-5pm, Tu/9-4pm)...
                    if(prevTime !== currentTime){
                        // so handle format of tempArray values first...
                        if(tempArray.length >= 2){
                            //format tempArray (EX. Mo-Th/7-5pm), push to final array, then empty tempArray and...
                            const start = tempArray[0];
                            const end = tempArray[tempArray.length - 1];
                            const time = `${start}-${end}/${prevTime}`;
                            newArray.push(time); 
                            tempArray = [];
                            //then handle the current time...
                            if(count < 7){
                                //if count < 7, more times may be included, so push time to a storage array,
                                //for next step in process
                                tempArray.push(day)
                            } else{
                                // if count = 7, there are no more days/times, so push time to finished array
                                const time = `${day}/${currentTime}`
                                newArray.push(time)
                            }
                        } else if(tempArray.length === 1){
                            //if tempArray has one value, format in nonconsecutive fashion (EX. Mo/10-5)
                            newArray.push(`${tempArray[0]}/${prevTime}`)
                            tempArray = [];
                            //then handle current time...
                            if(count < 7){
                                //if count < 7, more times may be included, so push time to a storage array,
                                //for next step in process
                                tempArray.push(day)
                            } 
                        } else{
                            // if tempArray is empty, handle current time 
                            if(count < 7){
                                tempArray.push(day)
                            } else{
                                const time = `${day}/${currentTime}`
                                newArray.push(time)
                            }
                        }
                        //keep track of currentTime for next iteration by assigning its value to prevTime
                        prevTime = currentTime;
                    } else{
                        if(count < 7){
                            tempArray.push(day)
                        } else{
                            const time = `${day}/${currentTime}`
                            newArray.push(time)
                        }
                    }
                }
            } else{
                //if current time is not listed in timeObj...
                //format existing times and move to next available time
                if(tempArray.length >= 2){
                    //format timeArray (consecutive fashion) and empty for next iteration or...
                    const start = tempArray[0];
                    const end = tempArray[tempArray.length - 1];
                    const time = `${start}-${end}/${prevTime}`;
                    newArray.push(time); 
                    tempArray = [];
                } else if(tempArray.length === 1){
                    // format in non-consecutive fashion, push, and empty tempArray
                    newArray.push(`${tempArray[0]}/${prevTime}`)
                    tempArray = [];
                }
            }
        })
        
        //set state using newArray...
        setDeliveryInfo(prevState=>{
            const obj = {}
            for(let i in prevState){
                //determine which hours category to update, and do so....
                if(i === `${category}Hours`){
                    obj[i] = newArray;
                } else{
                    //include previous times...
                    obj[i] = prevState[i]
                }
            }
            // then send data to database and setstate
            postData(obj);
            return obj;
        });
    }

    //handles input for multiple (FEE) elements
    const feeHandler = (e) =>{
        //collect values
        const name = e.target.name;
        const value = e.target.value;
        //If nothing has been selected return...
        if(value === "Insert Minimum" || value === "Insert Price") return;
        //If value is a price, convert nummber to a float, and attach to value variable
        if(name !== "pickUpMinimum" && name !== "freePickUp"){
            priceConversion(e);    
        } 
        //distinguish which fee and set price in state
        name === "pickUpFee" ? setPickUpFee(value) 
        : name === "pickUpMinimum" ? setPickUpMinimum(value) 
        : name === "deliveryPricePerLbs" ? setDeliveryPricePerLbs(value) 
        : setDeliveryPricePerLbsDiscounted(value)
    }

    //sets state whenever window is resized
    const windowSize = ()=>{
        setSize(window.innerWidth)
    }  
    return(
        <>
            <div className="row price-div">
                <div className="offset-1 col-10 text-center dashboardCol">
                   <h2 className="logoFont">Delivery Service</h2>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">General Information</h2>
                </div>
            </div>
             
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="3" value={deliveryAddInfo === null ? "Tell us a little about your business" : deliveryAddInfo} onChange={(e)=> editInfo(e, "deliveryAddInfo")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit(!edit)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("deliveryAddInfo")} type="submit" className="btn btn-success" style={!edit ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">Instructions for Delivery</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="3" value={deliveryAddInfo2 === null ? "Tell your customers about the delivery process" : deliveryAddInfo2} onChange={(e)=> editInfo(e, "deliveryAddInfo2")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit2(!edit2)} className={edit2 ? "btn btn-danger":"btn btn-secondary"}>{edit2 ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("deliveryAddInfo2")} type="submit" className="btn btn-success" style={!edit2 ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
                        
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark dashInput">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5>Add Items and Prices</h5>  
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor:"white"}}> 
                            <div className="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Item</span>
                                </div>
                                <input id="serviceItem" className="form-control" type="text" placeholder="Insert Item" style={{width: "50%"}} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="servicePrice"  
                                    type="number" 
                                    min="0.00" max="100.00" 
                                    step="0.01" 
                                    className="form-control" 
                                    placeholder="Insert Price"
                                    onChange={(e)=>priceConversion(e)}
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary form-control dash_btn" type="button" onClick={(e)=> updatePrices(e)}>Add</button>
                                </div>
                            </div>
                            <ul className="list-group">
                                {priceList()}
                            </ul>
                        </div>   
                    </div>        
                </div>   
            </div>            
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="row">
                        <div className="mt-3 col-lg-6 pr-lg-2">
                            {/* component for displaying and updating delivery hours  */}
                            <DeliveryHoursInfo week={week} hours={deliveryInfo.deliveryHours} updateHours={updateHours} category={"delivery"} size={size}/>
                        </div>
                        <div className="mt-3 col-lg-6 pl-lg-2">
                            {/* component for displaying and updating pickup hours  */}
                            <DeliveryHoursInfo week={week} hours={deliveryInfo.pickUpHours} updateHours={updateHours} category={"pickUp"} size={size}/>
                        </div>    
                    </div>
                </div>    
            </div>
            <div className="row">
                <div className="mt-3 col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark text-center">
                        <div className="card-header"></div>
                            <div className="card-body" style={{backgroundColor:"white"}}>
                                <h5 className="card-title">Do you offer Same Day Service</h5>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-success" value={true} onClick={(e)=> editInfo(e, "sameDayService")}>Yes</button>
                                    <button type="button" className="btn btn-danger" value={false} onClick={(e)=> editInfo(e, "sameDayService")}>No</button>
                                </div>  
                            </div>    
                        <div className="card-footer text-muted"></div>
                    </div>
                </div>
            </div>
            <div className="row">
                {deliveryInfo.sameDayService && 
                    <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                        <span style={{textAlign:"center"}}><h1>Same Day Information</h1></span>
                        <textarea class="form-control dashInput" rows="3" value={sameDayInfo === null ? "Tell us about your same day service" : sameDayInfo} onChange={(e)=> editInfo(e, "sameDayInfo")}></textarea>
                        <div style={{textAlign:"right"}}>
                            <button onClick={()=> setEdit3(!edit3)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit3 ? "Cancel" : "Edit"}</button> 
                            <button onClick={()=> infoHandler("sameDayInfo")} type="submit" className="btn btn-success" style={!edit3 ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                        </div>
                    </div>
                }     
            </div> 
            <div className="row">
                <div className="mb-5 col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark dashInput laundryCardPrice">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5>Service Fees and Discounts</h5>  
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor:"white"}}> 
                            <div className="row">
                                <div className="col-md-12 col-lg-7 delivery-fee-col">
                                    <div className="deliveryFeeInput">
                                        <h5 className="d-lg-none" style={{margin: "1rem"}}>Add Fees or Discounts</h5>
                                        <div class="form-group row">
                                            <label for="freePickUp" class="col-7 offset-sm-1 col-sm-5 offset-md-1 col-md-5 offset-lg-0 col-lg-7 col-form-label freePickUp">Do you offer Free Pick Up?</label>
                                            <div class="col-4 col-sm-4 col-md-5">
                                                <select className="form-control summary_delivery freePickUp" name="freePickUp" onChange={(e)=>setFreePickUp(e.target.value)}>
                                                    <option selected disabled>{inputAnswer}</option>
                                                    <option value={true}>Yes</option>
                                                    <option value={false}>No</option>
                                                </select>    
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-7 offset-sm-1 col-sm-5 offset-md-1 col-md-5 offset-lg-0 col-lg-7 col-form-label">Delivery Fee</label>
                                            <div class="col-4 col-sm-4 col-md-5">
                                                <input   
                                                    type="number"
                                                    name="pickUpFee"
                                                    min="0.00" max="100.00" 
                                                    step="0.01" 
                                                    className="form-control summary_delivery" 
                                                    placeholder="Insert Price"
                                                    onChange={(e)=> feeHandler(e)}
                                                />    
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="pickUpMinimum" class="col-7 offset-sm-1 col-sm-5 offset-md-1 col-md-5 offset-lg-0 col-lg-7 col-form-label">Pick Up Minimum (lbs)</label>
                                            <div class="col-4 col-sm-4 col-md-5">
                                                <input   
                                                    type="number" 
                                                    name="pickUpMinimum"
                                                    min="0" max="100" 
                                                    step="1" 
                                                    className="form-control summary_delivery" 
                                                    placeholder={inputMinimum}
                                                    onChange={(e)=> feeHandler(e)}

                                                />    
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-7 offset-sm-1 col-sm-5 offset-md-1 col-md-5 offset-lg-0 col-lg-7 col-form-label">Laundry Price Per Lb</label>
                                            <div class="col-4 col-sm-4 col-md-5">
                                                <input  
                                                    type="number" 
                                                    name="deliveryPricePerLbs" 
                                                    min="0.00" max="100.00" 
                                                    step="0.01" 
                                                    className="form-control summary_delivery" 
                                                    placeholder="Insert Price"
                                                    onChange={(e)=> feeHandler(e)}
                                                />    
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="inputEmail3" class="col-7 offset-sm-1 col-sm-5 offset-md-1 col-md-5 offset-lg-0 col-lg-7 col-form-label">Discounted Price Per Lb</label>
                                            <div class="col-4 col-sm-4 col-md-5">
                                                <input   
                                                    type="number" 
                                                    name="deliveryPricePerLbsDiscounted"
                                                    min="0.00" max="100.00" 
                                                    step="0.01" 
                                                    className="form-control summary_delivery" 
                                                    placeholder="Insert Price"
                                                    onChange={(e)=> feeHandler(e)}
                                                />    
                                            </div>
                                        </div>  
                                        <div class="form-group row" style={{marginBottom:2}}>
                                            <div class="offset-sm-1 col-sm-10 p-sm-0 col-m-12 offset-lg-0 col-lg-12">
                                                <button type="submit" className="btn btn-primary" 
                                                    style={{border: "1px solid #474444", textShadow: "1px 1px black", width: "90%", borderRadius: 0, margin: "1px auto"}} 
                                                    onClick={submitHandler}>
                                                        Submit
                                                </button>
                                            </div>
                                        </div>                    
                                    </div>                      
                                </div>
                                <div className="col-md-12 col-lg-5">
                                    <h5 className="d-lg-none" style={{marginTop: "1.5rem", marginBottom: "1.5rem"}}>Current Fees and Discounts</h5>
                                    <ul className="list-group" style={{listStyleType: "none", display: "inline-block", marginTop: "5px"}}>
                                        <li>
                                            <div className="options-div2">
                                                <p className="deliveryPar">Free Pick Up: </p>
                                                <p>{deliveryInfo.freePickUp === true ? "Yes" : "No"}</p>
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="options-div2">
                                                <p className="deliveryPar">Pick Up Fee: </p>
                                                {deliveryInfo.pickUpFee ? <p>{deliveryInfo.pickUpFee}</p> : <p>Not Listed</p> }

                                            </div>
                                        </li>  
                                        <li>
                                            <div className="options-div2">
                                                <p className="deliveryPar">Pick Up Minimum: </p>
                                                {deliveryInfo.pickUpMinimum ? <p>{deliveryInfo.pickUpMinimum}</p> : <p>Not Listed</p> }
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="options-div2">
                                                <p className="deliveryPar">Price Per Lbs: </p>
                                                {deliveryInfo.deliveryPricePerLbs ? <p>{deliveryInfo.deliveryPricePerLbs}</p> : <p>Not Listed</p> }
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="options-div2">
                                                <p className="deliveryPar">Discounted Price: </p>
                                                {deliveryInfo.deliveryPricePerLbsDiscounted ? <p>{deliveryInfo.deliveryPricePerLbsDiscounted} (per lb)</p> : <p>Not Listed</p> }
                                            </div>
                                        </li> 
                                        <li>
                                            <div className="text-center">
                                                <p >** Selecting $0.00 will remove fees</p>
                                            </div>
                                        </li>                                                    
                                    </ul>
                                </div>
                            </div>                            
                        </div>   
                    </div>       
                </div>   
            </div> 
            {tableExists && 
                <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>No longer offering this service?</h4>
                        </div>
                    </div>
                    {/* component for deleting price list (pass in url) */}
                    <Deleter url={`/api/delivery-prices/${name}`}/>
                </>
            }     
        </>
        
    )
}

export default DashboardDelivery;