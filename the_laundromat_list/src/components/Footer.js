import React from "react";
import {Link} from "react-router-dom";
import Logo from "../images/clearLogo.png";

const Footer = (props)=>{
    const innerWidth = (window.innerWidth < 576 || window.innerWidth >=690 && window.innerWidth <=991);
    const linkStyle = {color:"rgb(58 57 57)", marginRight: "6px", padding:0};
    let windowLocation = window.location.pathname;
    let windowTest = /^\/laundromat\/[\d{5}$]|^\/dry-cleaner\/[\d{5}$]/.test(windowLocation);
    const changeClass = windowTest ? "col-lg-4 linkDiv" : "col-lg-3 linkDiv";
    const footerStyle = {}
    if(windowTest){
        footerStyle.width = (window.innerWidth>=576 && window.innerWidth <= 689) ? props.width : "100%";
        footerStyle.position = "relative";
        footerStyle.top = props.top;
        footerStyle.paddingRight = 0;
        footerStyle.margin= 0;
    } else{
        footerStyle.marginTop = 0;
    }
    const rowWidth = (window.innerWidth>=576 && window.innerWidth <= 689) ? {width: props.width} : null;
    return(
        <div className="container-fluid footerDiv" style={footerStyle}>
            <div className="row footerRow" style={(window.innerWidth>=576 && window.innerWidth <= 689) ? {width: props.width} : null}>
                <div className="col-lg-3" style={(windowTest) ? {display:"none"} : {alignItems: "center", display: "flex"}}>
                    <a className="navbar-brand" href="/"><img id="clearLogo" alt="logo" src={Logo} /></a>
                </div>
                <div className={changeClass} style={(innerWidth) ? {marginTop: 5} : {marginTop: 20}}>
                    <p className="category-footer">The Laundromat List</p>
                    <ul className="footerUl">
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/about-us"
                            >
                            About Us                            
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "#"
                            >
                            Search Laundromats near me  
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "#"
                            >
                            Search Dry Cleaners near me  
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/contact-us"
                            >
                            Contact Us  
                            </Link>  
                        </li>                    
                    </ul>
                </div>
                <div className={changeClass} style={(innerWidth) ? {marginTop: 5} : {marginTop: 20}}>
                    <p className="category-footer">Our Services</p>
                    <ul className="footerUl">
                        <li>
                            <Link
                                style={linkStyle}
                                to = "/business"
                            >
                            Business Services                            
                            </Link>  
                        </li>
                        <li>
                            <Link
                                style={linkStyle}
                                to = "#"
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