import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

function ResultCard(props){  
    //card style will determine which CSS styles should be used
    //card style is dependent on the page the result card is featured in  
    const [cardStyle, setCardStyle] = useState(1);
    const {
        businessName,
        options,
        imageUrl,
        dropOff,
        delivery,
        distance,
        open,
        opening,
        closing,
        wifi    
    } = props.props;

    //Image to display if no other image is listed
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png";  

    //create copy of options prop.  If null, set to empty array to reference length
    let optionCopy = options !== null ? options : [];;

    //Offerings returns an array of Amenities (labels only)
    const offerings = amenityLabels();

    //Traffic is how busy establishment is at a given time and..
    let traffic = props.occupancyPercent;
    // is passed to checkBusyTimes() to return corresponding badges
    let busyTimes = checkBusyTimes();

    //Hours displays operating hours and determines which (Open or Closed) badge should be used 
    let hours = (open === true) ? 
    <div className="badge badge-success badgeStyle">{props.hours === "Open 24 Hrs" ? "" : "Open till: "}{closing}</div> : 
    <div className="badge badge-danger badgeStyle">{props.hours === "Open 24 Hrs" ? "" : "Opens at: "}{opening}</div>

    useEffect(()=>{
        setCardStyle(props.cardStyle);
    }, [props])

    // Details Button Functionality
    function btnHandler(){
        //when clicked, a new page is opened to the specified business page
        window.open(`/business/laundromat/${businessName}`, "_blank") || window.location.open(`/business/laundromat/${businessName}`);
    };
    
    //Returns an array of amenity labels that will be displayed in card
    function amenityLabels(){
        const offerings = [];
        if(wifi === true){
            offerings.push("Free Wi-Fi")
        }
        if(JSON.parse(optionCopy).length >=1){
            offerings.push("Entertainment")
        }
        //If both services are offered, push "Drop Off & Delivery", otherwise push individual service
        if(dropOff === true && delivery === false){
            offerings.push("Drop Off Service")
        } else if(delivery === true && dropOff === false){
            offerings.push("Delivery Service")
        } else if(delivery === true && dropOff === true){
            offerings.push("Drop Off & Delivery")
        }
        return offerings;
    }

    //Map options array and return a label along w/ a check mark for display
    let features = offerings.map((option, index)=>{
        return <li className="listStyle" key={index}><i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
        {option}</li> 
    })

    //Check traffic and return corresponding badge for display
    function checkBusyTimes (){
        if(traffic === "unknown"){
            return (<div className="badge badge-secondary badgeStyle">Unknown Traffic</div>)
        } else{
            if(traffic < 35){
                return (<div className="badge badge-secondary badgeStyle">Not Busy</div>)
            } else if(traffic >= 35 && traffic < 60){
                return (<div className="badge badge-info badgeStyle">Mildly Busy</div>)
            } else if(traffic >= 60 && traffic < 85){
                return (<div className="badge badge-warning badgeStyle">Busy</div>)
            } else{
                return <div className="badge badge-danger badgeStyle">Very Busy</div>
            }    
        }
         
    }

    //check if profile image is an image file or a url
    const filetypes = /jpeg|jpg|png|gif|pdf/.test(imageUrl);
    const webCheck = /https|www/.test(imageUrl);
      
    return (
        <div className={cardStyle === 2 ? "card resultCard" : "card resultCard1"}>
            <div className="row">
                <div id="col-img" className='col-4'>
                    {/* if image is empty or null, return default image.  If it's a url or an image file, return image, otherwise display picture saved on file */}
                    <img src={(imageUrl === "" || imageUrl === null) ? defaultImage : webCheck === true ? imageUrl : filetypes === true ? process.env.PUBLIC_URL + `/uploads/resized/${imageUrl}` : imageUrl} 
                        className={cardStyle === 2 ? "searchPic" : "searchPic1"}
                        alt="Business Preview" 
                    />
                </div>
                <div id="col-title" className='col-8'>
                    <div style={{display:"flex", justifyContent: "space-between"}}>
                        {/* card style determines styling.  if business name is greater than 25 characters, shorten it to fit */}
                        <div className={cardStyle === 2 ? "searchTitle" : "searchTitle1"}>{`${props.rank + 1}. ${(businessName.length > 25) ? businessName.slice(0, 24) + "..." : businessName}`}</div>
                        <div className="results-address">
                            <Icon icon="mdi:map-marker-radius" style={{fontWeight: "bold", fontSize: "1.5em"}}/>
                            {/* distance shows if business is in specified area code.  If no, display distance.  Else, display message */}
                            <p>{distance === 0 ? "In Your Area" : distance}</p>
                        </div>   
                    </div>
                    <div className='row'>
                        <div id="col-btn-list" className='col-5'>
                            {hours}
                            {busyTimes}
                            <div className="badge badge-primary badgeStyle" onClick={btnHandler}>Click for Details</div>                                
                        </div>
                        <div className='col-7'>
                            {/* if there are no features, display "Wash Only", otherwise display Feature list */}
                            {(features.length === 0) ? 
                                <li className="listStyle" key={businessName + 1}>
                                    <i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
                                    Wash Only
                                </li>
                                : features
                            }                            
                        </div>
                    </div>
                </div>  
            </div>
        </div> 
    )  
}


export default ResultCard;
