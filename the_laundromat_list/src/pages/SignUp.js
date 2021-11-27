import React, {useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormOwner from "../components/FormOwner";
import BusinessFinder from "../components/BusinessFinder";
// import FormBusiness from "../components/FormBusiness";
import Loading from "../components/Loading";


const SignUp = ()=>{
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [loading, setLoading] = useState(false);

    const addNewUser = async(firstName, lastName, password, phone, email, info)=>{
        let businessAddress = info.address;
        let businessName = info.name;
        let businessPhone = info.phone;
        let title = info.title;
        setLoading(true);
        await fetch("/api/users", {
            method: "post",
            headers:{
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
        }).then(response => response.json())
        .then((data)=> {
            setLoading(false);
            window.location.href = "/login"
        })
        .catch((err)=>{
            setLoading(false);
        });
    };

    if(loading){
        return(
            <Loading message={"You are being redirected to the login page"}/>
        )
    } else{
        return(
            <>
                <Navbar/>
                <div className="row login-register-page">
                    <div className="offset-md-3 col-md-6">
                        <div className="card card-body login-register-card">
                            {newAccount === false ? <FormOwner submitData = {submitData}/> : <BusinessFinder handleBusinessData = {submitBusinessData} />}
                            <p className="lead mt-4" style={{fontWeight:"500"}}>Have An Account? <a href="/login">Login</a></p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>

        )    
    }
}

export default SignUp;