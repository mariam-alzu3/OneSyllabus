import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import os_logo from './OS-logo.png'

function ReviewerStatus() {

    const [outlines, setOutlineDetails] = useState("");
    const [instructorEmail, setInstructorMail] = useState("");

    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    function populate() {
        const getOutlines = async () => {
            //alert(instructorEmail);
          const response = await fetch(process.env.REACT_APP_API + `/outlines`, {});
          const json = await response.json();
          if (response.ok) {
            setOutlineDetails(json);
          }
        };
        getOutlines();
        // alert(outlines);
      }

      //populate();
    const navigate = useNavigate();

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
                console.log("xxxxx")
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);

    populate();
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

            <div class='status-table'>
                <h3>All Course Outlines</h3>
                <button onClick={populate}>Update</button>
                <div className="editHistoryTable">
            <table id="status-table">
              <tr>
                <th>Year</th><th>Course Code</th><th>Term</th><th>Status</th> <th>Update Time</th></tr>
              <td>
                {outlines &&
                  outlines.map((m) => {
                    return <tr value={m.courseYear} id="courseYear">{m.courseYear}</tr>;
                  })}
              </td>

              <td>
                {outlines &&
                  outlines.map((m) => {
                    return <tr value={m.courseCode} id="courseCode">{m.courseCode}</tr>;
                  })}
              </td>

            <td>
                {outlines &&
                  outlines.map((m) => {
                    return <tr value={m.termLength} id="term">{m.termLength}</tr>;
                  })}
              </td>
              <td>
                {outlines &&
                  outlines.map((m) => {
                    return <tr value={m.status_string } id="status">{m.status_string }</tr>;
                  })}
              </td>
              <td>
                {outlines &&
                  outlines.map((m) => {
                    const utcDate = new Date(m.edit_date);
                    const estOptions = { timeZone: 'America/New_York', hour12: false };
                    const estDateString = utcDate.toLocaleString('en-US', estOptions);
                    estDateString.substring(0, 16)
                    return <tr value={estDateString } id="editTime">{estDateString}</tr>;
                  })}
              </td>
            </table>
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

export default ReviewerStatus;