// import firebase from '../Firebase/firebase';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import '../App.css';
import logo from '../Images/m_tova_logo.jpeg';
import { db, storage } from '../Firebase/firebase'

const Login = props => {

    const [password, setPassword] = useState('');


    let setAuthorized = props.setAuthorized;
    let type = props.type;
    let setType = props.setType;
    let name = props.name;
    let setName = props.setName;
    let setCourseName = props.setCourseName
    let setContent= props.setContent
    let setArrOfClasses = props.setArrOfClasses
    let setListOfCourses = props.setListOfCourses

    //Submit button clicked
    const login_clicked = () => {

        //Invalid input
        if (name === '' || password === '') {
            alert('חובה למלא שם משתמש וסיסמא');
            return;
        }

        switch (type) {

            //Student
            case 0:
                
                db.collection("users").where("name", "==", name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length === 0) {
                        alert('משתמש לא קיים');
                        return;
                    }
                    
                    querySnapshot.docs.forEach(element => {
    
                        //Exists user
                        if (element.data().password === password) {
                            
                            setAuthorized(true);
                            setCourseName(element.data().course)
 
                            storage.ref().child(element.data().course).listAll().then(list=>{
                                setArrOfClasses(list.prefixes)
                            })
                            setContent("course_content")
                        }
                        //Unknown user
                        else {
                            alert("סיסמא שגויה");
                        }
                    });
                })
                break;
                //Instructor
                case 1:
                    db.collection("instructors").where("name", "==", name)
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
                                let courses_arr_instructor = []

                                db.collection("courses").where("instructor_name", "==", name)
                                    .get()
                                    .then(querySnapshot => {
                                        querySnapshot.docs.forEach(element => {
                                            courses_arr_instructor.push(element.data().course_name)
                                        });
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
                        })   
                break;
            //Admin
            case 2:
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
                            let courses_arr_admin = []

                            db.collection("courses").get().then(querySnapshot => {
                                querySnapshot.forEach(doc => {
                                    courses_arr_admin.push(doc.data())
                                });
                                setListOfCourses(courses_arr_admin)
                            })
                            setContent("courses_list_from_admin")
                        }
                        
                        //Unknown user
                        else 
                            alert("סיסמא שגויה");
                    });
                })            
                break;
        
            default:
                break;
        }
    }

    useEffect(() => {

    }, []);

    return (
        <div>
            <div id="login-form">
                <h3 id="login-title">התחברות</h3>

                <div className="form-group">
                    <input id="name-input" type="text" onChange={e => setName(e.target.value)} className="form-control" placeholder="שם משתמש" />
                </div>

                <div className="form-group">
                    <input type="password" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="סיסמא" />
                </div>
                <div>
                    <input className="radio-input" type="radio" name="student" checked={type === 0} onChange={() => setType(0)} />סטודנט
                    <input className="radio-input" type="radio" name="instructor" checked={type === 1} onChange={() => setType(1)} />מדריך
                    <input className="radio-input" type="radio" name="admin" checked={type === 2} onChange={() => setType(2)} />מנהל
                </div>

                <button onClick={login_clicked} type="submit" className="btn btn-dark btn-lg btn-block">התחבר</button>
                <p className="forgot-password text-right">
                    <a href = "/">שכחתי סיסמא</a>
                </p>
            </div>
            <img id="logo" src={logo} alt = ""/>

        </div>
    );
}

export default Login;