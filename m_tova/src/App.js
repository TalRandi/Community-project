import './App.css';
// import Button from 'react-bootstrap/Button';
import Login from './Components/login';
import HomeStudent from './Components/home_page_student';
import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [isAuthorized , setAuthorized ] = useState(false);

  return (
  
    <Router>

      <div className="App">


          
          {isAuthorized ? (
            <HomeStudent/>
          ) : (
            <Login isAuthorized = {isAuthorized} setAuthorized = {setAuthorized}/>
          )}
          <Switch>
            <Route exact path="/" component = {Login}/>
            <Route exact path = "/student" component = {HomeStudent}/>
          </Switch> 
        
      </div>

    </Router>
  );
}

export default App;
