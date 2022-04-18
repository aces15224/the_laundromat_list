import React from "react";
import MockWebsite from "../images/landingPage2.png";

const DashboardAddImage = ({name})=>{
    const message = document.getElementsByClassName("error")[0];
    const handleSubmit = async (e)=>{
        e.preventDefault();
        //Reference form and retrieve fields with FormData
        var form = document.getElementById("fileForm");
        var formData = new FormData(form);

        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const fileType = [...formData][0][1].name.split(".")[1]
        if(fileType !== undefined){
            const extname = filetypes.test(fileType.toLowerCase());
            if(extname){
                message.style.color = "green";
                message.innerHTML = "Upload Successful"
                // Post data to public uploads folder
                // await fetch(`/api/uploads/${name}`, {
                //     method: 'POST',
                //     body: formData
                // })
                // .then(response => response.json())
                // .then(data=> {
                //     console.log("Uploaded")
                // })
            } else{ 
                message.innerHTML = "Image Files Only"; 
            }

        } else {
            message.innerHTML = "No File Selected"; 
        }
        setTimeout(()=>{
            message.innerHTML = "";
        }, 3000)  
    }
    
    return(
        <>
            <div className="row">
                <div className="col-12 offset-sm-1 col-sm-10">
                    <h1 className="text-center mb-3 mt-5">
                        <i className="fas fa-user-plus"></i>Upload Profile Image
                    </h1>
                    <div className="error text-center"></div>
                    <form id="fileForm"className="form-inline" name="myForm">
                        <div className="form-group mb-0">
                            <input 
                                className="form-control"
                                style={{ padding: 0}}
                                name="uploaded_file"
                                id="file-upload" 
                                type="file"
                            />
                        </div>
                        <input type="submit" value="Upload" className="btn custom-file-upload btn-primary " onClick={(e)=>handleSubmit(e)}/>
                    </form>    
                </div>   
            </div>
            <div className="row" style={{marginTop: "2em", marginBottom: "2em"}}>
                <div className="col-6 offset-sm-1 col-sm-5">
                    <img id="home_landingPage2" src={MockWebsite} alt="Landing Page Example"/>
                </div>
                <div className="col-6 col-sm-5" style={{display: "flex", alignItems: "center"}}>
                    <ul className="uploadUL">
                        <li className="uploadLI">Photos must be in focus</li>
                        <li className="uploadLI">Photos must be well it</li>
                        <li className="uploadLI">Photos must not be filtered</li>
                        <li className="uploadLI">Photos must only be of the business</li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default DashboardAddImage;