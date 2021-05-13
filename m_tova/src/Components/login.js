// import firebase from '../Firebase/firebase';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import '../App.css';
import logo from '../Images/m_tova_logo.jpeg';
import { db } from '../Firebase/firebase'

const Login = props => {

    const [password, setPassword] = useState('');


    let setAuthorized = props.setAuthorized;
    let type = props.type;
    let setType = props.setType;
    let name = props.name;
    let setName = props.setName;
    let setCourseName = props.setCourseName


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
                                setAuthorized(true);
                            
                            //Unknown user
                            else 
                                alert("סיסמא שגויה");
                        });
                    })
                break;
            //Admin
            case 2:
            
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
                    <a href="#">שכחתי סיסמא</a>
                </p>
            </div>
            <img id="logo" src={logo} />

        </div>
    );
}

export default Login;