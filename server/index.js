const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' })
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
const { env } = require('process');

const db = mysql.createConnection({
    user: "root",
    //host: "localhost",
    password: process.env.MY_PASSWORD,
    database: process.env.MY_DATABASE || "OneSyllabus",
    multipleStatements: true,
    socketPath: process.env.DB_ADDRESS
});

if (process.env.NODE_ENV == "production") {
    db.connect.socketPath = "/cloudsql/onesyllabus-379218:us-central1:database-3350-team-18";
} else {
    db.connect.host = "localhost";
}


// get statements for courses, users, courseoutlines


// get a list of all of the instructors
app.get('/instructor', (req, res) => {
    const sqlInsert = "SELECT * FROM Users WHERE ROLE = 'I'";
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        //  console.log(result);
    })
});

//get the corresponding course name for a course code
app.get('/courseName/:course', (req, res) => {
    const courseCode = req.params.course;
    const sqlInsert = `SELECT courseName FROM Course WHERE courseCode = '${courseCode}'`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

// get a list of all of the courses
app.get('/course', (req, res) => {
    const sqlInsert = "SELECT courseCode FROM Course";
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        // console.log(result);
    })
});

//get all course outlines for a specific instructor
app.get('/outlinesStatus/:userEmail', (req, res) => {
    const userEmail = req.params.userEmail;
    const sqlInsert = `SELECT CO.*, 
    CASE
        WHEN CO.status = 'A' THEN 'Approved'
        WHEN CO.status = 'R' THEN 'Rejected'
        WHEN CO.status = 'PR' THEN 'Pending Review'
    END AS status_string,
    EH.email,
    EH.editTime
    FROM CourseOutline CO
    JOIN EditHistory EH ON CO.courseYear = EH.courseYear AND CO.courseCode = EH.courseCode AND CO.instructorMail = EH.email
    WHERE CO.instructorMail like '${userEmail}%';
`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})
//get all course outlines for a reviewers
app.get('/outlinesStatus', (req, res) => {
    const userEmail = req.params.userEmail;
    const sqlInsert = `SELECT CO.*, 
    CASE
        WHEN CO.status = 'A' THEN 'Approved'
        WHEN CO.status = 'R' THEN 'Rejected'
        WHEN CO.status = 'PR' THEN 'Pending Review'
        WHEN CO.status = 'D' THEN 'Draft'
    END AS status_string,
    EH.email,
    EH.editTime
    FROM CourseOutline CO
    JOIN EditHistory EH ON CO.courseYear = EH.courseYear AND CO.courseCode = EH.courseCode AND CO.instructorMail = EH.email;
`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})



//get feedback comment for specific course
app.get('/reviewerFeedback/:course/:year', (req, res) => {
    const courseCode = req.params.course;
    const courseYear = req.params.year;
    const courseInstructor = req.params.instructor;
    const sqlInsert = `SELECT * FROM EditHistory
    WHERE courseYear = '${courseYear}' AND courseCode = '${courseCode}'
    AND reviewFlag = '1';`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

//get all course outlines for a specific instructor
app.get('/outlines/', (req, res) => {
    const sqlInsert = `SELECT CO.*, 
    CASE
        WHEN CO.status = 'A' THEN 'Accepted'
        WHEN CO.status = 'R' THEN 'Rejected'
        WHEN CO.status = 'PR' THEN 'Pending Review'
        WHEN CO.status = 'D' THEN 'Draft'
    END AS status_string,
    EH.email AS editor_email,
    EH.editTime AS edit_date
    FROM CourseOutline AS CO
    INNER JOIN EditHistory AS EH
    ON CO.instructorMail = EH.email
    AND CO.courseYear = EH.courseYear
    AND CO.courseCode = EH.courseCode;
`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})


//return the instructor email if a courseOutline exists for this year (an editable one)
app.get('/courseCreated/:course', (req, res) => {
    const courseCode = req.params.course;
    const sqlInsert = `SELECT instructorMail FROM CourseOutline WHERE courseCode = '${courseCode}' AND courseYear = '2022-23'`;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        // console.log(result);
    })
})

app.get('/courseEditable/:course', (req,res) => {
    const courseCode = req.params.course;
    const sqlInsert = `SELECT instructorMail FROM CourseOutline WHERE courseYear = '2022-23' AND courseCode = '${courseCode}' UNION SELECT ('N/A') LIMIT 1`;
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    })
})

//returns list of instructors who all have access to the course
// app.get('/instructorAccessCourse/:course', (req, res) => {
//     const courseCode = req.params.course;
//     const sqlInsert = `SELECT email FROM UserAccess where courseCode = '${courseCode}'`;
//     db.query(sqlInsert, (err, result) => {
//         res.send(result)
//         // console.log(result);
//     })
// })

// get a list of all of the ga indicators
app.get('/gaindicator', (req, res) => {
    const sqlInsert = "SELECT * FROM GAIndicators";
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
});

// get a list of all of the pre requisites for a specified course
app.get('/prereq/:course', (req, res) => {
    const courseCode = req.params.course;
    const sqlInsert = `SELECT * FROM PreReq WHERE coursecode LIKE '${courseCode}' `;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        // console.log(result);
    })
});

// get a list of all of the anti requisites for a specified course
app.get('/antireq/:course', (req, res) => {
    const courseCode = req.params.course;
    const sqlInsert = `SELECT * FROM AntiReq WHERE coursecode LIKE '${courseCode}' `;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        // console.log(result);
    })
});

// get courseoutlines for a specific course
app.get('/courseoutline/:course', (req, res) => {
    const coursecode = req.params.course;
    const sqlInsert = `select * from CourseOutline WHERE courseCode LIKE '${coursecode}'`;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
});

// get courseoutlines for a specific course in a specific year
app.get('/courseoutline/:course/:year', (req, res) => {
    const coursecode = req.params.course;
    const courseyear = req.params.year;
    const sqlInsert = `select * from CourseOutline WHERE courseCode LIKE '${coursecode}' and courseYear like '%${courseyear}%'`;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
});

// get courseoutlines for a specific course in a specific year
app.get('/courseoutline/:course/:year/:instructor', (req, res) => {
    const coursecode = req.params.course;
    const courseyear = req.params.year;
    const instructor = req.params.instructor;
    const sqlInsert = `select * from CourseOutline WHERE courseCode LIKE '${coursecode}' and courseYear like '%${courseyear}%' and instructorMail like '${instructor}'`;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
    })
});

// update courseoutlines for a specific course in a specific year
app.put('/editcourseoutline/:courseyear/:coursecode/:instructor', (req, res) => {
    const courseYear = req.params.courseyear;
    const courseCode = req.params.coursecode;
    const instructorMail = req.params.instructor;

    const instructorName = req.body.name;
    const department = req.body.department;
    const termLength = req.body.termLength;
    const phoneNumber = req.body.phoneNumber;
    const description = req.body.description;
    const officeHours = req.body.officeHours;
    const consultHours = req.body.consultHours;
    const office = req.body.office;
    const textbook = req.body.textbook;
    const otherResources = req.body.otherResources;
    const recommended = req.body.recommended;
    const homework = req.body.homework;
    const quizzes = req.body.quizzes;
    const labs = req.body.labs;
    const midterm = req.body.midterm;
    const final = req.body.final;
    const GA1 = req.body.GA1;
    const GA2 = req.body.GA2;
    const GA3 = req.body.GA3;
    const GA4 = req.body.GA4;
    const GA5 = req.body.GA5;
    const GA6 = req.body.GA6;
    const GA7 = req.body.GA7;
    const GA8 = req.body.GA8;
    const GA9 = req.body.GA9;
    const GA10 = req.body.GA10;
    const GA11 = req.body.GA11;
    const GA12 = req.body.GA12;
    const topicsText = req.body.topicsText;
    const topics = req.body.topics;
    const labHours = req.body.labHours;
    const TutorialHours = req.body.TutorialHours;
    const homeworkDescription = req.body.homeworkDescription;
    const LabDesc = req.body.LabDesc;
    const MidtermDesc = req.body.MidtermDesc;
    const FinalDesc = req.body.FinalDesc;
    const LateSubmissionPolicy = req.body.LateSubmissionPolicy;
    const Locker = req.body.Locker;
    const ElecDevices = req.body.ElecDevices;
    const Clicker = req.body.Clicker;
    const LectureHours = req.body.lectureHours;
    const QuizzesDesc = req.body.QuizzesDesc;
    const gaJustification = req.body.gaJustification;
    const academicCalendarCopy = req.body.academicCalendarCopy;
    const academicUnitsEngSci = req.body.academicUnitsEngSci;
    const academicUnitsEngDes = req.body.academicUnitsEngDes;
    const gaIndicators = req.body.gaIndicators;
    


    const sqlInsert = `UPDATE CourseOutline SET status = 'PR', instructorName = '${instructorName}',department = '${department}',termLength = '${termLength}',  phoneNumber = '${phoneNumber}',
    description = '${description}',officeHours = '${officeHours}', office = '${office}', textbook = '${textbook}', otherResources = '${otherResources}',
    recommended = '${recommended}',    homework = '${homework}',
    quizzes = '${quizzes}',    labs = '${labs}',
    midterm = '${midterm}',    final = '${final}',
    GA1 = '${GA1}',    GA2 = '${GA2}',
    GA3 = '${GA3}',    GA4 = '${GA4}',
    GA5 = '${GA5}',    GA6 = '${GA6}',
    GA7 = '${GA7}',    GA8 = '${GA8}',
    GA9 = '${GA9}',    GA10 = '${GA10}',
    GA11 = '${GA11}',    GA12 = '${GA12}',
    topicsText = '${topicsText}',
    topicsGAIndicators = '${gaIndicators}',
    labHours = ${labHours},
    TutorialHours = ${TutorialHours},
    HomeworkDesc = '${homeworkDescription}',
    LabDesc = '${LabDesc}',
    MidtermDesc = '${MidtermDesc}',
    FinalDesc = '${FinalDesc}',
    LateSubmissionPolicy = '${LateSubmissionPolicy}',
    Locker = '${Locker}',
    ElecDevices = '${ElecDevices}',
    Clicker = '${Clicker}',
    LectureHours = ${LectureHours},
    QuizzesDesc = '${QuizzesDesc}',
    gaJustification = '${gaJustification}',
    academicCalendarCopy = '${academicCalendarCopy}',  
    academicUnitsEngSci = 0, academicUnitsEngDes = 0    
    WHERE courseCode like '${courseCode}' and courseYear like '${courseYear}' and instructormail like '${instructorMail}%'`;

    sqlString = sqlInsert.replace(/(\r\n|\n|\r)/gm, "")

    const trysql = `UPDATE CourseOutline SET termLength = '${termLength}' WHERE courseCode like '${courseCode}' and courseYear like '${courseYear}' and instructormail like '${instructorMail}%'`
    db.query(sqlString, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.send('Data updated successfully');
          }
       // res.send(result)
    })
});

app.put('/editFlag/:courseyear/:coursecode/:flag', (req, res) => {
    const courseYear = req.params.courseyear;
    const courseCode = req.params.coursecode;
    const flag = req.params.flag

    const sqlInsert = `UPDATE CourseOutline SET status = '${flag}' WHERE courseCode like '${courseCode}' and courseYear like '${courseYear}'`
    console.log(sqlInsert);
    db.query(sqlInsert, (err, results) => {
        if (err) return res.status(400).send(err.sqlMessage);
        return res.send(results)
    });
});

app.post('/edithistory', async (req, res) => {
    // const token = req.headers['x-access-token']
    const newComment = req.body.comment;
    const courseYear = req.body.year;
    const courseCode = req.body.courseCode;
    const reviewFlag = req.body.flag;
    const instructor = req.body.mail;
    try {
        //const decoded = jwt.verify(token, 'oneSyllabus3350')
        //const email = decoded.email;
        console.log(newComment)
        db.query(`INSERT INTO EditHistory (email, newComment, courseYear, courseCode, reviewFlag) VALUES 
        ('${instructor}','${newComment}', '${courseYear}', '${courseCode}', ${reviewFlag});`,
            // db.query('SELECT * FROM userAccess WHERE email = ?',
            // [email],
            (err, results) => {
                if (!err) {
                    res.send(results);
                } else res.send(err)

            })


    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }

})


//get list of all instructor access
app.get('/instructorAccess/', (req, res) => {
    const sqlInsert = `SELECT * FROM userAccess `;
    db.query(sqlInsert, (err, result) => {
        res.send(result)
        // console.log(result);
    })
})

//add new instructor access
app.post('/instructorAccessP/', (req, res) => {
    const userEmail = req.body.email;
    const userCourseCode = req.body.courseCode;
    let sqlInsert = `INSERT INTO userAccess(email, courseCode) VALUES (?,?);`;
    db.query(sqlInsert, [userEmail, userCourseCode],
        (err, results) => {
            if (!err) {
                res.send(results);
            } else res.send(err)

        })
});


//login
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query(
        "SELECT * FROM Users WHERE email = ? AND Password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send({ err: err });
            }

            if (result.length > 0) {
                // console.log(result[0].email)
                //res.send(result);

                const id = result[0].id

                const token = jwt.sign({
                    email: result[0].email,
                    name: result[0].name,
                    role: result[0].role
                }, "oneSyllabus3350", { expiresIn: '1d' }
                )
                //return res.json({ auth: true, token: token, result: result })
                console.log(token)
                return res.json({ auth: true, status: "ok", user: token, result: result })


            } else {
                //res.json({ auth: false, message: "Wrong username or password" })
                //res.json({ message: "Wrong username or password!" , result: false });
                res.json({ auth: false, status: 'error', user: false })

            }
        }
    )
})


app.get('/courses', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decoded = jwt.verify(token, 'oneSyllabus3350')
        const email = decoded.email;
        db.query('SELECT * FROM userAccess WHERE email = ?',
            [email],
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                    // console.log(result[0].email)
                    // console.log(result[0].courseCode)
                    // console.log(result)
                }
                //res.json({result : result})
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }

})

app.post('/createOutline', (req, res) => {
    const courseYear = req.body.courseYear
    const courseCode = req.body.selectedCourse
    const department = req.body.department
    const termLength = req.body.termLength
    const description = req.body.description
    const name = req.body.name
    const office = req.body.office
    const phone = req.body.phone
    const email = req.body.email
    const consultHours = req.body.consultHours
    const textbook = req.body.textbook
    const otherResources = req.body.otherResources
    const recommended = req.body.recommended
    const homework = req.body.homework
    const quizzes = req.body.quizzes
    const labs = req.body.labs
    const midterm = req.body.midterm
    const final = req.body.final
    const labHours = req.body.labHours
    const tutHours = req.body.tutHours
    const lectureHours = req.body.lectureHours
    const homeworkDescription = req.body.homeworkDescription
    const quizzesDescription = req.body.quizzesDescription
    const labsDescription = req.body.labsDescription
    const midtermDescription = req.body.midtermDescription
    const lateSubPolicy = req.body.lateSubPolicy
    const assSubLocker = req.body.assSubLocker
    const electronicDescription = req.body.electronicDescription
    const clickerUse = req.body.clickerUse
    const GA1 = req.body.ga1
    const GA2 = req.body.ga2
    const GA3 = req.body.ga3
    const GA4 = req.body.ga4
    const GA5 = req.body.ga5
    const GA6 = req.body.ga6
    const GA7 = req.body.ga7
    const GA8 = req.body.ga8
    const GA9 = req.body.ga9
    const GA10 = req.body.ga10
    const GA11 = req.body.ga11
    const GA12 = req.body.ga12
    const topics = req.body.topics
    const topicsGA = req.body.gaIndicators
    const finalDescription = req.body.finalDescription
    const gaJustification = req.body.gaJustification
    const academicCalendarCopy = req.body.academicCalendarCopy
    const academicUnitsEngSci = req.body.academicUnitsEngSci
    const academicUnitsEngDes = req.body.academicUnitsEngDes
    const taHours = req.body.taHours

    const sqlInsert = `INSERT INTO CourseOutline VALUES ('PR', '1', '${courseYear}', '${courseCode}', '${email}', '${name}', '${department}', 
    '${termLength}', '${phone}', '${description}', '${consultHours}', '${office}', '${textbook}', '${otherResources}', '${recommended}', '${homework}', 
    '${quizzes}', '${labs}', '${midterm}', '${final}', '${GA1}', '${GA2}', '${GA3}', '${GA4}', '${GA5}', '${GA6}', '${GA7}', '${GA8}', '${GA9}', '${GA10}',
    '${GA11}', '${GA12}', '${topics}', '${topicsGA}', '${labHours}', '${tutHours}', '${homeworkDescription}', '${labsDescription}',
    '${midtermDescription}', '${finalDescription}', '${lateSubPolicy}', '${assSubLocker}', '${electronicDescription}','${clickerUse}', '${lectureHours}',
    '${quizzesDescription}', '${gaJustification}', '${academicCalendarCopy}', '${academicUnitsEngSci}', '${academicUnitsEngDes}')`
    console.log(sqlInsert);
    db.query(sqlInsert, (err, results) => {
        if (err) return res.status(400).send(err.sqlMessage);
        return res.send(results)
    });
})

//get timestamps
app.get('/timestamps/:courseCode', (req, res) => {
    
    const token = req.headers['x-access-token']
    courseCode = req.params.courseCode;
    
    try {
        const decoded = jwt.verify(token, 'oneSyllabus3350')
        const email = decoded.email;
        db.query('SELECT * FROM EditHistory WHERE email = ? and courseCode = ? ORDER BY editTime desc limit 1',
            [email, courseCode],
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                   console.log(result[0].email)
                   console.log(result[0].courseCode)
                   console.log(result)
                }
                //res.json({result : result})
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
});

app.get('/editHistory', (req, res) => {
     try {
       // const decoded = jwt.verify(token, 'oneSyllabus3350')
       // const email = decoded.email;
        db.query('SELECT * FROM EditHistory ORDER BY editTime DESC, coursecode',
         
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                   console.log(result)
                }
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
});

//get previous courses
app.get('/prevOutlines/:prevCourse', async (req, res) => {
    const token = req.headers['x-access-token']
    prevCourse = req.params.prevCourse;

    try {
        const decoded = jwt.verify(token, 'oneSyllabus3350')
        const email = decoded.email;
        db.query('SELECT * FROM PDFArchive WHERE courseCode = ?',
            [prevCourse],
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                   // console.log(result[0].email)
                   // console.log(result[0].courseCode)
                   // console.log(result)
                }
                //res.json({result : result})
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }

})


//get pre-req
app.get('/prereqlinks/:prevCourse', async (req, res) => {
    const token = req.headers['x-access-token']
    prevCourse = req.params.prevCourse;

    try {
        const decoded = jwt.verify(token, 'oneSyllabus3350')
        const email = decoded.email;
        db.query('SELECT * FROM PDFArchive a, PreReq r WHERE r.CourseCode = ? and r.preCode = a.courseCode',
            [prevCourse],
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                   // console.log(result[0].email)
                   // console.log(result[0].courseCode)
                   
                }
                //res.json({result : result})
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})

//get anti-req
//get pre-req
app.get('/antireqlinks/:prevCourse', async (req, res) => {
    const token = req.headers['x-access-token']
    prevCourse = req.params.prevCourse;

    try {
        const decoded = jwt.verify(token, 'oneSyllabus3350')
        const email = decoded.email;
        db.query('SELECT * FROM PDFArchive a, AntiReq r WHERE r.CourseCode = ? and r.preCode = a.courseCode',
            [prevCourse],
            (err, result) => {
                if (err) {
                    console.log(err);
                    //res.send({ err: err });
                }

                if (result.length > 0) {
                   // console.log(result[0].email)
                   // console.log(result[0].courseCode)
                   
                }
                //res.json({result : result})
                res.send(result)
            })

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'Invalid token' })
    }
})

app.listen(port, () => {
    console.log("Server running on 3000")
})
