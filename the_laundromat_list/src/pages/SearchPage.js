// import React, {Component} from 'react';
import React, {useState, useEffect} from 'react';
import SearchForm from '../components/SearchForm'
import SearchNav from "../components/SearchNav";
import moment from 'moment';
import Data from "../data/lat-long-data.json";
import '../css/search.css';
import LoadingSpinner from "../components/Loading";
import Footer from "../components/Footer";

const {setDay, setTime} = require("../components/DateTime");


const SearchPage = ()=>{
    const day = setDay();
    const time = setTime();
    const [category] = useState(window.location.pathname.split("/")[1]);
    const [zipCode] = useState(window.location.pathname.split("/")[2]);
    const [innerWidth, setInnerWidth] = useState(0);
    const [scrolled, setScrolled] = useState(0);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [city, setCity] = useState("");
    const [dataState, setDataState]= useState([]);
    const [markers, setMarkers] = useState();
    const [loading, setLoading] = useState(true);
    //
    const [filterType, setFilterType] = useState("default");
    //

    useEffect(()=>{
        //check window size and scroll position for CSS and call zipFetch to get info for business in the area
        resizeHandler();
        zipFetch();

        window.addEventListener("resize", resizeHandler);
        window.addEventListener('scroll', resizeHandler);

        return ()=>{ 
            window.removeEventListener("resize", resizeHandler)
            window.removeEventListener("scroll", resizeHandler)
        }
    },[])

    //function for setting the width of the window and keeping track of scrolling
    const resizeHandler = ()=>{
        setInnerWidth(window.innerWidth);
        setScrolled(window.pageYOffset);
    };
    

    //function for fetching business info in a certain radius and sorting it
    async function apiFetch(zipRadius) {
        await fetch("/api")
        .then(response => response.json())
        .then(data=>{
            if(data){
                let currentTime = moment();
                let markerArray = [];
                let dataArray = [];
                data.forEach((val)=>{ 
                    console.log(val)
                    const {businessLocation, businessName, businessAddress, zip, options} = val;
                    const zipCode = zip.toString()
                    //if zip code from zipradius matches user's zipcode....
                    for(let i = 0; i < zipRadius.length; i++){
                        if(zipRadius[i].zip === zipCode){
                            let businessHours = val.businessHours;
                            let optionsCopy = [];
                            let parsedOptions = JSON.parse(options);
                            let time;
                            if(businessHours === null){
                                const defaultTimes = {
                                    Fr: "12:00am-12:00pm",
                                    Mo: "12:00am-12:00pm",
                                    Sa: "12:00am-12:00pm",
                                    Su: "12:00am-12:00pm",
                                    Th: "12:00am-12:00pm",
                                    Tu: "12:00am-12:00pm",
                                    We: "12:00am-12:00pm" 
                                };
                                time = defaultTimes;
                            }
                            else if(businessHours !== null){
                                time = JSON.parse(businessHours);
                            }

                            if(parsedOptions !== null){
                                optionsCopy.push(...parsedOptions)
                            }
                            //parse option object and count entries to determine if entertainment is offered 
                            val.entertainment = optionsCopy.length > 0 ? 1 : 0;
                            const streetAddress = businessAddress.split(",")[0];
                            const cityStateZip = businessAddress.split(/,(.+\D)/)[1];
                            const phone = val.phone;
                            //create objects that will be attached to map markers (googleMap markers)
                            const markerInfo = {businessLocation, businessName, streetAddress, cityStateZip, phone};

                            //determine opening and closing times 
                            let open = time[day].split("-")[0];
                            let close = time[day].split("-")[1];
                            let opening = moment(open, 'h:mma');
                            let closing = moment(close, 'h:mma');
                            //determine whether the shop is currently open
                            val.open = ((currentTime.isAfter(opening) && currentTime.isBefore(closing)) || time[day] === "Open 24 Hrs") ? true : false;
                            val.opening = opening._i;
                            val.closing = (time[day] === "Open 24 Hrs") ? "Open 24 Hrs" : closing._i; 
                            val.distance = zipRadius[i].distance;
                            val.searchScore = 0;
                            //set filter criteria for "open early" and "open late" 
                            if(time[day] === "Open 24 Hrs"){
                                val.openEarly = "Open 24 Hrs";
                                val.openLate = "Open 24 Hrs";
                            } else{
                                val.openEarly = timeCheck(open, "open");
                                val.openLate = timeCheck(close, "close");    
                            }
                            markerArray.push(markerInfo);
                            dataArray.push(val);
                        }
                    }
                })
                //intially set filter type to default (no special filters selected)
                setFilterType("default");
                //send data to sorting array so that it can be displayed
                handleSort(dataArray);
                //set markers for use in google maps section
                setMarkers(markerArray);
            }            
        })   
    }

    //function for setting filter criteria (open early/open late)
    const timeCheck = (_hours, filterType)=>{
        if(_hours !== "Open 24 Hrs"){
            //if filter type = open and opening hour is before 8, set openEarly to true
            if(filterType === "open"){
                if(_hours.includes("am")){
                    const open = _hours.split(":");
                    if(Number(open[0]) <= 8){
                        return true;
                    } else{
                        return false;
                    }
                } 
                return false;
            } else{
                //if filter type = closed and closing hour is after 9, set openLate to true
                if(_hours.includes("pm")){
                    const close = _hours.split(":");
                    if(Number(close[0]) >= 9){
                        return true;
                    } else{
                        return false;
                    }
                } 
                return false;
            }    
        } else{
            //if open 24 hours set openEarly or openLate to true
            return true;
        }            
    }
    

    //function for fetching zip information
    const zipFetch = async () => { 
        //set loading to true to indicate the page is loading
        setLoading(true);
        const url = "https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius";
        //check json file & if info matches zip code entered, set state (lat, lng, city)
        Data.forEach((place)=>{
            if(place.fields.zip === zipCode){
                setLat(place.fields.latitude);
                setLng(place.fields.longitude);
                setCity(place.fields.city);
            }
        })
        //fetch all zipcodes in a certain radius
        await fetch(`${url}?zipcode=${zipCode}&minimumradius=0&maximumradius=10&country=ALL&key=${process.env.REACT_APP_ZIP}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const zipArray = [];
            //for each zip code, create an object that contains zipcode and distance from user's zipcode and send to fetching function 
            data.DataList.forEach(info =>{
                console.log(info)
                let locationObject = {};
                info.Distance === undefined ? locationObject.distance = 0 : locationObject.distance = info.Distance;
                locationObject.zip = info.Code;
                zipArray.push(locationObject);
            })
            apiFetch(zipArray);
        })  
    }
    

    //function for tallying up filter keywords
    const searchFunction = (keywords)=>{
        const searchState = [];
        //add up score for each keyword to determine best results for user
        dataState.forEach((val)=>{
            let searchScore = 0;
            for(let i = 0; i< keywords.length; i++){
                if(val[keywords[i]]){
                    searchScore ++
                } 
            }
            // add search score to data object and send to sorting function
            val.searchScore = searchScore;  
            searchState.push(val);
        })
        handleSort(searchState)
    };

    //function for filtering results
    const handleSort = (_dataState)=>{
        //sort initally by distance if no criteria have been selected
        const defaultSort = (a,b)=>{
            return a.distance-b.distance;    
        };
        //sort by search score if criteria have been selected
        const searchSort = (a,b)=>{
        return  b.searchScore-a.searchScore;
        }  
        //determine which sort is necessary based on filter type
        const dataStateCopy = _dataState.sort(filterType === "default" ? defaultSort : searchSort);
        // set state with filtered data and set loading to false to display data 
        setDataState(dataStateCopy); 
        setLoading(false);
    };

    //function for seting the filter type in the SearchForm component
    const handleFilterClick = (keywords)=>{
        if(keywords.length === 0){
            setFilterType("default");
        } else{
            setFilterType("custom")
        }
        searchFunction(keywords);
    }

    return(
        <div>
            <SearchNav screensize={innerWidth}/>
           {loading === false && dataState.length > 0 ?
                <SearchForm 
                    screensize={innerWidth} 
                    scrolled={scrolled}
                    category={category} 
                    lat={lat} 
                    lng={lng}
                    city={city} 
                    dataState={dataState} 
                    time={time} 
                    day={day} 
                    markers={markers}
                    clickFunction={handleFilterClick}
                /> :
                <>
                    <LoadingSpinner message={"Loading..."} search={true}/> 
                    <Footer loading={loading}/>
                </>
            } 

        </div>   
    )   
}


export default SearchPage;