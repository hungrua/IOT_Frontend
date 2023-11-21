import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/pic/logo.png';
import '../sass/Layout/Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns,faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCircleUser, faMap } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
const Header = () => {
    const [today, setToday] = useState("")
    const [choosenLink,setChoosenLink] = useState("map")
    useEffect(() => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();

        const formattedDate = today.toLocaleDateString('en-US', options);
        setToday(formattedDate)
    }, [])
    const handleChangeLink = (tmp)=>{
        setChoosenLink(tmp);
    }
    return (
        <header>
            <div className="main-contain d-flex align-items-center">
                <div className='contain d-flex align-items-center first'>
                    <div className="contain-sm">
                        <div className="contain-sm-brand d-flex align-items-center">
                            <div className="logo d-flex align-items-center">
                                <img src={logo}></img>
                            </div>
                            <div className="name">
                                P-PARKING
                            </div>
                        </div>
                    </div>
                </div>
                <div className='contain d-flex align-items-center justify-content-between second'>    
                    <div className='contain-sm-dateTime'>
                            {today}
                    </div>
                    <div className="contain-sm">
                        <nav className='contain-sm-navigation d-flex align-items-center'>
                            <Link to="/dashboard">
                                <div className='dashboardLink d-flex align-items-center'
                                    style={{backgroundColor:choosenLink==="dashboard"?"#00eb75":""}}
                                    onClick={()=>handleChangeLink("dashboard")}
                                >
                                    <div className='dashboardLink-icon'>
                                        <FontAwesomeIcon icon={faTableColumns} ></FontAwesomeIcon>
                                    </div>
                                    <div className='dashboardLink-text'>DASHBOARD</div>
                                </div>
                            </Link>
                            <Link to='/history'>
                                <div className='historyLink d-flex align-items-center'
                                style={{backgroundColor:choosenLink==="history"?"#00eb75":""}}
                                onClick={()=>handleChangeLink("history")}
                                >
                                    <div className='historyLink-icon'>
                                        <FontAwesomeIcon icon={faClockRotateLeft} ></FontAwesomeIcon>
                                    </div>
                                    <div className='historyLink-text'>HISTORY</div>
                                </div>
                            </Link>
                            <Link to='map'>
                                <div className='mapLink d-flex align-items-center'
                                    style={{backgroundColor:choosenLink==="map"?"#00eb75":""}}
                                    onClick={()=>handleChangeLink("map")}
                                >
                                    <div className='mapLink-icon'>
                                        <FontAwesomeIcon icon={faMap} ></FontAwesomeIcon>
                                    </div>
                                    <div className='mapLink-text'>MAP</div>
                                </div>
                            </Link>
                        </nav>
                    </div>
                    <div className="contain-sm">
                        <div className='contain-sm-user'>
                            <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>

        </header>
    )
}
export default Header;