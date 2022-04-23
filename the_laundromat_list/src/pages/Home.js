import React from "react";
import Search from "../images/laundrymat-2.jpg"
import Compare from "../images/arcade.jpg";
import Plan from "../images/planPic.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MockWebsite from "../images/landingPage.png"
import "../css/home.css";



class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show: false,
            zip: "",
            category: ""
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.errorHandler = this.errorHandler.bind(this);

    }
    
    componentDidMount(){
        //position page at top upon mounting
        window.scroll(0,0)
    }

    //onChange Function for Inputs
    handleChange(event) {
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    };

    //Error Handler
    errorHandler(){
        //set show(true) to display error message and reset zip
        this.setState({show: true, zip: ""})
        //after 4 seconds, remove message
        setTimeout(
            function() {
                this.setState({ show: false });
            }
            .bind(this),
            4000
        )
    }

    //Form Submit
    handleSubmit(event){
        event.preventDefault();
        let category = this.state.category;
        let zipCode = this.state.zip;
        // if zipcode is a number and is 5 digits long redirect user to search page
        if(!isNaN(parseInt(zipCode)) && zipCode.length === 5){
            window.location = `/${category}/${zipCode}`
            //otherwise, display an error
        } else if (isNaN(parseInt(zipCode)) || zipCode.length !== 5){
            this.errorHandler()
        }       
    }
    render(){
        return(
            <div>
                <Navbar />
                <div id="main-home" className="container-fluid">
                    <div className="row d-block">
                        <div className="col-xs-12" style={{display:"relative"}}>
                            <div className="row">
                                <div className="col-xs-5 mx-auto" >
                                    <p id="main-header-text">Start Searching Now!</p>
                                </div>
                            </div>
                            <div className="row" style={this.state.show ? {margin: "15px 0px"}: {margin: "10px 0px"}}> 
                                <div className="col-xs-10 mx-auto" style={{display:"relative"}}>
                                    <div className="card main-card" style={this.state.show ? {border: "2px solid red"} : null}>
                                        <div className="home-card card">
                                            <form onSubmit={this.handleSubmit}>
                                                <label className="formLabel">
                                                    <span style={{padding: 5, margin: "0px 10px"}}>Find</span>
                                                    <select id="category" onChange={(e)=>this.handleChange(e)} name="category">
                                                        <option value="laundromat">Laundromats</option>
                                                        <option value="dry cleaning">Dry Cleaners</option>
                                                    </select>    
                                                </label>
                                                <label className="formLabel">
                                                    {this.state.show && 
                                                        <div className="row">
                                                            <div className="col-xs-5 mx-auto" >
                                                                <div className="error-zip">Invalid Zip Code</div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <span style={{padding: 5, margin: "0px 10px", borderLeft:" 1px solid grey"}}>Near</span>
                                                    <input
                                                        id="zipCode"
                                                        type="text"
                                                        name="zip"
                                                        className={this.state.show ? "error-input-zip" : null}
                                                        value={this.state.zip}
                                                        placeholder="Zip Code"
                                                        onChange={(e)=>this.handleChange(e)}
                                                    />  
                                                </label>
                                                <button id="submit" type="submit" value="Submit" style={{borderLeft:"solid 1px black"}}>
                                                    <i className="fas fa-search-location"></i>
                                                </button>
                                                {/* <Modal show={this.state.show} errorMessage={this.state.errorMessage}/> */}
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
                        <div className="offset-1 col-10 text-center home-mid-header" style={{color: "rgb(33, 37, 41)"}}>
                            Are you a business?
                        </div>
                    </div>
                    <div className="row home-business-info">
                        <div className="offset-lg-1 col-lg-10">
                            <div className="row">
                                <div className="col-4 col-md-6 col-lg-6 _div1">
                                    <img id="home_landingPage" src={MockWebsite} alt="Landing Page Example"/>
                                </div>
                                <div className="col-8 col-md-6 col-lg-6 _div2">
                                    <p className="_freeBusinessHeader">Claim your free business page</p>
                                    <ul className="_homeUL">
                                        <li className="_homeLI">Reach more customers</li>
                                        <li className="_homeLI">Showcase the best of your company</li>
                                        <li className="_homeLI">Promote your business for free</li>
                                        <li className="_homeLI">Use your business page as a website</li>
                                    </ul>
                                    <button type="button" className="btn btn-danger home-business-btn dashInput" onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href='/business';
                                        }}>
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
}


export default Home;
