import MapPic from "../../images/independence.png"

function DefaultContact({address, phone, hours, name, directions}){
    //copy address prop and split into 2 segments  (street and city, state, and zip)
    let newAddress = address.split(/,(.+,.+\d)/);
    let street = newAddress[0];
    let cityStateZip = newAddress[1];
    
    return(
        <div className="container-fluid default-page-wrapper" style={{backgroundColor: "rgb(0, 153, 255)"}} id="default-contact">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="default-sub-header">Contact Us</h2>
                </div>
            </div>
            <div className="row">
                <div className="col-7 col-sm-7 col-md-4">
                    <h5 className="default-contact-header">{name}</h5>
                    <p className="pText">{street},</p>
                    <p className="pText">{cityStateZip}</p>
                    <hr style={{borderTop: "1px solid rgb(0 0 0 / 15%)"}}></hr>
                    {/* Call Today will link to a phone number if clicked */}
                    <p><span style={{fontWeight: "bold", color:"#3300ff"}}>Call Today: </span><a style={{color:"black", fontWeight:"500"}} href="tel:+">{phone}</a></p>
                </div>
                <div className="col-4 d-none d-md-block col-md-4">
                    <div style={{position:"relative", border: "1px solid #3f3e3e"}}>
                        <img height="200px" width="100%" src={MapPic} style={{border: "5px solid white"}} alt="map"/>
                        {/* when button is clicked, a link to google maps will open to direct user to business's location  */}
                        <button onClick={()=>directions()}type="button" className="btn btn-primary btn-lg btn-directions" style={{border: "1px solid black", textShadow: "1px 1px black"}}>Get Directions</button>
                    </div>                
                </div>
                <div className="col-5 col-sm-5 col-md-4">
                    <h5 className="default-contact-header">Business Hours</h5>
                    <ul style={{padding:0}}>
                        {/* map over hours prop and split each value into day and time segments.... */}
                        {hours.map((hour, index)=> {
                            let day = hour.split(/\s/)[0];
                            let time = hour.split(/\s/)[1];
                            //return a list item for each day and display times
                            return(
                                <li className="hours-list" key={index}>
                                    <div style={{display:"inline-block", width:"50px", fontWeight: "bold"}}>{day}</div>
                                    <div style={{display:"inline-block", fontWeight: "500"}}>{time}</div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DefaultContact;