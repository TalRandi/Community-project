import NavBar from './navigation_bar';
import Menu from './menu';


const HomeStudent = (props) => {
    return (
        <div>
            <NavBar
                setName={props.setName}
                setType={props.setType}
                type={props.type}
                setCourseName={props.setCourseName}
                setPhoneNumber={props.setPhoneNumber}
                setEmail={props.setEmail}
                setInstructorName={props.setInstructorName}
                setContent={props.setContent}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate}
                setListOfStudent={props.setListOfStudent}
                setListOfCourses={props.setListOfCourses}
                isAuthorized={props.isAuthorized}
                setAuthorized={props.setAuthorized}
                name={props.name} />
            <Menu
                students_shared_content={props.students_shared_content}
                setStudentSharedContent={props.setStudentSharedContent}
                type={props.type}
                instructor_name={props.instructor_name}
                course_name={props.course_name}
                setArrOfClasses={props.setArrOfClasses}
                setInstructorName={props.setInstructorName}
                setEmail={props.setEmail}
                setPhoneNumber={props.setPhoneNumber}
                setContent={props.setContent}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate}
                setListOfStudent={props.setListOfStudent}
                setTotalGroupContent={props.setTotalGroupContent}


            />
        </div>
    );
}

export default HomeStudent;

