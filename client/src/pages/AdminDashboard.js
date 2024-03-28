import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import os_logo from './OS-logo.png'


function AdminDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState("");
  const [instructors, setInstructors] = useState("");
  const [access, setAccess] = useState("");
  const [newAccess, setNewAccess] = useState("");
  const [selectI, setSelectI] = useState("");
  const [selectC, setSelectC] = useState("");
  const [edits, setEdits] = useState("");

  function populateAssignPopup() {
    const getCourses = async () => {
      const response = await fetch(process.env.REACT_APP_API + "/course", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (response.ok) {
        setCourses(json);
      }
    };
    getCourses();
    populateViewPopup();
  }

  function populateViewPopup() {
    const getInstructors = async () => {
      const response = await fetch(process.env.REACT_APP_API + "/instructor", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (response.ok) {
        setInstructors(json);
      }
    };
    getInstructors();
  }

  function viewCurrentAccess() {
    const getAccess = async () => {
      const response = await fetch(process.env.REACT_APP_API + "/instructorAccess", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      if (response.ok) {
        setAccess(json);
      }
    };
    getAccess();
  }


  const accessPost = () => {
    //alert('Access Added');
    Axios.post(process.env.REACT_APP_API + "/instructorAccessP", {
      email: selectI,
      courseCode: selectC,
    }).then((response) => {
      if (response.data.errno) {
        alert("This action cannot be done. Check if the instrcutor already has access to the selected course")
      }
      else {
        alert("Access has been added")
      }
    }).catch(err => alert(err))
  }


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const user = jwt_decode(token);

      console.log(user.name);
      if (!user) {
        localStorage.removeItem("token");
        // window.location.href = '/login-page';
        //navigate("/login-page", { replace: true });
      } else {
        console.log("xx");
        populateViewPopup();
        populateAssignPopup();
        getHistory();
        viewCurrentAccess();
      }
    } else {
      navigate("/login-page", { replace: true }); //if no token (no user), user can't access dashboard
    }
    // eslint-disable-next-line
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  function getHistory() {
    const getEdits = async () => {
        const response = await fetch(process.env.REACT_APP_API + `/editHistory`, {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            }
        });
        const json = await response.json();
        if (response.ok) {
            console.log(json[0].editTime)
            setEdits(json)
        }

    };
    // console.log("selected "+ selectedCourse)
    getEdits();
}

  return (
    <div>
      <div className="topnav">
        <img id="os-logo" src={os_logo} alt="react logo" />
        <h1 id="website-name">OneSyllabus</h1>
        <a href="#logout" onClick={logout}>
          Logout
        </a>
      </div>
      <h1 id="user-title">WELCOME Admin!</h1>

      <div className="access">
        <div id="left">
          <h3>Assign an instructor to a course:</h3>


          <div className="instructor-dropdown">
            <h4>Select your course:</h4>
            <select id="courses" onChange={e => setSelectC(e.target.value)}>
              <option value={"all"}>All</option>
              {courses &&
                courses.map((m) => {
                  return <option value={m.courseCode} >{m.courseCode}</option>;
                })}
            </select>
          </div>

          <div className="instructor-dropdown">
            <h4>Select your instructor:</h4>
            <select id="instructors" onChange={e => setSelectI(e.target.value)}>
              <option value={"all"}>All</option>
              {instructors &&
                instructors.map((m) => {
                  return <option value={m.email}>{m.email}, {m.name}</option>;
                })}
            </select>
          </div>

          <h4>Now adding {selectI} to the course {selectC}</h4>
          <button onClick={accessPost}>Save</button>

        </div>
        <div id="right">
          <h3>View the current instructor access:</h3>
          <button onClick={viewCurrentAccess}>Refresh</button>
          <div className="view-instructors-popup">
            <table id="instructors-table">
              <tr>
                <th>Instructor Email</th><th>Course Code</th></tr>
              <td>
                {access &&
                  access.map((m) => {
                    return <tr value={m.email} id="email">{m.email}</tr>;
                  })}
              </td>

              <td>
                {access &&
                  access.map((m) => {
                    return <tr value={m.email} id="course">{m.courseCode}</tr>;
                  })}
              </td>

            </table>
          </div>
        </div>

        <div id="edit">
          <h3>View all edit history</h3>
          <div className="editHistoryTable">
            <table id="history-table">
   
                <tr>
                  <th>Instructor Email</th>
                  <th>Course Code</th>
                  <th id="time-col">Time</th>
                  <th>Comment</th>
                </tr>
              
              <td>
                {edits &&
                  edits.map((m) => {
                    return <tr value={m.email} id="email">{m.email}</tr>;
                  })}
              </td>

              <td>
                {edits &&
                  edits.map((m) => {
                    return <tr value={m.email} id="course">{m.courseCode}</tr>;
                  })}
              </td>

              <td>
                {edits &&
                  edits.map((m) => {
                    const utcDate = new Date(m.editTime);
                    const estOptions = { timeZone: 'America/New_York', hour12: false };
                    const estDateString = utcDate.toLocaleString('en-US', estOptions);
                    estDateString.substring(0, 16)


                    return <tr value={estDateString} id="course">{estDateString}</tr>;
                  })}
              </td>

            <td>
                {edits &&
                  edits.map((m) => {
                    return <tr value={m.newComment} id="courseComment">{m.newComment}</tr>;
                  })}
              </td>

             
            </table>
          </div>
        </div>

        <div className='footer2'>
          <a href='#help'>Help & Support</a>
          <a href='https://www.uwo.ca/'>Western University</a>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
