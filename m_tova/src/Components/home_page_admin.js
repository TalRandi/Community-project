import NavBar from './navigation_bar';
import Menu from './menu';

const HomeAdmin = (props) => {
    return (
        <div>
            <NavBar
                setName={props.setName}
                setType={props.setType}
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
                course_name={props.course_name}
                setListOfCourses={props.setListOfCourses}
                type={props.type}
                setListOfStudent={props.setListOfStudent}
                setListOfInstructors={props.setListOfInstructors}
                setContent={props.setContent}
                total_course_list_from_admin={props.total_course_list_from_admin}
                setTotalCourseListFromAdmin={props.setTotalCourseListFromAdmin}
                total_instructor_list_from_admin={props.total_instructor_list_from_admin}
                setTotalInstructorListFromAdmin={props.setTotalInstructorListFromAdmin}
                setAddedButtonFromAdmin={props.setAddedButtonFromAdmin}
                added_button_from_admin={props.added_button_from_admin}
            />
        </div>
    );
}

export default HomeAdmin;