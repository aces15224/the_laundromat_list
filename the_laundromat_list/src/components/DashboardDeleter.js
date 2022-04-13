import React, {useState} from "react";

const DashboardDeleter = ({url})=>{
    //Permission and delete control which buttons and which header messages are displayed
    const [permission, setPermission] = useState(false);
    const [deleteStatus, setDeleteStatus] = useState(false);
    //reference to delete message
    const message = document.getElementById("price-message");

    //function for deleting list and display delete message
    const deleteList = ()=>{
        //setDeleteStatus(true) to delete list and display delete message
        setDeleteStatus(true);
        message.style.fontWeight = "bold";
        //delete price list from database using url that was passed down from parent
        fetch(url, { method: 'DELETE' })
        .then(() =>{
            // if successful, set permission and delete to false after 3 seconds
            setTimeout(()=>{
                console.log("timeout")
                setPermission(false);
                setDeleteStatus(false);
                message.style.fontWeight = "normal";
            }, 3000)
        });
    }
    
    //Header Message - (Btn or Message Displayed)  
    //1) "Delete List?" - (Yes/No Button)  
    //2) "Are You Sure?" - (Yes/No Button)  
    //3) "Delete Successful" - ("Re-add Price at anytime")
    return(
        <div className="row">
                <div className="mt-3 mb-3 col-md-12 offset-lg-1 col-lg-10 dashboardCol">
                    <div className="card bg-dark text-center">
                        <div className="card-header"></div>
                            <div className="card-body" style={{backgroundColor:"white"}}>
                                <h5 className="card-title" id="price-message">
                                    {(permission && !deleteStatus) ? "Are you sure?  This cannot be undone." : (!permission && !deleteStatus) ? "Delete Price List" : "Delete Successful"}
                                </h5>
                               {(permission && !deleteStatus) ?
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-success" onClick={deleteList}>Yes</button>
                                        <button type="button" className="btn btn-danger" onClick={()=> setPermission(false)}>No</button>
                                    </div>
                               
                                    : (!permission && !deleteStatus) ?
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-success" onClick={()=> setPermission(true)}>Yes</button>
                                            <button type="button" className="btn btn-danger" onClick={()=> setPermission(false)}>No</button>
                                        </div>
                                    :   <div>
                                            <h6>Re-add Price List and Details at anytime!</h6>
                                        </div>
                                }  
                            </div>    
                        <div className="card-footer text-muted"></div>
                    </div>
                </div>
            </div>
    )

}

export default DashboardDeleter;