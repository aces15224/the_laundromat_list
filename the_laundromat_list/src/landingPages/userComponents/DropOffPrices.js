import React, {useEffect, useState} from "react";

const DropOffPrices = ({prices})=>{
    console.log(prices)
    const [info, setInfo] = useState({
        minimum : null,
        generalInfo: null,
        directions: null,
        sameDay: false,
        sameDayInfo: null,
        single: false,
        perLb: "",
        priceObj1: {},
        priceObj2: {}
    })
    useEffect(()=>{
        const tempObject = {};
        const column1 = {};
        const column2 = {};
        let minimum = "";
        let generalInfo = "";
        let directions = "";
        let sameDay = false;
        let sameDayInfo;
        let perLb;
        let count = 0;
        //cycle through props and assign values to corresponding variables
        for(let i in prices){
            //if "i" is a price...
            if(i.includes("dropOffPrices")){
                //split value and assign tempObj a key/value 
                const label = prices[i].split(/-/);
                tempObject[label[0]] = label[1]
            } else if(i.includes("Minimum")){
                minimum = prices[i];
            } else if(i === "dropOffAddInfo"){
                generalInfo = prices[i];
            } else if(i === "dropOffAddInfo2"){
                directions = prices[i];
            } else if(i.includes("sameDayService")){
                sameDay = prices[i];
            } else if(i.includes("sameDayInfo")){
                sameDayInfo = prices[i];
            } else{
                perLb = prices[i];
            }
        }
        //if tempObj has more than two keys...
        if(Object.keys(tempObject).length >=2){
            // cycle through it and count the keys....
            for(let i in tempObject){
                count ++;
                //then assign the values to a column based on count's divisibility
               if(count % 2 !== 0){
                    column1[i] = tempObject[i]
                }
                else{
                    column2[i] = tempObject[i]
                } 
            }
            // ...then set state w/ two priceObjs and remaining info
            setInfo({
                perLb : perLb,
                minimum : minimum,
                generalInfo: generalInfo,
                directions: directions,
                sameDay: sameDay,
                sameDayInfo: sameDayInfo,
                single: false,
                priceObj1: column1,
                priceObj2: column2
            })
        } else{ 
            //otherwise, set state w/ a single object because only 1 price is being displayed
            setInfo({
                perLb : perLb,
                minimum : minimum,
                generalInfo: generalInfo,
                directions: directions,
                sameDay: sameDay,
                sameDayInfo: sameDayInfo,
                single: true,
                priceObj1: tempObject,
                priceObj2: {}
            })    
        }     
    
    },[prices])

    //Function takes in an object (price category) and returns a price card for each item
    const priceColumn = (priceObj)=>{
        //cycle through key list and return a card w/ label and price
        return Object.keys(priceObj).map((price, index)=>{
            return(
                <div className="card individual-price-card">
                    <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                        <p className="cardText">{price}</p>
                        <p className="cardText">{priceObj[price]}</p >
                    </div>
                </div>
            ) 
        })   
    }

    return(
        <>
            <div className="row price-div">
                <div className="col-12 text-center">
                    <h2>Drop-Off Service</h2>
                </div>
            </div>
            {info.generalInfo &&
               <>
                    <div className="row">
                        <div className="offset-1 col-10 text-center">
                            <p className="price-card-info">{info.generalInfo}</p>
                        </div>
                    </div>
                </>
            }
            {info.directions &&
                <>
                    <div className="row">
                        <div className="col-12 text-center">
                            <h4>Instructions</h4>
                        </div>
                    </div>
                    <div className="row price-div">
                        <div className="col-12 text-center">
                            <p className="price-card-info">{info.directions}</p>
                        </div>
                    </div>
                </>
            }
            <div className="row">
                <div className="col-12 text-center">
                    <h5>{(info.minimum !== "Enter Info") ? `Minimum Price for Drop Off Services: ${info.minimum}`: "No Minimum Price for Drop Off Services"}</h5>
                </div>
            </div>
            {info.perLb &&
                <div className="row">
                    <div className="col-12 text-center">
                        <h6>Price per lb: {info.perLb}</h6>
                    </div>
                </div>
            }
            {/* if one price, return 1 priceColumn. Else, return 2.  Pass in priceObj as argument */}
            {info.single === false ?
                <div className="row price-div">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 dropOff_col1">{priceColumn(info.priceObj1)}</div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6 dropOff_col2">{priceColumn(info.priceObj2)}</div>
                </div> 
                :
                <div className="row price-div">
                    <div className="col-12">{priceColumn(info.priceObj1)}</div>
                </div> 
            }
            
            {/* {info.sameDay === true && 
                <>
                    <div className="row price-div">
                        <div className="col-12 text-center">
                            <h6>Same Day</h6>
                        </div>                        
                    </div>
                    <div className="row">
                        <div className="col-12 text-center">
                            {info.sameDayInfo ? info.sameDayInfo : "We offer same day service!  Please call for details!"}
                        </div>
                    </div>
                </>
            } */}
            

        </>
    )
}
export default DropOffPrices;
