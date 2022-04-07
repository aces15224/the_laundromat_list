import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import { Icon } from '@iconify/react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutPage = ()=>{
    useEffect(()=>{
        window.scroll(0,0)
    },[])
    const btnStyle = {width: "100%", borderRadius: 0};
    const history = useHistory();
    const handleClick = (e, category)=>{
        if(category === "search"){
            history.push("/")
        } else{
            history.push("/business")
        }
    }
    return (
        <>
            <Navbar/>
            <div className="container-fluid aboutPage">
                <div className="row">
                    <div className="col-sm-12 offset-md-1 col-md-8 dashboardCol">
                        <div className="row">
                            <div className="offset-1 col-10 text-center dashboardCol">
                                <h2 className="logoFont">About Us</h2>
                            </div>
                        </div> 
                        <div className="row">
                            <div className="offset-1 col-10 dashboardCol">
                                <p className="lead"> 
                                    The Laundromat List is an online business directory that is focused primarily towards Laundromats and Dry Cleaning services.  
                                    This site is intended to be a tool for helping both businesses--who want to increase their visibility--and customers who want
                                    to be better informed about laundry services in their area. 
                                </p>  
                                <p className="lead">
                                    <span style={{color:"blue"}}>Are you a customer?</span> Our Laundry Locator Service is the perfect tool for Customers who want
                                    to find the Laundromat or Dry cleaning service that best fits their needs.  We help customers find the closest laundromat, find
                                    the best prices, and more. Try it out.  Click <a href="/">here</a> to discover the local services that offer you the most.  
                                </p>
                                <p className="lead"> 
                                    <span style={{color:"blue"}}>Are you a Business?</span> The Laundromat List helps local businesses advertise their services to
                                    potential customers...for free.  A stunning 70% of laundromats and dry cleaners do not have a website.  Set yourself apart from 
                                    the competition and showcase to the world what makes your business unique.  Add your business to The Laundromat List and we'll 
                                    give you a Free Business Page. Put your business on the map and start driving more customers to your establishment by registering 
                                    today!                                  
                                </p>
                            </div>
                        </div> 
                    </div>
                    <div className="col-sm-12 col-md-3 text-center aboutSideCaption">
                        <div className="card p-3 aboutCard">
                            <h4 className="aboutCardHeader">Are you a business?</h4>
                            <Icon className="aboutIcon" icon="ion:business-sharp" />
                            <p>Improve Visibility and Reach More Customers!</p>
                            <button className="btn btn-primary d-block btn-custom" style={btnStyle} onClick={(e)=>handleClick(e, "business")}> Learn More</button>    
                        </div>
                        <div className="card p-3 aboutCard">
                            <h4 className="aboutCardHeader">Are you a customer?</h4>
                            <Icon className="aboutIcon" icon="icon-park-outline:laptop" />
                            <p>Check prices, Busy times, and More!</p>
                            <button className="btn btn-primary d-block btn-custom" style={btnStyle} onClick={(e)=>handleClick(e, "search")}>Search Now</button>    
                        </div>            
                    </div>         
                </div>
            </div>         
            <Footer/>
        </>
    )
}

export default AboutPage;