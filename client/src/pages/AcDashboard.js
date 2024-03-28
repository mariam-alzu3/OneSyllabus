import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import os_logo from './OS-logo.png'



function AcDashboard() {

    const navigate = useNavigate();
    const [courses, setCourses] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [outlines, setOutlines] = useState("");

    const [reviewCourse, setReviewCourse] = useState("");
    const [reviewYear, setReviewYear] = useState("");
    const [reviewInstructor, setReviewInstructor] = useState("");

    function populate() {
      const getCourses = async () => {
          const response = await fetch(process.env.REACT_APP_API+"/course", {
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

  function template(course, year, instructor) {
    console.log("feedback1");
    setReviewCourse(course);
    setReviewYear(year);
    setReviewInstructor(instructor);

    sessionStorage.setItem('reviewCourse', course)
    sessionStorage.setItem('reviewYear', year)
    sessionStorage.setItem('reviewInstructor', instructor)
//      console.log(course + " - " + year);
    window.location.href = '/feedback3'; // redirect the user to the template page
    
  }

  function populateOutlines() {
    const getOutlines = async () => {
      const response = await fetch(process.env.REACT_APP_API + `/outlinesStatus`, {});
      const json = await response.json();
      if (response.ok) {
        setOutlines(json);
      }
    };
    getOutlines();
    // alert(outlines);
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
                console.log("xx");
                populate();
                populateOutlines();
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
    
    // function feedback() {
    //     console.log("feedback")
    //     if (!selectedCourse) {
    //         alert("Please select a course!")
    //     } else {
    //         window.location.href = '/feedback3';
    //     }
    // }

    return (

        <div>
            <div class='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a class="active" href="#Home">Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
            </div>
            <h1 id="user-title">WELCOME Associate Chair!</h1>

            
            <table id="status-table">
    <thead>
      <tr>
        <th>Year</th>
        <th>Course Code</th>
        <th>Instructor</th>
        <th>Term</th>
        <th>Status</th>
        <th>Update Time</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {outlines &&
        outlines.map((m) => (
          <tr key={m.editTime}>
            <td>{m.courseYear}</td>
            <td>{m.courseCode}</td>
            <td>{m.instructorMail}</td>
            <td>{m.termLength}</td>
            <td>{m.status_string}</td>
            <td>
              {m.editTime &&
                new Date(m.editTime).toLocaleString("en-US", {
                  timeZone: "America/New_York",
                  hour12: false,
                })}
            </td>
            <td>
              {m.status_string === "Pending Review" ? (
                <button className="print-button" onClick={() => template(m.courseCode, m.courseYear, m.instructorMail)}>
                  Review
                </button>
              ) : (
                <button className="print-button" disabled>
                  Review
                </button>
              )}
            </td>
          </tr>
        ))}
    </tbody>
    </table>

            <div id="functionalities">
           {/*      <div className="courses-dropdown">
                    <h2>Select your course:</h2>
                   
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
                    <button id="inst-buttons" onClick={feedback}>Feedback</button>
                </div>   */}             
            </div> 

            <div className='footer'>
                <a href='#help'>Help & Support</a>
                <a href='https://www.uwo.ca/'>Western University</a>
                {/* <a href='#load' onClick={populate}>Load Courses</a> */}
            </div>
        </div>
    )
}

export default AcDashboard;