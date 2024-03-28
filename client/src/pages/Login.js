import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import jwt_decode from "jwt-decode"
import os_logo from './OS-logo.png'


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //const [loginStatus, setLoginStatus] = useState(false);

    // const login = () => {
    //     Axios.post("http://localhost:3000/login", {
    //         email: email,
    //         password: password,
    //     }).then((response) => {
    //         console.log(response.data)
    //         console.log(response.data.auth)

    //         if (!response.data.auth) {
    //             setLoginStatus(false)
    //             alert("Login failed! Please try again")
    //         } else {
    //             console.log(response.data.result)
    //             alert("Login Sucess! Welcome " + response.data.result[0].email)
    //         }
    //     })
    // }

    async function login(event) {
        event.preventDefault();
        const response = await fetch(process.env.REACT_APP_API + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()
        if (data.user) {
            alert("LOGGED IN")
            localStorage.setItem('token', data.user)
            const user = jwt_decode(data.user);

            if (user.role === "I") {
                window.location.href = '/inst-dashboard'
            } else if (user.role === "DC") {
                window.location.href = '/dc-dashboard'
            } else if (user.role === "PD") {
                window.location.href = '/pd-dashboard'
            } else if (user.role == "A") {
                window.location.href = '/admin-dashboard'
            } else if (user.role == "AC") {
                window.location.href = '/ac-dashboard'
            }

        } else {
            alert("Login Failed! Please check your email and password!")
        }
        console.log(data)
    }



    return (
        <div id="login-form">
            <div className='login-topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
            </div>

            <h1 id="login-label2"> Login OneSyllabus</h1>
            <div id="cont">
                <label id="login-label">Username: </label>
                <input
                    type="text"
                    placeholder='Username'
                    onChange={(e) => { setEmail(e.target.value) }}
                />
                <br />
                <label id="login-label">Password: </label>
                <input
                    type="password"
                    placeholder='password'
                    onChange={(e) => { setPassword(e.target.value) }}
                />
                <div id="login-btn-container">
                    <button id="login2" onClick={login}>Login</button>
                </div>
            </div>
            {/* {loginStatus && <button onClick={userAuth}> Check if authenticated</button>} */}

            <p id="warning-label">For security reasons, please log out and exit your web browser when you are done
                accessing services that require authentication!</p>
        </div>
    )
}

export default Login;