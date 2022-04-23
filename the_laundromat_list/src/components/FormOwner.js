import React, { useState } from "react";

function FormOwner({submitData}){
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [phone, setPhone] = useState();
    const [eMail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    //The following state values are booleans that indicate whether the users info is valid
    const [firstCheck, setFirstCheck] = useState(true);
    const [lastCheck, setLastCheck] = useState(true);
    const [phoneCheck, setPhoneCheck] = useState(true);
    const [eMailCheck, setEmailCheck] = useState(true);
    const [passLength, setPassLength] = useState(true);
    const [passMatch, setPassMatch] = useState(true);
    //Account exists check's for existing account and prevents submission if one is found
    const [accountExists, setAccountExists] = useState(true);

    function reset(){
        //reset state booleans and remove error messages and error styling
        setFirstCheck(true);
        setLastCheck(true);
        setPhoneCheck(true);
        setEmailCheck(true);
        setPassLength(true);
        setPassMatch(true);
        setAccountExists(true);

        let inputs = document.querySelectorAll('input');
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
        }    
    }

    function handleSubmit(e){
        e.preventDefault();
        reset();
        //capitalize first name and last name
        const firstCapitalized = first.charAt(0).toUpperCase() + first.slice(1);
        const lastCapitalized = last.charAt(0).toUpperCase() + last.slice(1);
        //create reference to inputs for potential error messages
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const _phone = document.getElementById("phoneNumber");
        const _password = document.getElementById("password");
        const _password2 = document.getElementById("password2")
        //remove anything that is not a number from phone number 
        let phoneValidation = phone.replace(/[^0-9]+/g, '');
        //validate email by making sure it includes an "@" and a ".com"
        let emailValidation = (/.+@.+[.com]/).test(eMail);
        //set validation to true unless...
        let validation = true;
        //..no first name, lastname, etc...
        if(!first || !last || phoneValidation.length !== 10 || password.length < 6 || password2.length < 6 || password !== password2  || emailValidation === false ){
            //then set to false so the form info is not submitted....
            validation = false;
            //and check which values where invalid and create corresponding error messages
            if(!first){
                firstName.style.border = "1px solid red"; 
                setFirstCheck(false);
            }

            if(!last){
                lastName.style.border = "1px solid red";
                setLastCheck(false);
            }

            if(phoneValidation.length !== 10){
                _phone.style.border = "1px solid red";
                setPhoneCheck(false);
            }
            if(password.length < 6 || password2.length < 6){
                _password.style.border = "1px solid red";
                _password2.style.border = "1px solid red";
                setPassLength(false);
            }
            if(password !== password2){
                _password.style.border = "1px solid red";
                _password2.style.border = "1px solid red";
                setPassMatch(false);
            }
        
            if(emailValidation === false){
                email.style.border = "1px solid red";
                setEmailCheck(false);
            }
        }
        //if everything is valid, fetch user info to verify account doesn't already exist
        else if( validation === true){
            firstCall();
        }
        
        //this function fetches user info to verify account doesn't exist...
        async function firstCall(){
            await fetch("/api/users", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                email: eMail,
                })
            })
            .then(response => response.json())
            .then(data=> {
                //if account already exists, do not submit data for next step....
                if(data != null){
                    validation = false;
                    email.style.border = "1px solid red";
                    setAccountExists(false);
                }
                else{
                    // if account doesn't exist, submit form data for the next step....
                    submitData(e, firstCapitalized, lastCapitalized, eMail, phone, password);    
                }
            })
        }
    }
    return(
        <>
            <h1 className="text-center mb-3">
                <i className="fas fa-user-plus"></i>Register
            </h1>
            <form>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label for="firstName">{firstCheck === false ? <span className="errorStyle">Input First Name</span> : "First Name"}</label>
                        <input
                            type="text"
                            id="firstName"
                            required
                            name="firstName"
                            className="form-control _inputBorder"
                            placeholder="Enter First Name"   
                            value={first} 
                            onChange={(e)=>setFirst(e.target.value.trim())}                        
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label for="lastName">{lastCheck === false ? <span className="errorStyle">Input Last Name</span> : "Last Name"}</label>
                        <input
                            type="text"
                            id="lastName"
                            required
                            name="lastName"
                            className="form-control _inputBorder"
                            placeholder="Enter Last Name"
                            value={last} 
                            onChange={(e)=>setLast(e.target.value.trim())}
                        />
                    </div>    
                </div>
                <div className="form-row">
                    <div className="form-group col-md-7">
                        <label for="email">{eMailCheck === false ? <span className="errorStyle">Input Valid Email</span> : accountExists === false ? <span className="errorStyle">This Email is taken</span> : "Email"}</label>
                        <input
                            type="email"
                            id="email"
                            required
                            name="email"
                            className="form-control _inputBorder"
                            placeholder="Enter Email"
                            value={eMail} 
                            onChange={(e)=>setEmail(e.target.value.trim())}
                        />
                    </div> 
                    <div className="form-group col-md-5">
                        <label for="phoneNumber">{phoneCheck === false ? <span className="errorStyle">Input Valid Phone #</span> : "Phone Number"}</label>
                        <input
                            type="phoneNumber"
                            id="phoneNumber"
                            required
                            name="phoneNumber"
                            className="form-control _inputBorder"
                            placeholder="Enter Phone Number"
                            value={phone} 
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                    </div>   
                </div>
                
                <div className="form-group">
                    <label for="password">{passLength === false ? <span className="errorStyle">Password must be at least 6 characters</span> : passMatch === false ?  <span className="errorStyle">Passwords don't match</span> : "Password"}</label>
                    <input
                        type="password"
                        id="password"
                        required
                        name="password"
                        className="form-control _inputBorder"
                        placeholder="Create Password"
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value.trim())}
                    />
                </div>
                <div className="form-group">
                    <label for="password2">Confirm Password</label>
                    <input
                        type="password"
                        id="password2"
                        required
                        name="password2"
                        className="form-control _inputBorder"
                        placeholder="Confirm Password"
                        value={password2} 
                        onChange={(e)=>setPassword2(e.target.value.trim())}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block registration-submit btn-custom" onClick={(e)=>handleSubmit(e)}>
                    Next
                </button>
            </form>
        </>
    
    )
}          
        
export default FormOwner;