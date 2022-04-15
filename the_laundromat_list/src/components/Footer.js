import React from "react";
import {Link} from "react-router-dom";
import Logo from "../images/clearLogo.png";


function Footer(props){
    //Determine size of window for use in CSS positioning
    const innerWidth = ((window.innerWidth < 576 || window.innerWidth >=690) && window.innerWidth <=991);
    const linkStyle = {color:"rgb(58 57 57)", marginRight: "6px", padding:0};

    //Reference url and determine if the current page is the searchPage...
    let windowLocation = window.location.pathname;
    let windowTest = /^\/laundromat\/[\d{5}$]|^\/dry-cleaner\/[\d{5}$]/.test(windowLocation);

    //Change the class and column sizes based on the URL
    const changeClass = windowTest ? "col-4 linkDiv" : "offset-3 col-6 offset-sm-4 col-sm-4 offset-md-0 col-md-3 col-lg-3 linkDiv";

    //If page is loading, the footer will be fixed to bottom...
    const footerStyle = {}
    if(props.loading === true){
        footerStyle.position = "fixed";
        footerStyle.bottom = 0;
    } else{
        //if not loading, change the CSS positioning based on the window size
        if(windowTest){
            footerStyle.position = "relative";
            footerStyle.top = props.top;
            footerStyle.paddingRight = 0;
            footerStyle.margin= "20px 0px 0px 0px";
        } else{
            footerStyle.marginTop = 0;
        }
    }
    
    const rowWidth = (window.innerWidth>=576 && window.innerWidth <= 689) ? {width: props.width} : null;
    return(
        <div className="container-fluid footerDiv" style={footerStyle}>
            <div className="row footerRow" style={rowWidth}>
                <div className="offset-2 col-8 offset-sm-3 col-sm-6 offset-md-0 col-md-3 col-lg-3" style={(windowTest) ? {display:"none"} : {alignItems: "center", display: "flex"}}>
                    <a className="navbar-brand clearLogoBrand" href="/"><img id="clearLogo" alt="logo" src={Logo} /></a>
                </div>
               {/* Determine grid layout and margin based on current page and window size  */}
                <div className={changeClass} style={(innerWidth) ? {marginTop: 5} : {marginTop: 20}}>
                    <div>
                        <p className="category-footer">The Laundromat List</p>
                        <ul className="footerUl">
                            <li>
                                <Link
                                    style={linkStyle}
                                    to = "/about"
                                >
                                About Us                            
                                </Link>  
                            </li>
                            <li>
                                <Link
                                    style={linkStyle}
                                    to = "/"
                                >
                                Search Laundromats   
                                </Link>  
                            </li>
                            <li>
                                <Link
                                    style={linkStyle}
                                    to = "/"
                                >
                                Search Dry Cleaners  
                                </Link>  
                            </li>
                            <li>
                                <Link
                                    style={linkStyle}
                                    to = "/contact"
                                >
                                Contact Us  
                                </Link>  
                            </li>                    
                        </ul>    
                    </div>     
                </div>
                {/* Determine grid layout and margin based on current page and window size  */}
                <div className={changeClass} style={(innerWidth) ? {marginTop: 5} : {marginTop: 20}}>
                    <p className="category-footer">Our Services</p>
                    <ul className="footerUl">
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/business"
                            >
                            Claim your business page  
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "#"
                            >
                            Customize Your page  
                            </Link>  
                        </li>                   
                    </ul>
                </div>
                {/* Determine grid layout and margin based on current page and window size  */}
                <div className={changeClass} style={(innerWidth) ? {marginTop: 5} : {marginTop: 20}}>
                    <p className="category-footer">Have an Account?</p>
                    <ul className="footerUl">
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/login"
                            >
                            Sign In                            
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/sign-up"
                            >
                            Sign Up  
                            </Link>  
                        </li>                  
                    </ul>
                </div>    
            </div> 
            <div className="row"style={{borderTop:"2px solid white", borderBottom:"2px solid white", backgroundColor: "rgb(9 178 225)"}}>
                <div className="col-12 d-flex justify-content-center" style={{margin: "5px 0px"}}>
                    &copy;The Laundromat List
                </div>
            </div> 
        </div>
    )
}

export default Footer;
