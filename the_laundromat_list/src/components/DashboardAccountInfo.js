import React, { useState, useEffect } from "react";
import EditAccountForm from "../components/EditAccountForm";
import EditPasswordForm from "../components/EditPasswordForm";

const AccountInfo = ({businessName, setLink})=>{
    //Prop setLink controls which page to link to in Dashboard.js
    const [accountData, setAccountData] = useState();
    //Selection controls links and decides which component to render in return
    const [selection, setSelection] = useState("account");
    const listItemText = {fontSize: ".9rem"}

    useEffect(()=>{
        // fetch business info upon loading
        userFetch()
    },[])
    
    //convert phone number into proper format: (123)-456-7899
    const phoneConversion = (phone)=>{
        let phoneMatch = phone.match(/(\d{3})(\d{3})(\d{4})/);
        return `(${phoneMatch[1]})${phoneMatch[2]}-${phoneMatch[3]}`;
    };

    //Fetch business information and set state
    const userFetch = async ()=>{
        await fetch(`/api/users/${businessName}`)
        .then(response => response.json())
        .then(data => {
            if(data !== null){
                const dataObj = {};
                dataObj.firstName = data.firstName;
                dataObj.lastName = data.lastName;
                dataObj.email = data.email;
                dataObj.phone = data.phone;
                dataObj.formatPhone = phoneConversion(data.phone);
                dataObj.title = data.title;
                dataObj.password = data.password;
                setAccountData(dataObj)  
            }
        })
    }

    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 dashboardCol">
                    <h1 className="text-center mb-3">
                        <i className="fas fa-user-plus"></i>Update Account Information
                    </h1>
                </div>
            </div>
            <div className="row">
                <div className="offset-sm-1 col-sm-10 offset-md-1 col-md-10 offset-lg-1 col-lg-7 dashboardCol">
                    {/* Render component based on value of "Selection" */}
                    {selection === "account" 
                        ? <EditAccountForm 
                            firstName={accountData ? accountData.firstName : ""} 
                            lastName={accountData ? accountData.lastName : ""} 
                            email={accountData ? accountData.email : ""} 
                            phone={accountData ? accountData.phone : ""} 
                            formatedPhone={accountData ? accountData.formatPhone : ""} 
                            title={accountData ? accountData.title : ""}
                            businessName={businessName}
                            update={userFetch}
                           />
                        : <EditPasswordForm businessName={businessName}/>
                    }  
                </div>
                <div className="offset-sm-1 col-sm-10 offset-md-1 col-md-10 col-lg-3 dashboardCol">
                    <ul className="dashFormSide" style={{padding: "0px"}}> 
                        <li>
                            <p className="sideCaptions">This page is for{selection === "account" ? " Updating your Account Info" : " Changing your Password"}</p>
                            <p style={listItemText}>If you need to {selection === "account" ? " Change your Password" : "Update your Account Info"} you may do so by clicking 
                                <button style={{marginLeft: 4}} 
                                    className="link-buttons" 
                                    name={"account"} 
                                    // "Selection" decides which argument to pass into setSelection() 
                                    onClick={()=> {selection === "account" ? setSelection("password") : setSelection("account")}}>
                                        here
                                </button>
                            </p>
                        </li>
                        <li>
                            <p className="sideCaptions">Want to Update your Business information?</p>
                            <p style={listItemText}>Click<button style={{marginLeft: 4}}className="link-buttons" name={"business"} onClick={(e)=>setLink(e)}>here</button>
                                to update details about your business.
                            </p>
                        </li>
                        <li>
                            <p className="sideCaptions">Want to update Service or Pricing information?</p>
                            <p style={listItemText}>Click<button style={{marginLeft: 4}}className="link-buttons" name={"services"} onClick={(e)=>setLink(e)}>here</button>
                            to update information about the services your business provides.</p>
                        </li>
                    </ul>
                </div>
            </div>         
        </div>
    )
}

export default AccountInfo;