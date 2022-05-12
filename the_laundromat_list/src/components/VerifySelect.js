import React, {useState} from "react";

const VerifySelect = ({phone, handleSubmit})=>{
    const [callReq, setCallReq] = useState(true);
    const [mailReq, setMailReq] = useState(false);
    const pStyle={color: "red", margin:"0px 0px 10px 0px", fontSize: "14px"}
    const [promptView, setPromptView ] = useState(false);
  
    const handleCheck = (key)=>{
        if(key === 1){
            if(callReq === false){
                setCallReq(true);
                if(mailReq){
                    setMailReq(false);
                    setPromptView(false);
                }

            } else{
                setCallReq(false);
            }
        } else{
            if(!mailReq){
                setMailReq(true);
                setPromptView(true);
                if(callReq){
                    setCallReq(false);
                };

            } else{
                setMailReq(false);
                setPromptView(false);
            }
        }
        
    };
    
    const onSubmit = ()=>{
        const num = () => Math.floor(Math.random() * (90 - 10) + 10);
        const _code = `${num()}${num()}${num()}`;
        handleSubmit(_code);
    };

    return(
        <div className="card text-center dashInput" style={{display:"inline-block", padding: 20, margin: "35px 0px"}}>
            <h5 className="card-title">Verify your Account</h5>
            <p className="card-text" style={{marginBottom: 5}}>How would you like to receive your verification code? </p>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input 
                            type="checkbox"
                            checked={callReq} 
                            onChange={()=>{ handleCheck(1)}} 
                        /> 
                    </div>
                </div>
                <input type="text" className="form-control" aria-label="Text input with checkbox" value={`Call me at ${phone}`}/>
            </div>
            <div className="input-group" style={{marginBottom: 10}}>
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input 
                            type="checkbox"
                            checked={mailReq} 
                            onChange={()=>{ handleCheck(2)}} 
                        /> 
                    </div>
                </div>
                <input type="text" className="form-control" aria-label="Text input with checkbox" value="Send a Post Card to the business' address."/>
            </div>
            {promptView && <p className="card-text" style={pStyle}>Please Allow 2-3 weeks for Post Card delivery. </p>}
            <button className="btn btn-success btn-block btn-custom1" onClick={onSubmit}>Send</button>
        </div>
    )
};

export default VerifySelect;