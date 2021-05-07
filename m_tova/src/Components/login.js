import firebase from '../Firebase/firebase';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect} from 'react'
import '../App.css';
import logo from '../Images/m_tova_logo.jpeg';
import { db } from '../Firebase/firebase'

function Login({setAuthorized}) {

    const [choice, setChoice] = useState(0);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    // const test = () => { 
    //     firebase.auth.signInWithEmailAndPassword("t@gmail.com", "123456")
    //     .then((userCredential) => {
    //         // Signed in 
    //         var user = userCredential.user;
    //         console.log(user)
    //         // ...
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         // ..
    //     });
    // }


    //Submit button clicked
    const login_clicked = () => {
        
        //Invalid input
        if(name === '' || password === '')
        {
            alert('Name and password are required');
            return;
        }

        db.collection("users").where("name","==",name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    //Exists user
                    if(element.data().password == password )
                        setAuthorized(true);
                    
                    //Unknown user
                    else{
                        console.log("denied");
                    }
                }); 
            })

        // db.collection("users")
        //     .get()
        //     .then(querySnapshot => {
        //         querySnapshot.forEach(element => {
        //             console.log(element.data());
        //         });
        //     })
        // db.collection("users").doc("5md9lchKDGK9mebC50mA")
        //     .get()
        //     .then(querySnapshot => {
        //       console.log(querySnapshot.data());
        // });
        // db.collection("users").where("name","==","tal")
        //     .get()
        //     .then(querySnapshot => {
        //       console.log(querySnapshot);
            //   querySnapshot.docs.forEach(user=>{
            //       console.log(user.data())
            //   })
        // });
    }

    useEffect(() => {
        
    }, []);

    return (
        <div>

            <div id = "login-form">
                <h3 id = "login-title">התחברות</h3>

                <div className="form-group">
                    <input id = "name-input" type="text" onChange = {e => setName(e.target.value)} className="form-control" placeholder = "שם משתמש"/>
                </div>

                <div className="form-group">
                    <input type="password" onChange = {e => setPassword(e.target.value)} className="form-control" placeholder = "סיסמא"/>
                </div>
                <div>
                    <input className = "radio-input" type="radio" name="student" checked={choice === 0} onChange={() => setChoice(0)}/>סטודנט
                    <input className = "radio-input" type="radio" name="instructor" checked={choice === 1} onChange={() => setChoice(1)}/>מדריך
                    <input className = "radio-input" type="radio" name="admin" checked={choice === 2} onChange={() => setChoice(2)}/>אדמין
                </div>

                <button onClick = {login_clicked} type="submit" className="btn btn-dark btn-lg btn-block">התחבר</button>
                <p className="forgot-password text-right">
                    <a href="#">שכחתי סיסמא</a>
                </p>
            </div>
            <img id = "logo" src={logo} />
              
        </div>
    );
}

export default Login;