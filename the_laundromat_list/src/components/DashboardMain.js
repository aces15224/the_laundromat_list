import ResultCard from "../components/ResultCard";
import React, {useState, useEffect} from "react";

const Main = ({key = 1, props, occupancyPercent, hours, rank, toDoList, setLink})=>{
    const [mainInfo, setMainInfo] = useState({
        total : 0,
        toDoArray : []
    })

    const total = mainInfo.total;
    const toDos = mainInfo.toDoArray;
    const completeStyle1 = {color: "red", fontWeight: "bold", marginBottom: 0, marginTop: "10px", textShadow: "1px 1px #3f3e3e"};
    const completeStyle2 = {color: "rgb(39, 214, 39)", fontWeight: "bold", marginBottom: 0, marginTop: "10px", textShadow: "1px 1px #3f3e3e"};

    useEffect(()=>{
        const toDoArray = [];
        const len = toDoList.length
        //Calculate Profile Completion Percentage
        const total =  100 - (len * 12.5);
        let priceTag = false;

        //cycle through todos and push labels to array
        for(let i = 0; i < len; i++){
            if(toDoList[i].includes("Price") && priceTag === false){
                //PriceTag === true prevents same value from being sent to array twice
                priceTag = true;
                toDoArray.push({services: "Services/Prices"});
            } else if(toDoList[i] === "website"){
                toDoArray.push({business: "Website"});
            } else if(toDoList[i] === "imageUrl"){
                toDoArray.push({business: "Profile Image"});
            } else if(toDoList[i] === "options"){
                toDoArray.push({services: "Amenities"});
            } else{
                toDoArray.push({business: "Business Intro"});
            }

        }       
        setMainInfo({ total, toDoArray});
    },[toDoList])
    
    // function will run and map over todos if they exist and....
    const toDoMap = ()=>{
        if(toDos.length > 0 ){
            return toDos.map((todo)=>{
                //collect key and use it to setLinks in Dashboard (will redirect to where user can complete todo)
                const toDoProp = Object.keys(todo)[0];
                return (
                    <div style={{display: "block", textAlign: "center", width: "100%"}}>
                        <div className="dashMainTodos">
                            {todo[toDoProp]}{<span className="redX">X</span>}
                        </div>
                        {/* button for re-directing user */}
                        <button className="link-buttons toDoBtn" onClick={(e)=>setLink(e, toDoProp)}>Add Now</button>
                    </div>
                        
                )
            })
        }
    }
    return(
        <div className="container dashCentered">
            <div className="row">
                <div className="col-12 d-flex justify-content-center dashboardCol">
                    <p className="dashMainHeader">This is how your business appears in results!</p>
                </div>
            </div>
            <div className="row" style={{marginTop: "1rem", marginBottom: "1rem"}}>
                <div className=" col-xs-12 col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8">
                    <div style={{width: "100%", margin: "20px 0px"}}>
                        {/* displays user's business-- cardStyle identifies CSS for ResultCard being displayed in Dashboard */}
                        <ResultCard
                            key={key}
                            props={props} 
                            occupancyPercent={occupancyPercent} 
                            hours={hours}
                            rank={rank}
                            cardStyle={1}
                        />
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="offset-1 col-10 offset-md-2 col-md-8 text-center">
                    <h5 style={total !== 100 ? completeStyle1 : completeStyle2 }>Your profile is {total !== 100 ? "Incomplete!" : "Complete!  Great job!"}</h5>
                </div>
            </div>
            <div className="row">
                <div className="offset-1 col-10 offset-md-2 col-md-8">
                    <div style={{width: "100%", margin: "20px 0px 10px 0px"}}>
                        <div className="progress" style={{border: "1px solid black", height: "1.4rem"}}>
                            <div className="progress-bar progress-bar-striped bg-primary" role="progressbar" style={{width: `${total}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                {`${total}%`}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="offset-1 col-10 offset-md-2 col-md-8">
                    <div className="options-div">
                        {toDoMap()}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Main;