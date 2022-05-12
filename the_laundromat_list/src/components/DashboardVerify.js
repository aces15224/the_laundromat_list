import React, { useEffect} from "react";
import VerifyEnter from "../components/VerifyEnter";
import VerifySelect from "../components/VerifySelect";


const DashboardVerify = ({name, setLink, code, phone, update})=>{
    useEffect(()=>{
        window.scroll(0,0);
        console.log(code)

    },[code])
    
    const handleSubmit = async (_code)=>{
        console.log(_code)
        await fetch("/api/verify", {
            method: "put",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                claimCode: _code,
                EstablishmentBusinessName: name
            })
        })
        .then(response => response.json())
        .then(data=> {
            console.log(data) 
            update();           
        }); 
    }

    return(
        <div className="container d-flex justify-content-center align-items-center" style={{height: "90%"}}>
            {code !== null ? <VerifyEnter handleSubmit={handleSubmit} code={code} handleLink={setLink}/> : <VerifySelect phone = {phone} handleSubmit={handleSubmit} />}    
        </div>
    )

}
export default DashboardVerify;