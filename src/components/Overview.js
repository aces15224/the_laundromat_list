import React, {useState, useEffect} from "react";
import Highlights from "./Highlights";

const Overview = ({info, update, name})=>{
    const [overview, setOverview] = useState(null);
    const [businessName, setBusinessName] = useState(name);
    const [edit, setEdit] = useState(false);
    const [completeCheck, setCompleteCheck] = useState(false)
    const [highlights, setHighlights] = useState([]);
    const [optionList] = useState(["Television", "Arcade", "Toys", "Magazines", "Coffee", "Vending Machine"])
    const [dataBody, setDataBody] = useState({
        wifi: false,
        card: false,
        atm: false,
        dropOff: false,
        delivery: false,
        dryCleaning: false,
        supplies: false,
        Television: false,
        Arcade : false,
        Toys : false,
        Magazines: false,
        Coffee: false,
        Vending: false
    })

    const defaultOverview = "Please provide a general description of your business and the services it offers.  Additional details about specific " +
                            "services can be added by clicking one of the links located directly under the 'Services/Pricing' tab.";

    useEffect(()=>{
        const data = info; 
        // const dataName = data.businessName;
        const dataOverview = data.overview;
        //Set state (overview, name) and send data to a sorting function (optionSort)
        optionSort(data);
        setBusinessName(name);
        setOverview(dataOverview)

    },[info])

    //Sort data and set state for use in Highlight Component & Amenity List  
    const optionSort = (data)=>{
        let dataObject = {};
        // let optionArray = [];
        let highlightArray = [];
        const checkArray = [];
        for(let i in data){
            //if data includes the following properties....
            if(i === "wifi" || i ==="card" || i ==="atm" || i ==="delivery" || i ==="dropOff" || i ==="dryCleaning" || i ==="supplies" || i === "options" ){
                //if property is not options, send to highlight array and add to amenity list (dataObject)
                if(i !== "options"){
                    if(data[i] === true){
                        highlightArray.push(i)
                    }
                    dataObject[i] = data[i];
                } else {
                    //if property is "options", parse object, and check if contents are included in the optionList
                    let parsedArray = JSON.parse(data[i]);                  
                    const listLength = optionList.length;

                    if(parsedArray.length >= 1){
                        for(let i = 0; i < listLength; i++){
                            //if array item isn't included in optionList, indicate that this amenity isn't offered
                            if(parsedArray.indexOf(optionList[i]) === -1){
                                dataObject[optionList[i]] = false;
                            } else{
                            //if array item is included add to highlight component and indicate that amenity is offered, 
                                // optionArray.push(optionList[i])
                                highlightArray.push(optionList[i])
                                dataObject[optionList[i]] = true;
                            }
                        }    
                    } else{
                        //if parsed array is empty, indicate that none of these amenities are offered
                        for(let j = 0; j < optionList.length; j++){
                            dataObject[optionList[j]] = false;
                        }
                    }       
                }
                
            }
        }  
  
        //push item to a check array and....
        for(let i in dataObject){
            checkArray.push(dataObject[i]);
        }
        //check if each item in array (Profile Todos) have been completed...
        const checkFunction = checkArray.every(bool => bool === true);

        //if so, do not display profile todo list
        if(checkFunction){
            setCompleteCheck(true)
        } else{
            setCompleteCheck(false)
        }
        setHighlights(highlightArray);
        setDataBody(dataObject); 
    }

    //handle whether the overview can be edited
    const editOverview = (e)=>{
        if(!edit){
            //If edit button is not clicked, do not allow overview to be edited
            return false;
        } else{
            //otherwise set the overview with the text entered
            setOverview(e.target.value)
        }
    }

    
    //Send data to API and update state to reflect changes
    const sendData = (object, array)=>{
        let obj = {};
        //if amenity isn't included it is false, mark it as true....
        for(let i in object){
            if(!optionList.includes(i)){
                obj[i] = object[i]
            }
        }
        obj.options = array;
        obj.overview = overview;
        // send object to database
        fetch(`/api/${businessName}`, {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            //update Dashboard and re-render w/ new info
            update();
        }) 

    }
    //submit button -- sets edit and sends data
    const handleOverview=()=>{
        setEdit(!edit)
        addOrSubtractOptions();
    }

    const priceAlert = (service, action)=>{
        //function for setting and displaying message 
        //if service has been removed, message will indicate the user must still remove price list
        let message;
        let info = document.getElementById("pricing-alert");
        let infoAdd = document.getElementById("pricing-add");
        let infoSub = document.getElementById("pricing-sub") 
        if(action === "add"){
            message = `${service} Services added.`;
            infoAdd.style.display = "block";

        } else{
            message = `${service} Services removed.`;
            infoSub.style.display = "block";  
        }

        info.innerHTML = message;
        
        //timeout removes message after 5 seconds
        setTimeout(()=>{
            infoAdd.style.display = "none";
            infoSub.style.display = "none"; 
            info.innerHTML = "";
        }, 5000)
    }

    //Function for adding and subtracting from amenity list
    const addOrSubtractOptions = (e, action)=>{
        //check if event is related to a button or a function
        const search = e === undefined ? null : e.target.dataset.name;
        let parsedArray = [];
        if(search ==="delivery" || search ==="dropOff" || search ==="dryCleaning"){
            //if search matches a price list label then send to priceAlert() and display further directions
            const label = search === "dryCleaning" ? "Dry Cleaning" : search === "dropOff" ? "Drop Off" : "Delivery";
            priceAlert(label, action);
        }

        //set state with new amenity and options && send data to api
        setDataBody((prevState => {
            let newObject = {}
            for(let i in prevState){
                if(i === search){
                    newObject[i] = !prevState[i];
                } else{
                    newObject[i] = prevState[i];
                } 

                if(optionList.includes(i)){
                    if(newObject[i] === true){
                        parsedArray.push(i)
                    }
                }
            }
            //Stringify parsed array to store in database
            const arrayString = JSON.stringify(parsedArray);
            sendData(newObject, arrayString);
            return newObject;
        }))    
    }

    //State Object (amenities) converted to array and mapped for Amenity List  
    const dataKeys = Object.keys(dataBody);
    
    return(
        <>
            <div className="row price-div">
                <div className="offset-1 col-10 text-center dashboardCol">
                    <h2 className="dashHeaders">Business Overview</h2>
                </div>
            </div>   
            <div className="row">
                <div className="offset-lg-1 col-lg-10">
                    <textarea className="form-control dashInput" 
                        rows="5" 
                        value={overview === null ? defaultOverview :  overview}
                        onChange={(e)=> editOverview(e)}>
                    </textarea>
                    <div style={{textAlign:"right"}}>
                        <button onClick={()=> setEdit(!edit)} className={edit ? "btn btn-danger":"btn btn-secondary"}>{edit ? "Cancel" : "Edit"}</button> 
                        <button onClick={handleOverview} className="btn btn-success" style={!edit ? {display:"none"} : {display: "inline-block"}}>Submit</button>    
                    </div>
                       
                </div>
            </div>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">Business Highlights</h2>
                </div>
            </div>
            <div className="row price-div">
                <div className="d-none d-md-block offset-1 col-lg-10 text-center">
                    <p>These are the amenities that your business currently offers.  
                        Consider adding to this list to showcase what makes your business unique!
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="d-none d-md-block col-md-12 offset-lg-1 col-lg-10">
                    {highlights.length > 0 ? <Highlights options={highlights}/> : <Highlights options={["You do not currently list any amenities"]}/>}
                </div>
            </div>
            <div className="row price-div d-none d-md-block">
                <div className="col-12 text-center">
                    <h2 className="dashHeaders">Want to add something?</h2>
                </div>
            </div>  
            <div className="row">
                <div className="col-12 text-center">
                    <div id="pricing-alert"></div>
                    <div id="pricing-add"><b>Add Pricing &#38; Details</b> by clicking <b>Services/Pricing</b></div>
                    <div id="pricing-sub"><b>Remove Pricing &#38; Details</b> by clicking <b>Services/Pricing</b></div>
                </div>
            </div>          
            <div className="row">
                <div className="col-sm-12 col-md-12 offset-lg-1 col-lg-10">
                    <div className="row">
                        <div className="col-md-6 col-lg-6">
                            <div className="card bg-dark highlightCard">
                                <div className="card-header text-white text-center dashCardHeader">
                                    <h5>Add Highlight</h5>  
                                </div>
                                <div className="card-body" style={{backgroundColor: "white"}}>
                                    <ul className="optionUl" style={{maxWidth: "250px", margin: "auto"}}>
                                    {!completeCheck ? dataKeys.map((opt)=>{       
                                            if(dataBody[opt] === false){
                                                const option = opt === "dryCleaning" ? "Dry Cleaning" : opt === "dropOff" ? "Drop Off" : opt;
                                                return (
                                                    <li className="optionLi">
                                                        <div className="options-div">
                                                            {option.toUpperCase()}
                                                            <button className="link-buttons" data-name={opt} onClick={(e)=>addOrSubtractOptions(e, "add")}>Add</button>    
                                                        </div> 
                                                    </li>
                                                )    
                                            }                                 
                                        }) : <li className="optionLi">You've added Everything!  Good Job!</li> }
                                    </ul>
                                </div>
                            </div>          
                        </div>
                        <div className="col-md-6 col-lg-6 mb-5">
                            <div className="card bg-dark highlightCard">
                                <div className="card-header text-white text-center dashCardHeader">
                                    <h5>Remove Highlight</h5>  
                                </div>
                                <div className="card-body" style={{backgroundColor: "white"}}>
                                    <ul className="optionUl" style={{maxWidth: "250px", margin: "auto"}}>
                                        {dataKeys.map((opt)=>{  
                                            if(dataBody[opt] === true){
                                                const option = opt === "dryCleaning" ? "Dry Cleaning" : opt === "dropOff" ? "Drop Off" : opt;
                                                return (
                                                    <li className="optionLi">
                                                        <div className="options-div">
                                                            {option.toUpperCase()}
                                                            <button className="link-buttons" data-name={opt} onClick={(e)=>addOrSubtractOptions(e, "sub")}>Remove</button>    
                                                        </div> 
                                                    </li>
                                                )    
                                            }                               
                                        })}
                                    </ul>
                                </div>

                            </div>          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Overview;