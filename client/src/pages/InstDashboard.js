import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import os_logo from './OS-logo.png'
import profile_img from './profile-img.png'


import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'




function InstDashboard() {

    const [courses, setCourses] = useState("");
    const [existingInstructor, setExistingInstructor] = useState("");
    const [existingOutlineOwner, setExistingOutlineOwner] = useState(""); 
    const [selectedCourse, setSelectedCourse] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [instructorEmail, setInstructorMail] = useState("");

    let outlinePreExisting = false;//an instructor can only create a course outline if onen does not already exist in the database
    let editableOutlineExists = 0;//an instructor can only edit an outline that exists

    function populate() {
        const getCourses = async () => {
            const response = await fetch(process.env.REACT_APP_API+"/courses/", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            });
            const json = await response.json();
            if (response.ok) {
                setCourses(json);
            }

        };
        getCourses();
    }

    function checkExisting(){
        const getInstructor = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/courseCreated/${selectedCourse}`, {
            });
            const json = await response.json();
            if(response.ok){
                setExistingInstructor(json[0].instructorMail);
            }
        }
        getInstructor();
    }

    function checkEditable(){
        const getExistingOwner = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/courseEditable/${selectedCourse}`, {});
            const json = await response.json();
            if(response.ok){
                setExistingOutlineOwner(json[0].instructorMail);
            }
        }
        getExistingOwner();
    }

    function clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild)
        }
    }

    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const user = jwt_decode(token);
            console.log(user.name)
           // alert(user.email);
            setInstructorName(user.name);
             setInstructorMail(user.email);

            if (!user) {
                localStorage.removeItem("token");
                // window.location.href = '/login-page';
                //navigate("/login-page", { replace: true });
            } else {
                console.log("xx");
                populate();
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (existingInstructor && existingInstructor === instructorEmail) {
            outlinePreExisting = true;
        } 

        if(outlinePreExisting == true){
            alert("A course outline for the selected course already exists. Edit this outline instead.")
            window.location.href = '/inst-dashboard';
        }
        }, [existingInstructor, instructorEmail]);
    
    useEffect(() =>{
        if(existingOutlineOwner && existingOutlineOwner === instructorEmail){//this instructor created the orginal outline
            editableOutlineExists = 1;//they can edit it
        }
        else  if(existingOutlineOwner && existingOutlineOwner === "N/A"){//course outline does not exist
            editableOutlineExists = 2;//create it instead
        }      
        
        if(editableOutlineExists == 2){
            alert("A course outline for the selected course does not exist. Create an outline instead.");
            window.location.href = '/inst-dashboard';
        }
            // else if {
            //     alert("You do not have access to this outline. " + instructorEmail + " is the owner.");
            //     window.location.href = './inst-dashboard';
            // }
    }, [existingOutlineOwner, instructorEmail])


    function CreateOutline() {
        console.log("create")
        if (!selectedCourse) {
            alert("Please select a course!")
        } else {
            checkExisting();
            window.location.href = '/Form';
        }
    }

    function editOutline() {
        console.log("edit")
        if (!selectedCourse) {
            alert("Please select a course to edit!")
        } else {
            checkEditable();
            window.location.href = '/editoutline';
        }
    }

    function viewPrevOutlines() {
        console.log("prev")
        if (!selectedCourse) {
            alert("Please select a course!")
        } else {
            window.location.href = '/prevoutlines';
        }
    }

    function viewComments() {
        window.location.href = '/status';
    }

    var [pdfFile, setPdfFile] = useState(null);
    const [viewPdf, setViewPdf] = useState(null);
    const fileType = ['application/pdf']
    const pdf = "/Users/mariam/Desktop/University/Year 3/Y3S2/SE 3350/Project/se3350_groupproject-se3350-team-18/client/src/pages/SE3350_CourseOutlines_Winter2023.pdf";

    const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader;
                reader.readAsDataURL(selectedFile);
                reader.onload = (e) => {
                    setPdfFile(e.target.result)
                }
            } else {
                setPdfFile(null);
            }
        } else {
            console.log("select first")
        }
    }

    const pdfview = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
            console.log(pdfFile)
        } else {
            setViewPdf(null);
            console.log("NOPE")
        }
    }

    const newplugin = defaultLayoutPlugin();

    return (

        <div>
            <div className='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a className="active" href="#Home">Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
                <h4 id="inst-name">{instructorName}</h4>
                {/* <img id="profile-img" src={profile_img} alt="profile img" /> */}
            </div>
            <h1 id="user-title">WELCOME INSTRUCTOR!</h1>
            {/* <button class='populate-button' onClick={populate}> Load My Courses</button> */}
            <div id="functionalities">
                <div className="courses-dropdown">
                    <h2>Select your course:</h2>
                    {/* <p>Courses</p> */}
                    <select value={selectedCourse} id="courses"
                        onChange={(e) => setSelectedCourse(e.target.value)}>
                        <option value={"all"}>Courses you have been assigned</option>
                        {courses &&
                            courses.map((m) => {
                                sessionStorage.setItem('selectedCourse', selectedCourse)
                                return <option key={m.ID} value={m.courseCode}>{m.courseCode}</option>;
                            })}
                    </select>

                </div>

                <div id="top-buttons">
                    <button id="inst-buttons" onClick={editOutline}>Edit Course Outline</button>
                    <button id="inst-buttons" onClick={CreateOutline}>Create New Course Outline</button>
                </div>
                <div id="bottom-buttons">
                    <button id="inst-buttons" onClick={viewPrevOutlines}>View Previous Outlines</button>
                    <button id="inst-buttons" onClick={viewComments}>View Outline(s) Status</button>
                </div>

                {/* <form onSubmit={pdfview}>
                    <input type='file' className='form-control' onChange={handleChange} ></input>
                    <button type='submit'>Load PDF</button>
                </form> */}

                <div id="pdf-container">
                    <label id="latest-approved">Example of an Approved Course Outline:</label>
                    <embed src="SE3350_CourseOutlines_Winter2023.pdf" type="application/pdf" width="620" height="590" />
                    {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.3.122/build/pdf.worker.min.js">
                        {viewPdf && <>
                            <Viewer fileUrl={viewPdf} plugins={[newplugin]} />
                        </>}
                        {!viewPdf && <>No PDF</>}
                    </Worker> */}
                </div>
            </div>

            <div className='footer2'>
                <a href='#help'>Help & Support</a>
                <a href='https://www.uwo.ca/'>Western University</a>
                {/* <a href='#load' onClick={populate}>Load Courses</a> */}
            </div>

        </div>
    )
}

export default InstDashboard;