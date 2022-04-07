/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import {useHistory, Link} from "react-router-dom";
import {AuthContext} from "../App";
import moment from 'moment';


//Import Icons//
import { Icon } from '@iconify/react';
import borderColor from '@iconify-icons/mdi/border-color';
import tabletDashboard from '@iconify-icons/mdi/tablet-dashboard';
import accountEdit from '@iconify-icons/mdi/account-edit';
import homeEdit from '@iconify-icons/mdi/home-edit';
import currencyUsd from '@iconify-icons/mdi/currency-usd';
import checkNetwork from '@iconify-icons/mdi/check-network';
import logoutVariant from '@iconify-icons/mdi/logout-variant';


//Import Components//
import LoadingSpinner from "../components/Loading";
import Logo from "../images/clearLogo.png";
import Footer from "../components/Footer";
import AddImage from "../components/DashboardAddImage";
import Main from "../components/DashboardMain";
import BusinessInfo from "../components/DashboardBusinessInfo";
import AccountInfo from "../components/DashboardAccountInfo";
import Services from "../components/DashboardServices";

//Import Module Function//
const {setDay, setTime} = require("../components/DateTime");

const Dashboard = ()=>{
    const [timeObject] = useState({
        time: setTime(),
        day: setDay()
    })
    const history = useHistory();
    const [toDos, setToDos] = useState([]);
    const {nameFunction} = useContext(AuthContext);
    const services = {marginLeft: "20px"};

    const [linkControl, setLinkControl] = useState({
        link: "dashboard",
        servicesCategory:"",
        priceLinks: false
    })

    const [stateObject, setStateObject] = useState({});

    useEffect(()=>{
        //Check if user is allowed to access dashboard
        //If not redirect to the login page.  Otherwise, Fetch business Data
        fetch("/api/checkAuthentication")
        .then((response)=>response.json())
        .then(data => {
            if(data.authenticated !== true){
                history.push("/login")
            } else{
                updateCall();   
            }
        })
    },[])
    

    //Update information once changed
    const updateCall = ()=>{
        console.log("updateCall called!!!")
        const establishment = window.location.href.split("/business/dashboard/")[1].replace(/%20/g, " ")
        businessInfo(establishment);
    }

    //Check which parts of profile need completing and display a todo list

    const toDoList = (dropOff, delivery, dryCleaning, ...args)=>{
        const toDoArray = []
        for(let i = 0; i < args.length; i++){
            for(let j in args[i]){
                if(args[i][j] === null || args[i][j] === "[]" || args[i][j] === ""){
                    if((j === "DeliveryPrice" && delivery === true)||(j === "DropOffPrice" && dropOff === true)||(j === "DryCleaningPrice" && dryCleaning === true)){
                        toDoArray.push(j)
                    } else if(j !== "DeliveryPrice" && j !== "DropOffPrice" && j !== "DryCleaningPrice"){
                        toDoArray.push(j)
                    }
                }
            }
        }
        setToDos(toDoArray)
    }
    
    //Fetch business Info
    const businessInfo = async (establishment)=>{
        const defaultTimes = {Fr: "12:00am-12:00pm", Mo: "12:00am-12:00pm", Sa: "12:00am-12:00pm", Su: "12:00am-12:00pm", Th: "12:00am-12:00pm", Tu: "12:00am-12:00pm", We: "12:00am-12:00pm"};
        await fetch(`/api/${establishment}`)
        .then(response => {
            if(response.redirected && response.url.includes("/login")){
                window.location.href = "/login"
            }
            return response.json()
        }).then(data => {
            let currentTime = moment();
            const {
                businessAddress,
                businessHours,
                website,
                options,
                DeliveryPrice,
                DropOffPrice,
                DryCleaningPrice,
                LaundryPrice,
                overview,
                imageUrl,
                dropOff,
                delivery,
                dryCleaning, 
                PopularTime
            } = data;

            //Pass todo list items to function and display parts that are incomplete
            toDoList(dropOff, delivery, dryCleaning, {website}, {options}, {DeliveryPrice}, {DropOffPrice}, {DryCleaningPrice}, {LaundryPrice}, {overview}, {imageUrl});

            let address = businessAddress;
            let street = address.split(",")[0];
            let hours;
            //data entertainment returns 1 if entertainment is offered and 0 if not
            data.entertainment = options !== [] ? 0 : 1;

            //Check if business hours are listed and parse them, otherwise use "Default Times" 
            hours = businessHours !== null ? JSON.parse(businessHours) : defaultTimes;
            let open = hours[timeObject.day].split("-")[0];
            let close = hours[timeObject.day].split("-")[1];
            let opening = moment(open, 'h:mma');
            let closing = moment(close, 'h:mma');

            let occupancy = 0;
            let targetDay;
            let hoursToday;

            //Use Popular Times to display the occupancy percentage for given time
            if(PopularTime!= null){
                targetDay = PopularTime[timeObject.day];  
                hoursToday = JSON.parse(businessHours)[timeObject.day];
                for(let i = 0 ; i < targetDay.length; i++){
                    if(targetDay[i]["hour"] === timeObject.time){
                        occupancy = targetDay[i]['occupancyPercent'];
                    }   
                }      
            }
            data.address= address;
            data.hoursToday = hoursToday;
            data.occupancy = occupancy;
            data.hours = hours;
            data.open = (currentTime.isAfter(opening) && currentTime.isBefore(closing)) || hours.Mo === "Open 24 Hrs" ? true : false;
            data.opening = opening._i;
            data.closing = (hours.Mo === "Open 24 Hrs") ? "Open 24 Hrs" : closing._i; 
            data.street = street;
            setStateObject(data);
            //Add business name as a context for use in Dashboard Components
            nameFunction(data.businessName);               
        })
        .catch(error => console.log(error));
    }
    const selectLinks = (e, label)=>{
        const element = ((label !== null) && (label !== undefined)) ? label : e.target.name;
        if(element === "services"){
            setLinkControl({
                link: element,
                priceLinks: true,
                servicesCategory: "serviceOverview"
            })
        } else if (element === "serviceOverview" || element === "serviceLaundry" || element === "serviceDelivery" || element === "serviceDropOff" || element === "serviceDryClean"){
            setLinkControl((prevState)=>{
                return {
                    link: element,
                    priceLinks: prevState.priceLinks,
                    servicesCategory: element
                }
            })
        } else{
            setLinkControl({
                link: element,
                priceLinks: false,
                servicesCategory: "serviceOverview"
            })
        }   
    };
    
    //Function for loggin the user out
    const logout = async (e)=>{
        e.preventDefault();
        await fetch("/api/logout")
        .then((data)=>{
            console.log("you are logged out");
            window.location.href = "/login";
        })
    }
        
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 col-md-3 dashNavCol">
                        <nav className="navbar navbar-expand-md navbar-light dashboard-nav">
                            <Link className="navbar-brand dashNavBrand" to="/"><img id="defaultNavLogo" className="img-fluid" alt="logo" src={Logo} /></Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse dashboard-nav" id="navbarToggler">
                                <ul className="nav dashNavUL">
                                    <li className="nav-item navAddress">
                                        <h5>{stateObject.businessName}</h5>
                                        <p>{stateObject.address && stateObject.address.split(/,(.+,.+\d)/)[1]}</p>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" name="dashboard" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={tabletDashboard} /> Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" name="business" onClick={(e)=>selectLinks(e)}><Icon className="dashIcon" icon={homeEdit} />Business Information</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" name="profileImage" onClick={(e)=>selectLinks(e)}><Icon className="dashIcon" icon="mdi:camera" />Add Image</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" name="services" onClick={(e)=>{selectLinks(e)}}><Icon className="dashIcon" icon={currencyUsd} />Services/Pricing</a>
                                    </li> 
                                    {linkControl.priceLinks === true && 
                                        <>
                                            <li className="nav-item" style={services}>
                                                <a className="nav-link dashboard-link"  href="#" name="serviceOverview" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={borderColor}  /> Overview</a>
                                            </li>
                                            <li className="nav-item" style={services}>
                                                <a className="nav-link dashboard-link"  href="#" name="serviceLaundry" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={borderColor} /> Laundry</a>
                                            </li>
                                            <li className="nav-item" style={services}>
                                                <a className="nav-link dashboard-link"  href="#" name="serviceDropOff" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={borderColor} /> Drop Off</a>
                                            </li> 
                                            <li className="nav-item" style={services}>
                                                <a className="nav-link dashboard-link"  href="#" name="serviceDelivery" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={borderColor} /> Delivery</a>
                                            </li> 
                                            <li className="nav-item" style={services}>
                                                <a className="nav-link dashboard-link"  href="#" name="serviceDryClean" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={borderColor} /> Dry Cleaning</a>
                                            </li>
                                        </> 
                                    }
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" name="account" onClick={(e)=>selectLinks(e)}> <Icon className="dashIcon" icon={accountEdit} /> Account Information</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" onClick={()=>{
                                            window.open(`/business/laundromat/${stateObject.businessName}`, "_blank") || window.location.open(`/business/laundromat/${stateObject.businessName}`)}}>
                                            <Icon className="dashIcon" icon={checkNetwork} />
                                            View Live Site
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link dashboard-link" href="#" onClick={(e)=>logout(e)}><Icon className="dashIcon" icon={logoutVariant} />Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    {Object.keys(stateObject).length > 0 ? 
                        <div className="col-sm-12 col-md-9 dashPage">
                            {linkControl.link === "dashboard" ? 
                                <Main
                                    props={stateObject} 
                                    occupancyPercent={stateObject.occupancy} 
                                    hours={stateObject.hoursToday}
                                    rank={5}
                                    toDoList={toDos}
                                    setLink = {selectLinks}
                                /> : 
                                linkControl.link === "business" ? 
                                <BusinessInfo 
                                    name={stateObject.businessName} 
                                    phone={stateObject.phone} 
                                    address={stateObject.address} 
                                    category={stateObject.categoryName}
                                    hours={stateObject.hours}
                                    website={stateObject.website}
                                    zip={stateObject.zip}
                                    city={stateObject.city}
                                    street={stateObject.street}
                                    setLink = {selectLinks}
                                    update={updateCall}
                                /> : 
                                linkControl.link === "account" ? 
                                <AccountInfo businessName={stateObject.businessName} setLink = {selectLinks}/> :
                                linkControl.link === "profileImage" ? 
                                <AddImage name={stateObject.businessName} /> :
                                <Services
                                    category={linkControl.servicesCategory}
                                    data={stateObject}
                                    update={updateCall}
                                />
                            }                   

                        </div> :
                        <div className="col-sm-12 col-md-9 dashPage">
                            <LoadingSpinner message="Loading..."/>
                        </div>                    
                    } 
                </div>
            </div>
            <Footer/>
        </div>
    )    
    
}

export default Dashboard;

