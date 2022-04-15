import React, {useEffect, useState, useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from '../App';
import Logo from "../images/clearLogo.png";


const Navbar =()=>{
    const [navStyle, setNavStyle] = useState();
    //Login is a contextual function used to log out the user
    const {login, loginFunction, businessName} = useContext(AuthContext);

    useEffect(()=>{
        let navStyle = {}
        //Reference url and determine if the current page is the searchPage...
        let windowPath = window.location.pathname;
        let locationTest = /^\/laundromat\/[\d{5}$]|^\/dry-cleaner\/[\d{5}$]/.test(windowPath);

        //Change the class and column sizes based on the URL
        locationTest ? navStyle = {position: "fixed", width: "100%", zIndex: "100"} : navStyle = {position: "relative", width: "100%", zIndex: "100"};

        //set state and add event listener for resizing  
        setNavStyle(navStyle);
        window.addEventListener("resize", resizeHandler);
        return ()=>{ 
            window.removeEventListener("resize", resizeHandler)
        }
    },[login])

    const resizeHandler = ()=>{
        //resize handler will get rid of hamburger menu when the window size is >= 576
        if(window.innerWidth >= 576){
            const btn = document.getElementById("toggleBtn");
            btn.className = "navbar-toggler collapsed";
            const toggleDiv = document.getElementById("navbarToggler");
            toggleDiv.className="navbar-collapse collapse";
        }
    }
    
    const linkStyle = {
        color:"#09b2e1",
        fontFamily: "impact",
        fontStyle: "italic",
        textShadow: "1px 1px rgba(0,0,0,.125)"
    }
    const manageLink = {color:"yellow", marginRight: "15px", padding:0, textShadow: "1px 1px #7f7d7d", fontWeight: "bold"} ;
    
    //Logs out the user
    const logout = async (e)=>{
        e.preventDefault();
        await fetch("/api/logout")
        .then((data)=>{
            console.log(data)
            //passes a request to log the user out up to the parent page
            loginFunction()
        })
    }

    return(
        <div style={navStyle}>
            <ul className="nav justify-content-end" style={{ alignItems:"center", backgroundColor:"#09b2e1", height: "42px"}}>
                <li style={{fontSize:"16px"}}>
                    {/* if user is not logged in, display a link to sign up info, otherwise display a link to the dashboard */}
                    {   
                        !login ?
                            <Link
                                style={manageLink}
                                to = "/business"
                            >
                                Manage your free business listing
                            </Link>:
                            <Link
                                style={manageLink}
                                to = {`/business/dashboard/${businessName}`}
                            >
                                Go to your Business Profile
                            </Link>
                    }
                </li>
                <li style={{fontSize:"12px", fontWeight:"bold"}}>
                    {/* if user is logged in, display a log out button, otherwise display a log in button */}
                    { 
                        !login ?
                            <Link
                            style={{color:"white", marginRight: "6px", padding:0, textShadow: "1px 1px grey"}}
                            to = "/login"
                            className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}
                        >
                            Log In
                        </Link>:
                        <Link 
                            to= "#"
                            className="nav-link active" 
                            style={{color:"white", marginRight: "15px", padding:0, textShadow: "1px 1px grey"}} 
                            onClick={(e)=>logout(e)}
                        >
                            Log Out
                        </Link>
                    }
                </li>
                {/* if user is not logged in, display a button for signing up */}
                {   !login &&
                    <li style={{fontSize:"12px", fontWeight:"bold"}}>
                        <Link
                            style={{color:"white", marginRight: "6px", padding:0}}
                            to = "/sign-up"
                            className={window.location.pathname === "/sign-up" ? "nav-link active" : "nav-link"}
                        >
                            <button type="button" className="btn btn-outline-light" style={{fontSize: "12px", margin: "5px 0px 5px 5px", fontWeight: "bold"}}>Sign Up</button>

                        </Link>
                     </li>
                }

            </ul>
            <nav className="navbar navbar-expand-sm navbar-light mainNav" id="navBarId">
                <Link className="navbar-brand" to="/"><img id="logo" alt="logo" src={Logo} /></Link>
                <button id="toggleBtn" className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0 navShow" style={linkStyle}>
                        <li>
                            <Link 
                                to = "/"
                                className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}
                            >
                            Home
                            </Link>                        
                        </li>
                        <li>
                            <Link 
                                to = "/about"
                                className={window.location.pathname === "/about" ? "nav-link active" : "nav-link"}
                            >
                            About Us
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"} 
                            >
                            Contact
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>        
        </div>
    )
}

export default Navbar;