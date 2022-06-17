import React from "react";

function CheckBox(props){
    return (
      <div className="checkBox">
        <input 
          type="checkbox"
          checked={props.feature.isChecked} 
          onChange={()=> props.handleCheck(props.feature.id)} 
        /> 
        {props.feature.value} 
      </div>
    )
}

export default CheckBox;