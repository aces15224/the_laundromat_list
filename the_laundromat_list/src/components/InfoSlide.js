import React, {useState, useEffect} from "react";

const InfoSlide = ({handleSubmit})=>{
    const [slideCount, setSlideCount] = useState(0)
    const [freePickUp, setFreePickUp] = useState(false);
    const [pickUpFee, setPickUpFee] = useState(null);
    const [minPickUp, setMinPickUp] = useState(false);
    const [pickUpMinimum, setPickUpMinimum] = useState(null);
    const [deliveryPricePerLbs, setDeliveryPricePerLbs] = useState(null);
    const [discount, setDiscount] = useState(false);
    const [deliveryPricePerLbsDiscounted, setDeliveryPricePerLbsDiscounted] = useState(null);
    useEffect(()=>{
        setSlideCount(0)
    },[])

    const handleData = ()=>{
        setSlideCount(0);
        handleSubmit(freePickUp, pickUpFee, pickUpMinimum, deliveryPricePerLbs, deliveryPricePerLbsDiscounted);
    }

    const handleClick = (e)=>{
        const response = e.target.value === "true" ? true : e.target.value === "false" ? false : document.getElementById("servicePrice").value;
        switch(slideCount){
            case 0:
                setSlideCount(slideCount + 1);
                break;
            case 1:
                setSlideCount(response === false ? slideCount + 1 : 3);
                setFreePickUp(response);
                break;
            case 2:
                setPickUpFee(`$${response}`);
                setSlideCount(slideCount + 1);
                break;
            case 3: 
                setSlideCount(response === true ? slideCount + 1 : 5);
                setMinPickUp(response);
                break;
            case 4:
                setPickUpMinimum(`$${response}`);
                setSlideCount(slideCount + 1);
                break;
            case 5:
                setDeliveryPricePerLbs(`$${response}`);
                setSlideCount(slideCount + 1)
                break;
            case 6:
                setSlideCount(response === true ? slideCount + 1 : 8);
                setDiscount(response);
                break;
            case 7:
                setDeliveryPricePerLbsDiscounted(`$${response}`);
                setSlideCount(slideCount + 1)
                break;
            default:
                return false;
        }
    }

    const questions = [
        "Delivery and Pick up Prices",
        "Do you offer free pick up?",
        "What is your pick up fee?",
        "Do you have a minimum price for pickup?",
        "What is your minimum price for pickup?",
        "How much do you charge per lb?",
        "Do you offer a discount for regular delivery?",
        "What is your discounted rate?",
        "Would you like to save?"
    ];

    //converts number to floating number (EX. 2.50)
    const priceConversion = (e)=>{
        const newVal = parseFloat(e.target.value).toFixed(2);
        e.target.value = newVal;
    }
    
    const Button_Group = ()=>{
        if(slideCount > 0){
            return(
                <div className="btn-group">
                    <button type="button" className="btn btn-success" value={true} onClick={(e)=> {handleClick(e)}}>Yes</button>
                    <button type="button" className="btn btn-danger" value={false} onClick={(e)=> {handleClick(e)}}>No</button>
                </div>
            )    
        } else{
            return (
                <button type="button" className="btn btn-secondary btn-lg btn-block" value={true} onClick={(e)=> {handleClick(e)}}>Edit</button>
            )
        }
        
    }

    const Input_Group = ()=>{
        return(
            <div class="input-group">
                <input id="servicePrice" type="number" min="0.00" max="100.00" step="0.01" className="form-control" placeholder="Insert Price" onChange={(e)=>priceConversion(e)}/>
                <div class="input-group-append">
                    <button class="btn btn-primary" type="button" onClick={(e)=> {handleClick(e)}} >Add</button>
                </div>
            </div>    
        )   
    }
    
    const Submit_Buttons = ()=>{
        return(
            <div className="btn-group">
                <button type="button" className="btn btn-success" value={true} onClick={handleData}>Save</button>
                <button type="button" className="btn btn-danger" value={false} onClick={()=> setSlideCount(0)}>Cancel</button>
            </div>    
        )
    }


    return (
        <div className="card text-center">
            <div className="card-header"></div>
                <div className="card-body">
                    <h5 className="card-title">{questions[slideCount]}</h5>
                    {(slideCount < 2 || slideCount === 3 || slideCount === 6) ? Button_Group() : (slideCount > 7) ? Submit_Buttons() : Input_Group()}
                </div>    
            <div className="card-footer text-muted"></div>
        </div>
    )
}

export default InfoSlide;