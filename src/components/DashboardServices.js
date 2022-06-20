import React, { useState, useEffect } from "react";
import Overview from "./Overview";
import Laundry from "./DashboardLaundry";
import Delivery from "./DashboardDelivery";
import DryClean from "./DashboardDryCleaning";
import DropOff from "./DashboardDropOff";
    const Services = ({data, category, update})=>{
        const [serviceLaundry, setServiceLaundry] = useState();
        const [serviceDelivery, setServiceDelivery] = useState();
        const [serviceDropOff, setServiceDropOff] = useState();
        const [serviceDryCleaning, setServiceDryCleaning] = useState();
        const name = data.businessName;

        useEffect(()=>{
            setServiceLaundry(data.LaundryPrice)
            setServiceDelivery(data.DeliveryPrice)
            setServiceDropOff(data.DropOffPrice)
            setServiceDryCleaning(data.DryCleaningPrice)
        },[data, serviceLaundry, serviceDelivery, serviceDropOff, serviceDryCleaning])

    // Function to update parent and re-render // to be passed down to children components
    const updateCall = ()=>{
        update()
    }
    return(
        <> 
            {/* category (passed down from Dashboard) indicates which price list to render */}
            {(category === "serviceOverview" || category === "services") ? 
                <Overview name={name} info={data} update={updateCall}/> :
                category === "serviceLaundry" ? <Laundry laundry={serviceLaundry} name={name} update={updateCall}/> :
                category === "serviceDelivery" ? <Delivery delivery={serviceDelivery} name={name} update={updateCall}/> :
                category === "serviceDropOff" ? <DropOff dropOff={serviceDropOff} name={name} update={updateCall}/> :
                <DryClean dryClean={serviceDryCleaning} name={name} update={updateCall}/>               
            }
        </>
    )
}

export default Services;