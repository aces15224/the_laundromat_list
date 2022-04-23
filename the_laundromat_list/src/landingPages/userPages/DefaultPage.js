import React, {Component} from 'react';
import DefaultNavBar from "../userComponents/defaultNavBar";
import DefaultFooter from '../userComponents/DefaultFooter';
import DefaultJumboTron from '../userComponents/DefaultJumbotron';
import DefaultServices from '../userComponents/DefaultServices';
import DefaultContact from '../userComponents/DefaultContact';
import DefaultPrices from '../userComponents/DefaultPrices';
import DefaultAmenities from '../userComponents/DefaultAmenities';
import DefaultPic from '../images/planPic.png'
import '../css/defaultCss.css';
import setTime from "../../components/DateTime"

class DefaultPage extends Component{

    constructor(props){
        super(props); 
        this.state={
            delivery: false,
            businessHours : "",
            businessHoursFull: [],
            businessName : "",
            businessPhone: "",
            businessAddress:"",
            services:[],
            prices : false,
            laundryPrices:[],
            deliveryPrices:[],
            dropOffPrices:[],
            dryCleaningPrices:[],
            image: "",
            cityState: "",
            amenities: [],
            overview: "",
            category: ""
        }  
        this.handlePrices = this.handlePrices.bind(this);
        this.directions = this.directions.bind(this);

    }

    componentDidMount(){
        const url = window.location.href.split(/\/laundromat\/|\/dry-cleaning\//)[1];
        let businessName;
        let businessHours;
        let businessPhone;
        let businessHoursFull = [];
        let services = [];
        let businessAddress;
        let category;
        let image;
        let cityState;
        let amenities = [];
        let overview;
        let tempOverview;
        const day = setTime.setDay()

        //Fetch Business Info and organize
        const infoFetch = async (day)=>{
            await fetch("/api/" + url)
            .then(response => response.json())
            .then(data=>{
                //parse string of hours
                let hours = JSON.parse(data.businessHours);
                console.log(data)

                //assign data to variables for further use
                category =  data.categoryName;
                businessPhone = data.phone;
                businessName = data.businessName;
                businessAddress = data.businessAddress;
                
                //Default Times to be used if businessHours don't exist
                const defaultTimes = {
                    Fr: "12:00am-12:00pm",
                    Mo: "12:00am-12:00pm",
                    Sa: "12:00am-12:00pm",
                    Su: "12:00am-12:00pm",
                    Th: "12:00am-12:00pm",
                    Tu: "12:00am-12:00pm",
                    We: "12:00am-12:00pm"
                };

                const imageUrl = data.imageUrl;
                //check if profile image is an image file or a url
                const filetypes = /jpeg|jpg|png|gif|pdf/.test(imageUrl);
                const webCheck = /https|www/.test(imageUrl);

                // if image is empty or null, return default image.  If it's a url or an image file, return image, otherwise display picture saved on file
                image = (imageUrl === "" || imageUrl === null) ? DefaultPic : webCheck === true ? imageUrl : filetypes === true ? process.env.PUBLIC_URL + `/uploads/resized/${imageUrl}` : imageUrl;

                //check for options ("Television, etc.") and push to amenities...
                let parsedOptions = JSON.parse(data.options);
                if(parsedOptions.length > 0){
                    for(let i = 0; i < parsedOptions.length; i++){
                        amenities.push(parsedOptions[i])
                    }
                } 

                // then cycle through fetched data and push the following to amenities as well...
                for(let i in data){
                    if(data[i] !== null && data[i] !== false){
                        if(["wifi", "credit", "atm", "supplies"].includes(i)){
                            console.log("includes: " + i)
                            switch(i){
                                case "wifi":
                                    amenities.push("Free Wi-Fi")
                                    break;
                                case "credit":
                                    amenities.push("Credit Accepted")
                                    break;
                                case "atm":
                                    amenities.push("ATM Available")
                                    break;
                                case "supplies":
                                    amenities.push("Supplies Available")
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                } 
               
                //Cycle through object keys and, 1st, return fuller spelling of the day (open days only) and the hours for said day...
                Object.keys(hours).forEach((day)=>{
                    let fullDay = (day === 'Su') ? "Sun" : (day === 'Mo') ? "Mon" : (day === 'Tu') ? "Tue" : (day === 'We') ? "Wed" : (day === 'Th') ? "Thu" : (day === 'Fr') ? "Fri" : "Sat";
                    //push hours to an array for next step in display process
                    businessHoursFull.push(`${fullDay}: ${hours[day]}`)
                })
                
                //Spit the business address to isolate the city, state, and zip.  
                //cityState will be JUST the city and state
                const newAdd = businessAddress.split(/,(.+,.+\d)/)[1]
                cityState = newAdd.split(/\d{5}/)[0];
                
                //if businessHours are null, return default times, otherwise parse the return JSON string and return data
                businessHours = data.businessHours === null ? defaultTimes[day] : JSON.parse(data.businessHours)[day];

                //check the business category and add corresponding service labels
                if(category.toLowerCase() === "laundromat"){
                    services.push("self-service");
                    if(data.dryCleaning === true){
                        services.push("dry-cleaning");
                    } else{
                        data.DryCleaningPrice = null;
                    }
                } else if(category.toLowerCase() === "laundromat and dry cleaning"){
                    services.push("dry-cleaning");
                    services.push("self-service");
                } else{
                    services.push("dry-cleaning");
                    if(data.laundry === true){
                        services.push("dry-cleaning");
                    } else{
                        data.LaundryPrice = null;
                    }
                }

                //then check to see if the following services are available and push if they are...
                if(data.dropOff === true){
                    services.push("drop-off");
                } else{
                    data.DropOffPrice = null;
                }

                if(data.delivery === true){
                    services.push("delivery");
                    //set this.state.delivery immediately because it is used in multiple components
                    this.setState({delivery: true})
                } else{
                    data.DeliveryPrice = null;
                }

                //if there is no overview, add a default overview...
                if(data.overview === null){
                    tempOverview = `${businessName} is a ${category} in ${cityState.trim()}.  Call or come past today and disover all we have to offer!  Have questions or comments?  
                    Feel free to contact us using the information listed below.`;
                }
                // if no overview, assign aforementioned default, otherwise use existing overview...
                overview = data.overview === null ? tempOverview : data.overview;
                
                //send price lists to handlePrices() to setState 
                this.handlePrices(data.LaundryPrice, data.DryCleaningPrice, data.DeliveryPrice, data.DropOffPrice)

            })  
        }
        //Call infoFetch.  After promise is fulfilled, setState
        infoFetch(day).then(()=>{
            this.setState({businessHours, businessHoursFull, businessAddress, businessName, businessPhone, services, category, image, cityState, amenities, overview})
        });
        
    }

    //set state using price lists...
    handlePrices(laundry, drycleaning, delivery, dropoff){    
        //return false if values are null... 
        if((dropoff === null) && (delivery === null) && (laundry === null) && (drycleaning === null)){
            return false;
        } else{
            //otherwise set state and set prices to true--this will render DefaultPrices component and a price link in Navbar
            let prices = true;
            this.setState({prices, laundryPrices: laundry, deliveryPrices: delivery, dropOffPrices: dropoff, dryCleaningPrices: drycleaning})
        }    
    }

    //Get Directions Button functionality
    directions(){
        //creates url and opens a window to GoogleMaps for directions.
        const url = "https://www.google.com/maps/dir/";
        const destination = this.state.businessAddress.split(/\s/).join("+");
        window.location.href = url + destination;
    }

    render(){      
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="offset-lg-1 col-lg-10">
                        <DefaultNavBar data={this.state}/>
                        <DefaultJumboTron category={this.state.category} name={this.state.businessName} address={this.state.cityState} image={this.state.image} directions={this.directions}/>
                        <DefaultServices services={this.state.services}/>
                        <DefaultAmenities options={this.state.amenities} overview={this.state.overview}/>
                        {(this.state.prices !== false) &&
                            <DefaultPrices
                                laundry={this.state.laundryPrices} 
                                delivery={this.state.deliveryPrices}
                                dropOff={this.state.dropOffPrices}
                                dryCleaning={this.state.dryCleaningPrices}
                                deliver={this.state.delivery}
                                category={this.state.category}
                            />
                        }
                        <DefaultContact 
                            hours={this.state.businessHoursFull} 
                            name={this.state.businessName}
                            phone={this.state.businessPhone}
                            address={this.state.businessAddress}
                            directions={this.directions}
                        /> 
                        <DefaultFooter /> 
                    </div>
                </div>
            </div>           
        )
    }
}

export default DefaultPage;