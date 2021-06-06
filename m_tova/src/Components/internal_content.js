import { db, storage } from '../Firebase/firebase'
// import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Card, ListGroup, Table, Button } from 'react-bootstrap';
import deleteButton from '../Images/delete_student.png';
import Loader from "react-loader-spinner";
import AddZone from './add_course_content';
import GroupContent from './group_content';
// import { getDefaultNormalizer } from '@testing-library/dom';
// import AddSharedZone from './add_shared_content';
import SharedContent from './shared_content_zone'
// import { IoMdSearch } from 'react-icons/io';

//This componnent build the internal div with the relevant content inside it
const InternalContent = (props) => {

    const [inputStartDate, setInputStartDate] = useState(new Date());
    const [inputEndDate, setInputEndDate] = useState(new Date());

    const [class_number, setClassNumber] = useState(0);
    const [current_class_number, setCurrentClassNumber] = useState(0);
    const [flag_from_called, setFlagFromCalled] = useState(''); // flag to know if add item buttom clicked from course content or class content
    const [selected_course, setSelectedCourse] = useState('')
    const [class_description, setClassDescription] = useState('')
    const [is_add_content, setIsAddContent] = useState(false)
    const [edit_open, setEditOpen] = useState(false)
    const [description_exist, setDescriptionExist] = useState(false) // description class 
    // const [class_number_from_shared_content, setClassNumberFronSharedContent] = useState()



    //provide the content of the course that clicked
    const course_clicked = e => {

        props.setContent("loading")
        let course_name = e.target.id
        setSelectedCourse(course_name)
        props.setCourseName(course_name)
        storage.ref().child(course_name).listAll().then(list => {
            setClassNumber(list.prefixes.length)
            props.setArrOfClasses(list.prefixes)
            props.setContent("course_content")
        })
    }

    //Delete student button from instructor
    const delete_student = e => {

        const user_to_delete = e.target.id

        db.collection("users").where("name", "==", user_to_delete)
            .get()
            .then(querySnapshot => {
                db.collection("users").doc(querySnapshot.docs[0].id).delete().then(() => { // delete student from firestore
                    console.log("Document successfully deleted!");

                    let students_arr = [...props.list_of_student]
                    for (let index = 0; index < students_arr.length; index++) {
                        if (students_arr[index].name === user_to_delete) {
                            students_arr.splice(index, 1);
                            break;
                        }
                    }
                    props.setListOfStudent(students_arr)
                    console.log("After set", props.list_of_student);
                })
            })
    }

    //Delete instructor button from admin
    const delete_instructor = e => {

        const instructor_to_delete = e.target.id
        let instructors_arr = [...props.list_of_instructors]
        for (let index = 0; index < instructors_arr.length; index++) {
            if (instructors_arr[index].name === instructor_to_delete) {
                instructors_arr.splice(index, 1);
                break;
            }
        }
        db.collection("instructors").where("name", "==", instructor_to_delete)
            .get()
            .then(querySnapshot => {
                db.collection("instructors").doc(querySnapshot.docs[0].id).delete().then(() => { // delete instructor from firestore collection instructors
                    console.log("Document successfully deleted!");
                })
                props.setListOfInstructors(instructors_arr)
            })

    }
    //Delete course button from admin
    const delete_course = e => {

        const course_to_delete = e.target.id
        let course_arr = [...props.list_of_courses]
        for (let index = 0; index < course_arr.length; index++) {
            if (course_arr[index].course_name === course_to_delete) {
                course_arr.splice(index, 1);
                break;
            }
        }

        db.collection("courses").where("course_name", "==", course_to_delete)
            .get()
            .then(querySnapshot => {
                db.collection("courses").doc(querySnapshot.docs[0].id).delete().then(() => { // delete from firestore collection courses
                    console.log("Document successfully deleted!");
                    props.setListOfCourses(course_arr)
                })
            })
    }

    //Submit instructor button clicked from admin page
    const submit_instructor = (name_id, password_id, email_id, phone_id) => {

        const name = document.getElementById(name_id).value;
        const password = document.getElementById(password_id).value;
        const email = document.getElementById(email_id).value;
        const phone_number = document.getElementById(phone_id).value;

        if (name === "") {
            alert("חובה להכניס שם משתמש")
            return;
        }

        if (password.length < 6) {
            alert("הסיסמה חייבת להכיל לפחות 6 תווים")
            return;
        }

        var name_already_exist = false;
        const id = db.collection('stack_over').doc().id

        var newInstructor = {
            name,
            password,
            email,
            phone_number
        };

        db.collection("instructors").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().name === name) {
                    alert("שם משתמש כבר קיים")
                    name_already_exist = true;
                }
            });
            if (!name_already_exist) {
                db.collection("instructors").doc(id).set(newInstructor).then(() => {
                    console.log("Documents successfully written!");
                    let instructors_arr = []
                    instructors_arr = props.list_of_instructors
                    instructors_arr.push(newInstructor)
                    props.setContent("instructors_list")
                    props.setListOfInstructors(instructors_arr)

                });
            }
        });
    }

    //Submit courses button clicked from admin page
    const submit_course = (c_name_id, i_name_id, start_id, end_id) => {

        const course_name = document.getElementById(c_name_id).value;
        const instructor_name = document.getElementById(i_name_id).value;
        const start_date = document.getElementById(start_id).value;
        const end_date = document.getElementById(end_id).value;

        if (course_name === "") {
            alert("חובה להכניס שם קורס")
            return;
        }

        if (instructor_name === "") {
            alert("חובה להכניס שם מדריך")
            return;
        }

        var course_already_exist = false;
        const id = db.collection('stack_over').doc().id

        var newCourse = {
            course_name,
            instructor_name,
            start_date,
            end_date
        };

        db.collection("courses").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().course_name === course_name) {
                    alert("קורס כבר קיים")
                    course_already_exist = true;
                }
            });
            if (!course_already_exist) { // if course not exsist in the firebase
                db.collection("courses").doc(id).set(newCourse).then(() => {
                    let courses_arr = []
                    courses_arr = props.list_of_courses
                    courses_arr.push(newCourse)
                    props.setListOfCourses(courses_arr)
                    props.setContent("courses_list_from_admin")
                });
            }
        });
    }
    //Submit student button clicked from instructor page
    const submit_student = (name_id, pass_id, course_id, phone_id) => {

        const name = document.getElementById(name_id).value;
        const password = document.getElementById(pass_id).value;
        const course = document.getElementById(course_id).value;
        const phone_number = document.getElementById(phone_id).value;

        const id = db.collection('stack_over').doc().id

        var newStudent = {
            name,
            password,
            course,
            phone_number
        };

        db.collection("users").doc(id).set(newStudent).then(() => {
            console.log("Documents successfully written!");
            let students_arr = []
            students_arr = props.list_of_student
            students_arr.push(newStudent)
            props.setListOfStudent(students_arr)
            props.setContent("student_list_from_instructor")
        });
    }

    //display all files in specific course 
    const class_content = e => {

        props.setContent("loading")
        let class_number = e.target.id
        let temp_class_content = []
        setEditOpen(false)
        setCurrentClassNumber(class_number)

        db.collection("classDescription").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (doc.data().course_name === props.course_name && doc.data().class_number === parseInt(class_number)) {
                    setClassDescription(doc.data().class_description)
                }
            })
        });


        storage.ref().child(props.course_name + "/class" + class_number).listAll().then(async list => {
            for (let lesson of list.items) {
                let url = await lesson.getDownloadURL()
                temp_class_content.push({ "url": url, "description": lesson.name }) // creating object with attribute url and description   
            }
            props.setClassContent(temp_class_content)
            props.setContent("class_content")
        });


    }

    //display content course when course clicked from admin page
    const course_clicked_from_admin = e => {
        // //


        props.setContent("loading")
        props.setAddedButtonFromAdmin(true)
        course_clicked(e)

    }

    //delete content in  the storge from instructor or admin 
    const delete_content = e => {
        props.setContent("loading")
        let path_to_file = `${props.course_name}/class${current_class_number}/${e.target.id}`
        for (let index = 0; index < props.arr_of_class_content.length; index++) {
            if (props.arr_of_class_content[index].description === e.target.id) {
                props.arr_of_class_content.splice(index, 1);
                break;
            }
        }
        storage.ref().child(path_to_file).delete().then(() => {
            props.setContent("class_content")
        })
    }

    //delete file from student shared content , just log in user can delete his files
    const delete_shared_content = content => {
        props.setContent("loading")
        let path_to_file = `${content.student.course_name}/class${content.student.class_number}/${content.student.student_name}/${content.description}`
        storage.ref().child(path_to_file).delete().then(() => {

            props.setContent("shared_content")
        })
    }

    //provide the shared student content
    const shared_content_from_instructor_and_admin = (e) => {
        let list = []
        db.collection("studentContent").where("course_name", "==", e.target.id)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    return (
                        list.push({ 'course_name': doc.data().course_name, 'class_number': doc.data().class_number, 'student_name': doc.data().student_name })
                    )
                })
                props.setStudentSharedContent(list)
                props.setContent("shared_content")
            })
    }

    // filter search by student name or class number in shared content
    const search_from_shared_content = (e) => {
        const search = e.target.value
        let res_arr = []
        if (search.length === 0)  // the input search box is empty 
        {
            props.setStudentSharedContent(props.total_group_content)
            props.setContent("shared_content")
            return
        }
        for (let i = 0; i < props.total_group_content.length; i++) {
            if (props.total_group_content[i].student_name.startsWith(search) || props.total_group_content[i].class_number === search) // search word that start with in student name or class number
            {
                res_arr.push(props.total_group_content[i])
            }
        }
        props.setStudentSharedContent(res_arr)
        props.setContent("shared_content")
    }

    // filter search by instructor name or course name and start/end date in courses list from admin
    const search_from_course_list_from_admin = (e) => {
        const search = e.target.value
        let res_arr = []
        if (search.length === 0) // the input search box is empty 
        {
            props.setListOfCourses(props.total_course_list_from_admin)
            props.setContent("courses_list_from_admin")
            return
        }

        for (let i = 0; i < props.total_course_list_from_admin.length; i++) {
            if (props.total_course_list_from_admin[i].instructor_name.startsWith(search) || props.total_course_list_from_admin[i].course_name.startsWith(search)
                || props.total_course_list_from_admin[i].start_date.includes(search) || props.total_course_list_from_admin[i].end_date.includes(search)) {
                res_arr.push(props.total_course_list_from_admin[i])
            }
        }
        props.setListOfCourses(res_arr)
        props.setContent("courses_list_from_admin")
    }
    // filter search by instructor name in instructors list from admin
    const search_from_instructors_list_from_admin = (e) => {
        const search = e.target.value
        let res_arr = []
        if (search.length === 0) // the input search box is empty 
        {
            props.setListOfInstructors(props.total_instructor_list_from_admin)
            props.setContent("instructors_list")
            return
        }

        for (let i = 0; i < props.total_instructor_list_from_admin.length; i++) {
            if (props.total_instructor_list_from_admin[i].name.startsWith(search)) { // search word that start with in instructor name 
                res_arr.push(props.total_instructor_list_from_admin[i])
            }
        }
        props.setListOfInstructors(res_arr)
        props.setContent("instructors_list")
    }

    // filter search by student name in students list from instructor
    const search_from_student_list_from_instructor = e => {
        const search = e.target.value
        let res_arr = []
        if (search.length === 0) // the input search box is empty 
        {
            props.setListOfStudent(props.total_student_list_from_instructor)
            props.setContent("student_list_from_instructor")
            return
        }

        for (let i = 0; i < props.total_student_list_from_instructor.length; i++) {
            if (props.total_student_list_from_instructor[i].name.startsWith(search)) { // search word that start with in student name 
                res_arr.push(props.total_student_list_from_instructor[i])
            }
        }
        props.setListOfStudent(res_arr)
        props.setContent("student_list_from_instructor")

    }

    switch (props.content) {
        //From student
        case "instructor_details":

            return (
                <div className="internal_content">
                    <Card className="custom_card">
                        <ListGroup variant="flush" className="listGroup">
                            <ListGroup.Item className="listGroup" >שם מדריך: {props.instructor_name}</ListGroup.Item>
                            <ListGroup.Item className="listGroup" >מספר פלאפון: {props.phone_number}</ListGroup.Item>
                            <ListGroup.Item className="listGroup" >מייל: {props.email}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            );
        //From student
        case "course_details":

            let count = 1
            const listItems = props.list_of_student.map((d) => {
                return (
                    <tr key={count}>
                        <td>{count++}</td>
                        <td >{d.name}</td>
                        <td>{d.phone_number}</td>
                    </tr>
                )
            });
            return (
                <div className="internal_content">
                    {props.type === 0 &&   // if equal to 0 its a student access
                        <Card className="custom_card">
                            <ListGroup variant="flush" className="listGroup">
                                <ListGroup.Item className="listGroup">שם הקורס: {props.course_name}</ListGroup.Item>
                                <ListGroup.Item className="listGroup">תאריך התחלה: {props.start_date}</ListGroup.Item>
                                <ListGroup.Item className="listGroup">תאריך סיום: {props.end_date}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    }
                    <div className="list_students">
                        <h1>רשימת משתתפי הקורס:</h1>
                        <Table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>שם הסטודנט</th>
                                    <th>מספר פלאפון </th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItems}
                            </tbody>
                        </Table>
                    </div>
                </div>

            );
        //From instructor
        case "courses_list":

            let courses_counter = 1
            const listItemsCourses = props.list_of_courses.map((course) => {
                return (
                    <ul id={course} onClick={course_clicked} key={courses_counter++} className="course-ul">{course}</ul>
                )
            });
            return (
                <div className="internal_content">
                    <h4>רשימת קורסים</h4>
                    {listItemsCourses}
                </div>
            );
        //From instructor        
        case "student_list_from_instructor":

            let students_counter = 1

            const listItemStudents = props.list_of_student.map((student) => {

                return (
                    <tr key={students_counter++}>
                        <td >{student.name}</td>
                        <td >{student.course}</td>
                        <td>{student.phone_number}</td>
                        <td><img className="delete-button" src={deleteButton} id={student.name} alt="" onClick={delete_student} ></img></td>
                    </tr>
                )
            });

            return (
                <div>
                    <Button className="add_item" onClick={() => props.setContent("add_student")} variant="btn btn-success">הוסף סטודנט</Button>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded mainLoginInput" placeholder=" &#61442; חיפוש לפי שם סטודנט" aria-label="Search"
                            aria-describedby="search-addon" onChange={search_from_student_list_from_instructor} />
                    </div>
                    <div className="internal_content">

                        <Table >
                            <thead>
                                <tr>
                                    <th>שם הסטודנט</th>
                                    <th>שם קורס</th>
                                    <th>מספר פלאפון </th>
                                    <th>מחיקת סטודנט</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItemStudents}
                            </tbody>

                        </Table>
                    </div>
                </div>
            );
        //From admin   
        case "instructors_list":

            let instructors_counter = 1

            const listItemInstructors = props.list_of_instructors.map((instructor) => {
                return (
                    <tr key={instructors_counter++}>
                        <td>{instructor.name}</td>
                        <td>{instructor.email}</td>
                        <td>{instructor.phone_number}</td>
                        <td><img className="delete-button" src={deleteButton} id={instructor.name} alt="" onClick={delete_instructor}></img></td>
                    </tr>
                )
            });
            return (
                <div>
                    <Button className="add_item" onClick={() => props.setContent("add_instructor")} variant="btn btn-success">הוסף מדריך</Button>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded mainLoginInput" placeholder=" &#61442; חיפוש לפי שם מדריך" aria-label="Search"
                            aria-describedby="search-addon" onChange={search_from_instructors_list_from_admin} />
                    </div>
                    <div className="internal_content">
                        <Table >
                            <thead>
                                <tr>
                                    <th>שם המדריך</th>
                                    <th>כתובת מייל</th>
                                    <th>מספר פלאפון</th>
                                    <th>מחיקת מדריך</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listItemInstructors}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        //From admin 
        case "courses_list_from_admin":

            let counter = 1
            const listCourses = props.list_of_courses.map((course) => {
                return (
                    <tr key={counter++}>
                        <td id={course.course_name} className="clickable_courses" onClick={course_clicked_from_admin}>{course.course_name}</td>
                        <td>{course.instructor_name}</td>
                        <td>{course.start_date}</td>
                        <td>{course.end_date}</td>
                        <td><img className="delete-button" src={deleteButton} id={course.course_name} alt="" onClick={delete_course}></img></td>
                    </tr>
                )
            });
            return (
                <div>
                    <Button className="add_item" onClick={() => props.setContent("add_course")} variant="btn btn-success">הוסף קורס</Button>
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded mainLoginInput" placeholder="&#61442; חיפוש לפי שם קורס שם מדריך או תאריך " aria-label="Search"
                            aria-describedby="search-addon" onChange={search_from_course_list_from_admin} />
                    </div>
                    <div className="internal_content">

                        <Table >
                            <thead>
                                <tr>
                                    <th>שם הקורס</th>
                                    <th>שם מדריך</th>
                                    <th>תאריך התחלה</th>
                                    <th>תאריך סיום</th>
                                    <th>מחיקת קורס</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listCourses}
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        //From admin - inner button
        case "add_instructor":
            return (
                <div>
                    <button className="back" id={selected_course} onClick={() => { props.setContent("instructors_list") }}>חזור</button>
                    <div className="add_form">
                        <h1>הוספת מדריך</h1>
                        <input id="input_name" className="input_fields" type="text" placeholder="שם המדריך" required />
                        <input id="input_password" className="input_fields" type="text" placeholder="סיסמא" required />
                        <input id="input_email" className="input_fields" type="text" placeholder='דוא"ל' required />
                        <input id="input_phone" className="input_fields" type="text" placeholder="מספר פלאפון" required />
                        <Button className="submit" onClick={() => submit_instructor("input_name", "input_password", "input_email", "input_phone")}>אישור</Button>
                    </div>
                </div>
            )
        //From admin - inner button    
        case "add_course":
            return (
                <div>
                    <button className="back" id={selected_course} onClick={() => { props.setContent("courses_list_from_admin") }}>חזור</button>
                    <div className="add_form">
                        <h1>הוספת קורס</h1>
                        <input id="input_course_name" className="input_fields" type="text" placeholder="שם הקורס" required />
                        <input id="input_instructor_name" className="input_fields" type="text" placeholder="שם המדריך" required />
                        <label className="date-label">תאריך התחלה:</label>
                        <DatePicker id="input_start_date" className="input_fields" selected={inputStartDate} onChange={date => setInputStartDate(date)} required /><br />
                        <label className="date-label">תאריך סיום:</label>
                        <DatePicker id="input_end_date" className="input_fields" selected={inputEndDate} onChange={date => setInputEndDate(date)} required /><br />
                        <Button className="submit" onClick={() => submit_course("input_course_name", "input_instructor_name", "input_start_date", "input_end_date")}>אישור</Button>
                    </div>
                </div>
            )
        case "add_student":

            return (
                <div>
                    <button className="back" id={selected_course} onClick={() => { props.setContent("student_list_from_instructor") }}>חזור</button>
                    <div className="add_form">
                        <h1>הוספת סטודנט</h1>
                        <input id="input_student_name" className="input_fields" type="text" placeholder="שם הסטודנט" required />
                        <input id="input_password" className="input_fields" type="text" placeholder="סיסמא" required />
                        <input id="input_course_name" className="input_fields" type="text" placeholder="שם הקורס" required />
                        <input id="input_phone" className="input_fields" type="text" placeholder="מספר פלאפון" required />
                        <Button className="submit" onClick={() => submit_student("input_student_name", "input_password", "input_course_name", "input_phone")}>אישור</Button>
                    </div>
                </div>
            )

        case "course_content":

            let counter_class = 1
            const listClasses = props.arr_of_classes.map((lesson) => { //build html of list classes 
                return (
                    <div key={counter_class} className="content_div">
                        <ul id={counter_class} onClick={class_content} >שיעור {counter_class++}</ul>
                    </div>
                )
            });
            return (
                <div>
                    {props.type !== 0 &&
                        <div>
                            <Button className="add_item" onClick={() => {
                                setFlagFromCalled("course_content");
                                setClassNumber(class_number + 1);
                                props.setContent("add_class_zone");
                                setDescriptionExist(false)
                                setIsAddContent(false)
                            }} variant="btn btn-success">הוסף שיעור</Button>
                            {(props.type === 1) ?
                                <button className="back" id={selected_course} onClick={() => { props.setContent("courses_list") }}>חזור</button>
                                :
                                <div>
                                    <button className="back" id={selected_course} onClick={() => { props.setContent("courses_list_from_admin") }}>חזור</button>
                                    <Button className="add_item shared_content" variant="btn btn-success" id={props.course_name} onClick={shared_content_from_instructor_and_admin}>תכניים קבוצתיים</Button>
                                </div>
                            }
                        </div>
                    }
                    <div className="internal_content">
                        {props.type !== 0 ?
                            (<h4 className="course_header">{props.course_name}</h4>) :
                            (<h4>{props.course_name} - רשימת שיעורים</h4>)
                        }
                        {listClasses}
                    </div>

                </div>
            )

        case "class_content":
            let counter_content = 1
            const listContent = props.arr_of_class_content.map((content) => { //build html of class content 
                return (
                    <div key={counter_content++} className="content_div">
                        <a href={content.url} target="_blank" rel="noreferrer">{content.description}</a>
                        {(props.type !== 0) ?
                            <img className="delete-button" src={deleteButton} id={content.description} alt="" onClick={delete_content}></img>
                            : ""}
                    </div>
                )
            });
            return (
                <div>
                    {(props.type !== 0) ?
                        (<div>
                            <button className="back" id={selected_course} onClick={course_clicked}>חזור</button>
                        </div>) :
                        (<button className="back" id={selected_course} onClick={() => props.setContent("course_content")}>חזור</button>)}
                    <div className="internal_content">

                        <h4 className="course_header">{props.course_name}</h4>
                        <h4 className="class_header">שיעור: {current_class_number}</h4>
                        <h4 className="right-align">תקציר השיעור :</h4>
                        <p className="right-align description">{class_description}</p>
                        {props.type !== 0 && <Button className="edit" onClick={() => { setEditOpen(!edit_open) }}>ערוך תקציר</Button>}
                        {edit_open &&
                            (<div>
                                <textarea value={class_description} className="form-control" onChange={(e) => { setClassDescription(e.target.value) }} rows="5"></textarea>
                                <Button className="edit save" onClick={() => {
                                    let temp_id
                                    db.collection("classDescription").get().then((querySnapshot) => {
                                        querySnapshot.forEach((doc) => {
                                            if (doc.data().course_name === props.course_name && doc.data().class_number === parseInt(current_class_number)) {
                                                temp_id = doc.id;
                                            }
                                        });
                                        db.collection("classDescription").doc(temp_id)
                                            .update({
                                                class_description: class_description
                                            })
                                            .then(() => {
                                                setEditOpen(false)
                                                console.log("Document successfully updated!");
                                            })
                                    });
                                }}>שמור</Button>
                            </div>)
                        }
                        {listContent}
                        {props.type !== 0 &&
                            <Button className="edit" onClick={() => {
                                setFlagFromCalled("class_content");
                                setCurrentClassNumber(current_class_number);
                                setIsAddContent(true);
                                props.setContent("add_class_zone")
                            }} >הוסף קבצים</Button>
                        }
                    </div>
                </div>
            )
        case "loading":
            return (
                <div className="internal_content">
                    <Loader
                        type="Puff"
                        color="rgb(92, 128, 194)"
                        height={100}
                        width={100}
                    />
                </div>
            )

        case "add_class_zone":

            return (
                <div>
                    <button className="back" id={selected_course} onClick={course_clicked}>חזור</button>
                    <div className="internal_content">

                        {(flag_from_called === "course_content") ?
                            (<div className="title_add_item"><h2> הוספת שיעור {class_number} לקורס {props.course_name}</h2><br /><br /></div>)
                            : (<div className="title_add_item"><h2>הוספת תוכן חדש לשיעור  {current_class_number}</h2><br /><br /></div>)}

                        {!is_add_content &&
                            <div className="form-group">
                                <h4 className="right-align">תקציר השיעור: </h4>
                                <textarea className="form-control" onChange={(e) => { setClassDescription(e.target.value); setDescriptionExist(true) }} rows="5"></textarea>
                            </div>
                        }
                        <AddZone
                            setClassDescription={setClassDescription}
                            setCurrentClassNumber={setCurrentClassNumber}
                            description_exist={description_exist}
                            setClassContent={props.setClassContent}
                            course_name={props.course_name}
                            is_add_content={is_add_content}
                            current_class_number={current_class_number}
                            class_number={class_number}
                            setContent={props.setContent}
                            class_description={class_description}
                        />
                    </div>
                </div>
            )
        case "shared_content": // show the squares of student that shared content
            return (
                <div>
                    { props.type === 1 ?
                        <button className="back" id={selected_course} onClick={() => { props.setContent("course_list_to_shared_conent") }}>חזור</button>
                        : <button className="back" id={selected_course} onClick={() => { props.setContent("course_content") }}>חזור</button>
                    }
                    <div className="input-group rounded">
                        <input type="search" className="form-control rounded mainLoginInput" placeholder=" &#61442; חיפוש תוכן לפי מספר שיעור או שם סטודנט" aria-label="Search"
                            aria-describedby="search-addon" onChange={search_from_shared_content} />
                    </div>
                    <GroupContent
                        course_name={props.course_name}
                        students_shared_content={props.students_shared_content}
                        setSpecificStudentSheredContent={props.setSpecificStudentSheredContent}
                        setContent={props.setContent}
                        type={props.type}
                    />
                </div >
            )
        case "specific_student_shared_content": // show content shared by a spesific student
            let counter_content_student = 1
            let class_number_to_show_content // class number of directory of the student to see his content
            let name // name of directory of the student to see his content
            const listContentStudent = props.specific_student_shered_content.map((content) => {
                class_number_to_show_content = content.student.class_number
                name = content.student.student_name
                return (
                    <div key={counter_content_student++} className="content_div">
                        {props.type === 0 ?
                            content.student.student_name === props.student_name &&
                            <img className="delete-button" src={deleteButton} id={content.student.class_number} alt="" onClick={() => delete_shared_content(content)}></img>
                            : <img className="delete-button" src={deleteButton} id={content.student.class_number} alt="" onClick={() => delete_shared_content(content)}></img>
                        }
                        <a href={content.url} target="_blank" rel="noreferrer">{content.description}</a>
                    </div>
                )
            });
            return (
                <div>
                    <button className="back" id={props.course_name} onClick={() => { props.setContent("shared_content") }}>חזור</button>
                    <div className="internal_content">
                        {props.specific_student_shered_content.length !== 0 ?
                            <h4>התוכן של {name} בשיעור מספר {class_number_to_show_content}</h4> :
                            <h4>התוכן של סטודנט זה נמחק</h4>
                        }
                        {listContentStudent}
                    </div>
                </div>

            )

        case "add_student_shared_content":
            return (
                <div>
                    <SharedContent
                        course_name={props.course_name}
                        setContent={props.setContent}
                        student_name={props.student_name}
                        setStudentSharedContent={props.setStudentSharedContent}
                    />
                </div>
            )
        case "course_list_to_shared_conent":
            let coursesCounter = 1
            const listOfCourses = props.list_of_courses.map((course) => { // build html to list of courses to shared content button from instructor
                return (
                    <ul id={course} onClick={shared_content_from_instructor_and_admin} key={coursesCounter++} className="course-ul">{course}</ul>
                )
            });
            return (
                <div className="internal_content">
                    <h4> רשימת קורסים להצגת תכניים קבוצתיים</h4>
                    {listOfCourses}
                </div>

            )
        default:
            return (
                <div>
                    <h1>No Content</h1>
                </div>
            )
    }
}

export default InternalContent;