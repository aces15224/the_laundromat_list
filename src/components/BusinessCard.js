const BusinessCard = ({result, handleClick})=>{
    const imageUrl = result.imageUrl;
    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/1200px-Google_Photos_icon_%282020%29.svg.png";
    const liStyle={textAlign: "left"};
    //divide businessAddress into street and city
    let street = result.businessAddress.split(/,/)[0];
    let city = result.businessAddress.split(/,/)[1];

    //create object to send up to parent component
    const businessInfo = {}
    businessInfo.phone = result.phone;
    businessInfo.name = result.businessName;
    businessInfo.address = result.businessAddress;

    //check if profile image is an image file or a url
    const filetypes = /jpeg|jpg|png|gif|pdf/.test(imageUrl);
    const webCheck = /https|www/.test(imageUrl);

    return(
        <li className="businessResultLI" onClick={(e)=>handleClick(businessInfo)}>
            <div className="row">
                <div className="col-2">
                    {/* if no image, use default.  if url, display image.  if image file, display image contained within public file */}
                    <img src={(imageUrl === "" || imageUrl === null) ? defaultImage : webCheck === true ? imageUrl : filetypes === true ? process.env.PUBLIC_URL + `/uploads/resized/${imageUrl}` : imageUrl} 
                        className="busResPic" 
                        alt="Business Preview" 
                    />    
                </div>
                <div className="col-10" style={{margin:"auto"}}>
                    <div style={liStyle}>
                        {result.businessName}     
                    </div>
                    <div style={liStyle}>
                        {`${street}, ${city}`}
                    </div>    
                </div>
            </div>           
        </li>
    )
}

export default BusinessCard;