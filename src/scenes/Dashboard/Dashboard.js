import 'bootstrap/dist/css/bootstrap.css';
import '../../sass/scenes/Dashboard/Dashboard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIdCard } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faCoins, faSquareParking } from '@fortawesome/free-solid-svg-icons';
import Header from '../../Layout/Header.js';
import Footer from '../../Layout/Footer.js';
import zIndex from '@mui/material/styles/zIndex.js';
const Dashboard = () => {
    return (
        <div style={{width:"100vw",height:"100vh"}}> 
            <div className='headerContainer' style={{ height: "80px", marginBottom: "4px",zIndex:"4" }}>
                <Header></Header>
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
                        <div className='info'>License plate : 36H-888.88</div>
                        <div className='info'>Owner : Henry Chan</div>
                        <div className='info'>Model : Ford Ranger</div>
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
                                    <div className='slot-number'>5</div>
                                </div>
                                <div className='slot d-flex justify-content-between'>
                                    <div className='slot-symbol d-flex align-items-center'>
                                        <FontAwesomeIcon icon={faCircle} style={{ color: "red", }} />
                                        <div className='slot-text'>Occupied</div>
                                    </div>
                                    <div className='slot-number'>2</div>
                                </div>
                            </div>
                            <div className='totalSlot'>
                                <div className='totalSlot-text'>Total slot</div>
                                <div className='totalSlot-number'>7</div>
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
                                <div className='totalSlot-number'>20 hours</div>
                            </div>
                            <div className='totalSlot'>
                                <div className='totalSlot-text'>Total fee</div>
                                <div className='totalSlot-number'>20$</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footerContainer' style={{ height: "80px" }}>
                <Footer></Footer>
            </div>
        </div>
    )
}
export default Dashboard;