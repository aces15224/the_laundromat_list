import React, {useState, useEffect} from 'react';


const DeliveryInfoHours = ({week, hours, updateHours, category, size})=>{
    const {timeArray} = require("../components/DateTime");    
    const [endTimeArray, setEndTimeArray] = useState(timeArray);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [day, setDay] = useState(null);
    const liStyle = {paddingTop: 0, paddingBottom:10}

    useEffect(()=>{
        setEndTimeArray(timeArray)
    },[hours, size])

    // function for setting start time
    const timeControl = (open)=>{
        if(open !== "Open 24 Hrs"){
            //filter time from endTimeArray so user cannot select same time twice
            let closeArray = timeArray.filter((time)=>{
                return !time.includes(`${open}`) && !time.includes("Open 24 Hrs");
            })
            setEndTimeArray(closeArray);    
        } else{
            //if selection is "Open 24 hours" set endTimeArray and reset selection input
            document.getElementById('close').selectedIndex = "0";
            setEndTimeArray(timeArray);
        }
        //set state with opening time
        setStart(open); 
    };
    
    //Displays start time options for user to select
    const startTimeOptions = timeArray.map((time)=>{
        if(time!== "Open 24 Hrs"){
            return(
                <option>{time}</option>
            )    
        }  
    });
    
    //Displays end time options for user to select
    const finishTimeOptions = endTimeArray.map((time)=>{
        if(time!== "Open 24 Hrs"){
            return(
                <option>{time}</option>
            )    
        }
    });

    //function for listing current times on DashboardDelivery
    const timeTable = ()=>{
        //if hours were passed through....
        if(hours.length !== 0){
            return hours.map((time, index)=>{
                //split each segment into days/times...
                const target = time.split("/");
                //create days array...
                const days = target[0].split("-");
                //collect time...
                const times = target[1];
                if(days.length === 2){
                    //if days array = 2, the days are listed consecutively (EX.  Mo-Fri) so..
                    //create start and end indexes to...
                    const start = days[0];
                    const end = days[1];
                    const sliceStart = week.indexOf(start);
                    const sliceEnd = week.indexOf(end);
                    //...slice values from week array and map over values....
                    const range = week.slice(sliceStart, sliceEnd + 1);
                    return range.map((day)=>{
                        //return a list item for each day in range array and include a button to update data
                        return(
                            <li className="optionLi list-group-item" style={liStyle}>
                                <div className="options-div">
                                    <p className="li-p">{day}</p>
                                    <p className="li-p">{times}</p>
                                    <button className="link-buttons li-p" onClick={(e)=> handleData(e, category, day, "start", "end", "remove")}>Remove</button>    
                                </div>
                            </li>  
                        )    
                    })     
                } else{
                    //otherwise list each individual day w/ a button to update data
                    const day = days[0];
                    return(
                        <li className="optionLi list-group-item" style={liStyle}>
                            <div className="options-div">
                                <p className="li-p">{day}</p>
                                <p className="li-p">{times}</p>
                                <button className="link-buttons li-p" onClick={(e)=> handleData(e, category, day, "start", "end", "remove")}>Remove</button>    
                            </div>
                        </li>
                    )
                }
            })    
        } else{
            // if no hours, let the user know by display a message
            return (
                <li className="optionLi list-group-item ">
                    <div className="text-center">
                        <p className="li-p">No Hours listed</p> 
                    </div>
                </li>
            )
        }   
    }
        
    const handleData = (e, category, day, start, end, action)=>{
        //prevent submission if values are null;
        if(day === null || start === null || end === null) return;
        // reset inputs
        document.getElementById("day").selectedIndex = "0";
        document.getElementById("open").selectedIndex = "0";
        document.getElementById("close").selectedIndex = "0";
        //send data up to parent component and submit to database
        updateHours(e, category, day, start, end, action);
        //reset state
        setStart(null);
        setEnd(null);
        setDay(null);
    }

    //Change input instruction based on size of window
    const inputDay = (size >= 992 && size <= 1188) || size <= 394 ? "Day" : "Select Day";
    const start_time = size <= 394 ? "Start" : "Start Time";
    const end_time = size <= 394 ? "End" : "End Time";


    return(
        <div className="row">
            <div className="col-12">
                <div className="card bg-dark dashInput">
                    <div className="card-header text-white text-center dashCardHeader">
                        <h5>{category === "delivery" ? "Delivery Times" : "Pick Up Times"}</h5>    
                    </div>
                    <div className="card-body text-center" style={{padding: 0, backgroundColor:"white"}}> 
                        <div className="input-group laundryInput" id="inputPriceGroup">
                            <select id="day" className="form-control" onChange={(e)=>setDay(e.target.value)}>
                                <option selected disabled>{inputDay}</option>
                                <option>Mon</option>
                                <option>Tue</option>
                                <option>Wed</option>
                                <option>Thu</option>
                                <option>Fri</option>
                                <option>Sat</option>
                                <option>Sun</option>
                            </select>
                            <select id="open" className="form-control" onChange={(e)=>timeControl(e.target.value)}>
                                <option selected disabled>{start_time}</option>
                                {startTimeOptions}
                            </select>
                            <select id="close" className="form-control" onChange={(e)=>setEnd(e.target.value)}>
                                <option selected disabled>{end_time}</option>
                                {finishTimeOptions}
                            </select>
                            <div className="input-group-append">
                                <button className="btn btn-primary deliveryHoursBtn dash_btn" onClick={(e)=> handleData(e, category, day, start, end, "add")}>Add</button>
                            </div>
                        </div>  
                        <ul className="list-group">
                            {timeTable()}
                        </ul>
                    </div>       
                </div>
            </div>
        </div>          
    )
}

export default DeliveryInfoHours;