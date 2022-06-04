import React, {useState, useEffect} from "react";
import PriceList from "../userComponents/DefaultPriceList";

const DefaultPrices = (props)=>{
    const [priceControls, setPriceControls] = useState({priceList: {}, priceCategory: "laundry", buttons: false})

    //Deliver indicates whether delivery is offered
    const [deliver, setDeliver] = useState(false);
    const [windowMin, setWindowMin] = useState(false);
    const [categoryArray, setCategoryArray] = useState(["laundry", "dropOff", "delivery", "dryCleaning"])

    //Button Labels determined by size of screen
    let deliverKey = window.innerWidth <= 586 ? "Delivery" : "Delivery Service";
    let dropOffKey = window.innerWidth <= 586 ? "Drop Off" : "Drop Off Service";
    let laundryKey = window.innerWidth <= 586 ? "Laundry" : "Self-Service Laundry";

    useEffect(()=>{
        window.addEventListener("resize", resizeHandler);
        //Count tallies the number of Price Lists available
        let count = 0;

        //check business category and use variable to set initial price category/list
        let category = props.category.toLowerCase().includes("laundromat") ? "laundry" : "dry cleaning";
        // let category = "dry cleaning"
        
        //btnBool is t/f that indicates if buttons are displayed
        let btnBool = false;

        //Array of Price Labels
        let _categories = [];

        // Cycle over props and... 
        for(let i in props){
            if(i !== "deliver" && i !== "category"){
                if(props[i] !== null ){
                    //for each price available, increment count, and push label to array 
                    _categories.push(i)
                    count++
                }    
            }      
        }
        //If business category is dry cleaning, sort array so dry cleaning is first index in array...
        //!! This is so business category is always the first button & pricelist displayed !!
        if(category === "dry cleaning" && _categories.includes("laundry")){
            //find index of "dry cleaning" in array
            let index = _categories.indexOf("dryCleaning")
            //use index to remove drycleaning and re-add to beginning of array
            _categories.splice(index, 1);
            _categories.unshift("dryCleaning");
        }

        //setState w/ new category array
        setCategoryArray(_categories);

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

        //function for removing event listener
        return ()=>{ 
            window.removeEventListener("resize", resizeHandler)
        }
    },[props])
    
    

    //if the button boolean is set to true, call this function to display buttons
    const btnGenerator = ()=>{
        const tempProps = props;
        //For each price list, return a button w/ an onClick handler
        const _buttons = categoryArray.map((key, index)=>{
            if(key !== "deliver" && key !== "category"){
                //Label based on "Service"
                let label = key === "delivery" ? deliverKey : key === "dropOff" ? dropOffKey : key === "dryCleaning" ? "Dry Cleaning" : laundryKey;    
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

    //Event Handler (resizer)
    const resizeHandler = ()=>{
        if(window.innerWidth <= 586){
            //if windowMin = false, btnGenerator will be called ONCE when screen size <=586
            if(windowMin === false){
                btnGenerator();
            } 
            //setWindowMin = true so btnGenerator will note continute to be called when screen size decreases
            setWindowMin(true);               
        } else{
            //if windowMin = true, btnGenerator will be called ONCE when screen size >586
            if(windowMin === true){
                btnGenerator();
            }
            //setWindowMin = false so btnGenerator will note continute to be called when screen size increases
            setWindowMin(false);
        }
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

