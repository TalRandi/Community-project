import './App.css';
import Login from './Components/login';
import HomeStudent from './Components/home_page_student';
import HomeInstructor from './Components/home_page_instructor';
import HomeAdmin from './Components/home_page_admin';
import { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import InternalContent from './Components/internal_content';


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
                        setName = {setName}
                        setType = {setType}
                        setCourseName = {setCourseName}
                        setListOfCourses = {setListOfCourses}
                      />
                      <InternalContent
                        content={content}
                        course_name={course_name}
                        instructor_name={instructor_name}
                        email={email}
                        phone_number={phone_number}
                        start_date={start_date}
                        end_date={end_date}
                        list_of_student={list_of_student} />
                    </div>
                  )
                //instructor
                case 1:
                  return (
                    <div>
                      <HomeInstructor
                        setName = {setName}
                        setType = {setType}
                        setCourseName = {setCourseName}
                        setPhoneNumber = {setPhoneNumber}
                        setEmail = {setEmail}
                        setInstructorName = {setInstructorName}
                        setStartDate = {setStartDate}
                        setEndDate = {setEndDate}
                        setListOfStudent = {setListOfStudent}
                        setListOfCourses = {setListOfCourses}
                        isAuthorized={isAuthorized}
                        setAuthorized={setAuthorized}
                        setContent = {setContent}
                        type={type}
                        name={name} 
                        />
                      <InternalContent
                        name = {name} 
                        setListOfStudent = {setListOfStudent}
                        setStartDate = {setStartDate}
                        setEndDate = {setEndDate}
                        content={content}
                        list_of_courses ={list_of_courses}
                        list_of_student = {list_of_student}/>
                    </div>
                  )
                //admin
                case 2:
                  return (
                    <HomeAdmin
                      setName = {setName}
                      setType = {setType}
                      setCourseName = {setCourseName}
                      setPhoneNumber = {setPhoneNumber}
                      setEmail = {setEmail}
                      setInstructorName = {setInstructorName}
                      setStartDate = {setStartDate}
                      setEndDate = {setEndDate}
                      setListOfStudent = {setListOfStudent}
                      setListOfCourses = {setListOfCourses}
                      isAuthorized={isAuthorized}
                      setContent = {setContent}
                      setAuthorized={setAuthorized}
                      type={type}
                      name={name} />
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
              setName={setName}
              setCourseName={setCourseName}
              setListOfStudent = {setListOfStudent} 
              />
          </div>
        )}

      </div>

    </Router>
  );
}

export default App;
