import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import '../App.css';
import logo from '../Images/m_tova_logo.jpeg';
import { db, storage } from '../Firebase/firebase'
import { Button } from 'react-bootstrap';

import * as emailjs from 'emailjs-com'
import{ init } from 'emailjs-com';
init("user_Y2qLV3DeopuCmHbIa8CFe");

const Login = props => {

    const [password, setPassword] = useState('');
    const [forgot_pass, setForgotPass] = useState(false)
    const [reset_pass, setResetPass] = useState('')
    const [reset_pass_name, setResetPassName] = useState('')

    let setAuthorized = props.setAuthorized;
    let setType = props.setType;
    let name = props.name;
    let setName = props.setName;
    let setCourseName = props.setCourseName
    let setContent= props.setContent
    let setArrOfClasses = props.setArrOfClasses
    let setListOfCourses = props.setListOfCourses
    let setTotalCourseListFromAdmin = props.setTotalCourseListFromAdmin
    let setTotalCourseListFromInstructor =props.setTotalCourseListFromInstructor

    const reset_password = (name, e) =>{

        //Student
        db.collection("users").where("name", "==", name)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.docs.length === 0) 
            {
                //Instructor
                db.collection("instructors").where("name", "==", name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length === 0) {
                        //Admin
                        db.collection("administrators").where("name", "==", name)
                        .get()
                        .then(querySnapshot => {
                            if (querySnapshot.docs.length === 0) {
                                return;
                            }
                            querySnapshot.docs.forEach(element => {
                                setResetPass(element.data().password)
                            });
                        })    
                    }
                    //Instructor
                    querySnapshot.docs.forEach(element => {
                        setResetPass(element.data().password)
                    });
                })
            }
            //Student
            querySnapshot.docs.forEach(element => {
                setResetPass(element.data().password)
            });
        })
        console.log(reset_pass);
        console.log(reset_pass_name);
        
        sendMail(e);
    }

    const sendMail = (e) =>{
       
        e.preventDefault(); // Prevents default refresh by the browser

        emailjs.sendForm(
            'service_oui61z6',
            'template_cdtr97i',
            '#forgot-pass',
            'user_Y2qLV3DeopuCmHbIa8CFe'
            )
            .then((result) => {
                alert("Message Sent, We will get back to you shortly", result.text);
            },
            (error) => {
                alert("An error occurred, Please try again", error.text);
            });     
    } 

    //Submit button clicked
    const login_clicked = (e) => {
        if(e.key !== 'Enter' && e.type !== 'click')
            return
        //Invalid input
        if (name === '' || password === '') {
            alert('חובה למלא שם משתמש וסיסמא');
            return;
        }
        setContent("loading")


        // let temp = name.trim()
        // console.log("name is " ,name.length, "trim is ",temp.length);
        //Student
        db.collection("users").where("name", "==", name)
        .get()
        .then(querySnapshot => {
            if (querySnapshot.docs.length === 0) 
            {
                //Instructor
                db.collection("instructors").where("name", "==", name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length === 0) {
                        //Admin
                        db.collection("administrators").where("name", "==", name)
                        .get()
                        .then(querySnapshot => {
                            if (querySnapshot.docs.length === 0) {
                                alert('משתמש לא קיים');
                                return;
                            }
                            querySnapshot.docs.forEach(element => {

                                //Exists user
                                if (element.data().password === password)
                                {
                                    setAuthorized(true);
                                    setType(2)
                                    let courses_arr_admin = []

                                    db.collection("courses").get().then(querySnapshot => {
                                        querySnapshot.forEach(doc => {
                                            courses_arr_admin.push(doc.data())
                                        });
                                        courses_arr_admin.sort((course1,course2)=>{   // sort by course name
                                            if(course1.course_name > course2.course_name)
                                                return 1
                                            else if(course1.course_name < course2.course_name)
                                                  return -1
                                            return 0
                                         })
                                        setListOfCourses(courses_arr_admin)
                                        setTotalCourseListFromAdmin(courses_arr_admin)
                                    })
                                    setContent("courses_list_from_admin")
                                    return
                                }
                                
                                //Unknown user
                                else alert("סיסמא שגויה");
                            });
                        })    
                    }
                    querySnapshot.docs.forEach(element => {

                        //Exists user
                        if (element.data().password === password)
                        {
                            setAuthorized(true);
                            setType(1)
                            let courses_arr_instructor = []

                            db.collection("courses").where("instructor_name", "==", name)
                                .get()
                                .then(querySnapshot => {
                                    querySnapshot.docs.forEach(element => {
                                        courses_arr_instructor.push(element.data().course_name)
                                    });
                                    courses_arr_instructor.sort((course1, course2) => {   // sort the list by course name 
                                        return course1 > course2 ? 1 : -1
                                    })
                                    setTotalCourseListFromInstructor(courses_arr_instructor)
                                    setListOfCourses(courses_arr_instructor)
                                    setContent("courses_list")
                                })
                        }
                        //Unknown user
                        else 
                            alert("סיסמא שגויה");
                    });
                })
                let students_arr = []

                db.collection("courses").where("instructor_name", "==", name)
                    .get()
                    .then(querySnapshot => {
                        
                        querySnapshot.docs.forEach(element => {
                            
                            db.collection("users").where("course", "==", element.data().course_name)
                            .get()
                            .then(querySnapshot2 => {
                                
                                querySnapshot2.docs.forEach(element2 => {
                                    students_arr.push(element2.data())
                                });
                            })  
                        });
                        props.setListOfStudent(students_arr)
                        return
                    }) 

            }
            querySnapshot.docs.forEach(element => {

                //Exists user
                if (element.data().password === password) {
                    
                    setAuthorized(true);
                    setType(0)
                    setCourseName(element.data().course)

                    storage.ref().child(element.data().course).listAll().then(list=>{
                        setArrOfClasses(list.prefixes)
                    })
                    setContent("course_content")
                    return
                }
                //Unknown user
                else alert("סיסמא שגויה");
            });
        })
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div id="login-form" onKeyPress={login_clicked}>
                <h3 id="login-title">התחברות</h3>

                <div className="form-group">
                    <input id="name-input" type="text" onChange={e => setName(e.target.value.trim())} className="form-control" placeholder="שם משתמש" />
                </div>

                <div className="form-group">
                    <input type="password" onChange={e => setPassword(e.target.value.trim())} className="form-control" placeholder="סיסמא" />
                </div>

                <button onClick={login_clicked} type="submit" className="btn btn-dark btn-lg btn-block">התחבר</button>
                {/* <button onClick={test} type="submit" className="btn btn-dark btn-lg btn-block">test</button> */}
                <p className="forgot-password text-right" onClick = {() => setForgotPass(!forgot_pass)}>
                    שכחתי סיסמא
                </p>
                {forgot_pass && 
                    <form id = "forgot-pass">
                        <input onChange= {(e) => {setResetPassName(e.target.value); }} name = "from_name" className="form-control" type="text" placeholder = "הכנס שם משתמש"/>
                        <input id = "reset_pass_input" value = {reset_pass} onChange= {(e) => setResetPass(reset_pass)} name = "password" className="form-control" type="text" ></input>
                        <Button className="btn btn-dark btn-lg btn-block" type="submit" onClick = {(e) => reset_password(reset_pass_name, e)}>שלח</Button>
                    </form>
                }
            </div>
            <img id="logo" src={logo} alt = ""/>

        </div>
    );
}

export default Login;