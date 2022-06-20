import React, {Component} from "react";
import GoogleMapReact from 'google-map-react';
import Marker from './LocationMarker';
import MarkerWindow from './MarkerWindow';

// import "../css/googleMap.css";

class Map extends Component{
    constructor(props){
        super(props);
        this.state={
            selectedInfo: null,
        }
    }
    
    //Remove marker window when user clicks on a different page 
    componentDidUpdate(prevProps) {
        if (this.props.currentPage !== prevProps.currentPage) {
          this.setState({selectedInfo: null});
        }
      }
        
    render(){
        let windowCoords;
        // if business div is hovered over, set coordinates so that MarkerWindow is displayed in its place
        if(this.state.selectedInfo != null){
            windowCoords = JSON.parse(this.state.selectedInfo.businessLocation);
        }
        //center focuses the map in a specific place
        let center = {lat: this.props.latitude, lng: this.props.longitude}

        //Markers maps over props.markers and return a Map Marker w/ business info and mouseover event
        const markers = this.props.markers.map((marker, index)=>{
            let coordinates = JSON.parse(marker.businessLocation);
            return <Marker
                        key={index}
                        name={marker.businessName}
                        rank={marker.rank}
                        lat ={coordinates.lat}
                        lng = {coordinates.lng}
                        onMouseOver={()=> {
                            this.setState({selectedInfo: marker})
                        }}

                    />
        })
        
        return(
            <div style={{ height: this.props.height, width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                    center={ center }
                    defaultZoom={ 11 }
                >
                    {markers}
                    {this.state.selectedInfo &&
                    <MarkerWindow
                        businessName={this.state.selectedInfo.businessName}
                        cityStateZip={this.state.selectedInfo.cityStateZip}
                        phone={this.state.selectedInfo.phone}
                        lat={windowCoords.lat} 
                        lng={windowCoords.lng}
                        image={this.state.selectedInfo.image}
                        onCloseClick={()=> this.setState({selectedInfo: null})}
                    />
                }
                </GoogleMapReact> 
            </div>
        )    
    }
}

export default Map;


