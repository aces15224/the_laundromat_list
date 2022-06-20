import React, { useState } from "react";
import { Icon } from '@iconify/react';

const EditPasswordForm =({businessName})=>{
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [copyPassword, setCopyPassword] = useState("");

    //references for error messaging and css styling
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("password1");
    const pass3 = document.getElementById("password2");
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");

    //reset error messaging, styling, and state
    const reset = (e)=>{
        if(e){
            e.preventDefault();    
        }
        
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        }  
        setCurrentPassword("");
        setNewPassword("");
        setCopyPassword("");
    };

    //function for updating password
    const updatePassword = async ()=>{
        console.log("update begins")
        await fetch("/api/password", {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            password: newPassword,
            EstablishmentBusinessName: businessName
            })
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            //if successful, reset state and error messaging
            reset()
        });        
    }
    
    //check database to see if user's previous password is correct
    const checkPassword = async ()=>{
        await fetch("/api/password", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                password: currentPassword,
                EstablishmentBusinessName: businessName
            })
        })
        .then(response => response.json())
        .then(data=> {
            //if user's password matches, they have permission to change password...
            if(data === true){
                //call updatePassword to update password
                updatePassword()
            }
            //if user's pass does'nt match, display error and message
            else if (data === false){
                pass1.style.border = "1px solid red"; 
                errorMessages[0].innerHTML = "Incorrect Password"
                errorIcons[0].style.opacity = 1;
            }
        })        
    }

    //Functionality for Submit Button
    const handleSubmit = (e)=>{
        e.preventDefault();
        //Trim values..
        const newPass = newPassword.trim();
        const newPass2 = copyPassword.trim();
        const oldPass = currentPassword.trim();       
        
        //Validate input and display errors if necessary
        if(newPass !== "" && oldPass !== "" && newPass2 !== ""){
            if((newPass === newPass2) && newPass.length > 5){
                //if new password is acceptable and doesn't match old password....
                if(newPass !== oldPass){
                    //call checkPassword function for next step 
                    checkPassword()
                }
                else{
                    // message cannot use old password
                    pass2.style.border = "1px solid red"; 
                    pass3.style.border = "1px solid red"; 
                    errorMessages[2].innerHTML = "New Password cannot match Current Password";
                    errorIcons[1].style.opacity = 1;
                    errorIcons[2].style.opacity = 1;
                }
                    
            }
            else{
                //message passwords do not match
                pass2.style.border = "1px solid red"; 
                pass3.style.border = "1px solid red"; 
                errorMessages[2].innerHTML = "Passwords do not match"
                errorIcons[1].style.opacity = 1;
                errorIcons[2].style.opacity = 1;
            }    
        } else{
            //message password fields cannot be blank
            if(newPass === ""){
                errorMessages[1].innerHTML = "Field Cannot be Blank"
                errorIcons[1].style.opacity = 1;
            }
            if(oldPass === ""){
                errorMessages[0].innerHTML = "Field Cannot be Blank"
                errorIcons[0].style.opacity = 1;
            }
            if(newPass2 === ""){
                errorMessages[2].innerHTML = "Field Cannot be Blank"
                errorIcons[2].style.opacity = 1;
            }
        }
        
        
    }
    return(
        <div className="row">
            <div className="col-12">
                <form>
                    <div className="form-group dash-form-group">
                        <label for="password">Current Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={currentPassword}
                            onChange={(e)=>setCurrentPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="password">New Password</label>
                        <input
                            type="password"
                            id="password1"
                            name="password1"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={newPassword}
                            onChange={(e)=>setNewPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <div className="form-group dash-form-group">
                        <label for="password">Confirm New Password</label>
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            className="form-control dashInput"
                            placeholder="Enter Password"
                            value={copyPassword}
                            onChange={(e)=>setCopyPassword(e.target.value)}
                        />
                        <Icon className="error-icon" icon="bx:bxs-error-circle" />
                        <div className="error"></div>
                    </div>
                    <button type="submit" className="btn btn-success btn-block editBtn dashInput" style={{border: "1px solid #474444", textShadow: "1px 1px black"}} onClick={(e)=>handleSubmit(e)}>Save</button>
                    <button type="submit" className="btn btn-danger btn-block dashInput" style={{border: "1px solid #474444", textShadow: "1px 1px black"}} onClick={(e)=>reset(e)}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default EditPasswordForm;