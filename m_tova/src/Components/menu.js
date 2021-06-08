import { Button } from 'react-bootstrap';
import { db, storage } from '../Firebase/firebase'


const Menu = (props) => {

    let setPhoneNumber = props.setPhoneNumber
    let setEmail = props.setEmail
    let setInstructorName = props.setInstructorName
    let setContent = props.setContent
    let course_name = props.course_name
    let setStartDate = props.setStartDate
    let setEndDate = props.setEndDate
    let setListOfStudent = props.setListOfStudent
    let name = props.name
    let setListOfCourses = props.setListOfCourses
    let setListOfInstructors = props.setListOfInstructors
    let setArrOfClasses = props.setArrOfClasses
    let setStudentSharedContent = props.setStudentSharedContent
    let setTotalGroupContent = props.setTotalGroupContent
    let setTotalCourseListFromAdmin = props.setTotalCourseListFromAdmin
    let setTotalInstructorListFromAdmin = props.setTotalInstructorListFromAdmin
    let added_button_from_admin=props.added_button_from_admin
    let setAddedButtonFromAdmin=props.setAddedButtonFromAdmin
    let setTotalStudentListFromInstructor =props.setTotalStudentListFromInstructor
    let list_of_student =props.list_of_student
    let setTotalCourseListFromInstructor =props.setTotalCourseListFromInstructor

    //Course details clicked from student page
    const course_details = e => {

        setContent("loading")
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
                new_list_student.sort((student1,student2)=>{   // sort by student name
                    if(student1.name > student2.name)
                        return 1
                    else if(student1.name < student2.name)
                          return -1
                    return 0
                 })

                setListOfStudent(new_list_student)
                setContent(e.target.id)
            })
    }
    //Instructor details clicked from student page
    const instructor_details = e => {

        setContent("loading")
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
                            setContent(e.target.id)
                        });
                    })
            })
    }
    //Courses list clicked from instructor page
    const courses_list_from_instructor = e => {

        setContent(e.target.id)
        let courses_arr_instructor = []

        db.collection("courses").where("instructor_name", "==", name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    courses_arr_instructor.push(element.data().course_name)
                });
                courses_arr_instructor.sort((course1, course2) => {   // sort the list by student name 
                    return course1 > course2 ? 1 : -1
                })
                setTotalCourseListFromInstructor(courses_arr_instructor)
                setListOfCourses(courses_arr_instructor)
            })
    }

    //Student list button clicked from instructor page
    const student_list = e => {
        setTotalStudentListFromInstructor(list_of_student)
        setContent(e.target.id)
    }

    //Instructor list button clicked from admin page
    const instructors_list = e => {
        setAddedButtonFromAdmin(false)
        let instructors_arr = []

        db.collection("instructors").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                instructors_arr.push(doc.data())
            });
            instructors_arr.sort((instructor1,instructor2)=>{   // sort by instructor name
                if(instructor1.name > instructor2.name)
                    return 1
                else if(instructor1.name < instructor2.name)
                      return -1
                return 0
             })
            setListOfInstructors(instructors_arr)
            setTotalInstructorListFromAdmin(instructors_arr)
            setContent(e.target.id)

        });

    }
    //Courses list button clicked from admin page
    const courses_list_from_admin = e => {
        
        setAddedButtonFromAdmin(false)
        let courses_arr_admin = []

        db.collection("courses").get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
                courses_arr_admin.push(doc.data())
            });
            courses_arr_admin.sort((course1,course2)=>{   // sort by course name
                if(course1.course_name > course2.course_name)
                    return 1
                else if(course1.course_name < course2.course_name)
                      return -1
                return 0
             })
            setListOfCourses(courses_arr_admin)
            setTotalCourseListFromAdmin(courses_arr_admin)
            setContent(e.target.id)
        })
    }

    const course_content = e => {
        setContent(e.target.id)
        storage.ref().child(course_name).listAll().then(list => {
            setArrOfClasses(list.prefixes)
        })
    }

    const specific_course_student_list_from_admin =(e)=>{
        
        let new_list_student = []
        db.collection("users").where("course", "==", course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    new_list_student.push({ 'name': element.data().name, 'phone_number': element.data().phone_number })
                });
                new_list_student.sort((student1,student2)=>{   // sort by student name
                        if(student1.name > student2.name)
                            return 1
                        else if(student1.name < student2.name)
                              return -1
                        return 0
                     })
                setListOfStudent(new_list_student)
                setContent(e.target.id)
            })
            
    }


    //Shared content clicked from student page
    const shared_content = e => {
        let list = []
        db.collection("studentContent").where("course_name", "==", course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    return (
                        list.push({ 'course_name': doc.data().course_name, 'class_number': doc.data().class_number, 'student_name': doc.data().student_name })
                    )
                })
                list.sort((student1,student2)=>{   // sort by student name
                    if(student1.student_name > student2.student_name)
                        return 1
                    else if(student1.student_name < student2.student_name)
                          return -1
                    return 0
                 })
                setStudentSharedContent(list)
                setTotalGroupContent(list)
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
                            <Button onClick={shared_content} id="shared_content">תכנים קבוצתיים</Button><br />
                            <Button onClick={course_content} id="course_content">תכני קורס</Button><br />
                            <Button onClick={course_details} id="course_details">פרטי קורס</Button><br />
                            <Button onClick={instructor_details} id="instructor_details">פרטי מדריך</Button>
                        </div>
                    )
                }
                //instructor
                else if (props.type === 1) {
                    return (
                        <div className="menu-content">
                            <Button onClick={courses_list_from_instructor} id="course_list_to_shared_conent">תכנים קבוצתיים</Button><br />
                            <Button onClick={courses_list_from_instructor} id="courses_list">רשימת קורסים</Button><br />
                            <Button onClick={student_list} id="student_list_from_instructor">רשימת סטודנטים</Button>
                        </div>
                    )
                }
                //admin
                else if (props.type === 2) {
                    return (
                        <div className="menu-content">
                            <Button onClick={instructors_list} id="instructors_list">רשימת מדריכים</Button><br />
                            <Button onClick={courses_list_from_admin} id="courses_list_from_admin">רשימת קורסים</Button><br />
                            <Button  id="courses_list_from_admin">הפקת דוחות</Button>
                            {added_button_from_admin === true &&
                                <div>
                                    <Button onClick={specific_course_student_list_from_admin} id="course_details">רשימת סטודנטים</Button>
                                </div>
                            }


                        </div>
                    )
                }
            })()}
        </div>
    );

}

export default Menu;