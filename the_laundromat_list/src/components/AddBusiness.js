import React, {useState, useEffect} from "react";
import { Icon } from '@iconify/react';

const AddBusiness =({handleClick})=>{
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [zip, setZip] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [inputState, setInputState] = useState("");
    const [inputCity, setInputCity] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [title, setTitle] = useState("");
    const [data, setData] = useState();

    //CSS References//
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");
    const nameRef = document.getElementById("businessName");
    const titleRef = document.getElementById("title");
    const zipRef = document.getElementById("inputZip");
    const categoryRef = document.getElementById("categoryName");
    const stateRef = document.getElementById("inputState");
    const phoneRef = document.getElementById("businessPhone");
    const cityRef = document.getElementById("inputCity");
    const addressRef = document.getElementById("inputAddress");

    useEffect(()=>{
        //gather business info to check if existing business exists
        getData();
    },[])

    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        } 
    }

    //function for retrieving business's geographic coordinates
    const locationFinder = async(e, businessStreet, businessCity, businessState, businessZip, info)=>{
        await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.REACT_APP_KEY}&street=${businessStreet}&city=${businessCity}&state=${businessState}&postalCode=${businessZip}`)
        .then(response => response.json())
        .then(data=> {
            // if coordinates are found send info to addEstablishment(), otherwise display error
            if(data){
                info.coords = JSON.stringify(data.results[0].locations[0].latLng);
                addEstablishment(e, businessCity, businessZip, info);    
            } else{
                addressRef.style.border = "1px solid red";
                errorMessages[5].innerHTML = "Address Not Found";
                errorIcons[4].style.opacity = 1;
            }
        })  
    }

    const getData = async()=>{
        //gather business info and setState
        await fetch("/api")
        .then(response => response.json())
        .then(data=> {
            setData(data)               
        });
    }

    const validate = (_phone, newPhone, inputZip, fullAddress)=>{
        let validation = true;
        let duplicatePhone = false;
        let duplicateAddress = false;
        let duplicate = false;

        //if values inputed are in database already, set duplicate booleans to true//
        for(let i = 0; i < data.length; i++){
            if(data[i].phone === newPhone){
                duplicatePhone = true;
                duplicate = true;
            }

            if(data[i].businessAddress.toLowerCase() === fullAddress.toLowerCase()){
                duplicateAddress = true;
                duplicate = true;
            }    
        } 

        //validation will return false and an error message will be displayed if any of the following are true
        if(!name || _phone.length !== 10 || !title || !inputCity || inputState === "Choose..." || categoryName === "Choose..." || inputZip.length !== 5|| !inputAddress || duplicate){
            validation = false;
            if(duplicateAddress){
                addressRef.style.border = "1px solid red";
                errorMessages[4].innerHTML = "Address is already registered";
                errorIcons[3].style.opacity = 1;
            }

            if(duplicatePhone){
                phoneRef.style.border = "1px solid red";
                errorMessages[3].innerHTML = "Phone Number is already registered";
                errorIcons[2].style.opacity = 1;
            }

            if(!name){
                nameRef.style.border = "1px solid red";
                errorMessages[1].innerHTML = "Business Name is Required";
                errorIcons[0].style.opacity = 1;
            }

            if(!_phone){
                phoneRef.style.border = "1px solid red";
                errorMessages[3].innerHTML = "Phone Number is Required";
                errorIcons[2].style.opacity = 1;
            }

            if(_phone.length < 10){
                phoneRef.style.border = "1px solid red"; 
                errorMessages[3].innerHTML = "10 digit Phone Number is Required";
                errorIcons[2].style.opacity = 1; 
            }

            if(!title){
                titleRef.style.border = "1px solid red";
                errorMessages[4].innerHTML = "User's Role/Title is Required";
                errorIcons[3].style.opacity = 1;
            }

            if(inputState === "Choose..."){
                stateRef.style.border = "1px solid red";
                errorMessages[7].innerHTML = "State is Required";
                errorIcons[6].style.opacity = 1;
            }

            if(categoryName === "Choose..."){
                console.log(categoryName)
                categoryRef.style.border = "1px solid red";
                errorMessages[2].innerHTML = "Category is Required";
                errorIcons[1].style.opacity = 1;
            }

            if(!inputZip){
                zipRef.style.border = "1px solid red";
                errorMessages[8].innerHTML = "Zip Code is Required";
                errorIcons[7].style.opacity = 1;
            }

            if(inputZip.length !== 5){
                zipRef.style.border = "1px solid red";
                errorMessages[8].innerHTML = "5 digit Zip Code is Required";
                errorIcons[7].style.opacity = 1;
            }

            if(!inputCity){
                cityRef.style.border = "1px solid red";
                errorMessages[6].innerHTML = "City is Required";
                errorIcons[5].style.opacity = 1;
            }

            if(!inputAddress){
                addressRef.style.border = "1px solid red";
                errorMessages[5].innerHTML = "Street Address is Required";
                errorIcons[4].style.opacity = 1;
            }
        }
        return validation;
    }

    const handleInfo = (e)=>{
        e.preventDefault();
        //Reset Errors 
        reset();
        
        //Remove non-numbers from phone & reformat phone number => (xxx)-xxx-xxx
        let newPhone = "";
        let _phone = phone.replace(/[^0-9]+/g, '');
        if(_phone !== ""){
            let phoneMatch = _phone.match(/(\d{3})(\d{3})(\d{4})/);
            newPhone = `(${phoneMatch[1]})${phoneMatch[2]}-${phoneMatch[3]}`;
        }

        //remove non-numbers from zipcode
        let inputZip = zip.replace(/[^0-9]+/g, '');
        
        //trim address and city values
        let address_trim = inputAddress.trim();
        let city_trim = inputCity.trim();
        
        //format full address using address, city, state, and zip
        const fullAddress = `${address_trim}, ${city_trim}, ${inputState} ${inputZip}`;

        // send to validate() to check for errors
        let validation = validate(_phone, newPhone, inputZip, fullAddress);
        
        //if validate() returns true, create object, and send it to the locationFinder()
        if(validation === true){
            const info = {};
            info.categoryName = categoryName;
            info.laundry = serviceSetter("laundry")
            info.dryCleaning = serviceSetter("dry-clean")
            info.name = name.trim();
            info.phone = newPhone;
            info.title = title.trim();
            info.address = fullAddress;
            locationFinder(e, address_trim, city_trim, inputState, inputZip, info);      
        }
    }

    //Set t/f values (Laundry/Dry Cleaning) based on CategoryName
    const serviceSetter = (service)=>{
        if(service === "laundry"){
            if(categoryName.includes("Laundromat")){
                return true;
            } else{
                return false;
            }
        } else{
            if(categoryName.includes("Dry Cleaning")){
                return true;
            } else{
                return false;
            }
        }

    }
    
    async function addEstablishment(e, inputCity, inputZip, info){
        //post info to api
        const defaultHours = '{"Mo":"12:00am-12:00pm","Tu":"12:00am-12:00pm", "We":"12:00am-12:00pm", "Th":"12:00am-12:00pm", "Fr":"12:00am-12:00pm","Sa":"12:00am-12:00pm", "Su":"12:00am-12:00pm"}';
        await fetch("/api/establishment", {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                businessAddress: info.address,
                businessName: info.name,
                businessLocation: info.coords,
                phone: info.phone,
                categoryName: info.categoryName,
                zip: parseInt(inputZip),
                city: inputCity,
                cardOrCoin: "Coin",
                options:"[]",
                businessHours: defaultHours
            })
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            // send info back up to BusinessResults
            handleClick(e, info)
        })
    }
    return(
        <form>
            <div className="form-row">
                <div className="form-group dash-form-group col-md-6">
                    <label for="businessName">Name of Business</label>
                    <input
                        type="text"
                        id="businessName"
                        required
                        name="businessName"
                        className="form-control _inputBorder"
                        placeholder="Name of Business"
                        value={name}
                        onChange={ e => setName(e.target.value)}
                    />
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
                <div className="form-group dash-form-group col-md-6">
                    <label for="categoryName">Business Category</label>
                    <select id="categoryName" className="form-control _inputBorder" onChange={(e)=> setCategoryName(e.target.value)}>
                        <option selected value="Choose...">Choose...</option>
                        <option value="Laundromat">Laundromat</option>
                        <option value="Dry Cleaning">Dry Cleaning</option>
                        <option value="Laundromat and Dry Cleaning">Laundromat and Dry Cleaning</option>
                    </select>
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
            </div>
            
            <div className="form-row">
                <div className="form-group dash-form-group col-md-6">
                    <label for="businessPhone">Business Phone Number</label>
                    <input
                        type="text"
                        id="businessPhone"
                        required
                        name="businessPhone"
                        className="form-control _inputBorder"
                        placeholder="Enter Phone Number"
                        value={phone}
                        onChange={e=> setPhone(e.target.value)}
                    />
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
                <div className="form-group dash-form-group col-md-6">
                    <label for="title">Your Role in Company</label>
                    <input
                        type="title"
                        id="title"
                        required
                        name="title"
                        className="form-control _inputBorder"
                        placeholder="Enter Title"
                        value={title}
                        onChange={e=> setTitle(e.target.value)}
                    />
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
            </div>
            <div className="form-group dash-form-group">
                <label for="inputAddress">Address</label>
                <input type="text"
                    className="form-control _inputBorder" 
                    id="inputAddress" 
                    placeholder="1234 Main St" 
                    value={inputAddress} 
                    onChange={e=> setInputAddress(e.target.value)}/>
                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                <div className="error"></div>
            </div>
            <div className="form-row">
                <div className="form-group dash-form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" 
                        className="form-control _inputBorder" 
                        placeholder="Your City" 
                        id="inputCity" 
                        value={inputCity} 
                        onChange={e=> setInputCity(e.target.value)}
                    />
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
                <div className="form-group dash-form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" className="form-control _inputBorder" onChange={e=> setInputState(e.target.value)}>
                        <option selected value="Choose...">Choose...</option>
                        <option value="KS">KS</option>
                        <option value="MO">MO</option>
                    </select>
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
                <div className="form-group dash-form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text"
                        className="form-control _inputBorder" 
                        id="inputZip" 
                        onChange={e=>setZip(e.target.value.trim())}
                        placeholder="12345" 

                    />
                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                    <div className="error"></div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block registration-submit" onClick={(e)=>handleInfo(e)}>
                Next
            </button>
        </form>
    )
}
export default AddBusiness;