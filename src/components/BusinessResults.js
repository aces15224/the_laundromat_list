import React, { useState } from 'react';
import AddBusiness from "./AddBusiness";
import BusinessCard from "./BusinessCard";
import TitleForm from "./TitleForm";

const BusinessResults = ({matches, handleSubmit})=>{
    const [profileExists, setProfileExists] = useState(true);
    //titleControl is a boolean that inidcates whether the user owns or operates the business
    const [titleControl, setTitleControl] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");

    const matchLength = matches.length;

    //passed down and used to retrieve info from AddBusinss, then sent up up to set state in parent page
    const handleInfo = (e, info)=>{
        e.preventDefault();
        handleSubmit(e, info)
    }
    //function to set state when user clicks on card to select their business
    const handleClick = (info)=>{
        setAddress(info.address);
        setPhone(info.phone);
        setName(info.name);
        //set titleControl (asks user if they have permission to handle listing).
        setTitleControl(true);
    }
    
    //if user has permission, display form to gather their info
    const collectTitleInfo = (e, userTitle)=>{
        e.preventDefault();
        const info = {}
        info.address = address;
        info.phone = phone;
        info.name = name;
        info.title = userTitle;
        // send user info up to set state in parent 
        handleInfo(e, info)
    }
    
    //function for returning cards that display each individual business
    const matchItems = matches.map((result)=>{
        return <BusinessCard result={result} handleClick = {handleClick} />
    })

    const results =()=>{
        return(
            <div className="card businessResultCard">
                <div className="card-header" style={{textAlign:"center"}}>
                    {/* If there are matches, ask if user has permission to handle listing.  If they do, display the name of the business.   */}
                    {matchLength > 0 ? <h6>{titleControl === true ? `${name}`: "Is this your business?"}</h6> : <h6>No Results</h6>}
                </div>
                <ul style={{listStyleType : "none", paddingLeft:0, textAlign:"center", marginBottom:0}}> 
                    {/* If user has permission to handle listing, display title form and collect more info, otherwise display matches */}
                    {titleControl !== true ? matchItems : <TitleForm handleClick={collectTitleInfo}/>}
                </ul>
                <div className="card-footer" style={{display: "flex", justifyContent:"space-evenly"}}>
                    {/* If user has permission, add a button to go back to results in case of mistake */}
                    {titleControl !== true ? "Don't see your business?" : 
                        <button style={{marginLeft: 4, textDecoration: "none", fontWeight: 600}} 
                            className="link-buttons" 
                            name={"account"}
                            //setting titleControl to false will return user to results display 
                            onClick={()=> setTitleControl(false)}>
                                <span style={{display: "flex", alignItems: "center"}}><i class="fa fa-backward" aria-hidden="true" style={{marginRight: 5, fontSize: 12}}></i>Back To Results</span>
                        </button>}
                        {/* If user is permitted, add a button to add business, in case business is not displayed in results */}
                    {titleControl !== true && <button className="btn btn-primary" onClick={()=> setProfileExists(false)}>Add it for free!</button>}
                </div>
            </div>
        )
    }
    
    return(
        <>
            {/* if profile exists display results and allow user to select business, otherwise display form for adding business */}
            {profileExists === true ? results() : <AddBusiness handleClick = {handleInfo} />}
        </>
    )
}

export default BusinessResults;

