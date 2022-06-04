import React, {useState, useEffect} from "react";
import Deleter from "./DashboardDeleter";

const DashboardLaundry = ({laundry, name, update, verify, claimed})=>{
    const liStyle = { display: "inline-block", marginBottom: 0, marginTop:10, width: "30%"} 
    const liStyle2 = { display: "inline-block", marginBottom: 0, marginTop:10, width: "45%" } 
    const [edit, setEdit] = useState(false);
    const [overview, setOverview] = useState(null);
    const washInfo = "Please provide a brief description of your Laundromat and the services it provides.  Do not include information not related to your self-service laundry on this page.";

    const [priceList, setPriceList] = useState({
        available: false,
        washer: {
            washerSingle: null,
            washerDouble: null,
            washerTriple: null,
            washerFour: null,
            washerFive: null,
            washerSix: null,
            washerSeven: null,
            washerEight: null,
            washerOptional1: null,
            washerOptional2: null,
            washerOptional3: null
        },
        dryer: {
            dryerRate1:null,
            dryerRate2:null,
            dryerRate3:null,
            dryerRate4:null,
            dryerRate5:null,
            dryerRate6:null,
            dryerRate7:null
        }
    });
    const wash = priceList.washer;
    const dry = priceList.dryer;

    useEffect(()=>{
        //send prop to listMaker to create list of prices
        listMaker(laundry)                      

        // fetchOne()  
    },[laundry]);

    //creates list of prices and sets state
    const listMaker = (obj)=>{
        let info = "";
        const washer = {};
        const dryer = {};
        //sort washer prices, dryerprices, and info and add to variables above...
        for(let i in obj){
            if(i !== "createdAt" && i !== "id" && i !== "updatedAt" && i !== "EstablishmentBusinessName"){
                if(i.includes("washer")){
                    washer[i] = obj[i];
                } else if(i === "laundryAddInfo"){
                    info = obj[i];
                }  else{
                    dryer[i] = obj[i]
                }   
            }  
        }
        //set available to true to indicate priceList exists and set state
        setPriceList({available: true, washer, dryer}) 
        if(info !== ""){
            setOverview(info); 
        }
        
    };

    //submit button functionality// 
    const editOverview = ()=>{
        //set edit to false to prevent further typing
        setEdit(!edit)
        const newObject = {};
        //add overview to newObject
        for(let i in priceList){
            if(i !== "available"){
                if(i === "laundryAddInfo"){
                    newObject[i] = overview;
                } else{
                    newObject[i] = priceList[i];
                }
            } 
        }
        //send to database
        handleData(newObject); 
    };

    //prevents typing if false.  if true, setOverview
    const editInfo = (e)=>{
        if(!edit) return;
        setOverview(e.target.value);
    };

    //converts number to floating number (EX. 2.50)
    const priceConversion = (e)=>{
        const newVal = parseFloat(e.target.value).toFixed(2);
        e.target.value = newVal;
    };

    //creates pricelist
    const dryOptions = ()=>{
        //check if prices exist...
        const dryPrices = Object.keys(dry).every((obj)=>{
            if(dry[obj]===null){
                return true;
            } else{
                return false;
            }
        })
        // if they do, find the correct label and...
        if(!dryPrices){
            return Object.keys(dry).map((price)=>{
                if(dry[price] !== null){
                    let optionLabel = "";
                    const label = price.split(/dryerRate/)[1]
                    // eslint-disable-next-line default-case
                    switch(label){
                        case "1":
                            optionLabel = "Single Load";
                            break;
                        case "2":
                            optionLabel = "Double Load";
                            break;
                        case "3":
                            optionLabel = "Triple Load";
                            break;
                        case "4":
                            optionLabel = "Four Load";
                            break;
                        case "5":
                            optionLabel = "Five Load";
                            break;
                        case "6":
                            optionLabel = "Six Load";
                            break;
                        case "7":
                            optionLabel = "Seven Load";
                            break;
                        default :
                        console.log("nothing to do here")
                    }
                    //return a priceList w/ a button to remove price//
                    return (
                        <li className="optionLi list-group-item">
                            <div className="options-div">
                                <p className="laundry-li-p" style={liStyle2}>{`${optionLabel} Dryers`}</p>
                                <p className="laundry-li-p" style={liStyle}>{dry[price]}</p >
                                <button className="link-buttons li-p" style={liStyle} onClick={()=>editPrices(price, "dryer", "remove")}>Remove</button>    
                            </div>
                            
                        </li> 
                    )    
                }
                
            })
        } else{
            //otherwise return "No Prices"
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li>
            )
        }
    };

    //creates pricelist
    const washOptions = ()=>{
        //check if prices exist...
        const washPrices = Object.keys(wash).every((obj)=>{
            if(wash[obj] === null){
                return true;
            } else{
                return false;
            }
        })
        // if they do, find the correct label and...
        if(!washPrices){
            return Object.keys(wash).map((price)=>{
                if(wash[price] !== null){
                    const label = price.slice(6)
                    let optionLabel = "";
                    switch(label){
                        case "Single":
                            optionLabel = `${label} Load`;
                            break;
                        case "Double":
                            optionLabel = `${label} Load`;
                            break;
                        case "Triple":
                            optionLabel = `${label} Load`;
                            break;
                        case "Four":
                            optionLabel = `${label} Load`;
                            break;
                        case "Five":
                            optionLabel = `${label} Load`;
                            break;
                        case "Six":
                            optionLabel = `${label} Load`;
                            break;
                        case "Seven":
                            optionLabel = `${label} Load`;
                            break;
                        case "Eight":
                            optionLabel = `${label} Load`;
                            break;
                        default:
                            console.log(label)
                    }
                    //return a priceList w/ a button to remove price//
                    return (
                        <li className="optionLi list-group-item">
                            <div className="options-div">
                                <p className="laundry-li-p" style={liStyle2}>{`${optionLabel} Washer`}</p>
                                <p className="laundry-li-p" style={liStyle}>{`${wash[price]}/wash`}</p>
                                <button className="link-buttons li-p" style={liStyle} onClick={()=>editPrices(price, "washer", "remove")}>Remove</button>    
                            </div>
                        </li> 
                    )    
                }   
            })    
        } else{
            //otherwise return "No Prices"
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No prices listed</p> 
                    </div>
                </li> 
            )  
        }
    };

    //add or remove price => setState => sendData
    const editPrices = (price, category, action)=>{
        // category indicates which priceList to edit
        // action indicates wheter to remove or add
        const newObject = {};
        let loadSize;
        let loadPrice;
        if(category === "washer"){
            //get washer size and price
            loadSize = document.getElementById("loadSize").value;
            loadPrice = document.getElementById("washPrice").value;
            //create new washer price obj but KEEP dryer obj because it hasnt' changed
            const washObj = {};                
            const dryObj = dry;
            // cycle through info and add or remove prices
            for(let i in wash){
                if(action === "add"){
                    if(i === loadSize){
                        //add new price
                        washObj[loadSize] = `$${loadPrice}`;
                    } else{
                        //keep old price
                        washObj[i] = wash[i];
                    }
                } else {
                    //set price to null to remove
                    if(i === price){
                        washObj[price] = null;
                    } else{
                        //keep old prices
                        washObj[i] = wash[i];
                    }
                }
            }
            //add all info to price object and send to database
            newObject.washer = washObj;
            newObject.dryer = dryObj;
            handleData(newObject);                
        } 
        else {
            // get dryer size, price, and per minute value
            let val = document.getElementById("dryerPrice").value;
            let min = document.getElementById("perMinute").value
            loadSize = document.getElementById("loadSize2").value;
            //format price (price/per min)
            loadPrice = `${val}/${min}min`;
            //create new dryer list, keep washer list because it hasn't changed
            const washObj = wash;
            const dryObj = {};
            // cycle through dryer price and add or remove prices
            for(let i in dry){
                if(action === "add"){
                    if(i === loadSize){
                        //add new price
                        dryObj[loadSize] = `$${loadPrice}`;
                    } else{
                        //keep old price
                        dryObj[i] = dry[i];
                    }    
                } else {
                    //set price to null to remove
                    if(i === price){
                        dryObj[price] = null;
                    } else{
                        //keep old prices
                        dryObj[i] = dry[i];
                    }
                }                
            }
            //add all info to price object and send to database
            newObject.washer = washObj;
            newObject.dryer = dryObj;
            handleData(newObject) 
        }
    };

    const handleData = (obj)=>{
        // if business isn't verified don't allow the user to edit
        if(!verify || !claimed) return false; 
        
        //priceObject includes washer prices already...
        const priceObject = obj.washer;
        //add dryer prices and...
        for(let i in obj.dryer){
            priceObject[i] = obj.dryer[i];
        }
        // add pricing info then....
        priceObject.laundryAddInfo = overview;
    
        

        //if priceLists exist, update data, then....
        if(priceList.available){
            fetch(`/api/laundry-prices/${name}`, {
                method: "put",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(priceObject)
            })
            .then(response => response.json())
            .then(data=> {
                console.log(data)
                // set state in dashboard to re-render
                update();
            }); 

        } else{
            // if priceLists don't exist, create a new table
            //set establishment name as a foreign key to reference parent table
            priceObject["EstablishmentBusinessName"] = name;
            fetch("/api/laundry-prices", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(priceObject)
            })
            .then(response => response.json())
            .then(data=> {
                console.log(data)
                // set state in dashboard to re-render
                update();
            })   
        }
    };

    return(
        <>
            <div className="row">
                <div className="offset-1 col-10 text-center dashboardCol">
                    <h2 className="logoFont">Self-Service Laundry</h2>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">General Information</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" rows="5" value={overview === null ? washInfo : overview} onChange={(e)=> editInfo(e)}></textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit(!edit)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit ? "Cancel" : "Edit"}</button> 
                        <button onClick={editOverview} type="submit" className="btn btn-success" style={!edit ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">Add or Remove Prices</h2>
                </div>
            </div>
            <div className="row">
                <div className="mt-3 col-sm-12 offset-md-1 col-md-10 offset-lg-1 col-lg-10" >
                    <div className="card bg-dark dashInput">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5>Wash Prices</h5>  
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor: "white"}}> 
                            <div class="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Size</span>
                                </div>
                                <select class="custom-select" id="loadSize" style={{textAlign: "center"}}>
                                    <option selected value="washerSingle">1x</option>
                                    <option value="washerDouble">2x</option>
                                    <option value="washerTriple">3x</option>
                                    <option value="washerFour">4x</option>
                                    <option value="washerFive">5x</option>
                                    <option value="washerSix">6x</option>
                                    <option value="washerSeven">7x</option>
                                    <option value="washerEight">8x</option>
                                </select>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="washPrice" 
                                    type="number" 
                                    min="0.00" 
                                    max="10.00" 
                                    step="0.25" 
                                    className="form-control" 
                                    placeholder="Price" 
                                    style={{textAlign: "center"}} 
                                    onChange={(e)=>priceConversion(e)}
                                />
                                <div class="input-group-append">
                                    <button class="btn btn-primary dash_btn" type="button" onClick={()=>editPrices(undefined, "washer", "add")}>Add</button>
                                </div>
                            </div>
                            <ul className="list-group">
                                {washOptions()}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-3 mb-5 col-sm-12 offset-md-1 col-md-10 offset-lg-1 col-lg-10" >
                    <div className="card bg-dark dashInput">
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5>Dry Prices</h5>  
                        </div>
                        <div className="card-body text-center" style={{padding: 0, backgroundColor:"white"}}> 
                            <div className="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Size</span>
                                </div>
                                <select className="custom-select" id="loadSize2">
                                    <option selected value="dryerRate1">1x</option>
                                    <option value="dryerRate2">2x</option>
                                    <option value="dryerRate3">3x</option>
                                    <option value="dryerRate4">4x</option>
                                    <option value="dryerRate5">5x</option>
                                    <option value="dryerRate6">6x</option>
                                    <option value="dryerRate7">7x</option>
                                </select>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input id="dryerPrice" type="number" min="0.00" max="10.00" step="0.25" className="form-control" placeholder="0.00" onChange={(e)=>priceConversion(e)}/>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Per</span>
                                </div>
                                <input id="perMinute" type="number" min="0" max="60" step="1" className="form-control" placeholder="Min"/>
                                <div class="input-group-append">
                                    <button class="btn btn-primary dash_btn" type="button" onClick={()=>editPrices(undefined, "dryer", "add")}>Add</button>
                                </div>
                            </div>
                            <ul className="list-group">
                                {dryOptions()}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* if no pricelists exist, don't display:  */}
            {priceList.available && 
                <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>No longer offering this service?</h4>
                        </div>
                    </div>
                    {/* component for deleting price list (pass in url) */}
                    <Deleter url={`/api/laundry-prices/${name}`}/>
                </>
            }  
        </>        
    )
}

export default DashboardLaundry;