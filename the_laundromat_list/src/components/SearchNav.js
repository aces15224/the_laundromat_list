import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from "../images/clearLogo.png";
import { AuthContext } from '../App';

const SearchNav = ({screensize})=>{
    //Login context includes t/f value to indicate if user is logged in, business name, and function for logging in/out
    const {login, loginFunction, businessName} = useContext(AuthContext);

    //show error messages
    const [ show, setShow ] = useState(false);

    //Log out button functionality
    const logout = async (e)=>{
        e.preventDefault();
        await fetch("/api/logout")
        .then((data)=>{
            console.log(data)
            // make fetch request and then call login function to log out
            loginFunction()
        })
    }

    const errorHandler = ()=>{
        //set show(true) to display error message and reset zip
        setShow(true)
        //after 4 seconds, remove message
        setTimeout(()=>{
            setShow(false)
        }, 4000)
    }
    //submit button functionality
    const handleSubmit = (event)=>{
        event.preventDefault();
        let category = document.getElementById('search_category').value;
        let zipCode = document.getElementById('search_zipCode').value;
        //if zipcode is valid re-load results
        if(!isNaN(parseInt(zipCode)) && zipCode.length === 5){
            window.location = `/${category}/${zipCode}`
            //otherwise, display an error
        } else if (isNaN(parseInt(zipCode)) || zipCode.length !== 5){
            errorHandler()
        }     
    }

    //The remainder of code are buttons that will be displayed conditionally
    const login_btn = (
        <Link
            style={{color:"white", marginRight: "6px", padding:0, textShadow: "1px 1px grey", display: "inline"}}
            to = "/login"
        >
            <button type="button" className="userBtnGroup btn btn-outline-info" style={{fontSize: "12px", margin: "5px 0px 5px 5px", fontWeight: "bold"}}>Log In</button>
        </Link>
    )

    const logout_btn = (
        <Link 
            to= "#"
            onClick={(e)=>logout(e)}
            style={{ display: "inline"}}
        >
            <button type="button" className="userBtnGroup btn btn-outline-danger" style={{fontSize: "12px", margin: "5px", fontWeight: "bold"}}>Log Out</button>
        </Link>
    )

    const signup_btn = (
        <Link
            style={{color:"white", marginRight: "6px", padding:0, display: "inline"}}
            to = "/sign-up"
        >
            <button type="button" className="userBtnGroup btn btn-outline-success" style={{fontSize: "12px", margin: "5px 0px 5px 0px", fontWeight: "bold"}}>Sign Up</button>

        </Link>
    )

    const listing_link = (
        <Link
            className="profileLinkText"
            to = "/business"
        >
            {/* shorten return text based on screensize */}
            {(screensize <= 900 || screensize > 1152) ? "Manage your free business listing" : "For Businesses"}
        </Link>
    )

    const profile_link = (
        <Link
            className="profileLinkText"
            to = {`/business/dashboard/${businessName}`}
        >
            {/* shorten return text based on screensize */}
            {(screensize <= 900 || screensize > 1152) ? "Go to your Business Profile" : "Profile Page"}
        </Link>
    )
    
    return(
        <nav className="searchNavBar" id="navBarId">
            <Link className="searchNavPic" to="/"><img id="searchBarLogo" className="img-fluid" alt="logo" src={Logo} /></Link>
            {/* if show is true set a border to alert user of an error */}
            <div className="searchCard card" style={show ? {border: "2px solid red"} : null}>
                <form className="searchBarForm" onSubmit={(e)=>handleSubmit(e)}>
                    <label className="searchFormLabel">
                        <span>Find</span>
                        <select id="search_category">
                            <option value="laundromat">Laundromats</option>
                            <option value="dry cleaning">Dry Cleaners</option>
                        </select>    
                    </label>
                    <label className="searchFormLabel">
                        {show && 
                            <div className="row">
                                <div className="col-xs-5 mx-auto" >
                                    <div className="error-zip">Invalid Zip Code</div>
                                </div>
                            </div>
                        }
                        <span style={{borderLeft:" 1px solid grey"}}>Near</span>
                        <input
                            id="search_zipCode"
                            type="text"
                            name="zipCode"
                            placeholder="Zip Code"
                            style={{textAlign:"center"}}
                        />  
                    </label>
                    <button id="search_submit" type="submit" value="Submit" style={{borderLeft:"solid 1px black"}}>
                        <i className="fas fa-search-location"></i>
                    </button>
                </form>     
            </div>
            <ul className="nav justify-content-end userBtns" style={{ alignItems:"center", height: "42px"}}>
                <li style={{fontSize:"16px"}}>
                    {/* if user isn't logged in display a link to the business page.  otherwise, display link to user's profile */}
                    { !login ? listing_link : profile_link }
                </li>
                <li style={{fontSize:"12px", fontWeight:"bold"}}>
                    {/* if user isn't logged in display a login button, otherwise display logout button */}
                    {!login ? login_btn : logout_btn}
                </li>
                {/* if user isn't logged in display a link to the sign up page */}
                {   !login &&
                    <li style={{fontSize:"12px", fontWeight:"bold"}}>
                        {signup_btn}
                    </li>
                }
            </ul>
        </nav> 
    )
}

export default SearchNav;