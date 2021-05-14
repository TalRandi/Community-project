import NavBar from './navigation_bar';
import Menu from './menu';

const HomeInstructor = (props) => {
    return (  
        <div>
            <NavBar 
                setName = {props.setName}
                setType = {props.setType}
                setCourseName = {props.setCourseName}
                setPhoneNumber = {props.setPhoneNumber}
                setEmail = {props.setEmail}
                setInstructorName = {props.setInstructorName}
                setContent = {props.setContent}
                setStartDate = {props.setStartDate}
                setEndDate = {props.setEndDate}
                setListOfStudent = {props.setListOfStudent}
                setListOfCourses = {props.setListOfCourses}

                isAuthorized = {props.isAuthorized} 
                setAuthorized = {props.setAuthorized}
                name = {props.name}/>
            <Menu 
                setListOfStudent = {props.setListOfStudent}
                setListOfCourses = {props.setListOfCourses}
                name = {props.name}
                setContent = {props.setContent}
                type = {props.type}/>
        </div>
    );
}
 
export default HomeInstructor;