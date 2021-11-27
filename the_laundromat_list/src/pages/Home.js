import React, {useState} from "react";
import Search from "../images/laundrymat-2.jpg"
import Compare from "../images/arcade.jpg";
import Plan from "../images/planPic.png";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Modal from "../components/Modal";
const Home = ()=>{
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const modalTimer = ()=>{
        setTimeout(
            // function() {
            //     setShow(false);
            // }
            // .bind(this),
            // 3000
        )  
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        let category = document.getElementById('category').value;
        let zipCode = document.getElementById('zipCode').value;
        let results = false;
        if(!isNaN(parseInt(zipCode)) && zipCode.length === 5){
            fetch("/api")
            .then(response => response.json())
            .then(data => {
                for(let i = 0; i < data.length; i++){
                    if(data[i].zip === parseInt(zipCode)){
                        results = true;
                    }
                }
                if(results === true){
                    window.location = `/${category}/${zipCode}`
                } else{
                    setShow(true);
                    setErrorMessage("No Results");
                    modalTimer();   
                }
            });
        }
        else if (isNaN(parseInt(zipCode))){
            setShow(true);
            setErrorMessage("Invalid Zip Code");
            modalTimer();  
        }   
    }
    return(
        <div>
            <Navbar />
            <div id="main-home" className="container-fluid">
                <div className="row d-block">
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-5 mx-auto" >
                                <p id="main-header-text">Start Searching Now!</p>
                            </div>
                        </div>
                        <div className="row" style={{margin: "15px 0px"}}> 
                            <div className="col-xs-10 mx-auto" style={{display:"relative"}}>
                                <div className="card main-card">
                                <div className="home-card card">
                                    <form onSubmit={handleSubmit}>
                                        <label className="formLabel">
                                            <span style={{padding: 5, margin: "0px 10px"}}>Find</span>
                                            <select id="category">
                                                <option value="laundromat">Laundromats</option>
                                                <option value="dry-cleaner">Dry Cleaners</option>
                                            </select>    
                                        </label>
                                        <label className="formLabel">
                                            <span style={{padding: 5, margin: "0px 10px", borderLeft:" 1px solid grey"}}>Near</span>
                                            <input
                                                id="zipCode"
                                                type="text"
                                                name="zipCode"
                                                placeholder="Zip Code"
                                                style={{textAlign:"center"}}
                                            />  
                                        </label>
                                        <button id="submit" type="submit" value="Submit" style={{borderLeft:"solid 1px black"}}>
                                            <i className="fas fa-search-location"></i>
                                        </button>
                                        <Modal show={show} errorMessage={errorMessage}/>
                                    </form>     
                                </div>
                                </div>                                    
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-10 mx-auto">
                                <div id="featureList">Find Laundromats | Find Dry Cleaners | Advertise Your Business</div>
                            </div>
                        </div>         
                    </div>
                </div>                        
            </div>
            <div className="container-fluid">
                <div className="row" style={{backgroundColor: "white", borderTop: "2px solid yellow"}}>
                    <div className="col-xs-12 mx-auto home-mid-header" style={{color: "red"}}>
                        Find Laundromats Near You
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 offset-lg-1 col-lg-10">
                        <div className="row">
                            <div className="col-md-4 col-lg-4 home-about-col">
                                <div class="card home-about-card">
                                    <img class="card-img-top" src={Search} alt="Empty Laundromat"/>
                                    <div class="card-body home-about-card-body">
                                        <h5 class="card-title home-about-card-title">Search</h5>
                                        <p class="card-text p-home-subs">
                                            We'll supply you with a complete list of laundromats in your area, so you 
                                            can find the best fit for your laundry needs.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 home-about-col">
                                <div class="card home-about-card">
                                    <img class="card-img-top" src={Compare} alt="Laundromat with Arcade"/>
                                    <div class="card-body home-about-card-body">
                                        <h5 class="card-title home-about-card-title">Compare</h5>
                                        <p class="card-text p-home-subs">
                                            From pricing, to promotions, to entertainment offerings, we bring you all
                                            the information you need to make a decision.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4 home-about-col">
                                <div class="card home-about-card">
                                    <img class="card-img-top" src={Plan} alt="Washing machines that are ready to use"/>
                                    <div class="card-body home-about-card-body">
                                        <h5 class="card-title home-about-card-title">Plan</h5>
                                        <p class="card-text p-home-subs">
                                            Check busy times.  Make sure supplies, or snacks, or ATM's are available.  
                                            We'll help you plan for laundry day and SAVE TIME. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12 mx-auto home-mid-header" style={{color: "black"}}>
                        Are you a business?
                    </div>
                </div>
                <div className="row home-business-info">
                    <div className="offset-lg-1 col-lg-10">
                        <div className="row">
                            <div className="col-lg-7 business-info-background" style={{height:300}}>
                                Mock Website Picture
                            </div>
                            <div className="col-lg-5" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", height:300}}>
                                <h1>We can help you</h1>
                                <ul>
                                    <li>Reach more potential customers</li>
                                    <li>Showcase the best of your business</li>
                                    <li>Promote your business for free</li>
                                    <li>Use your business page as a website</li>
                                </ul>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href='/business';
                                    }}className="home-business-btn">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <Footer/>
        </div>
    )
}

export default Home;