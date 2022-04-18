import { Icon } from '@iconify/react';




function DefaultServices({services}){
    //Change grid sizeds based on the number of servies
    const columnClass = (services.length === 1) ? "col-4" : (services.length === 2) ? "col-6" : "col-3 _colServices";

    //Function maps over services array and returns a card /w image and label
    const serviceList = services.map((service)=>{
        //Label determined ny name of service
        const label = service === "self-service" ? "icon-park-outline:washing-machine-one" : service === "drop-off" ? "grommet-icons:basket" :  service === "delivery" ? "carbon:delivery" : "ri:t-shirt-air-line";
        return (
            <div className={columnClass} style={{marginTop: 20}}>
                <div className="card" style={{border: "1px solid rgb(9 244 95)", boxShadow: "0px 0px 8px #0cdfe6"}}>
                    <h1 className="default-svg-services"><Icon className="card-img-top" icon={label} /></h1>
                    <h5 className="text-center svg-text">{service}</h5>
                </div>
            </div>
        )
    })
    return (
        <div className="container-fluid" id="default-services">
            <div className="row">
                <div className="col-12">
                    <div className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <h2 className="text-center default-sub-header">Featured Services</h2>
                            <div className="row" style={{justifyContent: "center"}}>
                                {serviceList}
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {/* Wave Border Image */}
                    <div className="_svgBg">
                        <svg className="svgStyle2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="white" 
                            fill-opacity="1" 
                            d="M0,96L48,101.3C96,107,192,117,288,133.3C384,149,480,171,576,165.3C672,160,768,128,864,106.7C960,85,1056,75,1152,80C1248,85,1344,107,1392,
                            117.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                            ></path>
                        </svg>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DefaultServices;