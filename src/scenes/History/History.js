import 'bootstrap/dist/css/bootstrap.css';
import '../../sass/scenes/History/History.scss'
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import { IP, port } from '../../constraint'
const History = (props) => {
    const { choose } = props;
    const [history, setHistory] = useState([]);
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

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        return `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
    });

    useEffect(() => {
        fetchLicensePlates();
    }, []);

    const fetchLicensePlates = () => {

        fetch("http://" + IP + ":" + port + "/cars?username=" + JSON.parse(sessionStorage.getItem("user")).username)
            .then(response => response.json())
            .then(data => {
                const licensePlates = data.map(item => item.licensePlate);
                setLicensePlate(licensePlates);

                const today = new Date();
                const month = today.getMonth() + 1;
                const year = today.getFullYear();
                setCondition(prevCondition => ({
                    ...prevCondition,
                    licensePlate: licensePlates[0],
                    month: month,
                    year: year
                }));
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
            .then(data => setHistory(data))
            .catch(err => console.log(err));
    };
    const covertTimeFormat = (inputDateString) => {
        const inputDate = new Date(inputDateString);
        const day = inputDate.getDate().toString().padStart(2, "0");
        const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
        const year = inputDate.getFullYear().toString();
        const hours = inputDate.getHours().toString().padStart(2, "0");
        const minutes = inputDate.getMinutes().toString().padStart(2, "0");
        const seconds = inputDate.getSeconds().toString().padStart(2, "0");
        return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };


    return (
        <div className='history' style={{ width: "100vw", height: "100vh" }}>
            <div className='headerContainer' style={{ height: "80px", marginBottom: "4px" }}>
                <Header name={choose}></Header>
            </div>
            <div className='mainContainer'>
                <div className='info d-flex justify-content-between'>
                    <div className='license'>
                        LICENSE PLATE :
                        <select
                            onChange={(e) => {
                                setCondition({
                                    ...condition,
                                    licensePlate: e.target.value
                                })
                            }}
                        >
                            {
                                licensePlate.map(lp => {
                                    return (
                                        <option value={lp}>{lp}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='month'>
                        <input type='month' defaultValue={selectedMonth} onChange={(e) => {
                            let str = e.target.value
                            let arr = str.split("-")
                            setCondition({
                                ...condition,
                                month: parseInt(arr[1]),
                                year: parseInt(arr[0])
                            })
                        }}></input>
                    </div>
                </div>
                <div className='tableContainer'>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell className='no' >STT</TableCell>
                                    <TableCell className='timeIn' >TIME IN</TableCell>
                                    <TableCell className='timeOut' >TIME OUT</TableCell>
                                    <TableCell className='duration' >DURANTION</TableCell>
                                    <TableCell className='fee' >FEE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    history.map((item, index) => {
                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{covertTimeFormat(item.timeIn)}</TableCell>
                                                <TableCell>{covertTimeFormat(item.timeOut)}</TableCell>
                                                <TableCell>{item.parkingTime} hours</TableCell>
                                                <TableCell>{item.fee} VNĐ</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Pagination count={10} color="primary"></Pagination>
                </div>
            </div>
        </div>
    )
}
export default History;