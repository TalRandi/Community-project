import { Button } from 'react-bootstrap';
import { db } from '../Firebase/firebase'


const Menu = (props) => {

    let setPhoneNumber = props.setPhoneNumber
    let setEmail = props.setEmail
    let setInstructorName = props.setInstructorName
    let setContent = props.setContent
    // let instructor_name = props.instructor_name
    let course_name = props.course_name
    let setStartDate = props.setStartDate
    let setEndDate = props.setEndDate
    let setListOfStudent = props.setListOfStudent
    let name = props.name
    let setListOfCourses = props.setListOfCourses

    //Course details clicked from student page
    const course_details = e => {

        setContent(e.target.id)
        db.collection("courses").where("course_name", "==", course_name)
            .get()
            .then(querySnapshot => {

                querySnapshot.docs.forEach(element => {
                    setStartDate(element.data().start_date)
                    setEndDate(element.data().end_date)
                });
            })
        let new_list_student = []
        db.collection("users").where("course", "==", course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    new_list_student.push({ 'name': element.data().name, 'phone_number': element.data().phone_number })
                });
                setListOfStudent(new_list_student)
            })
    }
    //Instructor details clicked from student page
    const instructor_details = e => {

        setContent(e.target.id)
        let temp_instructor
        db.collection("courses").where("course_name", "==", course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    temp_instructor = element.data().instructor_name
                });
                db.collection("instructors").where("name", "==", temp_instructor)
                    .get()
                    .then(querySnapshot2 => {

                        querySnapshot2.docs.forEach(element2 => {
                            setPhoneNumber(element2.data().phone_number)
                            setEmail(element2.data().email)
                            setInstructorName(temp_instructor)
                        });
                    })
            })
    }
    //Courses list clicked from instructor page
    const courses_list = e =>{

        let courses_arr = []
        
        db.collection("courses").where("instructor_name", "==", name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    courses_arr.push(element.data().course_name)
                });
                setListOfCourses(courses_arr)
                setContent(e.target.id)
            })        
    }
    //Student list button clicked from instructor page
    const student_list = e =>{

        let students_arr = []
        
        db.collection("courses").where("instructor_name", "==", name)
            .get()
            .then(querySnapshot => {
                
                querySnapshot.docs.forEach(element => {
                    
                    db.collection("users").where("course", "==", element.data().course_name)
                    .get()
                    .then(querySnapshot2 => {
                        querySnapshot2.docs.forEach(element2 => {
                            students_arr.push(element2.data())
                        });
                    })  
                });
                setListOfStudent(students_arr)
                setContent(e.target.id)
            })   
    }
    return (
        <div className="side-menu">
            {(() => {
                //student
                if (props.type === 0) {
                    return (
                        <div className="menu-content">
                            <Button  >תכנים קבוצתיים</Button><br />
                            <Button >תכני קורס</Button><br />
                            <Button onClick={course_details} id="course_details">פרטי קורס</Button><br />
                            <Button onClick={instructor_details} id="instructor_details">פרטי מדריך</Button>
                        </div>
                    )
                }
                //instructor
                else if (props.type === 1) {
                    return (
                        <div className="menu-content">
                            <Button onClick={courses_list} id = "courses_list">רשימת קורסים</Button><br />
                            <Button onClick={student_list} id = "student_list_from_instructor">רשימת סטודנטים</Button>
                        </div>
                    )
                }
                //admin
                else if (props.type === 2) {
                    return (
                        <div className="menu-content">
                            <Button >רשימת מדריכים</Button><br />
                            <Button >רשימת קורסים</Button>
                        </div>
                    )
                }
            })()}
        </div>
    );

}

export default Menu;