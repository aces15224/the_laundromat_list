import { useState, useEffect} from 'react';
import { Icon } from '@iconify/react';
import { send } from 'emailjs-com';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const Contact = ()=>{
    useEffect(()=>{
        window.scroll(0,0)
    },[])
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [reason, setReason] = useState("");
    const errorIcons = document.getElementsByClassName("error-icon"); 
    const errorMessages = document.getElementsByClassName("error");
    const _selector = document.getElementById('reasonSelector');
    const _firstName = document.getElementById("firstName");
    const _lastName = document.getElementById("lastName");
    const _phoneInput = document.getElementById("phone");
    const _reason = document.getElementById("reasonSelector");
    const _email = document.getElementById("email");
    const _message = document.getElementById("message");


    const validation = ()=>{
        let validated = true;
        let _phone = phone.trim();
        let _phone2 = _phone.replace(/[^0-9]+/g, '');
        let emailValidation = (/.+@.+[.com]/).test(email);
        if(fName === "" || lName === "" || message === "" ||(reason === "" || reason === "Reason for Contact") || _phone2.length !== 10 || emailValidation === false){
            validated = false;
            if(fName === ""){
                errorMessages[0].innerHTML = "Please Enter a First Name";
                errorIcons[0].style.opacity = 1;
                _firstName.style.border = "1px solid red";
            }

            if(lName === ""){
                errorMessages[1].innerHTML = "Please Enter a Last Name";
                errorIcons[1].style.opacity = 1;
                _lastName.style.border = "1px solid red";   
            }

            if(_phone2.length !== 10){
                errorMessages[2].innerHTML = "Please Input a Valid Phone Number";
                errorIcons[2].style.opacity = 1;
                _phoneInput.style.border = "1px solid red";
            }

            if( (reason === "" || reason === "Reason for Contact")){
                errorMessages[3].innerHTML = "Please Select a Reason for Contact";
                errorIcons[3].style.opacity = 1;
                _reason.style.border = "1px solid red";
            }

            if( emailValidation === false){
                errorMessages[4].innerHTML = "Please Enter a Valid Email";
                errorIcons[4].style.opacity = 1;
                _email.style.border = "1px solid red";
            }

            if(message === ""){
                errorMessages[5].innerHTML = "Please Enter a Message";
                errorIcons[5].style.opacity = 1;
                _message.style.border = "1px solid red";
            }
        }
        if(validated){
            return true;
        } 
        return false;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const valid = validation();
        console.log(valid)
        if(!valid){
            return false;
        }

        const sendMessage ={
            name: `${fName},${lName}`,
            message,
            email, 
            phone,
            reason
        }
        console.log(sendMessage)
        send(
            "service_kiiflhs",
            "template_dohilqc",
            sendMessage,
            "user_8JTHz17EBtbDk1vPpg36x"
        )
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            reset();
            
        })
        .catch((err) => {
            console.log('FAILED...', err);
        });
    }

    const reset = ()=>{
        let inputs = document.querySelectorAll('input');
        
        for(let i = 0; i< inputs.length; i++){
            inputs[i].style.border = "1px solid #ced4da";
        } 
        for(let i = 0; i < 6; i++){
            errorIcons[i].style.opacity = 0;
            errorMessages[i].innerHTML = "";
        }

        _message.style.border = "1px solid #ced4da";
        _selector.style.border = "1px solid #ced4da";
        _selector.selectedIndex = "0";

        setFName("");
        setLName("");
        setMessage("");
        setEmail("");
        setPhone("");
        setReason("");
    }

    return(
        <>
            <Navbar/>
            <div className="row login-register-page">
                <div className="offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                    <div className="card card-body login-register-card">
                        <form>
                            <div className="form-row price-div">
                                <div className="col-12 text-center">
                                    <h2><i className="fas fa-envelope-open-text"></i>Contact Us</h2>
                                </div> 
                            </div>
                            <div className="form-row">
                                <div className="form-group dash-form-group col-md-6 col-lg-6">
                                    <label for="firstName">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        required
                                        name="firstName"
                                        className="form-control dashInput"
                                        value={fName}
                                        onChange={(e)=>setFName(e.target.value)}
                                    />
                                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                    <div className="error"></div>
                                </div>
                                <div className="form-group dash-form-group col-md-6 col-lg-6">
                                    <label for="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        required
                                        name="lastName"
                                        value={lName}
                                        className="form-control dashInput"
                                        onChange={(e)=>setLName(e.target.value)}
                                    />
                                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                    <div className="error"></div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group dash-form-group col-md-6">
                                    <label for="phone">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        required
                                        name="phone"
                                        value={phone}
                                        className="form-control dashInput"
                                        onChange={(e)=>setPhone(e.target.value)}
                                    />
                                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                    <div className="error"></div>
                                </div>
                                <div className="form-group dash-form-group col-md-6">
                                    <label for="businessName">Reason</label>
                                    <select name="selectReason" 
                                        id = "reasonSelector"
                                        className="form-control dashInput"
                                        onChange={(e)=>setReason(e.target.value)}
                                    >
                                        <option defaultValue="Reason for Contact">Reason for Contact</option>
                                        <option value="Technical Difficulty">Technical Difficulty</option>
                                        <option value="Upgaded Web Page">Upgaded Web Page</option>
                                        <option value="Account Problems">Account Problems</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                    </select>
                                    <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                    <div className="error"></div>
                                </div>
                            </div>
                            <div className="form-group dash-form-group">
                                <label for="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    name="email"
                                    value={email}
                                    className="form-control dashInput"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                <div className="error"></div>
                            </div>
                            <div className="form-group dash-form-group">
                                <label for="message">Message</label>
                                <textarea className="form-control dashInput" value={message} id="message" rows="3" onChange={(e)=>setMessage(e.target.value)}></textarea>
                                <Icon className="error-icon" icon="bx:bxs-error-circle" />
                                <div className="error"></div>
                            </div>
                            <button type="submit" className="btn btn-success btn-block dashInput" style={{border: "1px solid #474444", textShadow: "1px 1px black"}} onClick={(e)=>handleSubmit(e)} >
                                Send
                            </button>
                        </form>             
                    </div>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default Contact;