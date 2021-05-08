import './App.css';
// import Button from 'react-bootstrap/Button';
import Login from './Components/login';
import HomeStudent from './Components/home_page_student';
import HomeInstructor from './Components/home_page_instructor';
import HomeAdmin from './Components/home_page_admin';
import {useState} from 'react'
import {BrowserRouter as Router} from 'react-router-dom';
// import { Redirect } from "react-router-dom"


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [name, setName] = useState('');
  const [type, setType] = useState(0);
  const [isAuthorized , setAuthorized ] = useState(false);


  return (

    <Router>
      <div className="App">

          {isAuthorized ? (  
            <div>
              {(() => {
                switch(type){
                  //student
                  case 0:
                    return(
                      <HomeStudent 
                      isAuthorized = {isAuthorized} 
                      setAuthorized = {setAuthorized} 
                      type = {type}
                      name = {name}/>
                    )
                  //instructor
                  case 1:
                    return(
                      <HomeInstructor 
                      isAuthorized = {isAuthorized} 
                      setAuthorized = {setAuthorized} 
                      type = {type}
                      name = {name}/>
                    )
                  //admin
                  case 2:
                    return(
                      <HomeAdmin 
                      isAuthorized = {isAuthorized} 
                      setAuthorized = {setAuthorized} 
                      type = {type}
                      name = {name}/>
                    )

                  default:
                    return <div><h1>Error</h1></div>
                }
              })()}
            </div>                  
          ) : (
            <div>
              <Login 
                isAuthorized = {isAuthorized} 
                setAuthorized = {setAuthorized} 
                type = {type} 
                setType ={setType}
                name = {name}
                setName = {setName}/>
            </div>
          )}
        
      </div>

    </Router>
  );
}

export default App;
