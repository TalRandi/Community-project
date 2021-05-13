import NavBar from './navigation_bar';
import Menu from './menu';

const HomeInstructor = (props) => {
    return (  
        <div>
            <NavBar 
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