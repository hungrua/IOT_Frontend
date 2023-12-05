import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react"
import '../../../sass/scenes/Map/components/Parkinglot.scss'
const Parkinglot = (props) =>{
    const {parkingStatus,slotNumber} = props
    const setColor = ()=>{
        if(parkingStatus==true) return "#c05f4e";
        else if(parkingStatus==false) return "#00eb75";
        else return "gray";
    }
    return (
        <div className="vertical" style={{height:!(parkingStatus==true ||parkingStatus==false)?"120px":"",width:!(parkingStatus==true ||parkingStatus==false)?"220px":""}}>
            <div className='slotContainer d-flex align-items-center' style={{backgroundColor: setColor(parkingStatus)}}>
                <div className="vertical-text">
                    <div>SLOT {slotNumber}</div>
                {
                    !(parkingStatus==true ||parkingStatus==false) && <div style={{fontSize:"0.8em"}}>UNAVAILABLE</div>
                }
                </div>
            </div>
        </div>
    )
}
export default Parkinglot
