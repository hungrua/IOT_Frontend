import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import { Form, Button, Row, Table } from 'react-bootstrap';

const AdminCategoryDetail = () => {
    const myStyle = {
        backgroundImage: "linear-gradient(45deg, rgb(32, 211, 254), rgb(107, 35, 167))",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        height: "100vh",
        width: "100vw"
    };

    const [user, setUser] = useState({})
    const [cars, setCars] = useState([])
    const [car,setCar] = useState({
        licensePlate:"",
        model:""
    })
    const [message, setMessage] = useState('')
    const { username } = useParams()
    const navigate = useNavigate()

    const fetchUser = () => {
        if(username!=-1){
            fetch('http://localhost:9999/user/' + username)
                .then((response => response.json()))
                .then(data => {
                    setUser(data)
                })
                .then((err) => console.log(err))
        }
    }
    const fetchCarByUser = () => {
        fetch('http://localhost:9999/cars?username=' + username)
            .then((response => response.json()))
            .then(data => {
                setCars(data)
            })
            .then((err) => console.log(err))
    }
    useEffect(() => {
        fetchUser()
        fetchCarByUser()
    }, [])

    const handleChange = (event) => {
        console.log(1)
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };
    const handleChangeCar = (event)=>{
        const { name, value } = event.target;
        setCar((prevCar) => ({ ...prevCar, [name]: value }));
    }

    const handleAddOrEditUser = async (e) => {
        e.preventDefault();
        if(user.email==""||user.fullName==""){
            alert("Vui lòng điền đủ thông tin người dùng")
            return;
        }
        let userData = {
            ...user,
            password: "123456"
        }
        console.log(userData)
        let option ={
            method: "PUT",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(userData)
        }
        fetch("http://localhost:9999/user",option)
            .then(response => response.json())
            .then(data =>{
                setUser(data)
                alert("Thay đổi thông tin user thành công !")
                navigate("/admin/users")
            })
            .catch(err => console.log(err))
    }
    const handleAddCar = async (e) => {
        if(car.licensePlate=="" || car.model==""){
            alert("Vui lòng điền đủ thông tin xe !")
            return;
        }
        let carData = {
            ...car,
            username : username
        }
        let option ={
            method: "POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(carData)
        }
        fetch("http://localhost:9999/car",option)
            .then(response => response.json())
            .then(data =>{
                setCars([...cars,data])
                alert("Thêm xe thành công !")
            })
            .catch(err => console.log(err))
    }
    const Delete = (licensePlate)=>{
        let option={
            method: "DELETE"
        }
        fetch("http://localhost:9999/car?licensePlate="+licensePlate,option)
            .then(response => response.text())
            .then(message =>{
                alert(message)
                fetchCarByUser()
            })
    }


    return (
        <div style={myStyle}>
            <Link to="/admin/users" className="btn btn-light">Back to home</Link>
            <div className="d-flex justify-content-around mt-3">
                <div className="card w-25 " style={{height:"50%"}}>
                    <div className="card-header text-center font-weight-bold">
                        <div className="information mt-3">USER DETAILS</div>
                    </div>
                    <div className="card-body bg-white">
                        <Form>
                            <div className="wrapper ">
                                <div className="category-detail">
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Username<span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="username" placeholder="Username" value={user.username || ''} onChange={handleChange} required disabled={!(username==-1)} />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Email<span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="email" placeholder="email" value={user.email || ''} onChange={handleChange} required />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Fullname<span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="fullName" placeholder="fullName" value={user.fullName || ''} onChange={handleChange} required />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Role<span className="text-danger">*</span></Form.Label>
                                            <Form.Select name='role' aria-label="Default select example" value={user.role} onChange={handleChange}>
                                                <option value="user">user</option>
                                                <option value="admin">admin</option>
                                            </Form.Select>
                                        </div>
                                    </Row>
                                </div>

                            </div>

                            <Row className="text-right">
                                <div className="col-md-12">
                                    <Button type="button" id="submit" className="mt-2 btn btn-primary" style={{ float: "right" }}
                                    onClick={handleAddOrEditUser}
                                    
                                    
                                    >Save</Button>
                                    <span className='text-danger'>{message}</span>
                                </div>
                            </Row>
                        </Form>
                    </div>
                </div>
                <div className="card w-50">
                    <div className="card-header text-center font-weight-bold">
                        <div className="information mt-3">USER'S CARS</div>
                    </div>
                    <div className="card-body bg-white">
                        <Form>
                            <div className="wrapper ">
                                <div className="category-detail">
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>License Plate<span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="licensePlate" placeholder="License Plate" onChange={handleChangeCar} required />
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-3">
                                            <Form.Label>Model<span className="text-danger">*</span></Form.Label>
                                            <Form.Control className="mb-2" type="text" name="model" placeholder="model" onChange={handleChangeCar} required />
                                        </div>
                                    </Row>
                                </div>

                            </div>

                            <Row className="text-right">
                                <div className="col-md-12">
                                    <Button type="button" id="submit" className="mt-2 btn btn-primary" style={{ float: "right" }}
                                        onClick={handleAddCar}
                                    
                                    >Add</Button>
                                    <span className='text-danger'>{message}</span>
                                </div>
                            </Row>
                        </Form>
                        {
                            username !== '-1' && <div className="container-fluid" style={{ marginTop: "20px" }}>
                                <div className="table-header">

                                </div>
                                <Table className="table table-striped table-bordered text-center bg-light">
                                    <thead className="table-light">
                                        <tr className="text-center">
                                            <th>License Plate</th>
                                            <th>Model</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cars.map((car) => (
                                                <tr key={car.licensePlate}>
                                                    <td> {car.licensePlate}</td>
                                                    <td> {car.model} </td>

                                                    <td>
                                                        <button className="btn btn-outline-danger" onClick={() => Delete(car.licensePlate)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))}

                                    </tbody>

                                </Table>
                            </div>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
export default AdminCategoryDetail;