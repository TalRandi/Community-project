import NavBar from './navigation_bar';
import Menu from './menu';


const HomeStudent = (props) => {
    return ( 
        <div>
            <NavBar 
                isAuthorized = {props.isAuthorized} 
                setAuthorized = {props.setAuthorized}
                name = {props.name}/>
            <Menu 
                type = {props.type} 
                name = {props.name}
                course_name={props.course_name}
                setInstructorName={props.setInstructorName}
                setEmail={props.setEmail}
                setPhoneNumber={props.setPhoneNumber}
                instructor_name={props.instructor_name}
                setContent={props.setContent}
                />
        </div>
    );
}
 
export default HomeStudent;

