import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import os_logo from './OS-logo.png'

function Status() {

    const [outlines, setOutlineDetails] = useState("");
    const [instructorEmail, setInstructorMail] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    const [reviewerFeedback, setReviewerFeedback] = useState("");

    //stored variables to be sent to populate the template fields
    //sessionStorage.setItem('selectedCourse', selectedCourse)

    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    function populate() {
        const getOutlines = async () => {
          let instructorId = instructorEmail.split('@')[0];
          const response = await fetch(process.env.REACT_APP_API + `/outlinesStatus/${instructorId}`, {});
          const json = await response.json();
          if (response.ok) {
            setOutlineDetails(json);
          }
        };
        getOutlines();
         //alert(outlines);
      }
      //populate();
    const navigate = useNavigate();

    function populateFeedback(course, year, instructor){
      const getFeedback = async () => {
        const response = await fetch(process.env.REACT_APP_API + `/reviewerFeedback/${course}/${year}`)
        const json = await response.json();
        if (response.ok) {
          setReviewerFeedback(json[0]);
        }
      };
      getFeedback();
      if(reviewerFeedback.newComment){
        alert(`"${reviewerFeedback.newComment}" - ${reviewerFeedback.email}`);
      }
      }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const user = jwt_decode(token);
            setInstructorMail(user.email);//of logged in user
            console.log(user.name)
            if (!user) {
                localStorage.removeItem("token");
            } else {
                populate();
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);

    function home() {
        console.log("home")
        window.location.href = '/inst-dashboard';
    }

    function template(course, year) {
      console.log("template");
      setSelectedCourse(course);
      setSelectedYear(year);
      // alert(course + " " + year);

      sessionStorage.setItem('printCourse', course)
      sessionStorage.setItem('printYear', year)
//      console.log(course + " - " + year);
        window.location.href = `/template`; // redirect the user to the template page
      
    }
    

    return (

        <div>
            <div class='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a class="active" href="#Home" onClick={home}>Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
            </div>

            <div class='status-table'>
                <h3>Your Course Outlines</h3>
                {/* <button onClick={populate}>Update</button> */}
                <div className="editHistoryTable">
   
                <div className="editHistoryTable">
  <table id="status-table">
    <thead>
      <tr>
        <th>Year</th>
        <th>Course Code</th>
        <th>Term</th>
        <th>Status</th>
        <th>Update Time</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {outlines &&
        outlines.map((m) => (
          <tr key={m.editTime}>
            <td>{m.courseYear}</td>
            <td>{m.courseCode}</td>
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
              {m.status_string === "Approved" ? (
                <button className="print-button" onClick={() => template(m.courseCode, m.courseYear)}>
                  Print
                </button>
              ) : (
                <button className="print-button" disabled>
                  Print
                </button>
              )}
            </td>
            <td>
            {m.status_string != "Pending Review"? (
                <button className="review-button" onClick={() => populateFeedback(m.courseCode, m.courseYear, instructorEmail)}>
                  Review Feedback
                </button>
              ) : (
                <button className="review-button" disabled>
                  Review Feedback
                </button>
              )}
            </td>
          </tr>
        ))}
    </tbody>
    </table>
    </div>
          </div>
        </div>
           
            {/* <h1 id="title">WELCOME Program Dir.!</h1> */}
            <button id="logout" onClick={logout}>Logout</button>

            

            <div className='footer'>
                <a href='#help'>Help & Support</a>
                <a href='https://www.uwo.ca/'>Western University</a>
                {/* <a href='#load' onClick={populate}>Load Courses</a> */}
            </div>
        </div>


    )
}

export default Status;