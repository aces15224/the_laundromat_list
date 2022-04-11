import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormOwner from "../components/FormOwner";
import BusinessFinder from "../components/BusinessFinder";
import Loading from "../components/Loading";
import {AuthContext} from '../App';



const SignUp = ()=>{
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const {login, businessName} = useContext(AuthContext);

    useEffect(()=>{
        //scroll to top of page on load.  If logged it, do not display this page, instead redirect to dashboard
        window.scroll(0,0);
        setLoading(false);    
        if(login){
            history.push(`/business/dashboard/${businessName}`);
        }
    },[])

    //set state with information gathered from FormOwner.js and proceed to the next process in the user signup
    const submitData = (e, firstName, lastName,  email, phone, password)=>{
        e.preventDefault();
        setNameFirst(firstName);
        setNameLast(lastName);
        setUserEmail(email);
        setUserPhone(phone)
        setUserPassword(password);
        setNewAccount(true);
    }


    //add user and business info to database
    const addUser = async (firstName, lastName, password, phone, email, info) => {
        let businessAddress = info.address;
        let businessName = info.name;
        let businessPhone = info.phone;
        let title = info.title;
        //set loading and display loading spinner until fetch is complete....
        setLoading(true);
        await fetch("/api/users", {
                method: "post",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                email,
                businessAddress,
                businessName,
                businessPhone,
                phone, 
                title,
                firstName,
                lastName,
                password,
                EstablishmentBusinessName: businessName
            })
        })
        .then(response => response.json())
        .then((data)=> {
            //if user has been added, set loading to false, and redirect to login page....
            //allows three seconds for user to see redirection message//
            setTimeout(()=>{
                window.location.href = "/login" 
            }, 3000);
        })
        .catch((err)=>{
            setLoading(false);
            console.log(err)
        })
    }

    //function for gathering previous data from FormOwner.js AND combining it with business info from BusinessFinder.js...
    const submitBusinessData = (e, info)=>{
        e.preventDefault();
        //and sending it to a function that will add user to database 
        addUser(nameFirst, nameLast, userPassword, userPhone, userEmail, info);
    };

    ///loading spinner displayed when uploading user to database
    if(loading){
        return(
            <Loading message={"You are being redirected to the login page"}/>
        )
    }
    else{
        return(
            <>
                <Navbar/>
                <div className="row login-register-page">
                    <div className="col-12 offset-sm-1 col-sm-10 offset-md-2 col-md-8 offset-lg-3 col-lg-6">
                        <div className="card card-body login-register-card">
                            {/* if there is matching data and account exists direct to business finder else direct to new user form */}
                            {newAccount === false ? <FormOwner submitData = {submitData}/> : <BusinessFinder handleBusinessData = {submitBusinessData} />}
                            <p className="lead" style={{fontWeight:"500"}}>Have An Account? <a href="/login">Login</a></p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )    
    }
    
}

export default SignUp;