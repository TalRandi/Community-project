import Login from './Components/login';
import HomeStudent from './Components/home_page_student';
import HomeInstructor from './Components/home_page_instructor';
import HomeAdmin from './Components/home_page_admin';
import {  useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import InternalContent from './Components/internal_content';
import './App.css';
import Footer from './Components/footer';


function App() {

  const [name, setName] = useState('');
  const [type, setType] = useState(0);
  const [isAuthorized, setAuthorized] = useState(false);
  const [course_name, setCourseName] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [instructor_name, setInstructorName] = useState('')
  const [content, setContent] = useState('') // save the type of internal content
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [list_of_student, setListOfStudent] = useState([])
  const [list_of_courses, setListOfCourses] = useState([])
  const [list_of_instructors, setListOfInstructors] = useState([])
  const [arr_of_classes, setArrOfClasses] = useState([])   //list of classes
  const [arr_of_class_content, setClassContent] = useState([])   //list of content inside class page
  const [students_shared_content, setStudentSharedContent] = useState([])
  const [specific_student_shered_content, setSpecificStudentSheredContent] = useState([])
  const [total_group_content, setTotalGroupContent] = useState([]) // for the search in group content
  const [total_course_list_from_admin, setTotalCourseListFromAdmin] = useState([])// for the search in courses list from admin
  const [total_instructor_list_from_admin, setTotalInstructorListFromAdmin] = useState([])// for the search in instructors list from admin
  const [added_button_from_admin, setAddedButtonFromAdmin] = useState(false)
  const [total_student_list_from_instructor, setTotalStudentListFromInstructor] = useState([])// for the search in students list from instructor



  return (
    <Router>
      <div className="App">
        {isAuthorized ? (
          <div>
            {(() => {
              switch (type) {
                //student
                case 0:
                  return (
                    <div>
                      <HomeStudent
                        isAuthorized={isAuthorized}
                        setAuthorized={setAuthorized}
                        type={type}
                        name={name}
                        course_name={course_name}
                        instructor_name={instructor_name}
                        setInstructorName={setInstructorName}
                        setEmail={setEmail}
                        setPhoneNumber={setPhoneNumber}
                        setContent={setContent}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setListOfStudent={setListOfStudent}
                        setName={setName}
                        setType={setType}
                        setCourseName={setCourseName}
                        setListOfCourses={setListOfCourses}
                        setArrOfClasses={setArrOfClasses}
                        students_shared_content={students_shared_content}
                        setStudentSharedContent={setStudentSharedContent}
                        total_group_content={total_group_content}
                        setTotalGroupContent={setTotalGroupContent}
                      />
                      <InternalContent
                        student_name={name}
                        type={type}
                        setContent={setContent}
                        arr_of_class_content={arr_of_class_content}
                        setClassContent={setClassContent}
                        setCourseName={setCourseName}
                        arr_of_classes={arr_of_classes}
                        content={content}
                        course_name={course_name}
                        instructor_name={instructor_name}
                        email={email}
                        phone_number={phone_number}
                        start_date={start_date}
                        end_date={end_date}
                        list_of_student={list_of_student}
                        students_shared_content={students_shared_content}
                        specific_student_shered_content={specific_student_shered_content}
                        setStudentSharedContent={setStudentSharedContent}
                        setSpecificStudentSheredContent={setSpecificStudentSheredContent}
                        total_group_content={total_group_content}
                        setTotalGroupContent={setTotalGroupContent}
                      />
                      <Footer />
                    </div>
                  )
                //instructor
                case 1:
                  return (
                    <div>
                      <HomeInstructor
                        setName={setName}
                        setType={setType}
                        setCourseName={setCourseName}
                        setPhoneNumber={setPhoneNumber}
                        setEmail={setEmail}
                        setInstructorName={setInstructorName}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setListOfStudent={setListOfStudent}
                        setListOfCourses={setListOfCourses}
                        isAuthorized={isAuthorized}
                        setAuthorized={setAuthorized}
                        setContent={setContent}
                        type={type}
                        name={name}
                        total_student_list_from_instructor={total_student_list_from_instructor} 
                        setTotalStudentListFromInstructor ={setTotalStudentListFromInstructor}
                        list_of_student={list_of_student}
                        
                      />
                      <InternalContent
                        name={name}
                        type={type}
                        setCourseName={setCourseName}
                        setListOfStudent={setListOfStudent}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setContent={setContent}
                        setArrOfClasses={setArrOfClasses}
                        setClassContent={setClassContent}
                        course_name={course_name}
                        arr_of_class_content={arr_of_class_content}
                        arr_of_classes={arr_of_classes}
                        content={content}
                        list_of_courses={list_of_courses}
                        list_of_student={list_of_student}
                        students_shared_content={students_shared_content}
                        specific_student_shered_content={specific_student_shered_content}
                        setStudentSharedContent={setStudentSharedContent}
                        setSpecificStudentSheredContent={setSpecificStudentSheredContent}
                        total_group_content={total_group_content}
                        setTotalGroupContent={setTotalGroupContent}
                        total_student_list_from_instructor={total_student_list_from_instructor} 
                        setTotalStudentListFromInstructor ={setTotalStudentListFromInstructor}
                        />
                      <Footer />
                    </div>
                  )
                //admin
                case 2:
                  return (
                    <div>
                      <HomeAdmin
                        setName={setName}
                        setType={setType}
                        setCourseName={setCourseName}
                        course_name={course_name}
                        setPhoneNumber={setPhoneNumber}
                        setEmail={setEmail}
                        setInstructorName={setInstructorName}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        setListOfStudent={setListOfStudent}
                        setListOfCourses={setListOfCourses}
                        isAuthorized={isAuthorized}
                        setContent={setContent}
                        setAuthorized={setAuthorized}
                        type={type}
                        name={name}
                        setListOfInstructors={setListOfInstructors}
                        total_course_list_from_admin={total_course_list_from_admin}
                        setTotalCourseListFromAdmin={setTotalCourseListFromAdmin}
                        total_instructor_list_from_admin={total_instructor_list_from_admin}
                        setTotalInstructorListFromAdmin={setTotalInstructorListFromAdmin}
                        setAddedButtonFromAdmin={setAddedButtonFromAdmin}
                        added_button_from_admin={added_button_from_admin}
                      />
                      <InternalContent
                        list_of_courses={list_of_courses}
                        list_of_instructors={list_of_instructors}
                        content={content}
                        setContent={setContent}
                        setListOfCourses={setListOfCourses}
                        setListOfInstructors={setListOfInstructors}
                        setCourseName={setCourseName}
                        arr_of_class_content={arr_of_class_content}
                        setClassContent={setClassContent}
                        arr_of_classes={arr_of_classes}
                        setArrOfClasses={setArrOfClasses}
                        course_name={course_name}
                        students_shared_content={students_shared_content}
                        specific_student_shered_content={specific_student_shered_content}
                        setStudentSharedContent={setStudentSharedContent}
                        setSpecificStudentSheredContent={setSpecificStudentSheredContent}
                        total_group_content={total_group_content}
                        setTotalGroupContent={setTotalGroupContent}
                        total_course_list_from_admin={total_course_list_from_admin}
                        setTotalCourseListFromAdmin={setTotalCourseListFromAdmin}
                        total_instructor_list_from_admin={total_instructor_list_from_admin}
                        setTotalInstructorListFromAdmin={setTotalInstructorListFromAdmin}
                        setAddedButtonFromAdmin={setAddedButtonFromAdmin}
                        list_of_student={list_of_student}

                        />

                      <Footer />
                    </div>

                  )

                default:
                  return <div><h1>Error</h1></div>
              }
            })()}
          </div>
        ) : (
          <div>
            <Login
              isAuthorized={isAuthorized}
              setAuthorized={setAuthorized}
              type={type}
              setType={setType}
              name={name}
              setContent={setContent}
              setName={setName}
              setListOfCourses={setListOfCourses}
              setArrOfClasses={setArrOfClasses}
              setCourseName={setCourseName}
              setListOfStudent={setListOfStudent}
            />
          </div>
        )}

      </div>

    </Router>
  );
}

export default App;
