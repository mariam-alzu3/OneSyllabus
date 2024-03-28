import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import os_logo from './OS-logo.png'


function PrevOutlines() {

    const navigate = useNavigate();
    const prevCourse = sessionStorage.getItem('selectedCourse');
    const [prevOutlines, setPrevOutlines] = useState("");
    const [preReq, setPreReq] = useState("");
    const [AntiReq, setAntiReq] = useState("");

    function populate() {
        const getPrevOutlines = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/prevOutlines/${prevCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },

            });
            const json = await response.json();
            if (response.ok) {
                setPrevOutlines(json);
                console.log(prevOutlines)
            }

        };
        // console.log("selected "+ selectedCourse)
        getPrevOutlines();
    }

    //get pre req pdf links
    function populatePreReq() {
        const getPreReq = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/prereqlinks/${prevCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },

            });
            const json = await response.json();
            if (response.ok) {
                setPreReq(json);
                console.log(preReq)
            }

        };
        // console.log("selected "+ selectedCourse)
        getPreReq();
    }

    //get anti req pdf links
    function populateAntiReq() {
        const getAntiReq = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/antireqlinks/${prevCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },

            });
            const json = await response.json();
            if (response.ok) {
                setAntiReq(json);
            }

        };
        // console.log("selected "+ selectedCourse)
        getAntiReq();
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const user = jwt_decode(token);
            console.log(user.name)
            if (!user) {
                localStorage.removeItem("token");
                // window.location.href = '/login-page';
                //navigate("/login-page", { replace: true });
            } else {
                populate();
                populatePreReq();
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);



    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    function home() {
        console.log("home")
        window.location.href = '/inst-dashboard';
    }

    return (

        <div>
            <div class='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a class="active" href="#Home" onClick={home}>Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
            </div>

            <h1 id="prev-title">Previous Outlines!</h1>
            <div id="links-container">
                <h3 id="prev-course">You're viewing {prevCourse}'s Previous Outlines!</h3>

                <div value={prevOutlines} id="prev-outlines">
                    {prevOutlines &&
                        prevOutlines.map((m) => {
                            return (
                                <div key={m.link}>
                                    <a href={m.link} target="_blank">{m.courseCode} {m.courseYear} </a>
                                    <br />
                                </div>
                            )
                        })}
                </div>

                <h4 id="prev-course">{prevCourse}'s pre-req Outlines!</h4>
                <div value={preReq} id="prev-outlines">
                    {preReq &&
                        preReq.map((l) => {
                            return (
                                <div key={l.link}>
                                    <a href={l.link} target="_blank">{l.preCode} {l.courseCode} </a>
                                    <br />
                                </div>
                            )
                        })}
                </div>

                <h4 id="prev-course">{prevCourse}'s anti-req previous outlines!</h4>
                <div value={AntiReq} id="prev-outlines">
                    {AntiReq &&
                        AntiReq.map((l) => {
                            return (
                                <div key={l.link}>
                                    <a href={l.link} target="_blank">{l.preCode} {l.courseCode} </a>
                                    <br />
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default PrevOutlines;