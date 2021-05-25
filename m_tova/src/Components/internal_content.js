import { db, storage } from '../Firebase/firebase'
import { Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import { Card, ListGroup, Table } from 'react-bootstrap';
import deleteButton from '../Images/delete_student.png';
import Loader from "react-loader-spinner";
import AddZone from './add_course_content';

//This componnent build the internal div with the relevant content inside it
const InternalContent = (props) => {

    const [inputStartDate, setInputStartDate] = useState(new Date());
    const [inputEndDate, setInputEndDate] = useState(new Date());

    const [class_number, setClassNumber] = useState(0);
    const [current_class_number, setCurrentClassNumber] = useState(0);
    const [flag_from_called, setFlagFromCalled] = useState(''); // flag to know if add item buttom clicked from course content or class content
    const [selected_course, setSelectedCourse] = useState('')

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
                db.collection("users").doc(querySnapshot.docs[0].id).delete().then(() => {
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
                db.collection("instructors").doc(querySnapshot.docs[0].id).delete().then(() => {
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
                db.collection("courses").doc(querySnapshot.docs[0].id).delete().then(() => {
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
            if (!course_already_exist) {
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

        setCurrentClassNumber(class_number)

        storage.ref().child(props.course_name + "/class" + class_number).listAll().then(async list => {
            for (let lesson of list.items) {
                let url = await lesson.getDownloadURL()
                temp_class_content.push({ "url": url, "description": lesson.name })
            }
            props.setClassContent(temp_class_content)
            props.setContent("class_content")
        });
    }

    //display content course when course clicked from admin page
    const course_clicked_from_admin = e => {
        props.setContent("loading")
        course_clicked(e)

    }

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
            console.log(props.arr_of_class_content);
            props.setContent("class_content")
        })
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
                    <Card className="custom_card">
                        <ListGroup variant="flush" className="listGroup">
                            <ListGroup.Item className="listGroup">שם הקורס: {props.course_name}</ListGroup.Item>
                            <ListGroup.Item className="listGroup">תאריך התחלה: {props.start_date}</ListGroup.Item>
                            <ListGroup.Item className="listGroup">תאריך סיום: {props.end_date}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <div className="list_students">
                        <h1>רשימת משתתפי הקורס:</h1>
                        <Table striped bordered hover variant="dark">
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
                <div className="internal_content">
                    <Button className="add_item" onClick={() => props.setContent("add_student")} variant="btn btn-success">הוסף סטודנט</Button>
                    <Table striped bordered hover variant="dark">
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
                <div className="internal_content">
                    <Button className="add_item" onClick={() => props.setContent("add_instructor")} variant="btn btn-success">הוסף מדריך</Button>
                    <Table bordered variant="dark">
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
                <div className="internal_content">
                    <Button className="add_item" onClick={() => props.setContent("add_course")} variant="btn btn-success">הוסף קורס</Button>
                    <Table striped bordered hover variant="dark">
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
            );
        //From admin - inner button
        case "add_instructor":
            return (
                <div className="add_form">
                    <h1>הוספת מדריך</h1>
                    <input id="input_name" className="input_fields" type="text" placeholder="שם המדריך" required />
                    <input id="input_password" className="input_fields" type="text" placeholder="סיסמא" required />
                    <input id="input_email" className="input_fields" type="text" placeholder='דוא"ל' required />
                    <input id="input_phone" className="input_fields" type="text" placeholder="מספר פלאפון" required />
                    <Button className="submit" variant="btn btn-primary" onClick={() => submit_instructor("input_name", "input_password", "input_email", "input_phone")}>אישור</Button>
                </div>
            )
        //From admin - inner button    
        case "add_course":
            return (
                <div className="add_form">
                    <h1>הוספת קורס</h1>
                    <input id="input_course_name" className="input_fields" type="text" placeholder="שם הקורס" required />
                    <input id="input_instructor_name" className="input_fields" type="text" placeholder="שם המדריך" required />
                    <DatePicker id="input_start_date" className="input_fields" selected={inputStartDate} onChange={date => setInputStartDate(date)} placeholderText='תאריך התחלה' required /><br />
                    <DatePicker id="input_end_date" className="input_fields" selected={inputEndDate} onChange={date => setInputEndDate(date)} placeholderText="תאריך סיום" required /><br />
                    <Button className="submit" variant="btn btn-primary" onClick={() => submit_course("input_course_name", "input_instructor_name", "input_start_date", "input_end_date")}>אישור</Button>
                </div>
            )
        case "add_student":

            return (
                <div className="add_form">
                    <Button className="add_item back" id={selected_course} onClick={() => { props.setContent("student_list_from_instructor") }}>חזור</Button>
                    <h1>הוספת סטודנט</h1>
                    <input id="input_student_name" className="input_fields" type="text" placeholder="שם הסטודנט" required />
                    <input id="input_password" className="input_fields" type="text" placeholder="סיסמא" required />
                    <input id="input_course_name" className="input_fields" type="text" placeholder="שם הקורס" required />
                    <input id="input_phone" className="input_fields" type="text" placeholder="מספר פלאפון" required />
                    <Button className="submit" variant="btn btn-primary" onClick={() => submit_student("input_student_name", "input_password", "input_course_name", "input_phone")}>אישור</Button>
                </div>
            )

        case "course_content":

            let counter_class = 1
            const listClasses = props.arr_of_classes.map((lesson) => {
                return (
                    <div key={counter_class} className="content_div">
                        <ul id={counter_class} onClick={class_content} >שיעור {counter_class++}</ul>
                    </div>
                )
            });
            return (
                <div className="internal_content">
                    {(props.type !== 0) ? (
                        <div>
                            <h4 className="course_header">{props.course_name}</h4>
                            <Button className="add_item" onClick={() => {
                                setFlagFromCalled("course_content");
                                setClassNumber(class_number + 1);
                                props.setContent("add_class_zone")
                            }} variant="btn btn-success">הוסף שיעור</Button>
                            {(props.type == 1) ?
                                <Button className="add_item back" id={selected_course} onClick={() => { props.setContent("courses_list") }}>חזור</Button>
                                : <Button className="add_item back" id={selected_course} onClick={() => { props.setContent("courses_list_from_admin") }}>חזור</Button>

                            }
                        </div>
                    ) : (
                        <h4>{props.course_name} - רשימת שיעורים</h4>
                    )}

                    {listClasses}

                </div>
            )

        case "class_content":
            let counter_content = 1
            const listContent = props.arr_of_class_content.map((content) => {
                return (
                    <div key={counter_content++} className="content_div">
                        <a href={content.url} target="_blank" rel="noreferrer">{content.description}</a>
                        <img className="delete-button" src={deleteButton} id={content.description} alt="" onClick={delete_content}></img>
                    </div>
                )
            });
            return (
                <div className="internal_content">

                    <h4 className="course_header">{props.course_name}</h4><br></br>
                    <h4 className="class_header">שיעור: {current_class_number}</h4>
                    {(props.type !== 0) ?
                        (<div><Button className="add_item" onClick={() => {
                            setFlagFromCalled("class_content");
                            setClassNumber(current_class_number);
                            props.setContent("add_class_zone")
                        }} variant="btn btn-success">הוסף תוכן</Button>
                            {props.type === 1 ?
                                <Button className="add_item back" id={selected_course} onClick={course_clicked}>חזור</Button> :
                                <Button className="add_item back" id={selected_course} onClick={course_clicked}>חזור</Button>

                            }</div>) : (<Button className="class-content-form-student" id={selected_course} onClick={() => props.setContent("course_content")}>חזור</Button>)}

                    {listContent}
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
            // console.log(flag_from_called);
            return (
                <div className="internal_content">
                    <Button className="add_item back" id={selected_course} onClick={course_clicked}>חזור</Button>

                    {(flag_from_called === "course_content") ?
                        (<div className="title_add_item"><h2> הוספת שיעור {class_number} לקורס {props.course_name}</h2><br /><br /></div>)
                        : (<div className="title_add_item"><h2>הוספת תוכן חדש לשיעור  {class_number}</h2><br /><br /></div>)}
                    <AddZone
                        setCurrentClassNumber={setCurrentClassNumber}
                        setClassContent={props.setClassContent}
                        course_name={props.course_name}
                        class_number={class_number + 1}
                        // class_number={class_number}
                        setContent={props.setContent}
                    />
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