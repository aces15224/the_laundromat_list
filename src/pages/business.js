import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _searchPage from "../images/searchPageTablet.png";
import _landingPage from "../images/website.png";
import _website from "../images/WebsitePNG.png";
import _getFound from "../images/getFound.png";
import _showcase from "../images/showcaseIcon.png";
import _answerQuestions from "../images/answerQuestions.png";
import _mobileAccount from "../images/mobilePhoneAcct.png";
import _number1 from "../images/iconNumber1.png";
import _number2 from "../images/iconNumber2.png";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

class BusinessPage extends Component{
    render(){
        const center = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }
        
        const subHeader = {
            
            fontWeight: "600",
            fontSize: "1.1em",
            marginTop: "10px",
            marginBottom: "10px"
        }
        
        return(
            <>
                <Navbar/>
                <div style={{overFlowX:"hidden"}}>
                    <div className="container-fluid">
                        <div className="row" style={{backgroundColor: "rgb(9 178 225)"}}> 
                            <div className="col-5 col-sm-5 col-md-12 offset-lg-1 col-lg-5 _headerTextDiv" style={{display: "flex"}}>
                                <div className="main_sub_div">
                                    <p className="mainBusinessHeader">Claim your free business page!</p>
                                    <p className="_businessSubHeader">Appear in Laundromat List Search Results</p>
                                    <Link  
                                        to = "/sign-up"
                                    >
                                        <button type="button" className="btn btn-danger li-p dashInput" style={{ textShadow: "1px 1px black"}}>Register Now</button>
                                    </Link>
                                </div> 
                            </div>
                            <div className="col-7 col-sm-7 col-md-12 col-lg-5 _headerPicDiv">
                                <img id="busMainPic" className="img-responsive" src={_website} alt="computer showing website" />
                            </div>                         
                        </div>
                        <div className="row" style={{marginTop: 50, marginBottom: 50}}>
                            <div className="offset-2 col-lg-4">
                                <img id="_searchPic" src={_searchPage} alt="business with sign" style={{height: "auto", width: "100%"}}/>
                            </div>
                            <div className="offset-md-1 col-md-10 col-lg-4" style={{display: "flex"}}>
                                <div id="_searchPicDiv">
                                    <p id="businessSubHeader1">Join The Laundromat List and Start appearing in search results</p>
                                    <p className="smallSubHeader">Results Link to your Website.  Don't have a website?  <a href="#website">Click here</a></p>
                                </div>                               
                            </div>                                                 
                        </div>
                        <div className="row contrastRow" style={{marginTop: 50}}>
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 text-center" style={{padding: 20}}>
                                        <h1 className="businessSubHeader1">Register Your Business</h1>
                                        <h5 style={{color: "red"}}>We'll help you...</h5>
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-md-12 offset-lg-1 col-lg-10">
                                        <div className="businessCardDiv">
                                            <div className="card businessPageCard">
                                                <img className="businessIcons" src={_getFound} alt="magnifying glass" />
                                                <p className="text-center" style={subHeader}>Reach a wider audience</p>
                                                <p style={{fontWeight: 300}}>Customers use our search tool to find the business that is right for them.  Add yours and start appearing in their search results today.</p>
                                            </div>
                                            <div className="card businessPageCard">
                                                <img className="businessIcons" src={_showcase} alt="check list" />
                                                <p className="text-center" style={subHeader}>Showcase Your Business</p>
                                                <p style={{fontWeight: 300}}>Highlight the amenities and services your business offers. Inform potential customers why your business is right for them.</p>
                                            </div>
                                            <div className="card businessPageCard">
                                                <img className="businessIcons" src={_answerQuestions} alt="question mark" />
                                                <p className="text-center" style={subHeader}>Answer Questions</p>
                                                <p style={{fontWeight: 300}}>Make it easy for customers to plan for laundry day. List busy times, provide business hours, and answer questions about pricing or payments</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="website" className="row">
                            <div className="col-12 text-center">
                                <h6 style={{color: "green"}}>Plus</h6>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: 50, marginBottom: 50}}>
                            <div id="landingPageCol" className="col-5 col-sm-5 col-md-6 offset-lg-2 col-lg-4" style={{display: "flex"}}>
                                <div id="landing_sub_div">
                                    <p id="businessSubHeader2">You can use your business page as your website!</p>
                                    <ul id="_landingPageUl">    
                                        <li style={{fontWeight: 300}}>
                                            <i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
                                            Start Advertising on the Internet
                                        </li>
                                        <li style={{fontWeight: 300}}>
                                            <i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
                                            Attract More Customers
                                        </li>
                                        <li style={{fontWeight: 300}}>
                                            <i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
                                            Grow Your Business
                                        </li>
                                        <li style={{fontWeight: 300}}>
                                            <i class="fa fa-check" aria-hidden="true" style={{color: "#27d627", marginRight: 5}}></i>
                                            Do it for free
                                        </li>
                                    </ul>
                                    <Link
                                        to = "/sign-up"
                                    >
                                        <button type="button" className="btn btn-danger li-p dashInput" style={{ textShadow: "1px 1px black"}}>Register Now</button>
                                    </Link>
                                </div>                               
                            </div>
                            <div className="col-7 col-sm-7 col-md-6 col-lg-4" style={{display:"flex"}}>
                                <img src={_landingPage} alt="business with sign" style={{height: "auto", width: "100%"}}/>
                            </div>                                                 
                        </div>
                        <div className="row contrastRow" style={{paddingTop: 20, paddingBottom: 20, backgroundColor: "rgb(9 178 225)", color: "white", textShadow:"1px 1px rgb(54 4 134)"}}>
                            <div className="col-10 col-sm-10 offset-sm-1 col-md-4 offset-md-1 col-lg-3 offset-lg-2">
                                <div id="_membersHeaderDiv" style={center}>
                                    <p id="businessSubHeader3" style={{textShadow:"1px 1px rgb(54 4 134)", fontSize: "1.1em", }}>
                                        <span style={{color:"rgb(255 244 3)"}}>Our business pages do everything a website should do. </span>
                                        Customers will only think they're looking at a company website.
                                    </p>       
                                </div>
                            </div>
                            <div className="col-4 col-sm-4 offset-sm-1 col-md-3 offset-md-0 col-lg-2 offset-lg-0 _membersPicDiv">
                                <img src={_mobileAccount} id="_mobilePhone" alt="mobilePhone"/>
                            </div>
                            <div className="col-6 col-sm-6 col-md-4 col-lg-4 _membersDiv" style={{display:"flex"}}>
                                <div id="_membersDivInner"style={center}>
                                    <h2 className="default-sub-header">Members can</h2>
                                    <ul id="_membersUl">   
                                        <li style={{fontWeight: 600}}>
                                            <i class="fa fa-star" aria-hidden="true" style={{color: "rgb(255, 244, 3)", textShadow: "1px 1px rgb(121 6 59)", marginRight: 5}}></i>
                                            Manage Appearance in Search Results
                                        </li>
                                        <li style={{fontWeight: 600}}>
                                            <i class="fa fa-star" aria-hidden="true" style={{color: "rgb(255, 244, 3)", textShadow: "1px 1px rgb(121 6 59)", marginRight: 5}}></i>
                                           Highlight Amenities and Services
                                        </li>
                                        <li style={{fontWeight: 600}}>
                                            <i class="fa fa-star" aria-hidden="true" style={{color: "rgb(255, 244, 3)", textShadow: "1px 1px rgb(121 6 59)", marginRight: 5}}></i>
                                            Update Business Information
                                        </li>
                                        <li style={{fontWeight: 600}}>
                                            <i class="fa fa-star" aria-hidden="true" style={{color: "rgb(255, 244, 3)", textShadow: "1px 1px rgb(121 6 59)", marginRight: 5}}></i>
                                            Build Web Presence
                                        </li>
                                    </ul>
                                </div> 
                            </div>
                        </div>
                        <div className="row" style={{paddingTop: 20, paddingBottom: 20, textShadow:"1px 1px rgb(54 4 134)"}}>
                            <div className="col-12 text-center">
                                <h2 className="businessSubHeader1">How do you Join?</h2>
                                <h5 style={{color:"red"}}>It's free and easy</h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 offset-lg-1 col-lg-10 text-center">
                                <div className="businessCardDiv">
                                    <div className="card businessPageCard">
                                        <img className="businessIcons" src={_number1} alt="magnifying glass" />
                                        <p className="text-center" style={subHeader}>Register Your Business</p>
                                        <p style={{fontWeight: 300}}>Start by clicking below. </p>
                                        <Link
                                            style={{color:"white", marginRight: "6px", padding:0, textShadow: "1px 1px grey", display: "inline"}}
                                            to = "/sign-up"
                                        >
                                            <button type="button" className="btn btn-danger li-p" style={{margin: "auto 10px"}}>Register Now</button>
                                        </Link>
                                    </div>
                                    <div className="card businessPageCard">
                                        <img className="businessIcons" src={_number2} alt="check list" />
                                        <p className="text-center" style={subHeader}>Complete Your Profile</p>
                                        <p style={{fontWeight: 300}}>Tell customers about your business.  Add Contact Information, Service Descriptions, Prices, and More. </p>
                                    </div>
                                    <div className="card businessPageCard">
                                        <img className="businessIcons" src={_getFound} alt="question mark" />
                                        <p className="text-center" style={subHeader}>Get Found</p>
                                        <p style={{fontWeight: 300}}>That's it!  Activate your business page and start appearing in The Laundromat List search results, today!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>
        )    
    }
}

export default BusinessPage;