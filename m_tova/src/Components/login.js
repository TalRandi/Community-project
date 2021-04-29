import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { auth } from '../Firebase/firebase'
import Button from 'react-bootstrap/Button';


class Login extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {}
    }
    test() { 
        
        auth.signInWithEmailAndPassword("t@gmail.com", "123456")
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            console.log(error);
            // ..
        });

    }
    render(){

        return(
            <div>
                <h1>Hello</h1>
                <Button onClick = {() => {this.test()}}>Click me</Button>
            </div>
        )
    }
}

export default Login;
