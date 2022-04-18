import React from "react";
import { Icon } from '@iconify/react';
import clockTimeThreeOutline from '@iconify-icons/mdi/clock-time-three-outline';
import phoneInTalk from '@iconify-icons/mdi/phone-in-talk';

const DefaultNavBar = (data)=>{
    const {businessName, prices, businessPhone, businessHours} = data.data;
    //Price Nav is rendered only if user has uploaded prices
    const priceNav = ()=>{
        return(
            <li className="li-nav">
                <a className="nav-link" href="#default-pricing">Pricing</a>
            </li>
        )
    }
    return(
        <div>
            <ul className="nav justify-content-end" style={{ alignItems:"center", backgroundColor:"rgb(3 76 97)" }}>
                <div style={{display:"flex", alignItems:"center"}}>
                    <Icon className="default-icon" icon={phoneInTalk} />
                    <p className="default-nav-text">{businessPhone}</p>
                </div>
                <div style={{display:"flex", alignItems:"center", marginLeft: "5px"}}>
                    <Icon className="default-icon" icon={clockTimeThreeOutline} />
                    <p className="default-nav-text">{businessHours}</p>
                </div>
            </ul>
            <nav className="navbar navbar-expand-sm navbar-light" id="navBarId">
                <div className="navbar-brand">{businessName}</div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="ul-nav">
                        <li className="li-nav">
                            <a className="nav-link" href="#default-banner">Home</a>
                        </li>
                        <li className="li-nav">
                            <a className="nav-link" href="#default-services">Services</a>
                        </li>
                        {prices && priceNav()}
                        <li className="li-nav">
                            <a className="nav-link" href="#default-contact">Contact</a>
                        </li>
                    </ul>
                </div>
            </nav>        
        </div>
    ) 

}
export default DefaultNavBar;