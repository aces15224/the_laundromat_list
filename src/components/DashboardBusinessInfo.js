import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';

//timeArray is for setting and displaying hours
const {timeArray} = require("../components/DateTime");

const BusinessInfo = ({name, phone, address, category, hours, website, street, zip, city, setLink, update})=>{
    const [businessHours, setBusinessHours] = useState(hours);
    const [businessPhone, setBusinessPhone] = useState("");
    const [businessWebsite, setBusinessWebsite] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");
    const [businessStreet, setBusinessStreet] = useState("");
    const [businessCity, setBusinessCity] = useState("");
    const [businessZip, setBusinessZip] = useState("");
    const [businessState, setBusinessState] = useState("");
    const [closingArray] = useState(timeArray);

    //References for CSS and Error Messages
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");
    const inputStreet = document.getElementById("inputAddress");
    const inputCity = document.getElementById("inputCity");
    const inputZip = document.getElementById("inputZip");
    const inputState = document.getElementById("inputState");
    const successMessage = document.getElementsByClassName("success")[0];
    const day = document.getElementById("day");
    const open = document.getElementById("open");
    const close = document.getElementById("close");

    //control value for determining if inputs are valid
    let validation = true;

    const listItemText = {fontSize: ".9rem"};

    useEffect(()=>{
        window.scroll(0,0);
        //set state according to state listed in props
        address.includes("MO") ? setBusinessState("MO") : setBusinessState("KS");
        //reset state values upon rendering
        setBusinessHours(hours);
        setBusinessPhone("");
        setBusinessWebsite("");
        setBusinessName("");
        setBusinessCategory("");
        setBusinessStreet("");
        setBusinessCity("");
        setBusinessZip("");
        setBusinessState("");
    }, [name, phone, address, category, hours, website, street, city, zip, closingArray]);

    //reset errors and remove CSS highlights
    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        } 
        inputState.style.border = "1px solid #ced4da";
    }

    //update existing hours
    const updateHours=(e)=>{
        e.preventDefault();
        //collect day, opening, and closing values
        const _day = day.value;
        const _open = open.value;
        const _close = close.value;


        //update formats hours (EX. "10am-9pm" or "Open 24 hours")
        const update = (_open === "Open 24 Hrs" || _close === "Open 24 Hrs") ? "Open 24 Hrs" : _open === close ? "Open 24 Hrs" : `${_open}-${_close}`;
        const updatedHours = {};

        //If Day is already Listed....
        if(businessHours.hasOwnProperty(_day)){
            //cycle through business hours and find day...
            for(let i in businessHours){
                if(i === _day){
                    // replace iteration with updated hours
                    updatedHours[i] = update;
                } else{
                    //or keep existing hours
                    updatedHours[i] = businessHours[i]
                }
            } 
            //set state with updated hours
            setBusinessHours(updatedHours);
        } else{
            //if day isn't listed...
            for(let i in businessHours){
                // keep existing hours add....
                updatedHours[i] = businessHours[i]
            }
            // add new entry containing updated hours.  then send to organizing function
            updatedHours[_day] = update; 
            organizeHours(updatedHours);  
        }

        //reset select inputs
        close.selectedIndex = "0";
        open.selectedIndex = "0";
        day.selectedIndex = "0";
    };

    //Function organizes hours by day (in order M-F) and sets State
    const organizeHours = (obj)=>{
        const week = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        const orderedObj = {};
        week.forEach((day)=>{
            for(let i in obj){
                if(i === day){
                    orderedObj[i] = obj[i]
                }
            }
        });       
        setBusinessHours(orderedObj);
    };

    const updateEstablishment = async (name, category, website, newPhone, address, city, zip, coords)=>{
        const hours = JSON.stringify(businessHours)
        await fetch(`/api/${name}`, {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessName: name,
                businessAddress: address,
                businessHours: hours,
                businessLocation: coords,
                categoryName: category,
                phone: newPhone,
                website: website,
                zip: zip,
                city: city
            })
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            //when complete, reset errors, display success message, and remove message after 3 seconds
            reset();
            successMessage.innerHTML = "Information Successfully Updated!";
            setTimeout(()=>{
                successMessage.innerHTML = "";
                //update state in parent and force re-render
                update()
            }, 3000)
            
        })        
    };

    //find coordinates for updated address and...
    const locationFinder = async(name, category, website, newPhone, street, city, zip, fullAddress)=>{
        await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_KEY}&street=${street}&city=${city}&state=${businessState}&postalCode=${zip}`)
        .then(response => response.json())
        .then(data=> {
            if(data){
                const results = data.results[0].locations;
                if(results.length === 1){
                    // if results exists send info to api
                    const coords = results[0].latLng;
                    updateEstablishment(name, category, website, newPhone, fullAddress, city, zip, JSON.stringify(coords));
                } else{
                    //else display error messages and CSS
                    errorMessages[3].innerHTML = "Address not found.  Check highlighted fields and try again.";
                    errorIcons[3].style.opacity = 1;
                    errorIcons[4].style.opacity = 1;
                    errorIcons[5].style.opacity = 1;
                    inputStreet.style.border = "1px solid red";
                    inputCity.style.border = "1px solid red";
                    inputZip.style.border = "1px solid red";
                    inputState.style.border = "1px solid red";
                }
            }
        })  
    };

    const openingOptions = timeArray.map((time)=>{
        if(time === "Open 24 Hrs"){
            return(
                <option value={time}>{"24hrs"}</option>
            ) 
        } else{
            return(
                <option value={time}>{time}</option>
            )    
        }    
    });

    const closingOptions = closingArray.map((time)=>{
        if(time === "Open 24 Hrs"){
            return(
                <option value={time}>{"24hrs"}</option>
            ) 
        } else{
            return(
                <option value={time}>{time}</option>
            )    
        }
    });
 
    // Remove Day/Hour List
    const filterTime = (e, day)=>{
        e.preventDefault();
        const updatedHours = {};
        Object.keys(businessHours).forEach((time)=>{
            //returns all hours but the one the user clicked to remove and sets state
            if(time !== `${day}`){
                updatedHours[time] = businessHours[time];
            }
        });
        setBusinessHours(updatedHours);
    };

    //Displays Current Hours and adds a button to Remove Days/Hours
    const business_Hours = Object.keys(businessHours).map((hour, index)=> {
        const contentStyle = {width: "33%"}
        const liStyle = {padding: "0px 0px 10px 0px"}
        let day = hour;
        //Full Day returns unabbreviated Day
        let fullDay = day === "Mo" ? "Monday" : day === "Tu" ? "Tuesday" : day === "We" ? "Wednesday" : day === "Th" ? "Thursday" : day === "Fr" ? "Friday" : day === "Sat" ? "Saturday" : "Sunday";
        let time = businessHours[hour];
        return(
            <li className="optionLi list-group-item" key={index} style={liStyle}>
                <div className="options-div">
                    <p className="li-p" style={contentStyle}>{fullDay}:</p>
                    <p className="li-p" style={contentStyle}>{time}</p>
                    <button className="link-buttons li-p" style={contentStyle} onClick={(e)=>filterTime(e, day)}>Remove</button>    
                </div>
            </li>
        )
    })

    //validate phone number and return formatted value
    const phoneConversion = ()=>{
        //remove white space
        const _businessPhone = businessPhone.trim()

        // return prop value for phone if input is empty...
        if(_businessPhone === ""){
            return phone;
        } else{
            //otherwise, remove non numbers on both prop value and input value... 
            let currentPhone = _businessPhone.replace(/[^0-9]+/g, '');
            phone = phone.replace(/[^0-9]+/g, '');
            if(currentPhone.length >= 1 && currentPhone.length < 10){
                // if input is not required length, validation has failed, and error messages are displayed
                validation = false;
                errorMessages[1].innerHTML = "Please input a valid Phone Number";
                errorIcons[1].style.opacity = 1;
                document.getElementById("businessPhone").style.border = "1px solid red";
            } else{
                //if input value and prop value are equal, just return prop...
                if(currentPhone === phone){
                    return phone;
                } else{
                    //otherwise, format new phone number (EX. (123)-456-7899 ) and return...
                    let newPhone = "";
                    let phoneMatch = currentPhone.match(/(\d{3})(\d{3})(\d{4})/);
                    newPhone = `(${phoneMatch[1]})${phoneMatch[2]}-${phoneMatch[3]}`;
                    return newPhone;
                }
            }
        }
    };

    // Function for validating input values
    const validateFunction = (_businessName, _businessWebsite, _businessCategory, _businessStreet, _businessCity, _businessZip)=>{
        //validate phone and return formatted version
        let updatePhone = phoneConversion();

        //Check if input values are acceptable.  If not, display error Message.  
        if(_businessName.length < 2 || _businessStreet.length < 3 || (_businessWebsite !== "No Website Listed" && _businessWebsite.length < 3) || _businessCity.length < 1 || _businessZip.length < 5  ){
            validation = false;
            if(_businessName.length < 2){
                errorMessages[0].innerHTML = "Business names must be more than 2 characters";
                errorIcons[0].style.opacity = 1;
                document.getElementById("businessName").style.border = "1px solid red";
            }

            if(_businessStreet.length < 3){
                errorMessages[3].innerHTML = "Please input a valid Street Address";
                errorIcons[3].style.opacity = 1;
                inputStreet.style.border = "1px solid red";

                
            }
            if(_businessWebsite !== "No Website Listed" && _businessWebsite.length < 3){
                errorMessages[2].innerHTML = "Please input a valid Website";
                errorIcons[2].style.opacity = 1;
                document.getElementById("website").style.border = "1px solid red";
            }
            if( _businessCity.length < 1){
                errorMessages[4].innerHTML = "Please input a valid City Name";
                errorIcons[4].style.opacity = 1;
                inputCity.style.border = "1px solid red";
            }
            if( _businessZip.length < 5){
                errorMessages[6].innerHTML = "Please input a valid Zip Code";
                errorIcons[6].style.opacity = 1;
                inputZip.style.border = "1px solid red";
            }
        }
        
        //format address (EX 112 Street St., Big City, Texas 12345)
        let updateAddress = `${_businessStreet}, ${_businessCity}, ${businessState} ${_businessZip}`;
        
        //if inputs are valid, and the updated address is the same as was already listed, simply update the database....
        if(validation === true){
            if(updateAddress === address){
                updateEstablishment(_businessName, _businessCategory, _businessWebsite, updatePhone, updateAddress, _businessCity, _businessZip);

            } else{
                // otherwise, get coordinates for new address...
                locationFinder(_businessName, _businessCategory, _businessWebsite, updatePhone, _businessStreet, _businessCity, _businessZip, updateAddress);
            }    
        }
    };

    const onSubmit = (e)=>{
        e.preventDefault();
        reset();
        window.scroll(0,0);

        //__variables trim state variables
        let _businessName = businessName.trim();
        let _businessWebsite = businessWebsite.trim();
        let _businessStreet = businessStreet.trim();
        let _businessCity = businessCity.trim();
        let _businessZip = businessZip.trim();
        
        //update variables// if _example is blank, return corresponding prop, otherwise return _example
        let updateName = _businessName === "" ? name : _businessName;
        let updateWebsite = _businessWebsite === "" && website === null ? "No Website Listed" : _businessWebsite === "" ? website : _businessWebsite;
        let updateCategory = businessCategory === "" && category === null ? "Laundromat" : businessCategory === "" ? category : businessCategory; 
        let updateStreet = _businessStreet === "" ? street : _businessStreet;
        let updateCity = _businessCity === "" ? city : _businessCity;
        let updateZip = _businessZip === "" ? zip : _businessZip;
        //update variables// if _example is blank, return corresponding prop, otherwise return _example

        //updateCity Capitalizes the first letter
        updateCity = updateCity.charAt(0).toUpperCase() + updateCity.slice(1).toLowerCase();

        //send to Validation Function to check for errors
        validateFunction(updateName, updateWebsite, updateCategory, updateStreet, updateCity, updateZip);
        
    };

    return(
        <>  
            <div className="row">
                <div className="col-12 dashboardCol">
                    <h1 className="text-center mb-3 dash-h1">
                        <i className="fas fa-user-plus"></i>Update Business Information
                    </h1> 
                    <div className="success text-center"></div>   
                </div>
            </div>
            <div className="row">
                <div className="offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-7 dashboardCol">
                    <form>
                        <div className="form-group dash-form-group">
                            <label for="inputCategory">Category</label>
                            <select id="inputCategory" className="form-control dashInput" value={businessCategory} onChange={(e)=> {
                                if(e.target.value !== "Choose..."){
                                    setBusinessCategory(e.target.value)
                                }
                            }}>
                                <option selected value="Choose...">Choose...</option>
                                <option value="Laundromat">Laundromat</option>
                                <option value="Dry Cleaning">Dry Cleaning</option>
                                <option value="Laundromat and Dry Cleaning">Laundromat and Dry Cleaning</option>
                            </select>
                        </div>
                        <div className="form-group dash-form-group">
                            <label for="businessName">Name of Business</label>
                            <input
                                type="text"
                                id="businessName"
                                required
                                name="businessName"
                                className="form-control dashInput"
                                onChange={(e)=> setBusinessName(e.target.value)}
                                placeholder={name}
                            />
                            <Icon className="error-icon" icon="bx:bxs-error-circle" />
                            <div className="error"></div>
                        </div>
                        <div className="form-group dash-form-group ">
                            <label for="businessPhone">Business Phone Number</label>
                            <input
                                type="text"
                                id="businessPhone"
                                required
                                name="businessPhone"
                                className="form-control dashInput"
                                value={businessPhone}
                                onChange={(e)=> setBusinessPhone(e.target.value)}
                                placeholder={phone}
                            />
                            <Icon className="error-icon" icon="bx:bxs-error-circle" />
                            <div className="error"></div>
                        </div>
                        <div className="form-group dash-form-group">
                            <label for="website">Website</label>
                            <input
                                type="website"
                                id="website"
                                required
                                name="website"
                                className="form-control dashInput"
                                onChange={(e)=> setBusinessWebsite(e.target.value)}
                                placeholder={website !== null ? website : "None Listed"}
                            />
                            <Icon className="error-icon" icon="bx:bxs-error-circle" />
                            <div className="error"></div>
                        </div>
                        <div className="form-group dash-form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" 
                                className="form-control dashInput" 
                                onChange={(e)=> setBusinessStreet(e.target.value)}
                                id="inputAddress" 
                                placeholder={street}
                            />
                            <Icon className="error-icon" icon="bx:bxs-error-circle" />
                            <div className="error"></div>
                        </div>
                        <div className="form-row">
                            <div className="form-group dash-form-group col-md-6">
                                <label for="inputCity">City</label>
                                <input type="text" 
                                    className="form-control dashInput" 
                                    onChange={(e)=> setBusinessCity(e.target.value)}
                                    id="inputCity" 
                                    placeholder={city}
                                />
                                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                <div className="error"></div>
                            </div>
                            <div className="form-group dash-form-group col-md-4">
                                <label for="inputState">State</label>
                                <select id="inputState" className="form-control dashInput" onChange={(e)=>{
                                    if(e.target.value !== "Choose..."){
                                        setBusinessState(e.target.value);
                                    };
                                }}>
                                    <option selected>Choose...</option>
                                    <option>KS</option>
                                    <option>MO</option>
                                </select>
                                <div className="error"></div>
                            </div>
                            <div className="form-group dash-form-group col-md-2">
                                <label for="inputZip">Zip</label>
                                <input type="text" 
                                    className="form-control dashInput"
                                    onChange={(e)=> setBusinessZip(e.target.value)} 
                                    id="inputZip" 
                                    placeholder={zip}
                                />
                                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                <div className="error"></div>
                            </div>
                        </div>
                    </form>    
                </div>
                <div className="offset-sm-1 col-sm-10  offset-md-1 col-md-10 col-lg-3 dashboardCol">
                    <ul className="dashFormSide" style={{marginTop: "1.4rem"}}> 
                        <li>
                            <p className="sideCaptions">This page is for updating information about your business</p>
                            <p style={listItemText}>Please only include details about your business; such as contact information, location, and operating hours.</p>

                        </li>
                        <li>
                            <p className="sideCaptions">This page is not for updating personal information</p>
                            <p style={listItemText}>If you need to update your account information you may do so by clicking 
                                <button style={{marginLeft: 4}}className="link-buttons" name={"account"} onClick={(e)=>setLink(e)}>here</button>
                            </p>
                        </li>
                       
                        <li>
                            <p className="sideCaptions">Want to update Service or Pricing information?</p>
                            <p style={listItemText}>Click<button style={{marginLeft: 4}}className="link-buttons" name={"services"} onClick={(e)=>setLink(e)}>here</button>
                                to update information about the services your business provides.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-7" style={{padding: "0px 5px 0px 5px", marginTop: "20px"}}>
                    <div className="card bg-dark dashInput" style={{border: "1px solid grey"}}>
                        <div className="card-header text-white text-center dashCardHeader">
                            <h5>Hours of Operation</h5>
                        </div>
                        <div className="card-body text-center" style={{padding: 0}}>
                            <div class="input-group laundryInput">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Day</span>
                                </div>
                                <select id="day" className="form-control dash_business_form"> 
                                    <option value="Mo">Mon</option>
                                    <option value="Tu">Tue</option>
                                    <option value="We">Wed</option>
                                    <option value="Th">Thu</option>
                                    <option value="Fr">Fri</option>
                                    <option value="Sa">Sat</option>
                                    <option value="Su">Sun</option>
                                </select>                        
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Open</span>
                                </div>
                                <select id="open" className="form-control dash_business_form">
                                    {openingOptions}
                                </select>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Close</span>
                                </div>   
                                <select id="close" className="form-control dash_business_form">
                                    {closingOptions}
                                </select>                     
                                <div class="input-group-append">
                                    <button class="btn btn-primary dash_btn" type="button" onClick={(e)=> updateHours(e)}>Add</button>
                                </div>
                            </div>  
                            <ul className="list-group option-ul">
                                {business_Hours}
                            </ul>
                        </div>      
                    </div>    
                </div>                
            </div> 
            <div className="row">
                <div className="offset-md-1 col-md-10 offset-lg-1 col-lg-7" style={{padding: "0px 5px 0px 5px", marginTop: "20px", marginBottom: "20px"}}>
                    <button type="submit" className="btn btn-primary btn-block btn-custom dashInput" onClick={(e)=> onSubmit(e)} >
                        Save
                    </button>
                </div>
            </div>               
        </>
    )
}


export default BusinessInfo;
