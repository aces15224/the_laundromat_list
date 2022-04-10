import React, { useState } from 'react';
import {useHistory} from "react-router-dom";
import CheckBox from "./CheckBox";

const TitleForm = ({handleClick})=>{
    const [permission, setPermission] = useState("");
    const history = useHistory();
    const [features, setFeatures] = useState([
        {id: 1, value: "Yes", isChecked: false},
        {id: 2, value: "No", isChecked: false}
    ])
   
    const handleCheck = (id) =>{
        setFeatures((prevState) =>{
            const checkArray = [];
            prevState.forEach(feature => {
                console.log(feature)
                if(feature.id === id){
                    feature.isChecked = !feature.isChecked; 
                    if(feature.isChecked){
                        if(feature.id === 1){
                            //1 means that user has permission to handle listing
                            setPermission(true)
                        } else{
                            //user does not have permission
                            setPermission(false)
                        }
                    }                  
                } else{
                    //only one feature can be checked.  if yes has been clicked, unclick no, and vice versa.
                    if(feature.isChecked){
                        feature.isChecked = !feature.isChecked;  
                    }
                } 
                //push features to array and re-render checkboxes
                checkArray.push(feature)          
            })
            return checkArray;    
        })
    }

    //send user info back up to BusinessResults
    const handleSubmit = (e)=>{
        e.preventDefault();
        let title = document.getElementById("title").value;
        handleClick(e, title)
    }
   
    //return this form when the user has selected that they are allowed to handle listing
    const permissionGranted = ()=>{
        return(
            <>
                <div className="form-row">
                    <div className="form-group offset-md-2 col-md-8" style={{marginBottom:10}}>
                        <label for="title">What is your Role in the Company?</label>
                    </div>    
                </div>
                <div className="form-row">
                    <div className="form-group offset-md-2 col-md-6">
                            <input
                                style={{textAlign:"center"}}
                                type="title"
                                id="title"
                                required
                                name="title"
                                className="form-control"
                                placeholder="Enter Title"
                            />
                    </div>
                    <div className="form-group col-md-2">
                        <button type="submit" className="btn btn-primary" style={{width:"100%"}} onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                </div>
            </>
        )
    }

    //if user does not have permission, redirect the user to the homepage
    const permissionNotGranted = ()=>{
        setTimeout(()=> {
            history.push("/")
        }, 3000)
    }

    const checkBoxes = features.map((feature)=>{
        return <CheckBox key={feature.id} handleCheck={handleCheck} feature={feature}/>
    })
    
    return(
        <>
            {permission !== false ? 
                <form>
                    <div className="form-row" style={{display:"block"}}>
                        <label className="checkPermission">Do you have permission to handle this listing?</label>
                        {checkBoxes}    
                    </div>
                    {/* display title form for gathering info about user's title if the user is permitted to handle listing */}
                    {permission === true && permissionGranted()}
                </form> :
                <form>
                    <div className="form-row" style={{display:"block"}}>
                        <label className="checkPermission">Sorry!  You can't handle a listing without permission</label>
                    </div>
                    {/* display error message and redirect user to homepage if they are not allowed to handle listing */}
                    {permission === false && permissionNotGranted()}
                </form>
            }
        </>   
    )   
}
export default TitleForm;