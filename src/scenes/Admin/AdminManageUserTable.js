import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import {IP,port} from '../../constraint'
const AdminCategories = () => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const fetchCategories = () => {
        fetch('http://'+IP+':'+port+'/users')
            .then((response) => response.json())
            .then((categories) => setUsers(categories))
            .catch((err) => console.log(err))
    }
    useEffect(() => {
        fetchCategories()
    }, []);

    // const Delete = (category) => {
    //     if (category.bookQuantity > 0) {
    //         alert("Thể loại vẫn còn sách, không thể xoá")
    //     }
    //     else {
    //         if (window.confirm('Bạn có muốn xóa danh mục này không?')) {
    //             fetch('http://localhost:8081/api/category/delete/' + category.id, {
    //                 method: 'DELETE',
    //                 headers: {
    //                     "Authorization": "Bearer your_access_token"
    //                 }
    //             })
    //                 .then(response => {
    //                     fetchCategories()
    //                 })
    //                 .catch(err => console.log(err))
    //         }
    //     }
    // }

    return (
        <>
            {/* <Header /> */}
            <div className="container-fluid" style={{ marginTop: "20px",height:"100vh" }}>
                <div className="table-header">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Tìm kiếm người dùng" onChange={(e) => setSearch(e.target.value)} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                    </div>
                </div>
                <Table className="table table-striped table-bordered text-center">
                    <thead className="table-light">
                        <tr className="text-center">
                            <th>STT</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>FULLNAME</th>
                            <th>ROLE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.filter(user => {
                                // return true
                                return user.username.toLowerCase().includes(search.toLowerCase())
                            })

                                .map((user,index) => (
                                    <tr key={user.username}>
                                        <td> {index+1}</td>

                                        <td> {user.username}</td>
                                        <td> {user.email}</td>
                                        <td> {user.fullName}</td>
                                        <td> {user.role}</td>
                                        <td>
                                            <Link to={`/admin/users/${user.username}`} className="btn btn-outline-primary mx-2">View</Link>
                                            <button className="btn btn-outline-danger" 
                                                // onClick={() => Delete(category)}
                                            >Delete</button>
                                        </td>
                                    </tr>
                                ))}

                    </tbody>

                </Table>
            </div>
        </>
    )
}
export default AdminCategories