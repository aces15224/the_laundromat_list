import React, {useState, useEffect} from "react";
import moment from 'moment';

const {setDay, setTime} = require("../components/DateTime");


const Dashboard = ()=>{
    const [timeObject, setTimeObject] = useState({
        time: setTime(),
        day: setDay()
    });
    
    const [toDos, setToDos] = useState([])

    const [linkControl, setLinkControl] = useState({
        link: "dashboard",
        servicesCategory:"",
        priceLinks: false
    });

    const [stateObject, setStateObject] = useState(
        {
            name : "",
            address: "",
            phone:"",
            hours:[],
            website:"",
            category:"",
            dataState:[],
            zip: 0,
            city:"",
            street:"",
            overview: "",
            delivery:"",
            dropOff:"",
            laundry:"",
            dryCleaning:"",
        }
    ); 

    useEffect(()=>{
        const establishment = window.location.href.split("/business/dashboard/")[1].replace(/%20/g, " ")
        businessInfo(establishment)   
    },[])

    const businessInfo = async (establishment)=>{
        const defaultTimes = {Fr: "12:00am-12:00pm", Mo: "12:00am-12:00pm", Sa: "12:00am-12:00pm", Su: "12:00am-12:00pm", Th: "12:00am-12:00pm", Tu: "12:00am-12:00pm", We: "12:00am-12:00pm"};
        await fetch(`/api/${establishment}`)
        .then(response => response.json())
        .then(data=> {
            console.log(data)
            let currentTime = moment();
            let dataArray = [];
            const {
                businessName,
                businessAddress,
                businessHours,
                website,
                categoryName,
                phone,
                options,
                zip,
                city,
                DeliveryPrice,
                DropOffPrice,
                DryCleaningPrice,
                LaundryPrice,
                overview,
                imageUrl,
                dropOff,
                delivery,
                dryCleaning
            } = data;
            toDoList(dropOff, delivery, dryCleaning, {website}, {options}, {DeliveryPrice}, {DropOffPrice}, {DryCleaningPrice}, {LaundryPrice}, {overview}, {imageUrl})
            let name = businessName;
            let address = businessAddress;
            let street = address.split(",")[0];
            let hours;
            data.entertainment = options !== [] ? 0 : 1;
            hours = businessHours !== null ? JSON.parse(businessHours) : defaultTimes;
            let open = hours[timeObject.day].split("-")[0];
            let close = hours[timeObject.day].split("-")[1];
            let opening = moment(open, 'h:mma');
            let closing = moment(close, 'h:mma');
            data.open = (currentTime.isAfter((opening) && currentTime.isBefore(closing)) || hours.Mo === "Open 24 Hrs") ? true : false;
            data.opening = opening._i;
            data.closing = (hours.Mo === "Open 24 Hrs") ? "Open 24 Hrs" : closing._i; 
            dataArray.push(data)
            
            setStateObject({
                dataState:dataArray,
                overview,
                name,
                address,
                hours,
                category: categoryName,
                phone,
                website,
                street,
                zip,
                city,
                delivery: DeliveryPrice, 
                dropOff: DropOffPrice, 
                dryCleaning: DryCleaningPrice, 
                laundry: LaundryPrice
            })              
        })

    };

    const toDoList = ()=>{

    };


};

export default Dashboard;