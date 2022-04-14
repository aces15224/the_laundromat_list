import React, {useState, useEffect} from "react";
import { Icon } from '@iconify/react';
import Deleter from "./DashboardDeleter";


const DashboardDryCleaning = ({dryClean, name, update})=>{
    const [tableExists, setTableExists] = useState(false)
    const [edit, setEdit] = useState(false);
    const [edit2, setEdit2] = useState(false);
    const [edit3, setEdit3] = useState(false);
    const [priceArray, setPriceArray] = useState([])
    const [addInfo, setAddInfo] = useState(null);
    const [addInfo2, setAddInfo2] = useState(null);
    const [sameDayInfo, setSameDayInfo] = useState(null);
    const [dryCleanInfo, setDryCleanInfo] = useState({
        column: 1,
        sameDayService: false, 
        delivery: false,
        pickUpFee: null,
        freePickUp: false,
        deliveryOrderMinimum: null,
        dryCleaningPrices: null,
        dryCleaningPrices2: null,
        dryCleaningPrices3: null,
        dryCleaningPrices4: null,
        dryCleaningPrices5: null,
        dryCleaningPrices6: null,
        dryCleaningPrices7: null,
        dryCleaningPrices8: null,
        dryCleaningPrices9: null,
        dryCleaningPrices10: null,
        dryCleaningPrices11: null,
        dryCleaningPrices12: null,
        dryCleaningPrices13: null,
        dryCleaningPrices14: null,
        dryCleaningPrices15: null,
        dryCleaningPrices16: null,
        dryCleaningPrices17: null,
        dryCleaningPrices18: null,
        dryCleaningPrices19: null,
        dryCleaningPrices20: null,
        dryCleaningPrices21: null,
        dryCleaningPrices22: null,
        dryCleaningPrices23: null,
        dryCleaningPrices24: null,
        dryCleaningPrices25: null,
        dryCleaningPrices26: null,
        dryCleaningPrices27: null,
        dryCleaningPrices28: null,
        dryCleaningPrices29: null,
        dryCleaningPrices30: null,
        deliveryHours: null,
        pickUpHours: null
    })
    let category = document.getElementById("selectCategory");  
    let item = document.getElementById("serviceItem");
    let price = document.getElementById("servicePrice");
    let message = document.getElementById("_priceMessage");

    useEffect(()=>{
        listMaker(dryClean);
    }, [dryClean])

    const listMaker = (object)=>{
        //send prop to listMaker to create list of prices
        if(object !== null){
            //indicate prices exist
            setTableExists(true);
        }
        const stateObject = {};
        const priceArray = [];
        for(let i in object){
            if(i !== "id" && i !== "createdAt" && i !== "updatedAt" && i !== "EstablishmentBusinessName" && !i.includes("Info")){
                //if i is a price, and not null...
                if(i.includes("dryCleaningPrices")){
                    if(object[i] !== null){
                        //split into segments (label, price, category) and create object...
                        const splitItems = object[i].split("+");
                        const label = splitItems[0];
                        const price = splitItems[1];
                        const category = splitItems[2];
                        const obj = {category, label, price}
                        // then assign a display icon based on category type....
                        switch(category){
                            case "Outerwear":
                                obj.icon = <Icon className="dryCleanIcon" icon="icon-park-outline:women-coat" />
                                break;
                            case "Pants":
                                obj.icon = <Icon className="dryCleanIcon" icon="icon-park-outline:clothes-pants" />
                                break;
                            case "Shirts":
                                obj.icon = <Icon className="dryCleanIcon" icon="ri:shirt-line" />
                                break;
                            case "Dress":
                                obj.icon = <Icon className="dryCleanIcon" icon="pepicons:dress" />
                                break;
                            case "Misc":
                                obj.icon = <Icon className="dryCleanIcon" icon="mdi:tie" />
                                break;
                            default:
                                console.log("--label")
                        }
                        //and push to price array
                        priceArray.push(obj)
                    }
                }
                //assign everything else to state object..
                stateObject[i] = object[i];
            }
            // and set following state: 
            setAddInfo(object.addInfo);
            setAddInfo2(object.addInfo2);
            setSameDayInfo(object.sameDayInfo);
        }
        //then set how many price columns will be displayed and...
        //organize prices into set columns...
        if(priceArray.length > 5){
            //if more than 5 prices, there will be two columns....
            stateObject.column = 2;
            let evenArray = [];
            let oddArray = [];
            //sort prices between two columns.  If i is even, it goes to evenArray, otherwise oddArray
            for(let i = 0; i < priceArray.length; i++){
                if(i % 2 === 0){
                    evenArray.push(priceArray[i])
                } else{
                    oddArray.push(priceArray[i])
                }
            }
            //set state with edd/even arrays and stateObj
            setPriceArray([evenArray, oddArray])
            setDryCleanInfo(stateObject)
        } else {
            //if less than 5 prices, there will be 1 column....
            stateObject.column = 1;
            // set state with unsorted price array and stateObk
            setPriceArray(priceArray)
            setDryCleanInfo(stateObject)
        }
    }

    // function for setting t/f booleans and textarea inputs
    const editInfo = (e, category)=>{
        //if category has not selected edit button, do not allow edit, and return false;
        if((category === "addInfo" && !edit) || (category === "addInfo2" && !edit2) || (category === "sameDayInfo" && !edit3)) return;

            //if category requires t/f value, return that, otherwise return text
            const response = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;

            //return corresponding response based on category
            if(category === "addInfo"){
                setAddInfo(response);
            } else if(category === "addInfo2"){
                setAddInfo2(response);
            } else if(category === "sameDayInfo"){
                setSameDayInfo(response);
            } else {
                //do nothing if sameday service isn't offered and response is also false....
                if(response === false && dryCleanInfo.sameDayService === false) return;

                // otherwise, set sameday, send sameday, additional info, and prevState to database, and setState
                setDryCleanInfo(prevState =>{
                    const obj = {};
                    for(let i in prevState){
                        if (i === category){
                            obj[i] = response;
        
                        } else{
                            obj[i] = prevState[i];
                        }    
                    }
                    obj.addInfo = addInfo; 
                    obj.addInfo2 = addInfo2;        
                    obj.sameDayInfo = sameDayInfo;  
                    postData(obj);
                    return obj;
                })
            }
    }

    //submit button functionality for multiple components....
    const infoHandler = (category)=>{
        //create a copy of dryCleanInfo
        const data = Object.assign({}, dryCleanInfo);
        //clicking to submit will make text un-editable until edit button is clicked again
        if(category === "addInfo"){
            setEdit(!edit)
        } else if(category === "addInfo2"){
            setEdit2(!edit2)
        } else{
            setEdit3(!edit3)
        }
        //add all existing state to dryCleanInfo and send to database...
        data.addInfo = addInfo; 
        data.addInfo2 = addInfo2;        
        data.sameDayInfo = sameDayInfo;        
        postData(data)
    }

    //converts number to floating number (EX. 2.50)
    const priceConversion = (e)=>{
        const newVal = parseFloat(e.target.value).toFixed(2);
        e.target.value = newVal;
    }

    //reset errors and remove CSS highlights
    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da"; 
        } 
        category.style.border = "1px solid #ced4da";
    }

    const updatePrices = (e, title, action)=>{
        const stateObj = {};
        //Remove Error Styling if present
        reset();
        if(action !== "remove"){
            // if values are valid....
            if(category.value !== "Select Category" && item.value !== "" && price.value !== ""){
                //format price (EX. T-Shirt + 5.00 + Shirts)
                const updatedPrice = `${item.value}+$${price.value}+${category.value}`;
                //update indicates when to switch from updating dryCleaningPrices to updating other values in state...
                let update = false;
                for(let i in dryCleanInfo){
                    if(i.includes("dryCleaningPrices") && dryCleanInfo[i] === null && update === false){
                        //set update to prevent non price values from being assigned to dryCleaningPrices
                        update = true;
                        stateObj[i] = updatedPrice;
                    }else{
                        //if not a dryCleaningPrice, set corresponding key/value
                        stateObj[i] = dryCleanInfo[i];
                    }
                }
                //set state w/ follwing infotypes and send data to database
                stateObj.addInfo = addInfo; 
                stateObj.addInfo2 = addInfo2;        
                stateObj.sameDayInfo = sameDayInfo; 
                postData(stateObj);
               
            } else{
                //if input is invalid/empty display error message and highlight fields
                message.innerHTML = "Fill in Highlighted Fields"
                if(category.value === "Select Category"){
                    category.style.border = "1px solid red";
                }
                if(item.value === ""){
                    item.style.border = "1px solid red";
                }
                if(price.value === ""){
                    price.style.border = "1px solid red";
                }
                //remove error message after 3 seconds
                setTimeout(()=>{
                    message.innerHTML = "Add Items and Prices"
                }, 3000)
            }
            // reset values
            category.selectedIndex = "0"; 
            item.value = "";
            price.value = "";
            item.placeholder = "Insert Item"; 
            price.placeholder = "Insert Price";
        } else{
            // if removing a price, cycle through state values...
            for(let i in dryCleanInfo){
                if(i.includes("dryCleaningPrices") && dryCleanInfo[i] !== null){
                    //if value is a price and is not null...
                    const splitItem = dryCleanInfo[i].split("+");
                    const label = splitItem[0];
                    //check the label and set to null if it's a match...
                    if(label === title){
                        stateObj[i] = null;
                    } else{
                        //otherwise collect previous value and add to stateObj 
                        stateObj[i] = dryCleanInfo[i];
                    }
                } else{
                    //if value is not a price, add state value to stateObj 
                    stateObj[i] = dryCleanInfo[i];
                }
            }
            //add following info to state and send data to database
            stateObj.addInfo = addInfo; 
            stateObj.addInfo2 = addInfo2;        
            stateObj.sameDayInfo = sameDayInfo;
            postData(stateObj); 
        } 
    }

    //send data to database
    const postData = (obj)=>{
        const dataObj = {};
        for(let i in obj){
            //filter out column number and add values to dataObj
            if(i !== "column"){
                dataObj[i] = obj[i];
            }
        }
        //if table already exists, update, and then update dashboard to re-render
        if(tableExists){
            fetch(`/api/dry-cleaning-prices/${name}`, {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(data=> {
                update();
            })     
        } else{
            // if priceLists don't exist, create a new table, and update dash to re-render
            //set establishment name as a foreign key to reference parent table
            dataObj.EstablishmentBusinessName = name;
            fetch(`/api/dry-cleaning-prices`, {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then(response => response.json())
            .then(data=> {
                console.log("PostData Data")
                update();
            })
        }    
    }

    const priceList = (list) =>{
        const liStyle = { width: "100%" }
        //check if prices exist...
        if(list.length > 0){
        // it they do, map over them and return a card w/button to remove..
            return list.map((item)=>{                   
                return (
                    <li className="list-group-item" style={{padding: ".1rem", border: "none"}}>
                        <div className="card dryCleanListCard">
                            <div className="card-img-top dryCleanIconDiv">
                                {item.icon}
                                <span className="iconCategory">{item.category}</span>
                            </div>
                                <div className="options-div" style={liStyle}>
                                    <p className="li-p dryCleanLabel">{item.label}</p>
                                    <p className="li-p" style={{width:"30%"}}>{item.price}</p>
                                    <button className="link-buttons li-p" style={{width:"30%"}} onClick={(e)=> updatePrices(e, item.label, "remove")}>Remove</button>
                                </div>
                        </div>
                    </li> 
                )    
            })    
        } else{
            // otherwise display message
            return (
                <li className="list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li> 
            )
        }        
    }
    
    return(
        <> 
            <div className="row price-div">
                <div className="offset-1 col-10 text-center dashboardCol">
                    <h2 className="logoFont">Dry Cleaning Service</h2>
                </div>
            </div> 
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">General Information</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="3" value={addInfo === null ? "Tell us about your dry cleaning service" : addInfo} onChange={(e)=> editInfo(e, "addInfo")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit(!edit)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("addInfo")} type="submit" className="btn btn-success" style={!edit ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
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
                    <textarea className="form-control dashInput" rows="3" value={addInfo2 === null ? "Tell your customers about the dry cleaning process" : addInfo2} onChange={(e)=> editInfo(e, "addInfo2")}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit2(!edit2)} className={edit2 ? "btn btn-danger":"btn btn-secondary"}>{edit2 ? "Cancel" : "Edit"}</button> 
                        <button onClick={()=> infoHandler("addInfo2")} type="submit" className="btn btn-success" style={!edit2 ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark">
                        <div className="card-header text-white text-center">
                            <h5 id="_priceMessage">Add Items and Prices</h5>
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor: "white"}}> 
                            <div className="input-group laundryInput">
                                <select className="form-control" id="selectCategory">
                                    <option selected>Select Category</option>
                                    <option value="Shirts">Shirts</option>
                                    <option value="Pants">Pants</option>
                                    <option value="Dress">Dress</option>
                                    <option value="OuterWear">Outerwear</option>
                                    <option value="Misc">Miscellaneous</option>
                                </select>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Item</span>
                                </div>
                                <input id="serviceItem" className="form-control" type="text" placeholder="Insert Item" style={{maxWidth: "22%"}} />
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="servicePrice"  type="number" min="0.00" max="100.00" step="0.01" className="form-control" placeholder="Insert Price" onChange={(e)=>priceConversion(e)}/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary form-control" type="button" onClick={(e)=>updatePrices(e)}>Add</button>
                                </div>
                            </div>  
                            <div className="row">
                                {/* render price list depending on number of columns */}
                                {dryCleanInfo.column === 1 ? 
                                    <div className="col-12">
                                        <ul className="list-group">
                                            {priceArray && priceList(priceArray)}
                                        </ul>
                                    </div>
                                    :
                                    <>
                                        <div className="col-lg-6 priceGroup1">
                                            <ul className="list-group">
                                                {priceArray && priceList(priceArray[0])}
                                            </ul>
                                        </div>
                                        <div className="col-lg-6 priceGroup2">
                                            <ul className="list-group">
                                                {priceArray && priceList(priceArray[1])}
                                            </ul>
                                        </div>
                                    </>
                                }
                            </div>                           
                        </div>      
                    </div> 
                </div>   
            </div> 
            <div className="row">
                <div className="col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark text-center" style={{margin: "10px 0px"}}>
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
                {dryCleanInfo.sameDayService &&
                    <div className=" mb-5 col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                        <span style={{textAlign:"center"}}><h1>Same Day Information</h1></span>
                        <textarea class="form-control dashInput" rows="3" value={sameDayInfo === null ? "Tell us about your same day service" : sameDayInfo} onChange={(e)=> editInfo(e, "sameDayInfo")}></textarea>
                        <div style={{textAlign:"right"}}>
                            <button onClick={()=> setEdit3(!edit3)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit3 ? "Cancel" : "Edit"}</button> 
                            <button onClick={()=> infoHandler("sameDayInfo")} type="submit" className="btn btn-success" style={!edit3 ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                        </div>
                    </div>
                }
                
            </div>
            {/* if no pricelists exist, don't display:  */}
            {tableExists && 
                <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>No longer offering this service?</h4>
                        </div>
                    </div>
                    {/* component for deleting price list (pass in url) */}
                    <Deleter url={`/api/dry-cleaning-prices/${name}`}/>
                </>
            }  
        </>
    )
}

export default DashboardDryCleaning;