import React from "react";
function DefaultJumboTron({category, name, address, image, directions}){
    return (
        <div className="container-fluid" id="default-banner">
            <div className="row default_bg">
                <div className="col-6 col-sm-6 text-center" style={{margin:"auto"}}>
                    <div className="text-center">
                        <p className="default-main-title">{name}</p>
                        <p className="default-main-sub">{category} in {address}</p>  
                        {/* directions will open google map w/ directions to business */}
                        <button type="button" className="btn btn-danger btn-lg dashInput jumboBtn" onClick={()=>directions()}>
                            Get Directions
                        </button>
                    </div>
                </div>
                <div className="col-6 col-sm-6 text-center" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={image} className="default-main-pic" alt="businessPic"/>                   
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* wave border image */}
                    <div className="_svgDiv">
                        <svg className="svgStyle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#0099ff" 
                                fill-opacity="1" 
                                d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,165.3C672,160,768,128,864,106.7C960,85,1056,75,1152,80C1248,85,1344,107,1392,
                                117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>        
        </div>
        
    )
}

export default DefaultJumboTron;