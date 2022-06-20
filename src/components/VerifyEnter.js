import React, {useState} from "react";

const VerifyEnter = ({code, handleSubmit, handleLink})=>{
    //compare codes
    //fetch update claimed or verified
    // redirect to dashboard
    const [compareCode, setCompareCode] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    
    const text1 = "You should have received a phone call or a post card in the mail";
    const text2 = "Try Again or Click 'Resend Code' to request a New Code";
    const cssText = {color: "red", marginBottom: 5};

    const verifyFunction = ()=>{
        if(compareCode === code){
            setSuccess(true);
            setTimeout((e)=>{
                setSuccess(false)
                handleSubmit(undefined);
                setCompareCode("");
                handleLink(e, "dashboard")
            }, 3000);
            
        } else{
            console.log("No Match")
            setError(true);
            setTimeout(()=>{
                setError(false);
            }, 3000);
        }
    }
    return(
        <div className="card text-center dashInput w-75" style={{display:"inline-block", padding: 20, margin: "35px 0px"}}>
            <h5 className="card-title">Enter your Verifcation Code</h5>
            <p className="card-text" style={error? cssText: {marginBottom: 5}}>{error ? text2 : text1}</p>
            <div className="card-body" style={{padding: "1rem"}}>
                <p id="_verify"
                    style={error ? {fontWeight: "600", margin: 0, color: "red"} : !error && !success ? {fontWeight: "600", margin: 0} : {fontWeight: "800", color: "green", margin: 0}}
                >
                    {error ? "Invalid Code" : !error && !success ? "Verification Code:" : "Success"}
                </p>
                <input 
                    id="verifyCode" 
                    type="text"
                    style={error ? {border: "1px solid red"} : null}
                    onChange={(e)=> setCompareCode(e.target.value)}
                    value={compareCode}
                />
            </div>
            <div className="d-flex justify-content-center align-items-center">    
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#007bff" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
                <a href="#" onClick={()=>handleSubmit(null)} style={{marginRight: 5}}>Resend Code</a>
                <button className="btn-danger btn-sm btn-custom1 ml-1 mr-1" onClick={()=>setCompareCode("")}>Cancel</button>
                <button className="btn-success btn-sm btn-custom1" onClick={verifyFunction}>Verify</button>
            </div>
        </div>
    )
}

export default VerifyEnter;