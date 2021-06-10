import NavBar from './navigation_bar';
import Menu from './menu';

const HomeInstructor = (props) => {
    return (  
        <div>
            <NavBar 
                setName = {props.setName}
                setType = {props.setType}
                type={props.type}
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
                list_of_student={props.list_of_student}
                name = {props.name}
                setContent = {props.setContent}
                type = {props.type}
                total_student_list_from_instructor={props.total_student_list_from_instructor} 
                setTotalStudentListFromInstructor ={props.setTotalStudentListFromInstructor}
                setTotalCourseListFromInstructor ={props.setTotalCourseListFromInstructor}/>
        </div>
    );
}
 
export default HomeInstructor;