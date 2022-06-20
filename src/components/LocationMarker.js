import { Icon } from '@iconify/react';
import tooltipIcon from '@iconify-icons/mdi/tooltip';
import tooltipOutline from '@iconify-icons/mdi/tooltip-outline';

const LocationMarker = ({lat, lng, onMouseOver, rank})=>{
    const toolStyle1 = { fontSize: 30, color: "red", position: "absolute" };
    const toolStyle2 = { fontSize: 32, color: "white", position: "relative", right: "1px", top: "-1px" };
    const rankSingle = { fontSize: 12, color: "white", position: "relative", zIndex: "50", top: "-26px", right: "-11px" };
    const rankDouble = { fontSize: 12, color: "white", position: "relative", zIndex: "50", top: "-26px", right: "-7px" };
    const searchRank = rank + 1;

    return (
        //display card w/ business info when div is moused over
        <div onMouseOver={onMouseOver}>
            {/* Overlap icons */}
            <Icon icon={tooltipIcon} style={toolStyle1} />
            <Icon icon={tooltipOutline}  style={toolStyle2}/>
            {/* If rank is a double digit, position it to the left to make room */}
            <div style={(searchRank > 9) ? rankDouble : rankSingle}>{searchRank}</div>
        </div>
    )
}

export default LocationMarker;



    