const DefaultAmenities = ({options, overview})=>{
    console.log(overview)
    //Function maps over options and returns a list-item w/ a label and a check mark
    const amenities = options.map((opt, index)=>{
        return <li className="amenityLi" key={index}><i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
        {opt}</li> 
    })
    //Overview: Class determined by options length.  If no options, div will take up full space.  Otherwise, it will share space with amenities list
    const ov_Class = options.length === 0 ? "offset-1 col-10 offset-sm-1 col-sm-10" : "offset-1 col-10 offset-md-1 col-md-6";
    
    //If overview is lone div, center text, position text to the left.
    const _textCenter = options.length === 0 ? "text-center" : null;

    //If no options, do not include amenities div.  
    const _dNone = options.length === 0 ? "d-none" : null;
   
    
    return(
        <div className="container-fluid default-page-wrapper">
            <div className="row" style={{backgroundColor: "rgb(0, 153, 255)"}}>
                <div className={`${ov_Class}`}>
                    <div>
                        <h2 className={`blueBGheader ${_textCenter}`}>Overview:</h2>
                        <p className="_overview">{overview}</p>
                    </div>
                </div>
                <div className={`offset-1 col-10 ${_dNone} col-md-4`}>
                    <h2 className="blueBGheader">On site amenities:</h2>
                    <ul id="amenity_list">
                        {amenities}
                    </ul>                   
                </div>
            </div>
            <div className="row" style={{backgroundColor: "rgb(0, 153, 255)"}}>
                <div className="col-12">
                    <hr style={{margin: "30px 0px", borderTop: "1px solid rgb(0 0 0 / 15%)"}}></hr>
                </div>
            </div>
        </div>
    ) 

}
export default DefaultAmenities;