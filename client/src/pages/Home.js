import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import homepage_img from './homepage.png'
import '../App.css';



function Home() {

    return (

        <div id="container">
            <h1 id="main-title">OneSyllabus</h1>
            <p>OneSyllabus simpilifies the course outline creation process.
                Professors to easily able to create, edit and submit course outlines for review</p>

            <div id="buttons">
            </div>
            {/* <h1> Login</h1> */}
            {/* <button id="login-button" >Login</button> */}
            <a href="/login-page" id="login-button">Login</a>
            <img src={homepage_img} alt="react logo" />

            <br></br>
        </div>
    )
}

export default Home;