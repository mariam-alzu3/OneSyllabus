import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import os_logo from './OS-logo.png'


function Feedback() {
    const navigate = useNavigate();
    const selectedCourse = sessionStorage.getItem('selectedCourse');
    const [instructorID, setInstructorID] = useState("");
    const [time, setTime] = useState("");
    const [courseCode, setCourseCode] = useState(selectedCourse);
    const [fields, setFields] = useState('');
    const [courseYear, setCourseYear] = useState('2022-23');
    const [department, setDept] = useState('');
    const [termLength, setTermLength] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [office, setOffice] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [email, setEmail] = useState('');//from course outline database
    const [officeHours, setConsultHours] = useState();
    const [textbook, setTextbook] = useState('');
    const [otherResources, setOtherResources] = useState('');
    const [recommended, setrecommended] = useState('');
    const [homework, setHomework] = useState('');
    const [quizzes, setQuizzes] = useState('');
    const [labs, setLabs] = useState('');
    const [midterm, setMidterm] = useState('');
    const [final, setFinal] = useState('');
    const [labHours, setLabHours] = useState();
    const [TutorialHours, setTutHours] = useState();
    const [lectureHours, setLectureHours] = useState();
    const [homeworkDescription, setHomeworkDescription] = useState('');
    const [quizzesDescription, setQuizzesDescription] = useState('');
    const [LabDesc, setLabDesc] = useState('');
    const [MidtermDesc, setMidtermDesc] = useState('');
    const [FinalDesc, setFinalDescription] = useState('');
    const [LateSubmissionPolicy, setLateSubmissionPolicy] = useState('');
    const [Locker, setLocker] = useState('');
    const [ElecDevices, setElecDevices] = useState('');
    const [Clicker, setClicker] = useState('');
    const [gaIndicators, setGaIndicators] = useState('');
    const [topics, setTopics] = useState('');
    const [topicsText, setTopicsText] = useState('');
    const [gaJustification, setGaJustification] = useState('');
    const [GA1, setGa1] = useState('');
    const [GA2, setGa2] = useState('');
    const [GA3, setGa3] = useState('');
    const [GA4, setGa4] = useState('');
    const [GA5, setGa5] = useState('');
    const [GA6, setGa6] = useState('');
    const [GA7, setGa7] = useState('');
    const [GA8, setGa8] = useState('');
    const [GA9, setGa9] = useState('');
    const [GA10, setGa10] = useState('');
    const [GA11, setGa11] = useState('');
    const [GA12, setGa12] = useState('');
    const [comment, setComment] = useState('');
    const [QuizzesDesc, setQuizzesDesc] = useState('');
    const [academicCalendarCopy, setAcademicCalendarCopy] = useState('');
    const [academicUnitsEngDes, setAcademicUnitsEngDes] = useState('');
    const [academicUnitsEngSci, setAcademicUnitsEngSci] = useState('');
    const [instructorEmail, setInstructorMail] = useState("");

    const [staticGA1, setStaticGa1] = useState('');
    const [staticGA2, setStaticGa2] = useState('');
    const [staticGA3, setStaticGa3] = useState('');
    const [staticGA4, setStaticGa4] = useState('');
    const [staticGA5, setStaticGa5] = useState('');
    const [staticGA6, setStaticGa6] = useState('');
    const [staticGA7, setStaticGa7] = useState('');
    const [staticGA8, setStaticGa8] = useState('');
    const [staticGA9, setStaticGa9] = useState('');
    const [staticGA10, setStaticGa10] = useState('');
    const [staticGA11, setStaticGa11] = useState('');
    const [staticGA12, setStaticGa12] = useState('');
    const [flag, setFlag] = useState('');


    const reviewCourse = sessionStorage.getItem('reviewCourse');
    const reviewYear = sessionStorage.getItem('reviewYear');
    const reviewInstructor = sessionStorage.getItem('reviewInstructor');

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
                setInstructorID(user.email)
                getLastUpdate();
                populateFields();
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);

    function populateFields() {
        const getFields = async () => {
            // const response = await fetch(`http://localhost:3000/editcourseoutline/2019/${selectedCourse}`, {
            const response = await fetch(process.env.REACT_APP_API + `/courseOutline/${reviewCourse}/${reviewYear}/${reviewInstructor}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            if (response.ok) {
                setCourseYear((json[0].courseYear));
                setCourseCode((json[0].courseCode));
                setPhone((json[0].phoneNumber));
                setDept((json[0].department));
                setTermLength(json[0].termLength);
                setDescription(json[0].description);
                setName(json[0].instructorName);
                setOffice(json[0].office);
                setEmail(json[0].instructorMail);
                setConsultHours(json[0].consultHours);
                setTextbook(json[0].textbook);
                setOtherResources(json[0].otherResources);
                setrecommended(json[0].recommended);
                setHomework(json[0].homework);
                setQuizzes(json[0].quizzes);
                setLabs(json[0].labs);
                setMidterm(json[0].midterm);
                setFinal(json[0].final);
                setLabHours(json[0].labHours);
                setTutHours(json[0].TutorialHours);
                setLectureHours(json[0].LectureHours);
                setHomeworkDescription(json[0].homeworkDescription);
                setQuizzesDescription(json[0].QuizzesDesc);
                setLabDesc(json[0].LabDesc);
                setMidtermDesc(json[0].MidtermDesc);
                setLateSubmissionPolicy(json[0].LateSubmissionPolicy);
                setLocker(json[0].Locker);
                setElecDevices(json[0].ElecDevices);
                setClicker(json[0].Clicker);
                setFields(json[0]);

                setGaIndicators(json[0].topicsGAIndicators);
                setTopics(json[0].topics);
                setTopicsText(json[0].topicsText);
                setGaJustification(json[0].gaJustification);
                setGa1(json[0].GA1);
                setGa2(json[0].GA2);
                setGa3(json[0].GA3);
                setGa4(json[0].GA4);
                setGa5(json[0].GA5);
                setGa6(json[0].GA6);
                setGa7(json[0].GA7);
                setGa8(json[0].GA8);
                setGa9(json[0].GA9);
                setGa10(json[0].GA10);
                setGa11(json[0].GA11);
                setGa12(json[0].GA12);
                setStaticGa1(json[0].GA1);
                setStaticGa2(json[0].GA2);
                setStaticGa3(json[0].GA3);
                setStaticGa4(json[0].GA4);
                setStaticGa5(json[0].GA5);
                setStaticGa6(json[0].GA6);
                setStaticGa7(json[0].GA7);
                setStaticGa8(json[0].GA8);
                setStaticGa9(json[0].GA9);
                setStaticGa10(json[0].GA10);
                setStaticGa11(json[0].GA11);
                setStaticGa12(json[0].GA12);
                setAcademicCalendarCopy(json[0].setAcademicCalendarCopy);
                setAcademicUnitsEngDes(json[0].setAcademicUnitsEngDes);
                setAcademicUnitsEngSci(json[0].setAcademicUnitsEngSci);
            }
        };
        getFields();
    }

    function updateFlag() {
        fetch(process.env.REACT_APP_API + `/editFlag/2022-23/${courseCode}/${flag}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((result) => {
            result.json().then((resp) => {
                //alert(JSON.stringify(resp));
            })
        })
    }

    function saveEdits() {
        if (!comment) {
            alert("Please add feedback!");
        } else if (!flag) {
            alert("Please approve or deny the outline!")
        } else {
            historyPost();
            updateFlag();
        }
    }

    const historyPost = () => {
        Axios.post(process.env.REACT_APP_API + "/edithistory", {
            mail: instructorID,
            courseCode: selectedCourse,
            comment: comment,
            year: '2022-23',
            flag: 1,

        }).then((response) => {
            alert("Successfully added feedback!")
        }).catch(err => alert(err))
    }


    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    function home() {
        console.log("home")
        window.location.href = '/dc-dashboard';
    }

    function getLastUpdate() {
        const getTime = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/timestamps/${selectedCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                }
            });
            const json = await response.json();
            if (response.ok) {
                setInstructorID(json[0].email)

                console.log(json[0].editTime)

                const utcDate = new Date(json[0].editTime);
                const estOptions = { timeZone: 'America/New_York', hour12: false };
                const estDateString = utcDate.toLocaleString('en-US', estOptions);

                setTime(estDateString.substring(0, 16));
            }

        };
        getTime();
    }

    return (

        <div id="form-div">
            <div className='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a className="active" href="#Home" onClick={home}>Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
                <button id="update-button" onClick={saveEdits}>Save</button>
            </div>

            <div id="course-outline-form">
                <h1 id="title">Reviewing Course Outlines!</h1>
                <h3 id="edit-course-label">You're reviewing {selectedCourse}'s current course outline!</h3>
                {/* <h4>Last updated on {time} by {instructorID.split("@").shift()}!</h4> */}

                <label id="course-code">Course Code: <b>{selectedCourse}</b> </label>

                <br />

                <label id="course-year">Course Year: <b>{courseYear}</b> </label>

                <br />

                <label id="department">Department: <b>{department}</b></label>

                <br />

                <label id="termLength">Term Length: </label>
                <input
                    type="text"
                    defaultValue={termLength}
                    readOnly
                />

                <br />

                <label id="description">Course Description: </label>
                <input
                    type="text"
                    defaultValue={description}
                    readOnly
                />

                <br />

                <label id="name">Instructor Name: </label>
                <input
                    type="text"
                    defaultValue={name}
                    readOnly
                />

                <br />

                <label id="office">Office Number: </label>
                <input
                    type="text"
                    defaultValue={office}
                    readOnly
                />

                <br />

                <label id="phone">Phone Number: </label>
                <input
                    type="text"
                    defaultValue={phoneNumber}
                    readOnly
                />

                <br />

                <label id="email">Instructor Email: </label>
                <input
                    type="text"
                    defaultValue={email}
                    readOnly
                />

                <br />

                <label id="consultHours">Consult Hours: </label>
                <input
                    type="text"
                    defaultValue={officeHours}
                    readOnly
                />

                <br />

                <label id="academicCalendar">Academic Calendar Copy</label>
                <input
                    type="text"
                    defaultValue={academicCalendarCopy}
                    readOnly
                />

                <br />

                <label id="lectureHours">Lecture Hours:</label>
                <input
                    type="text"
                    defaultValue={lectureHours}
                    readOnly
                />

                <br />

                <label id="labHours">Lab Hours:</label>
                <input
                    type="text"
                    defaultValue={labHours}
                    readOnly
                />

                <br />

                <label id="tutHours">Tutorial Hours:</label>
                <input
                    type="text"
                    defaultValue={TutorialHours}
                    readOnly
                />

                <br />

                <label id="CEABEngSci">CEAB Academic Units Engineering Sciences:</label>
                <input
                    type="text"
                    defaultValue={academicUnitsEngSci}
                    readOnly
                />

                <br />

                <label id="CEABEngDes">CEAB Academic Units Engineering Design:</label>
                <input
                    type="text"
                    defaultValue={academicUnitsEngDes}
                    readOnly
                />

                <br />

                <label id="textbook">Required Textbook:</label>
                <input
                    type="text"
                    defaultValue={textbook}
                    readOnly
                />

                <br />

                <label id="otherResources">Other Required References:</label>
                <input
                    type="text"
                    defaultValue={otherResources}
                    readOnly
                />

                <br />

                <label id="recommendedReferences">Recommended References:</label>
                <input
                    type="text"
                    defaultValue={recommended}
                    readOnly
                />

                <br />

                <table>
                    {/* GA1 */}
                    <tr className="radio">
                        <td><label>Knowledge Base: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA1}</b> </label>
                        </td>
                    </tr>

                    {/* GA2 */}
                    <tr className="radio">
                        <td><label>Use of Engineering Tools: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA2}</b> </label>
                        </td>
                    </tr>

                    {/* GA3 */}
                    <tr className="radio">
                        <td><label>Impact on Society and the Environment: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA3}</b> </label>
                        </td>
                    </tr>

                    {/* GA4 */}
                    <tr className="radio">
                        <td><label>Problem Analysis: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA4}</b> </label>
                        </td>
                    </tr>

                    {/* GA5 */}
                    <tr className="radio">
                        <td><label>Individual and Team Work: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA5}</b> </label>
                        </td>
                    </tr>

                    {/* GA6 */}
                    <tr className="radio">
                        <td><label>Ethics and Equity: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA6}</b> </label>
                        </td>
                    </tr>

                    {/* GA7 */}
                    <tr className="radio">
                        <td><label>Investigation: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA7}</b> </label>
                        </td>
                    </tr>

                    {/* GA8 */}
                    <tr className="radio">
                        <td><label>Communication Skills: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA8}</b> </label>
                        </td>
                    </tr>

                    {/* GA9 */}
                    <tr className="radio">
                        <td><label>Economics and Project Management: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA9}</b> </label>
                        </td>
                    </tr>

                    {/* GA10 */}
                    <tr className="radio">
                        <td><label>Design: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA10}</b> </label>
                        </td>
                    </tr>

                    {/* GA11 */}
                    <tr className="radio">
                        <td><label>Professionalism &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA11}</b> </label>
                        </td>
                    </tr>

                    {/* GA12 */}
                    <tr className="radio">
                        <td> <label>Life-long Learning: &nbsp;</label></td>
                        <td>
                            <label>&nbsp;&nbsp; Selected: <b>{staticGA12}</b> </label>
                        </td>
                    </tr>
                </table>

                <br></br>
                <br></br>

                <div id="GaLabelDiv">

                    <header className="Ga-header">
                        <label className='labelSpace'> Course Topics: </label>
                        <label>GA Indicators: <br></br>(select many GA indicators from the list by pressing ctrl on windows or command on mac)</label>
                    </header>
                </div>

                <div id="GaDiv">
                    <textarea className='textSpace' id='Topics' rows="10" value={topicsText} readOnly />
                    <textarea readOnly value={gaIndicators} className='textSpace' id='GaIndicators' rows="10" />
                </div>
                <br />

                <label id="GA Justification">GA Assessment:</label>
                <input
                    type="text"
                    defaultValue={gaJustification}
                    readOnly
                />
                <br />

                <label id="homework">Homework Weighting: </label>
                <input
                    type="text"
                    defaultValue={homework}
                    readOnly
                />

                <br />

                <label id="quizzes">Quiz Weighting:</label>
                <input
                    type="text"
                    defaultValue={quizzes}
                    readOnly
                />

                <br />

                <label id="labs">Lab Weighting:</label>
                <input
                    type="text"
                    defaultValue={labs}
                    readOnly
                />

                <br />

                <label id="midterm">Midterm Weighting:</label>
                <input
                    type="text"
                    defaultValue={midterm}
                    readOnly
                />

                <br />

                <label id="final">Final Weighting:</label>
                <input
                    type="text"
                    defaultValue={final}
                    readOnly
                />

                <br />

                <label id="homeworkDescription">Homework Description:</label>
                <input
                    type="text"
                    defaultValue={homeworkDescription}
                    readOnly
                />

                <br />

                <label id="quizzesDescription">Quizzes Description:</label>
                <input
                    type="text"
                    defaultValue={QuizzesDesc}
                    readOnly
                />

                <br />

                <label id="LabDesc">Labs Description:</label>
                <input
                    type="text"
                    defaultValue={LabDesc}
                    readOnly
                />

                <br />

                <label id="MidtermDesc">Midterm Description:</label>
                <input
                    type="text"
                    defaultValue={MidtermDesc}
                    readOnly
                />

                <br />

                <label id="finalDescription">Final Description:</label>
                <input
                    type="text"
                    defaultValue={FinalDesc}
                    readOnly
                />

                <br />

                <label id="LateSubmissionPolicy">Late Submisison Policy:</label>
                <input
                    type="text"
                    defaultValue={LateSubmissionPolicy}
                    readOnly
                />

                <br />

                <label id="Locker">Assignment Submission Locker:</label>
                <input
                    type="text"
                    defaultValue={Locker}
                    readOnly
                />

                <br />

                <label id="ElecDevices">Electronic Use Description:</label>
                <input
                    type="text"
                    defaultValue={ElecDevices}
                    readOnly
                />

                <br />

                <label id="Clicker">Clicker Use:</label>
                <input
                    type="text"
                    defaultValue={Clicker}
                    readOnly
                />

                <br />



                <br />

                <label id="justification-label">Approve or deny the outline and add your commencts below then click save: &nbsp; &nbsp;
                    <label>
                        <input
                            type="radio"
                            value="A"
                            name='flag'
                            onChange={(e) => { setFlag(e.target.value) }}
                        />
                        Approved &nbsp;&nbsp;
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="R"
                            name='flag'
                            onChange={(e) => { setFlag(e.target.value) }}
                        />
                        Not Approved &nbsp;&nbsp;
                    </label>
                </label>
                <br></br>
                <textarea
                    rows="15" cols="107"
                    placeholder='Add your comments here...'
                    id='newComment'
                    onChange={(e) => { setComment(e.target.value) }}
                >
                </textarea>
            </div>
        </div>
    )
}

export default Feedback;