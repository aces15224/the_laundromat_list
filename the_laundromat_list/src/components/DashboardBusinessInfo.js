import React, {useState, useEffect} from "react";
const {timeArray} = require("../components/DateTime");

export const BusinessInfo = ({name, phone, address, category, hours, website, street, zip, city, setLink, updateCall})=>{
    const [businessHours, setBusinessHours] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [businessWebsite, setBusinessWebsite] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessCategory, setBusinessCategory] = useState("");
    // const [businessAddress, setBusinessAddress] = useState("");
    const [businessStreet, setBusinessStreet] = useState("");
    const [businessCity, setBusinessCity] = useState("");
    const [businessZip, setBusinessZip] = useState("");
    const [businessState, setBusinessState] = useState("");
    const [closingArray, setClosingArray] = useState(timeArray);
    const listItemText = {fontSize: ".9rem"};
    useEffect(()=>{
        address.includes("MO") ? setBusinessState("MO") : setBusinessState("KS");

    }, [name, phone, address, category, hours, website, street, city, zip, closingArray]);

    const updateHours=(e)=>{
        e.preventDefault();
        const day = document.getElementById("day").value;
        const open = document.getElementById("open").value;
        const close = document.getElementById("close").value;

        if(open === close){
            console.log("No")
        }

        const update = (open === "Open 24 Hrs" || close === "Open 24 Hrs") ? "Open 24 Hrs" : `${open}-${close}`;
        const updatedHours = {}
        if(businessHours.hasOwnProperty(day)){
            for(let i in businessHours){
                if(i === day){
                    updatedHours[i] = update;
                } else{
                    updatedHours[i] = businessHours[i]
                }
            } 
            setBusinessHours(updatedHours);
        } else{
            for(let i in businessHours){
                updatedHours[i] = businessHours[i]
            }
            updatedHours[day] = update; 
            organizeHours(updatedHours);  
        }

        //reset function
        document.getElementById('close').selectedIndex = "0";
        document.getElementById('open').selectedIndex = "0";
        document.getElementById('day').selectedIndex = "0";
        //reset function
    };

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
        await fetch(`/api/${businessName}`, {
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
                city:city
            })
        })
        .then(response => response.json())
        .then(data=> 
            console.log(data)
        )        
    };

    const locationFinder = async(name, category, website, newPhone, street, city, zip, fullAddress)=>{
        await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_KEY}&street=${street}&city=${city}&state=${businessState}&postalCode=${zip}`)
        .then(response => response.json())
        .then(data=> {
            const coords = data.results[0].locations[0].latLng;
            updateEstablishment(name, category, website, newPhone, fullAddress, city, zip, JSON.stringify(coords));
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
 
    const filterTime = (e, day)=>{
        e.preventDefault()
        const updatedHours = {}
        Object.keys(businessHours).map((time)=>{
            console.log(time)
            if(time !== `${day}`){
                updatedHours[time] = businessHours[time];
            }
        })
        setBusinessHours(updatedHours)
    };

    const business_Hours = Object.keys(businessHours).map((hour, index)=> {
        const contentStyle = {width: "33%"}
        const liStyle = {padding: "0px 0px 10px 0px"}
        let day = hour;
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

    const onSubmit = (e)=>{
        e.preventDefault();
        const phoneConversion = ()=>{
            if(businessPhone === ""){
                return phone;
            } else{
                let currentPhone = businessPhone.replace(/[^0-9]+/g, '');
                phone = phone.replace(/[^0-9]+/g, '');
                if(currentPhone.length < 10){
                    //create error and THEN....//
                    return phone;
                } else{
                    if(currentPhone === phone){
                        return phone;
                    } else{
                        let newPhone = "";
                        let phoneMatch = phone.match(/(\d{3})(\d{3})(\d{4})/);
                        newPhone = `(${phoneMatch[1]})${phoneMatch[2]}-${phoneMatch[3]}`;
                        return newPhone;
                    }
                }
            }
        };
        let updateName = businessName === "" ? name : businessName;
        let updatePhone = phoneConversion();
        let updateWebsite = businessWebsite === "" && website === null ? "No Website Listed" : businessWebsite === "" ? website : businessWebsite;
        let updateCategory = businessCategory === "" && category === null ? "Laundromat" : businessCategory === "" ? category : businessCategory; 

        let updateStreet = businessStreet === "" ? street : businessStreet;
        let updateCity = businessStreet === "" ? city : businessCity;
        updateCity = updateCity.charAt(0).toUpperCase() + updateCity.slice(1).toLowerCase();
        let updateZip = businessZip === "" ? zip : businessZip;
        let updateAddress = "";




        if(businessStreet === "" && businessState === "" && businessCity === "" && businessZip === ""){
            updateAddress = address;
            updateEstablishment(updateName, updateCategory, updateWebsite, updatePhone, updateAddress, updateCity, updateZip)

        } else{
            updateAddress = `${updateStreet}, ${updateCity}, ${businessState} ${updateZip}`;
            locationFinder(updateName, updateCategory, updateWebsite, updatePhone, updateStreet, updateCity, updateZip, updateAddress)
        }
    };

    
    return(
        <>  
            <div className="row">
                <div className="col-12 dashboardCol">
                    <h1 className="text-center mb-3 dash-h1">
                        <i className="fas fa-user-plus"></i>Update Business Information
                    </h1>    
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
                                <option selected>Choose...</option>
                                <option>Laundromat</option>
                                <option>Dry Cleaning</option>
                                <option>Laundromat and Dry Cleaning</option>
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
                        </div>
                        <div className="form-group dash-form-group">
                            <label for="inputAddress">Address</label>
                            <input type="text" 
                                className="form-control dashInput" 
                                onChange={(e)=> setBusinessStreet(e.target.value)}
                                id="inputAddress" 
                                placeholder={street}/>
                        </div>
                        <div className="form-row">
                            <div className="form-group dash-form-group col-md-6">
                                <label for="inputCity">City</label>
                                <input type="text" 
                                    className="form-control dashInput" 
                                    onChange={(e)=> setBusinessCity(e.target.value)}
                                    id="inputCity" 
                                    placeholder={city}/>
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
                            </div>
                            <div className="form-group dash-form-group col-md-2">
                                <label for="inputZip">Zip</label>
                                <input type="text" 
                                    className="form-control dashInput"
                                    onChange={(e)=> setBusinessZip(e.target.value)} 
                                    id="inputZip" 
                                    placeholder={zip}/>
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
                                <select id="day" className="form-control kk" style={{textAlign: "center"}}> 
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
                                <select id="open" className="form-control" style={{textAlign: "center"}}>
                                    {openingOptions}
                                </select>
                                <div className="input-group-prepend">
                                    <span className="input-group-text">Close</span>
                                </div>   
                                <select id="close" className="form-control" style={{textAlign: "center"}}>
                                    {closingOptions}
                                </select>                     
                                <div class="input-group-append">
                                    <button class="btn btn-primary" type="button" onClick={(e)=> updateHours(e)}>Add</button>
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