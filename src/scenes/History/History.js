import 'bootstrap/dist/css/bootstrap.css';
import '../../sass/scenes/History/History.scss'
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
const History = () => {
    const [history, setHistory] = useState([])
    useEffect(() => {
        fetch("http://localhost:3001/history")
            .then(response => response.json())
            .then(data => setHistory(data))
            .catch(err => console.log(err))
    }, [])
    return (
        <div className='history'>
            <div className='headerContainer' style={{ height: "80px", marginBottom: "4px" }}>
                <Header></Header>
            </div>
            <div className='info d-flex justify-content-between'>
                <div className='license'>
                    LICENSE PLATE :
                    <select>
                        <option>36H 888.88</option>
                        <option>36H 666.66</option>
                    </select>
                </div>
                <div className='month'>
                    <input type='month'></input>
                </div>
            </div>
            <div className='tableContainer'>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='no' >STT</TableCell>
                                <TableCell className='position' >POSITION</TableCell>
                                <TableCell className='timeIn' >TIME IN</TableCell>
                                <TableCell className='timeOut' >TIME OUT</TableCell>
                                <TableCell className='duration' >DURANTION</TableCell>
                                <TableCell className='fee' >FEE</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                history.map(item => {
                                    return (
                                        <TableRow>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.position}</TableCell>
                                            <TableCell>{item.timeIn}</TableCell>
                                            <TableCell>{item.timeOut}</TableCell>
                                            <TableCell>{item.duration}</TableCell>
                                            <TableCell>{item.fee}</TableCell>
                                        </TableRow>
                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
                <Pagination count={10} color="primary"></Pagination>
            </div>
            <div className='footerContainer' style={{ height: "80px" }}>
                <Footer></Footer>
            </div>
        </div>
    )
}
export default History;