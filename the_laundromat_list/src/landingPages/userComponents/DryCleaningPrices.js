import React, {useState, useEffect} from "react";

const DryCleaningPrices = ({prices, deliver})=>{
    console.log(deliver)
    const [info, setInfo] = useState({
        addInfo: null,
        addInfo2: null,
        addInfo3: null,
        outerwear:{},
        pants: {},
        shirts: {},
        dress: {},
        misc: {},
        delivery: false,
        sameDayService: false,
        sameDayInfo: null
    })

    useEffect(()=>{
        const priceList = prices; 
        let addInfo;
        let addInfo2;
        let addInfo3;
        let sameDayInfo;
        let sameDayService;
        let delivery = deliver;
        const outerwear= {};
        const pants = {};
        const shirts = {};
        const dress = {};
        const misc = {}
        for(let i in priceList){
            let currentPrice = priceList[i];
            if(currentPrice !== null){
                if(i.includes("Prices")){
                    //currentPrice = "Item + Price + Category"
                    //split currentprice at "+"
                    let value = currentPrice.split("+")
                    //label is last value of split array.  Pop it and save value.
                    let label = value.pop();
                    //propName is the Item
                    let propName = value[0];
                    //propVal is the price
                    let propVal = value[1];
                    //Assign key/values to objects based on corresponding labels
                    if(label === "Outerwear"){
                        outerwear[propName] = propVal;
                    }
                    else if(label === "Shirts"){
                        shirts[propName] = propVal;
                    }
                    else if(label === "Pants"){
                        pants[propName] = propVal;
                    }
                    else if(label === "Dress Clothes"){
                        dress[propName] = propVal;
                    }
                    else{
                        misc[propName] = propVal;
                    }
                }
                else{
                    // eslint-disable-next-line default-case
                    switch(i){
                        //assign remaining values to corresponding variables
                        case "addInfo":
                            addInfo = currentPrice;
                            break;
                        case "addInfo2":
                            addInfo2 = currentPrice;
                            break;
                        case "addInfo3":
                            addInfo3 = currentPrice;
                            break;
                        case "sameDayService":
                            sameDayService = currentPrice;
                            break;
                        case "sameDayInfo":
                            sameDayInfo = currentPrice;
                            break;
                    }
                }       
            }   
        } 
        setInfo({
            delivery,
            addInfo,
            addInfo2,
            addInfo3,
            outerwear,
            pants,
            shirts,
            dress,
            misc,
            sameDayService,
            sameDayInfo
        })
    },[prices])

    let categoryCount = 0;
    let outerTF = false;
    let pantTF = false;
    let dressTF = false;
    let shirtTF = false;
    let miscTF = false;
    let outerLength = false;
    let pantLength =  false;
    let shirtLength =  false;
    let dressLength =  false;
    let miscLength =  false;                       
    
    //Cycle through info check for prices.  Set category to true if prices are available.
    for(let i in info){
        if(i ===  "outerwear" || i ===  "pants" || i ===  "shirts" || i ===  "dress" || i === "misc"){
            console.log(i)
            if(Object.keys(info[i]).length !== 0){
                //Increment Category for each price list available
                categoryCount ++;
                if(i === "outerwear"){
                    outerLength = true;
                } else if(i === "pants"){
                    pantLength = true;
                } else if(i === "shirts"){
                    shirtLength = true;
                } else if( i === "dress"){
                    dressLength = true;
                } else{
                    miscLength = true;
                }
            }
        }
    }

    const outerwear = ()=>{
        const category = info.outerwear;
        //set outerTF to true to prevent outerwear from being called twice
        outerTF = true;
        // create array of keys to map over....
        return Object.keys(category).map((price, index)=>{
            //return card w/ label and price
            return(
                <>
                    <div className="card individual-price-card">
                        <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                            <p className="cardText">{price}</p>
                            <p className="cardText">{category[price]}</p >
                        </div>
                    </div>
                </>
            )
        });    
    }
    
    const pants =()=>{
        const category = info.pants;
        //set pantTF to true to prevent outerwear from being called twice
        pantTF = true;
        // create array of keys to map over....
        return Object.keys(category).map((price, index)=>{
            //return card w/ label and price
            return(
                <>
                    <div className="card individual-price-card">
                        <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                            <p className="cardText">{price}</p>
                            <p className="cardText">{category[price]}</p >
                        </div>
                    </div>
                </>
            )
        });    
    } 
    const shirts = ()=>{
        const category = info.shirts;
        //set shirtTF to true to prevent outerwear from being called twice
        shirtTF = true;
        // create array of keys to map over....
        return Object.keys(category).map((price, index)=>{
            //return card w/ label and price
            return(
                <>
                    <div className="card individual-price-card">
                        <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                            <p className="cardText">{price}</p>
                            <p className="cardText">{category[price]}</p >
                        </div>
                    </div>
                </>
            )
        });    
    } 
    const dress = ()=>{
        const category = info.dress;
        //set dressTF to true to prevent outerwear from being called twice
        dressTF = true;
        // create array of keys to map over....
        return Object.keys(category).map((price, index)=>{
            //return card w/ label and price
            return(
                <>
                    <div className="card individual-price-card">
                        <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                            <p className="cardText">{price}</p>
                            <p className="cardText">{category[price]}</p >
                        </div>
                    </div>
                </>
            )
        });    
    }
    const misc = ()=>{
        const category = info.misc;
        //set miscTF to true to prevent outerwear from being called twice
        miscTF = true;
        // create array of keys to map over....
        return Object.keys(category).map((price, index)=>{
            //return card w/ label and price
            return(
                <>
                    <div className="card individual-price-card">
                        <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                            <p className="cardText">{price}</p>
                            <p className="cardText">{category[price]}</p >
                        </div>
                    </div>
                </>
            )
        });    
    }

    const columnCreater = ()=>{
        // If [label]Length is true the price is available.  
        // If [label]TF is false, it has not been displayed yet.  
        // After being displayed, [label]TF is set to true to prevent being displayed twice.
        if(categoryCount === 1){
            //categoryCount =1 wil only display one category of prices
            let title = outerLength && outerTF === false ? "Outerwear" 
                : shirtLength && shirtTF === false ? "Shirts" 
                : pantLength && pantTF === false ? "Pants" 
                : dressLength && dressTF === false ? "Dress Clothes" 
                : miscLength && miscTF === false ? "Miscellaneous" 
                : false; 
            let body = outerLength && outerTF === false ? outerwear() 
                : shirtLength && shirtTF === false ? shirts() 
                :  pantLength && pantTF === false ? pants() 
                : dressLength && dressTF === false ? dress() 
                : miscLength && miscTF === false ? misc() 
                : false;
                //return one card
            return (
                <div className="col-12">
                    <h5 className="text-center">{title}</h5>
                    {body}
                </div>
            )
        } else{
            //if category count > 1, the cards will be divided between 2 arrays
            const array1 = [];
            const array2 = [];
            //for each category, create a card, and divide between arrays based on iteration's divisibility (evens/odds)
            for(let i = 0; i < categoryCount; i++){
                let title = outerLength && outerTF === false ? "Outerwear" 
                : shirtLength && shirtTF === false ? "Shirts" 
                : pantLength && pantTF === false ? "Pants" 
                : dressLength && dressTF === false ? "Dress Clothes" 
                : miscLength && miscTF === false ? "Miscellaneous" 
                : false; 
                let body = outerLength && outerTF === false ? outerwear() 
                : shirtLength && shirtTF === false ? shirts() 
                :  pantLength && pantTF === false ? pants() 
                : dressLength && dressTF === false ? dress() 
                : miscLength && miscTF === false ? misc() 
                : false;
                
                if(i % 2 !== 1){
                    array1.push(
                        <>   
                            <h5 className="text-center">{title}</h5>
                            {body}   
                        </>
                    )    
                } else{
                    array2.push(
                        <>   
                            <h5 className="text-center">{title}</h5>
                            {body}   
                        </>
                    ) 
                }    
            }
            //return the two arrays 
            return(
                <>
                    <div className="row price-div">
                        <div className="col-12 col-sm-12 col-md-6 wash_col">
                            {array1}
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 dry_col">
                            {array2}
                        </div>
                    </div>
                </>
            )
        }
    }
    
    return(
        <>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2>Dry Cleaning Service</h2>
                </div>
            </div>
            {info.delivery &&
                <div className="row price-div">
                    <div className="col-12 text-center">
                        <h5>We deliver!  Check out our delivery page for more infomation!</h5>
                    </div>                        
                </div>
            }
            {/* call columnCreator to determine grid size and display price cards */}
            {columnCreater()}
            {/* if sameday is offered, return following segment */}
            {info.sameDayService === true && 
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
export default DryCleaningPrices;

