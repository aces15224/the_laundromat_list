import React, { useState } from 'react';
import BusinessResults from "../components/BusinessResults";

const BusinessFinder = ({handleBusinessData})=>{
    const [matches, setMatches] = useState([]);
    const [category, setCategory] = useState("category")
    const [search, setSearch] = useState(false);
    const [zipCode, setZipCode] = useState("");
    const _error = document.getElementsByClassName("error")[0];

    //Onchange function for zipcode input
    function handleChange(e){
        const zip = e.target.value.trim();
        setZipCode(zip);
        //Set state (zipcode) first.  If zipcode is less than 5, and remove of BusinessResults component
        if(zip.length < 5){
            setMatches([])
            setSearch(false)
        } 
    }

    //fetch business information and display results
    async function firstCall(){
        const matches = [];
        await fetch("/api/")
        .then(response => response.json())
        .then(data=> {
            for(let i = 0; i< data.length; i++){
                if(data[i].zip === parseInt(zipCode)){
                    matches.push(data[i])
                }
            }
            //set state and display results for user to select
            setMatches(matches);
            setSearch(true);
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        //validate information and/or set error messages
        let errorMessage = "";
        if(zipCode.length < 5 || zipCode.length > 5 || category === "category"){
            console.log("error")
            if((zipCode.length < 5 || zipCode.length > 5) && category === "category"){
                errorMessage = "Select Business Category & Input Valid Zip Code"
            } else if(zipCode.length < 5 || zipCode.length > 5){
                errorMessage = "Input Valid Zip Code"
            } else{
                errorMessage = "Select Business Category"
            }
            _error.innerHTML = errorMessage;
            //reset error messages after five seconds
            setTimeout(()=>{
                errorMessage = "";
                _error.innerHTML = errorMessage;
            }, 5000)
            
        } else{
            //if no error messages fetch business results
            firstCall()    
        }          
    }
    //Function passed down from signUp.js => Business Finder => BusinessResults to collect account info and business info and...
    const handleBusinessInfo = (e, info)=>{
        e.preventDefault();
        // add it to the database
        handleBusinessData(e, info)
    }
        
    return(
        <>
            <h2 className="text-center mb-3">
                    <i className="far fa-address-card"></i>Let's Find Your Business
            </h2>
            <div className="error text-center"></div>
            <form style={{margin: "15px auto", display: "flex"}}>
                <label className="formLabel" style={{borderTopLeftRadius: 4, borderBottomLeftRadius: 4, border: "1px solid #676363", borderRight: "0px"}}>
                    <span style={{padding: 5}}>I have a</span>
                    <select id="category" onChange={(e)=> setCategory(e.target.value)}>
                        <option selected value="category">Select Category</option>
                        <option value="laundromat">Laundromat</option>
                        <option value="dry-cleaner">Dry Cleaner</option>
                    </select>    
                </label>
                <label className="formLabel" style={{border: "1px solid #676363", borderLeft: "0px"}}>
                    <span style={{padding: 5}}>Near</span>
                    <input
                        id="zipCode"
                        type="text"
                        name="zipCode"
                        placeholder="Zip Code"
                        style={{textAlign:"center"}}
                        onChange={(e)=>{handleChange(e)}}
                        value={zipCode}
                    />  
                </label>
                <button id="submit" type="submit" value="Submit" style={{backgroundColor:"red", position:"relative", border: "1px solid #676363", borderLeft: "0px"}} onClick={(e)=>handleSubmit(e)}>
                    <i className="fas fa-search-location"></i>
                </button>
            </form>
            {/* display business results if input has been validate */}
            {search === true && <BusinessResults matches={matches} handleSubmit={handleBusinessInfo} />} 
       </>
    )
}
export default BusinessFinder;