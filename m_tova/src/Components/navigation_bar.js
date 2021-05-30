import {Link} from 'react-router-dom';
import logo from '../Images/m_tova_logo.jpeg';


const NavBar = (props) => {

    
    //Reset all useState variables
    const log_off = () =>
    {
        props.setName('')
        props.setType(0)
        props.setCourseName('')
        props.setPhoneNumber('')
        props.setEmail('')
        props.setInstructorName('')
        props.setContent('')
        props.setStartDate('')
        props.setEndDate('')
        props.setListOfStudent([])
        props.setListOfCourses([])  
        props.setAuthorized(false);
    }
    // let day = new Date().getDate()
    // let month = new Date().getMonth() + 1
    // let year = new Date().getFullYear()
    

    return (
        <div>
            <nav>
                {/* <h3 id = "clock">{day + '/' + month + '/' + year}</h3> */}
                
                <ul className = "nav-list">
                    <h3 className = "hello-name">שלום, {props.name}</h3>
                    <img id = "small-logo" src={logo} alt = ""/>
                    <Link className = "log_off" to = "/">
                        <h3 onClick = {log_off}>התנתק</h3>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}
 
export default NavBar;