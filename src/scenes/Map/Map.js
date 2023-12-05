import 'bootstrap/dist/css/bootstrap.css';
import Parkinglot from './components/Parkinglot'
import '../../sass/scenes/Map/Map.scss'
import direction from '../../assets/pic/direction.png'
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { uid } from 'uid';
import { onValue, ref } from 'firebase/database';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
const Map = (props) => {
    const {choose} = props
    const [slotStatus, setSlotStatus] = useState([])
    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                setSlotStatus(data.Parking)
            }
        })
    }, [])
    return (
        <div className="map" style={{width:"100vw",height:"100vh"}}>
            <div className='headerContainer' style={{ height: "80px", marginBottom: "4px" }}>
                <Header name={choose}></Header>
            </div>
            <div className="top d-flex justify-content-between">
                <div className='barrier left'></div>
                <div className='top-parking'>
                    <div className='top-parking-slot d-flex'>
                        <Parkinglot parkingStatus={slotStatus.Slot1 === 0 ? false : true} slotNumber={1}></Parkinglot>
                    </div>
                </div>
                <div className='top-parking'>
                    <div className='top-parking-slot d-flex'>
                        <Parkinglot parkingStatus={slotStatus.Slot2 === 0 ? false : true} slotNumber={2}></Parkinglot>
                    </div>
                </div>
                <div className='top-parking'>
                    <div className='top-parking-slot d-flex'>
                        <Parkinglot parkingStatus={slotStatus.Slot3 === 0 ? false : true} slotNumber={3}></Parkinglot>
                    </div>
                </div>
                <div className='barrier right'></div>
            </div>
            <div className='bottom d-flex justify-content-between'>
                <div className='bottom-parking'>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"} slotNumber={4} ></Parkinglot>
                    </div>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"}  slotNumber={5} ></Parkinglot>
                    </div>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"}  slotNumber={6}></Parkinglot>
                    </div>
                </div>
                <div className='bottom-way'>
                    <div className='bottom-way-direction'>
                        <div className='bottom-way-direction-side'>
                            <img src={direction} style={{ transform: "rotate(270deg)" }}></img>
                        </div>
                    </div>
                    <div className='bottom-way-entrance'>ENTRANCE</div>
                </div>
                <div className='bottom-way-middle'>
                    <div className='bottom-way-direction d-flex justify-content-center'>
                        <img src={direction} ></img>
                    </div>
                    <div className='bottom-way-divider'>
                    </div>
                </div>
                <div className='bottom-way'>
                    <div className='bottom-way-direction'>
                        <div className='bottom-way-direction-side'>
                            <img src={direction} style={{ transform: "rotate(90deg)" }}></img>
                        </div>
                    </div>
                    <div className='bottom-way-exit'>EXIT</div>
                </div>
                <div className='bottom-parking'>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"}  slotNumber={7} ></Parkinglot>
                    </div>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"}  slotNumber={8} ></Parkinglot>
                    </div>
                    <div className='bottom-parking left'>
                        <Parkinglot parkingStatus={"none"}  slotNumber={9} ></Parkinglot>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Map;