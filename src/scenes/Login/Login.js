import '../../sass/scenes/Login/Login.scss'
import { Link ,useNavigate} from "react-router-dom";
import cartoon from '../../assets/pic/cartoon.png'
import { Button, TextField } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import {IP,port} from '../../constraint'
const Login = ({onLogin}) => {
    const [status, setStatus] = useState(true)
    const navigate = useNavigate()
    useEffect(()=>{
        sessionStorage.clear()
    },[])
    const login =()=>{
        let userName = document.getElementById("userName").value
        let password = document.getElementById("password").value
        let options={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            }
        }
        console.log(IP,port)
        fetch("http://"+IP+":"+port+"/login?username="+userName+"&password="+password,options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                onLogin(data)
                if(data.role==='user') navigate("/dashboard")
                else navigate("/admin/users")
                console.log(1)
                }
            )
            .then(()=>{
            })   
            .catch(err => console.log(err))
    }
    const signUp = ()=>{
        let userData ={
            username : document.getElementById("userName").value,
            password : document.getElementById("password").value,
            email : document.getElementById("email").value,
            fullName : document.getElementById("fullName").value,
            role: "user"
        }
        let options={
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }
        fetch("http://localhost:9999/user",options)
            .then(response => response.json())
            .then(data=>{
                alert("Đăng ký tài khoản thành công vui lòng quay lại đăng nhập")
                setStatus(true)
            })
    }
    return (
        <div className="app-contain">
            <div className='app-contain-main'>
                <div className="appAside" >
                    <img src={cartoon}></img>
                </div>
                {status && <div className="appForm">
                    <h2>WELCOME</h2>
                    <div className='inputContainer'>
                        <TextField id="userName" label="Username" variant="standard" required  />
                    </div>
                    <div className='inputContainer'>
                        <TextField id="password" label="Password" variant="standard" required type="password" />
                    </div>
                    <div className='inputContainer d-flex justify-content-center'>
                        <div className='inputContainer-text'>Don't have an account ? </div>
                        <div className='inputContainer-link'
                            onClick={() => {
                                setStatus(false)
                            }}
                        >
                            Sign up here
                        </div>

                    </div>
                    <div className='inputContainer'>
                        <Button variant='contained' color="success"
                            onClick={login}
                        
                        >LOGIN</Button>
                    </div>
                </div>}
                {!status && <div className="appForm">
                    <h2>WELCOME</h2>
                    <div className='inputContainer'>
                        <TextField id="email" label="Email" variant="standard" required type='email' />
                    </div>
                    <div className='inputContainer'>
                        <TextField id="fullName" label="Fullname" variant="standard" required />
                    </div>
                    <div className='inputContainer'>
                        <TextField id="userName" label="Username" variant="standard" required />
                    </div>
                    <div className='inputContainer'>
                        <TextField id="password" label="Password" variant="standard" required type="password" />
                    </div>
                    <div className='inputContainer d-flex justify-content-center'>
                        <div className='inputContainer-text'>You have an account ? </div>
                        <div className='inputContainer-link'
                            onClick={() => {
                                setStatus(true)
                            }}
                        >
                            Back to sign in
                        </div>

                    </div>
                    <div className='inputContainer'>
                        <Button variant='contained' color="success"
                        onClick={signUp}
                        >SIGN UP</Button>
                    </div>
                </div>}

            </div>
        </div>
    )
};
export default Login;