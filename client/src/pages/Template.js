import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import os_logo from './OS-logo.png'
import './Template.css';



function Template() {

    const navigate = useNavigate();
    const [edits, setEdits] = useState("");
    const [PreReq, setPreReq] = useState("");
    const [AntiReq, setAntiReq] = useState("");

    const [courseCode, setCourseCode] = useState('');
    const [fields, setFields] = useState('');
    const [courseYear, setCourseYear] = useState('');
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
    // const [quizzesDescription, setQuizzesDescription] = useState('');
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
    const [GA1, setGA1] = useState('');
    const [GA2, setGA2] = useState('');
    const [GA3, setGA3] = useState('');
    const [GA4, setGA4] = useState('');
    const [GA5, setGA5] = useState('');
    const [GA6, setGA6] = useState('');
    const [GA7, setGA7] = useState('');
    const [GA8, setGA8] = useState('');
    const [GA9, setGA9] = useState('');
    const [GA10, setGA10] = useState('');
    const [GA11, setGA11] = useState('');
    const [GA12, setGA12] = useState('');
    const [comment, setComment] = useState('');
    const [QuizzesDesc, setQuizzesDesc] = useState('');
    const [academicCalendarCopy, setAcademicCalendarCopy] = useState('');
    const [academicUnitsEngDes, setAcademicUnitsEngDes] = useState('');
    const [academicUnitsEngSci, setAcademicUnitsEngSci] = useState('');
    
    const [instructorEmail, setInstructorMail] = useState("");
    const selectedCourse = sessionStorage.getItem('printCourse');
    const selectedYear = sessionStorage.getItem('printYear');
    const [courseName, setCourseName] = useState('');
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(token)
            const user = jwt_decode(token);
            setInstructorMail(user.email);//of logged in user
            console.log(user.name)
            if (!user) {
                localStorage.removeItem("token");
                // window.location.href = '/login-page';
                //navigate("/login-page", { replace: true });
            } else {
                getHistory();
                console.log("xx");
                populateFields();
                populatePreReq();
                populateCourseName();
                populateAntiReq();
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

    function populateCourseName(){
        const getName = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/courseName/${selectedCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },
            });
            const json = await response.json();
            
            if (response.ok){
                setCourseName(json[0].courseName);
            }
    };
    getName();
}

    function populateFields() {
        const getFields = async () => {
            // const response = await fetch(`http://localhost:3000/editcourseoutline/2019/${selectedCourse}`, {
            const response = await fetch(process.env.REACT_APP_API + `/courseOutline/${selectedCourse}/${selectedYear}`, {
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
                console.log(JSON.stringify(json))
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
                setQuizzesDesc(json[0].QuizzesDesc);
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
                setGA1(json[0].GA1);
                setGA2(json[0].GA2);
                setGA3(json[0].GA3);
                setGA4(json[0].GA4);
                setGA5(json[0].GA5);
                setGA6(json[0].GA6);
                setGA7(json[0].GA7);
                setGA8(json[0].GA8);
                setGA9(json[0].GA9);
                setGA10(json[0].GA10);
                setGA11(json[0].GA11);
                setGA12(json[0].GA12);
                setAcademicCalendarCopy(json[0].setAcademicCalendarCopy);
                setAcademicUnitsEngDes(json[0].setAcademicUnitsEngDes);
                setAcademicUnitsEngSci(json[0].setAcademicUnitsEngSci);
            }
        };
        getFields();
    }

    function populatePreReq() {
        const getPreReq = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/prereq/${selectedCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },

            });
            const json = await response.json();
        
            if (response.ok) {
                var pre = '';
                for(var i = 0; i < json.length; i ++){
                    if(i == 0){
                        pre += (json[i].preCode)
                    }else{
                      pre += ', ' + (json[i]).preCode;  
                    }
                }
                setPreReq(pre);
            }
        };
        getPreReq();
    }

    function populateAntiReq() {
        const getAntiReq = async () => {
            const response = await fetch(process.env.REACT_APP_API + `/antireq/${selectedCourse}`, {
                headers: {
                    "x-access-token": localStorage.getItem("token"),
                },

            });
            const json = await response.json();
            if (response.ok) {
                var ants = '';
                for(var i = 0; i < json.length; i ++){
                    if(i == 0){
                        ants += (json[i].antiCode)
                    }else{
                      ants += ', ' + (json[i]).antiCode;  
                    }
                }
                setAntiReq(ants);
            }

        };
        getAntiReq();
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


    const handlePrintClick = () => {
        window.print();
    };


    return (
        <div>
            <div id="body">
                <p>&nbsp;</p>
                <div id="temp-container">
                    <p id="temp-title" ><strong>Western University</strong></p>
                    <p id="temp-title" style={{ textAlign: 'center' }} ><strong>Faculty of Engineering</strong></p>
                    <p id="temp-title" style={{ textAlign: 'center' }}  ><strong>Department of Electrical and Computer Engineering</strong></p>
                </div>
                {/* <br /> */}
                <p id="temp-title" style={{ textAlign: 'center'}}><strong>&nbsp; 
                
                <input id ="temp-text" name="name" value={selectedCourse}/> <br></br> <input id ="temp-coursetitle" name="name" value={courseName}/>&nbsp;</strong></p>
                <p id="temp-title" style={{ textAlign: 'center' }}><strong>Course Outline <input id ="temp-year" name="name" value={selectedYear}/></strong></p>
                <p id="temp-p"><strong>Instructor:</strong>&nbsp; &nbsp; &nbsp; &nbsp; <input id ="temp-name" name="name" value={name}/></p>
                <p id="temp-p1">TEB <input id ="temp-text" name="name" value={office}/>, <input id ="temp-phoneNo" name="name" value={phoneNumber}/>, UWO e-mail <input id ="temp-email" name="name" value={email}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <p id="temp-p1">Consultation hours: <input id ="temp-text" name="name" value={officeHours}/></p>
                <p id='temp-p'><strong>Contact Hours:</strong> <input id ="temp-hours" name="name" value={lectureHours}  readOnly={true}/> lecture hours, <input id ="temp-hours" name="name" value={labHours}  readOnly={true}/> laboratory hours, <input id ="temp-hours" name="name" value={TutorialHours}  readOnly={true}/> tutorial hours, 0.5 course.</p>
                <p id='temp-p'><strong>Antirequisite:</strong> 
                    <input id ="temp-courses" name="name" value={AntiReq}  readOnly={true}/>
                    
                    {AntiReq &&
                AntiReq.map((m) => {
                  return <input id ="temp-courses" name="name" value={m} ></input>;
                })}
                    
                    </p>
                <p id='temp-p'><strong>Prerequisites:</strong> <input id ="temp-courses" name="name" value={PreReq}  readOnly={true}/></p>
                <p id='temp-p' style={{ width: '90%' }}>Unless you have either the requisites for this course or written special permission from your Dean to enroll in it, you will be removed from this course and it will be deleted from your record. This decision may not be appealed. You will receive no adjustment to your fees in the event that you are dropped from a course for failing to have the necessary prerequisites.</p>
                <p id='temp-p' style={{ width: '90%' }}><strong>CEAB Academic Units:</strong> Engineering Science <input id ="temp-hours" name="name"/>%, Engineering Design <input id ="temp-hours" name="name" readOnly={true}/>%.</p>
                <p id='temp-p' style={{ width: '90%' }}><strong>Required Textbook:</strong> <input id ="temp-books" name="name" value={textbook} readOnly={true}/></p>
                <p id='temp-p' style={{ width: '90%' }}><strong>Other Required References:</strong> <input id ="temp-books" name="name" value={otherResources} readOnly={true}/> </p>
                <p id='temp-p' style={{ width: '90%' }}><strong>Recommended References:</strong><input id ="temp-books" name="name" value={recommended} readOnly={true}/></p>
                <p id='temp-p'><strong>General Learning Objectives (CEAB Graduate Attributes)</strong></p>
                <table id="table" style={{ marginLeft: 'auto', marginRight: 'auto' }} border={1} >
                    <tbody>
                        <tr>
                            <td width={100}>
                                <p id='temp-table'>Knowledge Base</p>
                            </td>
                            <td width={20}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA1} readOnly={true}/></p>
                            </td>
                            <td width={100}>
                                <p id='temp-table'>Use of Engineering Tools</p>
                            </td>
                            <td width={100}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA2} readOnly={true}/></p>
                            </td>
                            <td width={100}>
                                <p id='temp-table'>Impact on Society and the Environment</p>
                            </td>
                            <td width={20}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA3} readOnly={true}/></p>
                            </td>
                        </tr>
                        <tr>
                            <td width={36}>
                                <p id='temp-table'>Problem Analysis</p>
                            </td>
                            <td width={20}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA4} readOnly={true}/></p>
                            </td>
                            <td width={36}>
                                <p id='temp-table'>Individual and Team Work</p>
                            </td>
                            <td width={20}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA5} readOnly={true}/></p>
                            </td>
                            <td width={36}>
                                <p id='temp-table'>Ethics and Equity</p>
                            </td>
                            <td width={20}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA6} readOnly={true}/></p>
                            </td>
                        </tr>
                        <tr>
                            <td width={176}>
                                <p id='temp-table'>Investigation</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA7} readOnly={true}/></p>
                            </td>
                            <td width={176}>
                                <p id='temp-table'>Communication Skills</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA8} readOnly={true}/></p>
                            </td>
                            <td width={176}>
                                <p id='temp-table'>Economics and Project Management</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA9} readOnly={true}/></p>
                            </td>
                        </tr>
                        <tr>
                            <td width={176}>
                                <p id='temp-table'>Design</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA10} readOnly={true}/></p>
                            </td>
                            <td width={176}>
                                <p id='temp-table'>Professionalism</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA11} readOnly={true}/></p>
                            </td>
                            <td width={176}>
                                <p id='temp-table'>Life-Long Learning</p>
                            </td>
                            <td width={32}>
                                <p id='temp-tablex'><input id ="temp-hours" name="name" value={GA12} readOnly={true}/></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style={{ width: '90%' }} id="temp-p">Notation<em>: where x be I: Introductory, D: Intermediate, A: Advanced, or empty</em>. I – The instructor will introduce the topic at the level required.&nbsp; It is not necessary for the student to have seen the material before. D – There may be a reminder or review, but the student is expected to have seen and been tested on the material before taking the course. A – It is expected that the student can apply the knowledge without prompting (e.g. no review).</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <table id="table" style={{ marginLeft: 'auto', marginRight: 'auto' }} border={1}>
                    <tbody>
                        <tr>
                            <td width={491}>
                                <p id='temp-table2'><strong>Course Topics and Specific Learning Outcomes</strong></p>
                            </td>
                            <td width={132}>
                                <p id='temp-table2'><strong>CEAB Graduate Attributes Indicators</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td width={491}>
                                <p id='temp-table-ga'><textarea id ="temp-ga" name="name" value={topicsText} readOnly={true}/></p>
                            </td>
                            <td width={132}>
                                <p id='temp-table2'><textarea id ="temp-ga" name="name" value={gaIndicators} readOnly={true}/></p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p style={{margin: '35px'}}>&nbsp;</p>
                <p id='temp-p'><strong>Evaluation</strong></p>
                <table style={{ marginLeft: 'auto', marginRight: 'auto' }} border={1} width={396}>
                    <tbody>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'><strong>Course Component</strong></p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'><strong>Weight</strong></p>
                            </td>
                        </tr>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'>Homework Assignments</p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'> <input id ="temp-percent" name="name" value={homework} readOnly={true}/>%</p>
                            </td>
                        </tr>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'>Quizzes</p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'> <input id ="temp-percent" name="name" value={quizzes} readOnly={true}/>%</p>
                            </td>
                        </tr>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'>Laboratory</p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'> <input id ="temp-percent" name="name" value={labs} readOnly={true}/>%</p>
                            </td>
                        </tr>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'>Midterm Test</p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'> <input id ="temp-percent" name="name" value={midterm} readOnly={true}/>%</p>
                            </td>
                        </tr>
                        <tr>
                            <td width={276}>
                                <p id='temp-table2'>Final Examination</p>
                            </td>
                            <td width={120}>
                                <p id='temp-table2'><input id ="temp-percent" name="name" value={final} readOnly={true}/>%</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p id='temp-p' style={{ width: '90%' }}>To obtain a passing grade in the course, a mark of 50% or more must be achieved on the final examination as well as on the laboratory. A final examination or laboratory mark &lt; 50% will result in a final course grade of 48% or less.</p>
                <p id='template-values'>&nbsp;</p>
                <p id='temp-p'><strong>Homework Assignments:</strong><textarea id ="temp-desc" name="name" value={homeworkDescription} readOnly={true}/></p>
                <p id='temp-p'><strong>Quizzes:</strong><textarea id ="temp-desc" name="name" value={QuizzesDesc} readOnly={true}/></p>
                <p id='temp-p'><strong>Laboratory:</strong><textarea id ="temp-desc" name="name" value={LabDesc} readOnly={true}/></p>
                <p id='temp-p' ><strong>Midterm Test:</strong><textarea id ="temp-desc" name="name"value={MidtermDesc} readOnly={true}/></p>
                <p id='temp-p'><strong>Final Examination:</strong><textarea id ="temp-desc" name="name" value={FinalDesc} readOnly={true}/></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p'><strong>Late Submission Policy: </strong><textarea id ="temp-desc" name="name" value={LateSubmissionPolicy} readOnly={true}/></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Assignment Submission Locker: </strong>Locker <input id ="temp-text" name="name" value={Locker} readOnly={true}/></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Use of English: </strong>In accordance with Senate and Faculty Policy, students may be penalized up to 10% of the marks on all assignments, tests, and examinations for improper use of English. Additionally, poorly written work with the exception of the final examination may be returned without grading. If resubmission of the work is permitted, it may be graded with marks deducted for poor English and/or late submission.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Attendance:</strong> Any student who, in the opinion of the instructor, is absent too frequently from class, laboratory, or tutorial periods will be reported to the Dean (after due warning has been given). On the recommendation of the department, and with the permission of the Dean, the student will be debarred from taking the regular final examination in the course.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Absence Due to Illness or Other Circumstances:</strong> Students should immediately consult with the instructor or department Chair if they have any problems that could affect their performance in the course. Where appropriate, the problems should be documented (see the attached “Instructions for Students Unable to Write Tests or Examinations or Submit Assignments as Scheduled”). The student should seek advice from the instructor or department Chair regarding how best to deal with the problem. Failure to notify the instructor or department Chair immediately (or as soon as possible thereafter) will have a negative effect on any appeal.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}>For more information concerning medical accommodations, see the relevant section of the Academic Handbook:</p>
                <p id='temp-p' style={{ width: '90%' }}><a href="http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_medical.pdf">http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_medical.pdf</a></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <br/>
                <p id='temp-p' style={{ width: '90%' }}>For more information concerning accommodations for religious holidays, see the relevant section of the Academic Handbook:</p>
                <p id='temp-p' style={{ width: '90%' }}><a href="http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_religious.pdf">http://www.uwo.ca/univsec/pdf/academic_policies/appeals/accommodation_religious.pdf</a></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Missed Midterm Examinations: </strong>If a student misses a midterm examination, she or he must follow the Instructions for Students Unable to Write Tests and provide documentation to Undergraduate Services Office within 24 hours of the missed test. If accommodation is granted, the department will decide whether to provide a make-up test or allow reweighting of the test, where reweighting means the marks normally allotted for the midterm will be added to the final exam. If no reasonable justification for missing the test can be found, then the student will receive a mark of zero for the test.</p>
                {/* <p>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}>If a student is going to miss the midterm examination for religious reasons, they must inform the instructor in writing within 48 hours of the announcement of the exam date or they will be required to write the exam.</p>
                {/* <p id='template-values'><strong>&nbsp;</strong></p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Cheating and Plagiarism:</strong> Students must write their essays and assignments in their own words. Whenever students take an idea or a passage from another author, they must acknowledge their debt both by using quotation marks where appropriate and by proper referencing such as footnotes or citations. University policy states that cheating, including plagiarism, is a scholastic offence. The commission of a scholastic offence is attended by academic penalties, which might include expulsion from the program. If you are caught cheating, there will be no second warning.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}>All required papers may be subject to submission for textual similarity review to commercial plagiarism-detection software under license to the University for the detection of plagiarism. All papers submitted will be included as source documents on the reference database for the purpose of detecting plagiarism of papers subsequently submitted to the system. Use of the service is subject to the licensing agreement, currently between the University of Western Ontario and Turnitin.com (<a href="http://www.turnitin.com">http://www.turnitin.com</a>).</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}>Scholastic offences are taken seriously and students are directed to read the appropriate policy, specifically, the definition of what constitutes a Scholastic Offence, in the relevant section of the Academic Handbook:</p>
                <p id='temp-p' style={{ width: '90%' }}><a href="http://www.uwo.ca/univsec/pdf/academic_policies/appeals/scholastic_discipline_undergrad.pdf">http://www.uwo.ca/univsec/pdf/academic_policies/appeals/scholastic_discipline_undergrad.pdf</a></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p'><strong>Use of Electronic Devices:</strong><textarea id ="temp-desc" name="name" value={ElecDevices} readOnly={true}/></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p'><strong>Use of Personal Response Devices (“Clickers”): </strong><textarea id ="temp-desc" name="name" value={Clicker} readOnly={true}/></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Policy on Repeating All Components of a Course: </strong>Students who are required to repeat an Engineering course must repeat all components of the course. No special permissions will be granted enabling a student to retain laboratory, assignment, or test marks from previous years. Previously completed assignments and laboratories cannot be resubmitted by the student for grading in subsequent years.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Internet and Electronic Mail:</strong> Students are responsible for regularly checking their Western e‑mail and the course web site (<a href="https://owl.uwo.ca/portal/">https://owl.uwo.ca/portal/</a>) and making themselves aware of any information that is posted about the course.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Accessibility:</strong> Please contact the course instructor if you require material in an alternate format or if any other arrangements can make this course more accessible to you. You may also wish to contact Services for Students with Disabilities (SSD) at 519-661-2111 ext. 82147 for any specific question regarding an accommodation.</p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}><strong>Support Services:&nbsp;&nbsp;&nbsp;&nbsp; </strong>Office of the Registrar, <a href="http://www.registrar.uwo.ca/">http://www.registrar.uwo.ca/</a></p>
                <p id='temp-p1' style={{ width: '90%' }}> Student Development Centre, <a href="http://www.sdc.uwo.ca/">http://www.sdc.uwo.ca/</a></p>
                <p id='temp-p1' style={{ width: '90%' }}> Engineering Undergraduate Services, <a href="http://www.eng.uwo.ca/undergraduate/">http://www.eng.uwo.ca/undergraduate/</a></p>
                <p id='temp-p1' style={{ width: '90%' }}> USC Student Support Services, <a href="http://westernusc.ca/services/">http://westernusc.ca/services/</a></p>
                {/* <p id='template-values'>&nbsp;</p> */}
                <p id='temp-p' style={{ width: '90%' }}>Students who are in emotional/mental distress should refer to Mental Health @ Western, <a href="http://www.health.uwo.ca/mental_health/">http://www.health.uwo.ca/mental_health/</a>, for a complete list of options about how to obtain help.</p>
            </div>
            {/* <button id="print-button" onClick={handlePrintClick}>Print Page</button> */}
        </div>
    )
}

export default Template;