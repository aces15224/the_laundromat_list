import React, {useState, useEffect} from 'react';
import ResultCard from "./ResultCard";
import Pagination from "./Pagination";
import GoogleMap from "./GoogleMap";
import Footer from "./Footer";

const SearchForm = ({screensize, scrolled, category, lat, lng, city, day, dataState, time, markers, clickFunction})=>{
  const markerArray = [];
  const [pageResult, setPageResult]= useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);
  const [footerWidth, setFooterWidth] = useState(0);
  const [winHeight, setWinHeight] = useState(0);
  const indexOfLastPost = currentPage * 10;
  const indexOfFirstPost = indexOfLastPost - 10;
  const innerWidth = ((screensize < 576) || (screensize >=690 && screensize <=991));
  const [features, setFeatures] = useState([
    {id: 1, value: "Free Wi-Fi", isChecked: false, type:"amenity", search: "wifi"},
    {id: 2, value: "Entertainment", isChecked: false, type:"amenity", search: "entertainment"},
    {id: 3, value: "Drop Off Service", isChecked: false, type:"feature", search: "dropOff"},
    {id: 4, value: "Delivery Service", isChecked: false, type:"feature", search: "delivery"},
    {id: 5, value: "Dry Cleaning", isChecked: false, type:"feature", search: "dryCleaning"},
    {id: 6, value: "Open Now", isChecked: true, type:"schedule", search: "open"},
    {id: 7, value: "Open Early", isChecked: false, type:"schedule", search: "openEarly"},
    {id: 8, value: "Open Late", isChecked: false, type:"schedule", search: "openLate"},
    {id: 9, value: "Credit Card", isChecked: false, type:"payment", search: "credit"},
    {id: 10, value: "ATM", isChecked: false, type:"payment", search: "atm"}
  ]);
 

  useEffect(()=>{  
    const navBar = document.getElementsByClassName("searchNavBar")[0].offsetHeight; 
    //set initial height of googleMap
    setWinHeight(window.innerHeight - navBar);
    //slice section of api results to limit businesses listed per page and set pageResults
    let copy = dataState.slice(indexOfFirstPost, indexOfLastPost);
    setPageResult(copy);
    //resize and set css positions initially and if screensize or scolling position changes
    handleResize();
  },[screensize, dataState, currentPage, scrolled])


    //function for dynamically handling css position based on scroll and width info passed down from parent page
    const handleResize = ()=>{
        const navBar = document.getElementsByClassName("searchNavBar")[0].offsetHeight;
        //columnResults is the column that houses the results to be displayed
        const columnResults = document.getElementsByClassName("col-results")[0];

        //search is the side bar that handles filtering results
        const search = document.getElementsByClassName('col-search')[0];

        //resultsRow is the row in which the results are actually housed
        const resultsRow = document.getElementsByClassName('results-row')[0];

        const footer = document.getElementsByClassName('footerDiv')[0];
        const _googleMap = document.getElementById("googleMap");

        //scrollLimit is the point where scrolling will change certain CSS properties
        const scrollLimit = resultsRow.offsetHeight - search.offsetHeight; 

        //div_Width is the width the side bar should be if the page itself is between certain break points       
        const div_Width = resultsRow.offsetWidth;

        //footer_width sets the width of the footer-div and ensures the footer does not overlap with the googleMap
        const footer_width = document.getElementsByClassName("search-form-container")[0].offsetWidth;
        
        //div_Height sets the height of the footerDiv for certain break points
        const div_Height = search.offsetHeight + navBar;

        //innerHeight is the height of the googleMap
        const _innerHeight = window.innerHeight - navBar;

        //fixedScrollLimit signals CSS changes if the user has not scrolled beyond the initial navbar height
        const fixedScrollLimit = resultsRow.offsetHeight - 111;

        //styles the actual footer (not the div)
        footer.style.width = `${footer_width}px`;

        //set the top position to ensure the googleMap sits below the navbar
        _googleMap.style.top = `${navBar}px`;

        // setState
        setWinHeight(_innerHeight);
        setDivWidth(div_Width);
        setDivHeight(div_Height);
        setFooterWidth(footer_width);
        

        if(innerWidth){
            //if screensize is between certain breakpoints..... 
            search.style.height = "122px";
            columnResults.style.right = 0;
            columnResults.style.top = `${122 + navBar}px`;
            //and the user has not scrolled, or scrolled beyond fixed limit....
            if ((scrolled < fixedScrollLimit) || scrolled === 0){
                //set the side bar to a fixed position
                search.style.position = "fixed";
                search.style.top = `${navBar}px`;
                search.style.zIndex = "1";

            } else{
                // otherwise set sidebar to an absolute position so that it scrolls off page
                search.style.zIndex = "1"
                search.style.position = "absolute";
                search.style.top = resultsRow.offsetHeight + "px"; 
                columnResults.style.zIndex = "-10"
            }

        } else if(screensize >=576 && screensize <= 689){
            search.style.height = "122px";
            search.style.zIndex = "1"
            const _scrollLimit = scrollLimit - 331;
            columnResults.style.top = `${navBar}px`;
            columnResults.style.right = "-29vw";
            //if user has scrolled, or scrolled beyond fixed limit....
            if ((scrolled >= _scrollLimit) && (scrollLimit > 0)){
                //set sidebar to an absolute position so that it scrolls off page
                search.style.position = "absolute";
                search.style.zIndex = "-1"
                search.style.top = scrollLimit - 200 + "px";
            } else if((scrolled < _scrollLimit ) || scrolled === 0){
                // otherwise set side bar to a fixed position so that it does not scroll off page
                search.style.position = "fixed";
                search.style.top = `${navBar}px`;
            }
        } else{
            search.style.zIndex = "1";
            search.style.height = "100%";
            columnResults.style.top = `${navBar}px`;
            //if user has scrolled, or scrolled beyond fixed limit....
            if ((scrolled > scrollLimit - 91) && (scrollLimit > 0)){
                //set side bar to relative position so that it scrolls with the rest of content
                search.style.position = "relative";
                search.style.top = scrollLimit  + "px";
                columnResults.style.right = 0;
                //if user has not scrolled, or scrolled beyond fixed limit....
            } else if((scrolled < scrollLimit ) || scrolled === 0){
                //set side bar to a fixed position so that it does not scroll off page
                columnResults.style.right = "-16.5vw";
                search.style.position = "fixed";
                search.style.top = `${navBar}px`;
            }
        }
    }

    //handles checks for filter checkboxes
    const handleCheck = (e, search)=>{
        const {id} = e.target;
        setFeatures(prevState => {
            let searchArray = [];
            for(let i = 0; i < prevState.length; i++){
                if(prevState[i].id === Number(id)){
                    // if checkbox id matches, check if unchecked and send search term to searchArray, otherwise uncheck only
                    prevState[i].isChecked = !prevState[i].isChecked;
                    if(prevState[i].isChecked){
                        searchArray.push(prevState[i].search)  
                    }
                } else{
                    if(prevState[i].isChecked){
                        //searches cannot contain both openEarly and openLate.  If one is checked, uncheck the other
                        if((search === "openEarly" && prevState[i].search === "openLate") || (search === "openLate" && prevState[i].search === "openEarly")){
                            prevState[i].isChecked = false;   
                        } else{
                            // if checked, send to searchArray and pass this to the clickFunction() to filter the results
                            searchArray.push(prevState[i].search);
                        }  
                    } 
                }
            }
            // pass searchArray to the clickFunction() to filter the results and set state (features)
            clickFunction(searchArray);
            return prevState;
        })    
    };


    const paginate = pageNumber => {
        //set current (results) page number and scroll to top of page
        window.scroll(0,0);
        setCurrentPage(pageNumber)
    }

    //mapping function for dispaying ResultCard(s)
    const results = pageResult.map((val, index)=>{
        const { PopularTime, businessHours } = val;
        let occupancy = 0;
        let targetDay;
        let hoursToday = JSON.parse(businessHours)[day];
        //if we have popular times info, set the occupancy percent
        if(PopularTime != null){
            targetDay = PopularTime[day];  
            for(let i = 0 ; i < targetDay.length; i++){
                if(targetDay[i]["hour"] === time){
                    occupancy = targetDay[i]['occupancyPercent'];
                }   
            }      
        } else{
            occupancy = "unknown";
        }
        //cardStyle {2} indicates that ResultCard is being used on the searchPage and determines CSS properties to be used
        return <ResultCard
                    key={index} 
                    props={val} 
                    occupancyPercent={occupancy} 
                    hours={hoursToday} 
                    rank={indexOfFirstPost + index}
                    cardStyle={2}
                />
    })

    //set marker info for googleMap component
    pageResult.forEach((val, index)=>{
        for(let i = 0; i < markers.length; i++){
            if(val.businessName === markers[i].businessName){
                let newMarker = Object.assign({}, markers[i]);
                newMarker.rank = indexOfFirstPost + index;
                newMarker.image = val.imageUrl;
                markerArray.push(newMarker)
            }
        }
    });

    return (
        <div>
            <div id="container" className='container-fluid search-form-container'>
                <div className='row search-row' >
                    <div className='col-xs-12 col-sm-7 col-md-7 col-lg-8'>
                        <div className="row search-row">
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-3 col-search'>
                                <div className="searchContainer" style={innerWidth ? {width: divWidth} : {marginTop: "12px"} }>
                                    <div className="searchLabel">
                                        <label className="searchLabel">                                                
                                            Filters   
                                        </label>
                                        <hr className="hr-search"/>
                                    </div>
                                    <div >
                                        <label className="searchLabels">                                                
                                        {innerWidth ? "Shop Hours" : "Business Hours"}   
                                        </label>
                                            <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[5].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "open")}} 
                                                id={6}
                                            /> 
                                            Open Now
                                            </div>
                                            <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[6].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "openEarly")}}
                                                id={7}
                                            /> 
                                            Open Early
                                            </div> 
                                            <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[7].isChecked} 
                                                onChange={(e)=>{handleCheck(e, "openLate")}} 
                                                id={8}
                                            /> 
                                            Open Late
                                            </div>
                                        <hr className="hr-search"/>
                                    </div>
                                    <div >
                                        <label className="searchLabels"> 
                                            {innerWidth ? "Pay Methods" : "Payment Methods"}
                                        </label>
                                        <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[8].isChecked} 
                                                onChange={(e)=>{ handleCheck(e,"credit")}} 
                                                id={9}
                                            /> 
                                            Credit Card
                                        </div>
                                        <div className="checkBox">
                                            <input 
                                            type="checkbox"
                                            checked={features[9].isChecked} 
                                            onChange={(e)=>{ handleCheck(e, "atm")}} 
                                            id={10}
                                            /> 
                                            ATM
                                        </div> 
                                        <hr className="hr-search"/>
                                    </div>
                                    <div >
                                        <label className="searchLabels"> 
                                            Amenities: 
                                        </label> 
                                        <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[0].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "wifi")}} 
                                                id={1}
                                            /> 
                                            Free Wi-Fi
                                        </div>
                                        <div className="checkBox">
                                            <input 
                                            type="checkbox"
                                            checked={features[1].isChecked} 
                                            onChange={(e)=>{ handleCheck(e, "entertainment")}} 
                                            id={2}
                                            /> 
                                            Entertainment
                                        </div>           
                                        <hr className="hr-search"/>
                                    </div>
                                    <div >
                                        <label className="searchLabels">
                                            Features: 
                                        </label>
                                        <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[2].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "dropOff")}} 
                                                id={3}
                                            /> 
                                            Drop Off Service
                                        </div>
                                        <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[3].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "delivery")}}
                                                id={4}
                                
                                            /> 
                                            Delivery Service
                                        </div> 
                                        <div className="checkBox">
                                            <input 
                                                type="checkbox"
                                                checked={features[4].isChecked} 
                                                onChange={(e)=>{ handleCheck(e, "dryCleaning")}} 
                                                id={5}
                                            /> 
                                            Dry Cleaning
                                        </div>
                                    </div>  
                                </div>     
                            </div>
                            <div className='col-xs-12 col-sm-12 col-md-12 col-lg-9 col-results'>
                                {dataState.length !== 0 &&
                                    <div className="row results-row">
                                        <div className="col-xs-12" style={{display:"flex", alignItems:"baseline"}}>
                                            <p className="search-term"> {category} near {city} </p>
                                        </div>
                                        <div className="col-xs-12">
                                            {results}
                                            <Pagination dataLength={dataState.length} resultsLength={10} paginate={paginate} currentPage ={currentPage}/>
                                        </div>   
                                    </div>
                                }
                            </div> 
                            <Footer width={footerWidth} top={innerWidth ? divHeight : 152}/>
                        </div>
                    </div>
                    <div id="googleMap" className='col-sm-5 col-md-5 col-lg-4' style={{padding: 0}}>  
                        <div id="mapBorder" style={{border: "3px solid #09b2e1"}}>
                            <GoogleMap 
                                latitude={lat}
                                longitude={lng}
                                currentPage={currentPage}
                                markers={markerArray}
                                height={`${winHeight}px`}
                            />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchForm;