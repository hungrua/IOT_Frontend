import 'bootstrap/dist/css/bootstrap.css';
import '../../sass/scenes/Dashboard/Dashboard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faCoins, faSquareParking } from '@fortawesome/free-solid-svg-icons';
import Header from '../../Layout/Header.js';
import { useState, useEffect } from 'react';
import { db } from '../Map/firebase.js';
import { onValue, ref } from 'firebase/database';
import { IP, port } from '../../constraint.js'
const Dashboard = (props) => {
    const { choose } = props
    const [occupiedSlot, setOccupiedSlot] = useState(0)
    const [totalSlot, setTotalSlot] = useState(9)
    const [licensePlate, setLicensePlate] = useState([]);
    const [condition, setCondition] = useState(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        return {
            licensePlate: '',
            month: currentMonth,
            year: currentYear
        };
    });
    const [model, setModel] = useState([])
    const [totalDuration, setTotalDuration] = useState(0)
    const [totalFee, setTotalFee] = useState(0)

    useEffect(() => {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();
            if (data !== null) {
                let count = 0
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        if (data[key] == 1) count += 1
                    }
                }
                setOccupiedSlot(count)
            }
        })
    }, [])
    useEffect(() => {
        fetchLicensePlates();
    }, []);
    const fetchLicensePlates = () => {

        fetch("http://" + IP + ":" + port + "/cars?username="+JSON.parse(sessionStorage.getItem("user")).username)
            .then(response => response.json())
            .then(data => {

                const licensePlates = data.map(item => {
                    return {
                        licensePlate: item.licensePlate,
                        model: item.model
                    }
                });
                setLicensePlate(licensePlates);

                const today = new Date();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                setCondition(prevCondition => ({
                    ...prevCondition,
                    licensePlate: licensePlates[0].licensePlate,
                    month: month,
                    year: year
                }));
                setModel(licensePlates[0].model)
            })
            .catch(err => console.log(err));
    };
    useEffect(() => {
        fetchParkingByCondition();
    }, [condition]);

    const fetchParkingByCondition = () => {
        console.log(condition);
        fetch(`http://${IP}:${port}/car/parkings?licensePlate=${condition.licensePlate}&month=${condition.month}&year=${condition.year}`)
            .then(response => response.json())
            .then(data => {
                let totalFee = 0;
                let totalDuration = 0;
                data.map(dt => {
                    totalFee += dt.fee
                    totalDuration += dt.parkingTime
                })
                setTotalDuration(totalDuration)
                setTotalFee(totalFee)

            })
            .catch(err => console.log(err));
    };

    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <div className='headerContainer' style={{ height: "80px", marginBottom: "4px", zIndex: "4" }}>
                <Header name={choose}></Header>
            </div>
            <div className='dashboard d-flex justify-content-around'>
                <div className='left'>
                    <div className='left-up'>
                        <div className='title d-flex'>
                            <div className='title-symbol'>
                                <FontAwesomeIcon icon={faIdCard} style={{ color: "#ffffff" }} ></FontAwesomeIcon>
                            </div>
                            <div className='title-text'>Car information</div>

                        </div>
                        <div className='info'>Owner : {JSON.parse(sessionStorage.getItem("user")).fullName}</div>
                        <div className='info'>License plate :
                            <select
                                onChange={(e) => {
                                    setCondition({
                                        ...condition,
                                        licensePlate: e.target.value
                                    })
                                    const selectedOption = e.target.options[e.target.selectedIndex];
                                    const model = selectedOption.getAttribute('model');
                                    setModel(model);
                                }}
                            >
                                {
                                    licensePlate.map(lp => {
                                        return (
                                            <option value={lp.licensePlate} model={lp.model}>{lp.licensePlate}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='info'>Model : {model}</div>
                    </div>
                    <div className='left-down'>
                        <div className='title d-flex'>
                            <div className='title-symbol'>
                                <FontAwesomeIcon icon={faSquareParking} style={{ color: "#ffffff" }} ></FontAwesomeIcon>
                            </div>
                            <div className='title-text'>Parking lot</div>

                        </div>
                        <div className='parkingInfo d-flex'>
                            <div className='slotStatus'>
                                <div className='slot d-flex justify-content-between'>
                                    <div className='slot-symbol d-flex align-items-center'>
                                        <FontAwesomeIcon icon={faCircle} style={{ color: "#00eb75", }} />
                                        <div className='slot-text'>Free</div>
                                    </div>
                                    <div className='slot-number'>{totalSlot - occupiedSlot}</div>
                                </div>
                                <div className='slot d-flex justify-content-between'>
                                    <div className='slot-symbol d-flex align-items-center'>
                                        <FontAwesomeIcon icon={faCircle} style={{ color: "red", }} />
                                        <div className='slot-text'>Occupied</div>
                                    </div>
                                    <div className='slot-number'>{occupiedSlot}</div>
                                </div>
                            </div>
                            <div className='totalSlot'>
                                <div className='totalSlot-text'>Total slot</div>
                                <div className='totalSlot-number'>{totalSlot}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right'>
                    <div className='right-middle'>
                        <div className='title d-flex'>
                            <div className='title-symbol'>
                                <FontAwesomeIcon icon={faCoins} style={{ color: "#ffffff", }} />
                            </div>
                            <div className='title-text'>Parking fee this month</div>
                        </div>
                        <div className='parkingInfo d-flex'>
                            <div className='totalSlot'>
                                <div className='totalSlot-text'>Total duration</div>
                                <div className='totalSlot-number'>{totalDuration} hours</div>
                            </div>
                            <div className='totalSlot'>
                                <div className='totalSlot-text'>Total fee</div>
                                <div className='totalSlot-number'>{totalFee} VNĐ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard;