import React , {useState, useEffect} from "react";
import Deleter from "./DashboardDeleter";

const DashboardDropOff = ({dropOff, name, update})=>{
    const [tableExists, setTableExists] = useState(false)
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [edit3, setEdit3] = useState(false);
    const [dropOffAddInfo, setDropOffAddInfo] = useState(null);
    const [dropOffAddInfo2, setDropOffAddInfo2] = useState(null);
    const [sameDayInfo, setSameDayInfo] = useState(null);
    const liStyle = { width: "30%" };
    const message = document.getElementsByClassName("price-header");
    const perLb = document.getElementById("perLb");
    const serviceItem = document.getElementById("serviceItem");
    const servicePrice = document.getElementById("servicePrice");

    //default text for inputs
    const dropOffInput = "Please provide a brief description of your Drop Off Services.  Do not include information "+
        "not related to your drop off services on this page.  Specific Instructions may be handled below.";

    const instructions = "Please tell your customers about the drop off process.  Be sure to inform customers about " + 
        "turnaround times, how laundry should be delivered, and any other instructions you deem relevant.";
    //
    const [dropOffInfo, setDropOffInfo] = useState({
        dropOffMinimum: false,
        dropOffPriceMinimum: null,
        dropOffPricePerLb: null,
        prices: {
            dropOffPrices: null,
            dropOffPrices2: null,
            dropOffPrices3: null,
            dropOffPrices4: null,
            dropOffPrices5: null,
            dropOffPrices6: null,
            dropOffPrices7: null,
            dropOffPrices8: null,
            dropOffPrices9: null,
            dropOffPrices10: null,
            dropOffPrices11: null,
            dropOffPrices12: null,
            dropOffPrices13: null,
            dropOffPrices14: null,
            dropOffPrices15: null
        },
        sameDayService: false,
    })
    const servicePrices = dropOffInfo.prices;
    const minimum = dropOffInfo.dropOffPricePerLb;

    useEffect(()=>{
        //send prop to listMaker to create list of prices
        listMaker(dropOff)
    },[dropOff])

    const listMaker = (obj)=>{
        // if priceList exist
        if(obj !== null){
            const stateObj = {};
            const priceObj = {};
            for(let i in obj){
                if(i !== "id" && i !== "createdAt" && i !== "updatedAt" && i !== "EstablishmentBusinessName" && !i.includes("Info")){
                    //add prices to object...
                    if(i.includes("dropOffPrices")){
                        priceObj[i] = obj[i];    
                    } else{
                        //and everthing else to object and...
                        stateObj[i] = obj[i];
                    }
                }
            }
            stateObj.prices = priceObj;
            //set table exists to true to indicate database table exists and...
            setTableExists(true);
            //set state with following values:
            setDropOffInfo(stateObj);
            setDropOffAddInfo(obj.dropOffAddInfo);
            setDropOffAddInfo2(obj.dropOffAddInfo2);
            setSameDayInfo(obj.sameDayInfo);
        }
        
    };

    //converts number to floating number (EX. 2.50)
    const priceConversion = (e)=>{
        const newVal = parseFloat(e.target.value).toFixed(2);
        e.target.value = newVal;
    };

    const updatePrices = (item, action, type)=>{
        const stateObj = {};
        const priceObj = {};
        //update indicates when to switch from updating dropOffPrices to updating other values in state...
        let updated = false;
        // cycle through state and....
        for(let i in dropOffInfo){
            if(i === "prices"){
                //if prices create copy of object and cycle through it....
                const prices = dropOffInfo.prices;
                for(let j in prices){
                    if(action !== "remove"){
                        // if adding...
                        if(type === "price"){
                            if(prices[j] !== item && prices[j] === null && updated === false){
                                // if price slot is available, assign price to object
                                priceObj[j] = item;
                                //set update to prevent remaining non price values from being assigned to deliveryPrices
                                updated = true;
                            }    
                        } else{
                            //and assign non-price values to non-price slots
                            priceObj[j] = prices[j]
                        }
                    } else{
                        // if price, and price[j] has property name (item)....
                        if(prices[j] === item && type === "price"){
                            // set to null...
                            priceObj[j] = null;
                        } else{
                            //otherwise add value to price object
                            priceObj[j] = prices[j];
                        }
                    }
                }
            } else if(i === "dropOffPricePerLb"){
                if(type === "perLb"){
                    // if per lb price
                    if(action !== "remove"){
                        // and we are adding, set price to object
                        stateObj.dropOffPricePerLb = `$${item}`;
                    } else{
                        //otherwise set to null
                        stateObj.dropOffPricePerLb = null;
                    }    
                } else{
                    //if there is no type it means we are keeping previous value
                    stateObj.dropOffPricePerLb = dropOffInfo[i]
                }
                
            } else{
                //add remaining values to state object
                stateObj[i] = dropOffInfo[i];
            }
        }
        //add info and prices to respective keys in object and send to database
        stateObj["prices"] = priceObj;
        stateObj.dropOffAddInfo = dropOffAddInfo; 
        stateObj.dropOffAddInfo2 = dropOffAddInfo2;        
        stateObj.sameDayInfo = sameDayInfo; 
        postData(stateObj);
    };

    //send data to database
    const postData = (obj)=>{
        const dataObj = {};
        //sort data between prices and everything else and...
        // add to dataObj
        for(let i in obj){
            if(i !== "dropOffMinimum") {
                if(i !== "prices"){
                    dataObj[i] = obj[i];
                } else{
                    for(let j in obj.prices){
                        dataObj[j] = obj.prices[j]
                    }
                }
            } 
        };
        //if table already exists, update, and then update dashboard to re-render
        if(tableExists){
            fetch(`/api/drop-off-prices/${name}`, {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(()=> {
                update();
            }).catch(err => console.log(err))    
        } else{
            // if priceLists don't exist, create a new table, and update dash to re-render
            //set establishment name as a foreign key to reference parent table
            dataObj.EstablishmentBusinessName = name;
            fetch(`/api/drop-off-prices`, {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(()=> {
                const updateObj = {dropOff : true}
                fetch(`/api/establishment/${name}/`, {
                    method: "put",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updateObj)
                })
                .then(response => response.json())
                .then(()=> {
                    update();
                })                    
                // update();
            }).catch(err => console.log(err))
        }
    };

    //Display price per lb
    const pricePer = ()=>{
        if(minimum !== null && minimum !== undefined){   
            // if price exists, return price/label w/ button to remove     
            return (
                <li className="optionLi list-group-item">
                    <div className="options-div">
                        <p className="li-p" style={liStyle}>Current Price Per Lb</p>
                        <p className="li-p" style={liStyle}>{minimum}</p>
                        <button className="link-buttons li-p" style={liStyle} onClick={(e)=> updatePrices(minimum, "remove", "perLb")}
                        >Remove</button>    
                    </div>
                </li>
            )        
        } else{
            //otherwise display message to user
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li> 
            )
        };
    }

    const priceList = ()=>{
        //create array of price keys
        const prices = Object.keys(servicePrices);

        // check if there are any prices assigned
        const priceBoolean = prices.every((val)=>{
            if(servicePrices[val] === null){
                return true;
            } else{
                return false;
            }
        });

        //if prices exist, map over them and...
        if(!priceBoolean){
            return prices.map((item)=>{
                if(servicePrices[item] !== null){
                    // if price is not null, split into label and price
                    const splitItem = servicePrices[item].split("-");
                    const label = splitItem[0];
                    const price = splitItem[1]; 
                    //and return w/ a button to remove price from price list           
                    return (
                        <li className="optionLi list-group-item">
                            <div className="options-div">
                                <p className="li-p" style={liStyle}>{label}</p>
                                <p className="li-p" style={liStyle}>{price}</p>
                                <button className="link-buttons li-p" style={liStyle} onClick={(e)=> updatePrices(servicePrices[item], "remove", "price")}>Remove</button>    
                            </div>
                        </li>
                    )     
                }    
            })    
        } else{
            //otherwise display a message for the user
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li> 
            )
        };
    }
     
    // function for setting t/f booleans and textarea inputs
    const editInfo = (e, category)=>{
        //if category has not selected edit button, do not allow edit, and return false;
        if((category === "dropOffAddInfo" && !edit)||(category === "dropOffAddInfo2" && !edit2)) return;

        //if category requires t/f value, return that, otherwise return text
        const response = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;

        //return corresponding response based on category
        if(category === "dropOffAddInfo"){
            setDropOffAddInfo(response);
        } else if(category === "dropOffAddInfo2"){
            setDropOffAddInfo2(response);
        } else if(category === "sameDayInfo"){
            setSameDayInfo(response);
        } else {
            //do nothing if sameday service isn't offered and response is also false....
            if(response === false && dropOffInfo.sameDayService === false) return;

            // otherwise, set sameday, send sameday and prevState to database, and setState
            setDropOffInfo(prevState =>{
                const obj = {};
                for(let i in prevState){
                    if (i === category){
                        obj[i] = response;
                    } else{
                        obj[i] = prevState[i];
                    }    
                }
                obj.dropOffAddInfo = dropOffAddInfo; 
                obj.dropOffAddInfo2 = dropOffAddInfo2;        
                obj.sameDayInfo = sameDayInfo;  
                postData(obj);
                return obj;
            })
        }   
    }

    //submit button functionality for multiple components....
    const infoHandler = (category)=>{
        //create a copy of dropoffInfo
        const data = Object.assign({}, dropOffInfo);
        //setting edit to false will make text un-editable until edit button is clicked 
        if(category === "dropOffAddInfo"){
            setEdit(!edit)
        } else if(category === "dropOffAddInfo2"){
            setEdit2(!edit2)
        } else{
            setEdit3(!edit3)
        }
        //add all existing state to delivery info and send to database...
        data.dropOffAddInfo = dropOffAddInfo; 
        data.dropOffAddInfo2 = dropOffAddInfo2;        
        data.sameDayInfo = sameDayInfo;        
        postData(data);
    }
//reset errors and remove CSS highlights
    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da"; 
        } 
    }
    //message timer for reseting header messages
    const timer = (num)=>{
        // num is index and is used to set message variable and...
        let _message = num === 0 ? "Laundry Price Per Lb" : "Add Items and Prices";
        //target specific header class
        setTimeout(()=>{
            message[num].innerHTML = _message
        }, 3000)

    }

    //validate input and set error messages and error related css
    const validateInput = (type)=>{
        let item;
        let price;
        let data;
        reset()
        if(type === "perLb"){
            item = perLb.value;
            //set errors if empty
            if(item === ""){
                perLb.style.border = "1px solid red";
                message[0].innerHTML = "No Price Entered"
                //reset message after 3 seconds
                timer(0);
            } else{
                data = `${item}`;    
            }
            

        } else{
            item = serviceItem.value;
            price = servicePrice.value; 
            //set errors if empty
            if(item === "" || price === "" || price === 0){
                if(item === ""){
                    serviceItem.style.border = "1px solid red";
                    message[1].innerHTML = "No Item Entered"
                }
                if(price === "" || price === 0){
                    servicePrice.style.border = "1px solid red";
                    message[1].innerHTML = "No Price Entered"
                }
                if(item === "" && (price === ""|| price === 0)){
                    serviceItem.style.border = "1px solid red";
                    servicePrice.style.border = "1px solid red";
                    message[1].innerHTML = "No Item or Price Entered"
                }
                //reset message after 3 seconds
                timer(1);
                
            } else{
                data = `${item}-$${price}`;
            }
        }
        //if validated, send to update function
        if(item.length !== 0){
            updatePrices(data, "add", type);
        }
    }

    return(
        <>
            <div className="row price-div">
                <div className="offset-1 col-10 text-center dashboardCol">
                    <h2 className="logoFont">Drop Off Service</h2>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">General Information</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="5" value={dropOffAddInfo === null ? dropOffInput : dropOffAddInfo} onChange={(e)=> editInfo(e, "dropOffAddInfo")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit(!edit)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("dropOffAddInfo")} type="submit" className="btn btn-success" style={!edit ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">Instructions</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="5" value={dropOffAddInfo2 === null ? instructions : dropOffAddInfo2} onChange={(e)=> editInfo(e, "dropOffAddInfo2")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit2(!edit2)} className={edit2 ? "btn btn-danger":"btn btn-secondary"}>{edit2 ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("dropOffAddInfo2")} type="submit" className="btn btn-success" style={!edit2 ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark dashInput">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5 className="price-header">Laundry Price Per Lb</h5>
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor: "white"}}> 
                            <div class="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="perLb" type="number" min="0.00" max="100.00" step="0.01" className="form-control" placeholder="Insert Price" onChange={(e)=>priceConversion(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" onClick={()=>validateInput("perLb")}>Add</button>
                                </div>
                            </div>
                            <ul className="list-group">
                                {pricePer()}
                            </ul>
                        </div>      
                    </div>    
                </div>
            </div>
            <div className="row">
                <div className="mb-5 col-md-12 offset-lg-1 col-lg-10  dashboardCol">
                    <div className="card bg-dark dashInput laundryCardPrice">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5 className="price-header">Add Items and Prices</h5>
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor: "white"}}> 
                            <div class="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Item</span>
                                </div>
                                <input id="serviceItem" className="form-control" type="text" placeholder="Insert Item" />
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="servicePrice" type="number" min="0.00" max="100.00" step="0.01" className="form-control" placeholder="Insert Price" onChange={(e)=>priceConversion(e)}/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" onClick={()=>validateInput("price")}>Add</button>
                                </div>
                            </div>
                            <ul className="list-group">
                                {priceList()}
                            </ul>
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
                    <Deleter url={`/api/drop-off-prices/${name}`}/>
                </>
            }    
        </>
    )
}

export default DashboardDropOff;