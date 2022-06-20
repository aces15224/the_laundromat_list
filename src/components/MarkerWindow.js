const MarkerWindow = ({phone, cityStateZip, businessName, image, onCloseClick})=>{
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png";
    //check if profile image is an image file or a url
    const filetypes = /jpeg|jpg|png|gif|pdf/.test(image);
    const webCheck = /https|www/.test(image);
    return(
        <div className="card markerInfo" style={{margin: "10px", backgroundColor: "white", objectFit: "cover"}}>
            <img
                height="150px" 
                // if image is empty or null, return default image.  If it's a url or an image file, return image, otherwise display picture saved on file
                src={(image === "" || image === null) ? defaultImage : webCheck === true ? image : filetypes === true ? process.env.PUBLIC_URL + `/uploads/resized/${image}` : image} 
                alt="businessPic" 
                style={{zIndex: "101", margin: 3}}
            />
            <div style={{display:"flex"}}>
                {/* Business name will be shortened if it is beyond 23 characters */}
                <p className="windowText" style={{fontSize:"100%", fontWeight:"bold"}}>{(businessName.length > 23) ? businessName.slice(0, 23) + "..." : businessName}</p>
                <span style={{margin: "0px 5px", fontWeight: "bold", position: "absolute", right: 5, top: 165}} onClick={onCloseClick}>X</span>
            </div>
            <div style={{display:"flex", justifyContent:"space-between", marginRight: "4px"}}>
                <p className="windowTextSub" style={{fontSize:"85%"}}>{(phone === undefined) ? "No Phone Number Listed" : phone}</p>    
                <p className="windowTextSub" style={{fontSize:"85%"}}>{cityStateZip}</p>      
            </div>
            
        </div>
    )

}


export default MarkerWindow;