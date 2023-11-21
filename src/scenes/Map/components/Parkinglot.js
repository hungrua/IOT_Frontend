import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from "react"
import '../../../sass/scenes/Map/components/Parkinglot.scss'
const Parkinglot = (props) =>{
    const {parkingStatus} = props
    return (
        <div className="d-flex align-items-center vertical" style={{backgroundColor: (parkingStatus===true?"#c05f4e":"#00eb75")}}>
            <div className="vertical-text">SLOT 1</div>
        </div>
    )
}
export default Parkinglot
