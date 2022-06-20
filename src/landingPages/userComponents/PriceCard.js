import React from "react";

const PriceCard = ({item, price})=>{
    return(
        <div className="card individual-price-card">
            <div className="card-body" style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:10}}>
                <p className="cardText">{item}</p>
                <p className="cardText">{price}</p >
            </div>
        </div>
    )
}

export default PriceCard;

