import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import os_logo from './OS-logo.png'


function EditOutline() {

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

    const [gaOptions, setGaOptions] = useState('');
    const [selectedGa, setSelectedGa] = useState([]);

    function handleSelectChange(event) {
        const selectedOptions = event.target.selectedOptions;
        const selectedGa = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedGa(selectedGa);
        setGaIndicators(selectedGa.join(', '));
    }



    useEffect(() => {
        setGaIndicators(selectedGa.join(', '));
    }, [selectedGa]);

    function populateGaOptions() {
        const getGaOptions = async () => {
            const response = await fetch(process.env.REACT_APP_API + "/gaindicator", {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            if (response.ok) {
                setGaOptions(json);
            }
        };
        getGaOptions();
    }


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const user = jwt_decode(token);
            console.log(user.name)
            setInstructorMail(user.email);//of logged in user
            if (!user) {
                localStorage.removeItem("token");
                // window.location.href = '/login-page';
                //navigate("/login-page", { replace: true });
            } else {
                setInstructorID(user.email)
                getLastUpdate();
                populateFields();
                populateGaOptions();
            }
        } else {
            navigate("/login-page", { replace: true });     //if no token (no user), user can't access dashboard
        }
        // eslint-disable-next-line
    }, []);

    function populateFields() {
        const getFields = async () => {
            // const response = await fetch(`http://localhost:3000/editcourseoutline/2019/${selectedCourse}`, {
            const response = await fetch(process.env.REACT_APP_API + `/courseOutline/${selectedCourse}/${courseYear}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            if (response.ok) {
                // alert((json[0].courseYear))
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
                setHomeworkDescription(json[0].HomeworkDesc);
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
                setAcademicCalendarCopy(json[0].academicCalendarCopy);
                setAcademicUnitsEngDes(json[0].academicUnitsEngDes);
                setAcademicUnitsEngSci(json[0].academicUnitsEngSci);
            }
        };
        getFields();
    }

    // set default values for the ga indictaors


    function updateOutline() {
        let item = {
            name,
            department,
            termLength,
            phoneNumber,
            description,
            officeHours,
            office,
            textbook,
            otherResources,
            recommended,
            homework,
            quizzes,
            labs,
            midterm,
            final,
            GA1,
            GA2,
            GA3,
            GA4,
            GA5,
            GA6,
            GA7,
            GA8,
            GA9,
            GA10,
            GA11,
            GA12,
            topicsText,
            topics,
            labHours,
            TutorialHours,
            homeworkDescription,
            quizzesDescription,
            LabDesc,
            MidtermDesc,
            FinalDesc,
            LateSubmissionPolicy,
            Locker,
            ElecDevices,
            Clicker,
            lectureHours,
            QuizzesDesc,
            gaJustification,
            academicCalendarCopy,
            academicUnitsEngSci,
            academicUnitsEngDes,
            gaIndicators,

        }
        console.log(JSON.stringify(item) + " oo " + `${courseYear}/${courseCode}/${instructorID.split('@')[0]}`)

        fetch(process.env.REACT_APP_API + `/editcourseoutline/2022-23/${courseCode}/${instructorID.split('@')[0]}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                //alert(JSON.stringify(resp));
            })
        })
    }

    function saveEdits() {
        if (!comment) {
            alert("Please add justification for your changes!");
        } else {
            if (email == instructorEmail) {
                historyPost();
                updateOutline();
            }
            else {
                alert(email + " is the owner of this outline. You are not permitted to edit this outline.");
            }

        }
    }

    const historyPost = () => {
        Axios.post(process.env.REACT_APP_API + "/edithistory", {
            mail: instructorID,
            courseCode: selectedCourse,
            comment: comment,
            year: '2022-23',
            flag: 0,

        }).then((response) => {
            // if (response.data.errno) {
            //   alert("Please enter a valid comment")
            // }
            // else {
            alert("Course outline successfully updated")
            // }
        }).catch(err => alert(err))
    }


    function logout() {
        localStorage.removeItem("token");
        window.location.href = '/';
    }

    function home() {
        console.log("home")
        window.location.href = '/inst-dashboard';
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
                // alert(instructorID);

                // console.log(json[0].editTime)
                // setTimeout(() =>{console.log(json[0])}, 5000)

                const utcDate = new Date(json[0].editTime);
                const estOptions = { timeZone: 'America/New_York', hour12: false };
                const estDateString = utcDate.toLocaleString('en-US', estOptions);

                //console.log(estDateString.substring(0, 16)); 


                setTime(estDateString.substring(0, 16));
            }

        };
        // console.log("selected "+ selectedCourse)
        getTime();
    }

    return (

        <div id="form-div">
            <div className='topnav'>
                <img id="os-logo" src={os_logo} alt="react logo" />
                <h1 id="website-name">OneSyllabus</h1>
                <a className="active" href="#Home" onClick={home}>Home</a>
                <a href='#logout' onClick={logout}>Logout</a>
                {/* <button onClick={populateFields}>Load Info</button> */}
                {/* <button id="update-button" onClick={saveEdits}>Update</button> */}
            </div>

            <div id="course-outline-form">
                <h1 id="title">Editing Course Outlines!</h1>
                <h3 id="edit-course-label">You're editing {selectedCourse}'s current course outline!</h3>
                <h4>Last updated on {time} by {instructorID.split("@").shift()}!</h4>

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
                    onChange={(e) => { setTermLength(e.target.value) }}
                />

                <br />

                <label id="description">Course Description: </label>
                <input
                    type="text"
                    defaultValue={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />

                <br />

                <label id="name">Instructor Name: </label>
                <input
                    type="text"
                    defaultValue={name}
                    onChange={(e) => { setName(e.target.value) }}
                />

                <br />

                <label id="office">Office Number: </label>
                <input
                    type="text"
                    defaultValue={office}
                    onChange={(e) => { setOffice(e.target.value) }}
                />

                <br />

                <label id="phone">Phone Number: </label>
                <input
                    type="text"
                    defaultValue={phoneNumber}
                    onChange={(e) => { setPhone(e.target.value) }}
                />

                <br />

                <label id="email">Instructor Email: </label>
                <input
                    type="text"
                    defaultValue={email}
                // onChange={(e) => { setEmail(e.target.value) }}
                />

                <br />

                <label id="consultHours">Consult Hours: </label>
                <input
                    type="text"
                    defaultValue={officeHours}
                    onChange={(e) => { setConsultHours(e.target.value) }}
                />

                <br />

                <label id="academicCalendar">Academic Calendar Copy</label>
                <input
                    type="text"
                    defaultValue={academicCalendarCopy}
                    onChange={(e) => { setAcademicCalendarCopy(e.target.value) }}
                />

                <br />

                <label id="lectureHours">Lecture Hours:</label>
                <input
                    type="text"
                    defaultValue={lectureHours}
                    onChange={(e) => { setLectureHours(e.target.value) }}
                />

                <br />

                <label id="labHours">Lab Hours:</label>
                <input
                    type="text"
                    defaultValue={labHours}
                    onChange={(e) => { setLabHours(e.target.value) }}
                />

                <br />

                <label id="tutHours">Tutorial Hours:</label>
                <input
                    type="text"
                    defaultValue={TutorialHours}
                    onChange={(e) => { setTutHours(e.target.value) }}
                />

                <br />

                <label id="CEABEngSci">CEAB Academic Units Engineering Sciences:</label>
                <input
                    type="text"
                    defaultValue={academicUnitsEngSci}
                    onChange={(e) => { setAcademicUnitsEngSci(e.target.value) }}
                />

                <br />

                <label id="CEABEngDes">CEAB Academic Units Engineering Design:</label>
                <input
                    type="text"
                    defaultValue={academicUnitsEngDes}
                    onChange={(e) => { setAcademicUnitsEngDes(e.target.value) }}
                />

                <br />

                <label id="textbook">Required Textbook:</label>
                <input
                    type="text"
                    defaultValue={textbook}
                    onChange={(e) => { setTextbook(e.target.value) }}
                />

                <br />

                <label id="otherResources">Other Required References:</label>
                <input
                    type="text"
                    defaultValue={otherResources}
                    onChange={(e) => { setOtherResources(e.target.value) }}
                />

                <br />

                <label id="recommendedReferences">Recommended References:</label>
                <input
                    type="text"
                    defaultValue={recommended}
                    onChange={(e) => { setrecommended(e.target.value) }}
                />

                <br />

                <table>
                    {/* GA1 */}
                    <tr className="radio">
                        <td><label>Knowledge Base: &nbsp;</label></td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value="I"
                                    name='GA1'
                                    onChange={(e) => { setGa1(e.target.value) }}
                                />
                                I &nbsp;&nbsp;
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA1'
                                    onChange={(e) => { setGa1(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA1'
                                    onChange={(e) => { setGa1(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA1'
                                    onChange={(e) => { setGa1(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA1}</b> </label>
                        </td>
                    </tr>

                    {/* GA2 */}
                    <tr className="radio">
                        <td><label>Use of Engineering Tools: &nbsp;</label></td>
                        <td><label>
                            <input
                                type="radio"
                                value="I"
                                name='GA2'
                                onChange={(e) => { setGa2(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA2'
                                    onChange={(e) => { setGa2(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA2'
                                    onChange={(e) => { setGa2(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA2'
                                    onChange={(e) => { setGa2(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA2}</b> </label>
                        </td>
                    </tr>

                    {/* GA3 */}
                    <tr className="radio">
                        <td><label>Impact on Society and the Environment: &nbsp;</label></td>
                        <td><label>
                            <input
                                type="radio"
                                value="I"
                                name='GA3'
                                onChange={(e) => { setGa3(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA3'
                                    onChange={(e) => { setGa3(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA3'
                                    onChange={(e) => { setGa3(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA3'
                                    onChange={(e) => { setGa3(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA3}</b> </label>
                        </td>
                    </tr>

                    {/* GA4 */}
                    <tr className="radio">
                        <td><label>Problem Analysis: &nbsp;</label></td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value="I"
                                    name='GA4'
                                    onChange={(e) => { setGa4(e.target.value) }}
                                />
                                I &nbsp;&nbsp;
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA4'
                                    onChange={(e) => { setGa4(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA4'
                                    onChange={(e) => { setGa4(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA4'
                                    onChange={(e) => { setGa4(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA4}</b> </label>
                        </td>
                    </tr>

                    {/* GA5 */}
                    <tr className="radio">
                        <td><label>Individual and Team Work: &nbsp;</label></td>
                        <td><label>
                            <input
                                type="radio"
                                value="I"
                                name='GA5'
                                onChange={(e) => { setGa5(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA5'
                                    onChange={(e) => { setGa5(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA5'
                                    onChange={(e) => { setGa5(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA5'
                                    onChange={(e) => { setGa5(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA5}</b> </label>
                        </td>
                    </tr>

                    {/* GA6 */}
                    <tr className="radio">
                        <td><label>Ethics and Equity: &nbsp;</label></td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value="I"
                                    name='GA6'
                                    onChange={(e) => { setGa6(e.target.value) }}
                                />
                                I &nbsp;&nbsp;
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA6'
                                    onChange={(e) => { setGa6(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA6'
                                    onChange={(e) => { setGa6(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA6'
                                    onChange={(e) => { setGa6(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA6}</b> </label>
                        </td>
                    </tr>

                    {/* GA7 */}
                    <tr className="radio">
                        <td><label>Investigation: &nbsp;</label></td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value="I"
                                    name='GA7'
                                    onChange={(e) => { setGa7(e.target.value) }}
                                />
                                I &nbsp;&nbsp;
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA7'
                                    onChange={(e) => { setGa7(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA7'
                                    onChange={(e) => { setGa7(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA7'
                                    onChange={(e) => { setGa7(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA7}</b> </label>
                        </td>
                    </tr>

                    {/* GA8 */}
                    <tr className="radio">
                        <td><label>Communication Skills: &nbsp;</label></td>
                        <td>
                            <label>
                                <input
                                    type="radio"
                                    value="I"
                                    name='GA8'
                                    onChange={(e) => { setGa8(e.target.value) }}
                                />
                                I &nbsp;&nbsp;
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA8'
                                    onChange={(e) => { setGa8(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA8'
                                    onChange={(e) => { setGa8(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA8'
                                    onChange={(e) => { setGa8(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA8}</b> </label>
                        </td>
                    </tr>

                    {/* GA9 */}
                    <tr className="radio">
                        <td><label>Economics and Project Management: &nbsp;</label></td>
                        <td> <label>
                            <input
                                type="radio"
                                value="I"
                                name='GA9'
                                onChange={(e) => { setGa9(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA9'
                                    onChange={(e) => { setGa9(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA9'
                                    onChange={(e) => { setGa9(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA9'
                                    onChange={(e) => { setGa9(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA9}</b> </label>
                        </td>
                    </tr>

                    {/* GA10 */}
                    <tr className="radio">
                        <td><label>Design: &nbsp;</label></td>
                        <td><label>
                            <input
                                type="radio"
                                value="I"
                                name='GA10'
                                onChange={(e) => { setGa10(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA10'
                                    onChange={(e) => { setGa10(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA10'
                                    onChange={(e) => { setGa10(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA10'
                                    onChange={(e) => { setGa10(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA10}</b> </label>
                        </td>
                    </tr>

                    {/* GA11 */}
                    <tr className="radio">
                        <td><label>Professionalism &nbsp;</label></td>
                        <td> <label>
                            <input
                                type="radio"
                                value="I"
                                name='GA11'
                                onChange={(e) => { setGa11(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA11'
                                    onChange={(e) => { setGa11(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA11'
                                    onChange={(e) => { setGa11(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA11'
                                    onChange={(e) => { setGa11(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA11}</b> </label>
                        </td>
                    </tr>

                    {/* GA12 */}
                    <tr className="radio">
                        <td> <label>Life-long Learning: &nbsp;</label></td>
                        <td> <label>
                            <input
                                type="radio"
                                value="I"
                                name='GA12'
                                onChange={(e) => { setGa12(e.target.value) }}
                            />
                            I &nbsp;&nbsp;
                        </label>
                            <label>
                                <input
                                    type="radio"
                                    value="D"
                                    name='GA12'
                                    onChange={(e) => { setGa12(e.target.value) }}
                                />
                                D &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="A"
                                    name='GA12'
                                    onChange={(e) => { setGa12(e.target.value) }}
                                />
                                A &nbsp;&nbsp;
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    value="N/A"
                                    name='GA12'
                                    onChange={(e) => { setGa12(e.target.value) }}
                                />
                                N/A &nbsp;&nbsp;
                            </label>

                            <label>&nbsp;&nbsp; Previously Selected: <b>{staticGA12}</b> </label>
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

                    <textarea className='textSpace' id='Topics' rows="10" value={topicsText}
                        onChange={(e) => { setTopicsText(e.target.value) }} />

                    <select multiple onChange={handleSelectChange}>
                        {gaOptions &&
                            gaOptions.map((m) => {
                                return <option value={m.ga}>{m.ga}</option>;
                            })}
                    </select>

                    <textarea readOnly value={gaIndicators} className='textSpace' id='GaIndicators' rows="10"
                        onChange={(e) => alert(e.value)} />

                    {/* // onChange={(e) => { setGaIndicators() }} /> */}

                </div>
                <br />

                <label id="GA Justification">GA Assessment:</label>
                <input
                    type="text"
                    defaultValue={gaJustification}
                    onChange={(e) => { setGaJustification(e.target.value) }}
                />
                <br />


                <label id="homework">Homework Weighting: </label>
                <input
                    type="text"
                    defaultValue={homework}
                    onChange={(e) => { setHomework(e.target.value) }}
                />

                <br />

                <label id="quizzes">Quiz Weighting:</label>
                <input
                    type="text"
                    defaultValue={quizzes}
                    onChange={(e) => { setQuizzes(e.target.value) }}
                />

                <br />

                <label id="labs">Lab Weighting:</label>
                <input
                    type="text"
                    defaultValue={labs}
                    onChange={(e) => { setLabs(e.target.value) }}
                />

                <br />

                <label id="midterm">Midterm Weighting:</label>
                <input
                    type="text"
                    defaultValue={midterm}
                    onChange={(e) => { setMidterm(e.target.value) }}
                />

                <br />

                <label id="final">Final Weighting:</label>
                <input
                    type="text"
                    defaultValue={final}
                    onChange={(e) => { setFinal(e.target.value) }}
                />

                <br />

                <label id="homeworkDescription">Homework Description:</label>
                <input
                    type="text"
                    defaultValue={homeworkDescription}
                    onChange={(e) => { setHomeworkDescription(e.target.value) }}
                />

                <br />

                <label id="quizzesDescription">Quizzes Description:</label>
                <input
                    type="text"
                    defaultValue={QuizzesDesc}
                    onChange={(e) => { setQuizzesDesc(e.target.value) }}
                />

                <br />

                <label id="LabDesc">Labs Description:</label>
                <input
                    type="text"
                    defaultValue={LabDesc}
                    onChange={(e) => { setLabDesc(e.target.value) }}
                />

                <br />

                <label id="MidtermDesc">Midterm Description:</label>
                <input
                    type="text"
                    defaultValue={MidtermDesc}
                    onChange={(e) => { setMidtermDesc(e.target.value) }}
                />

                <br />

                <label id="finalDescription">Final Description:</label>
                <input
                    type="text"
                    defaultValue={FinalDesc}
                    onChange={(e) => { setFinalDescription(e.target.value) }}
                />

                <br />

                <label id="LateSubmissionPolicy">Late Submisison Policy:</label>
                <input
                    type="text"
                    defaultValue={LateSubmissionPolicy}
                    onChange={(e) => { setLateSubmissionPolicy(e.target.value) }}
                />

                <br />

                <label id="Locker">Assignment Submission Locker:</label>
                <input
                    type="text"
                    defaultValue={Locker}
                    onChange={(e) => { setLocker(e.target.value) }}
                />

                <br />

                <label id="ElecDevices">Electronic Use Description:</label>
                <input
                    type="text"
                    defaultValue={ElecDevices}
                    onChange={(e) => { setElecDevices(e.target.value) }}
                />

                <br />

                <label id="Clicker">Clicker Use:</label>
                <input
                    type="text"
                    defaultValue={Clicker}
                    onChange={(e) => { setClicker(e.target.value) }}
                />

                <br />

                {/* <button id="sendData" onClick={populateFields}>Done</button> */}

                <label id="justification-label">Add the changes you made here along with a justification for each change.</label>
                <br></br>
                <textarea
                    rows="15" cols="107"
                    placeholder='Add your justifications here...'
                    id='newComment'
                    onChange={(e) => { setComment(e.target.value) }}
                >
                </textarea>
                <button id="sendData" onClick={saveEdits}>Update Outline</button>
            </div>
        </div>
    )
}

export default EditOutline;