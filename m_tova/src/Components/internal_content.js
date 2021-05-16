import { db } from '../Firebase/firebase'
import { Button } from 'react-bootstrap';
import { Card, ListGroup, Table } from 'react-bootstrap';
// import del from '../Images/delete_student.png';s


//This componnent build the internal div with the relevant content inside it
const InternalContent = (props) => {

    let setStartDate = props.setStartDate
    let setEndDate = props.setEndDate

    const course_clicked = e =>{
 
        db.collection("courses").where("course_name", "==", e.target.id)
        .get()
        .then(querySnapshot => {

            querySnapshot.docs.forEach(element => {
                setStartDate(element.data().start_date)
                setEndDate(element.data().end_date)
            });
        })

    }
    //Delete student button from instructor
    const delete_student = e =>{
        
        const user_to_delete = e.target.id
      
        db.collection("users").where("name", "==", user_to_delete)
        .get()
        .then(querySnapshot => {
            db.collection("users").doc(querySnapshot.docs[0].id).delete().then(() => {
                console.log("Document successfully deleted!");
            })
        }) 
   
        let students_arr = []
        db.collection("courses").where("instructor_name", "==", props.name)
        .get()
        .then(querySnapshot => {
            
            querySnapshot.docs.forEach(element => {
                
                db.collection("users").where("course", "==", element.data().course_name)
                .get()
                .then(querySnapshot2 => {
                    
                    querySnapshot2.docs.forEach(element2 => {
                        students_arr.push(element2.data())
                    });
                    props.setListOfStudent(students_arr)
                })  
            });
        })  
    }
    //Delete instructor button from admin
    const delete_instructor = e =>{

        const instructor_to_delete = e.target.id
      
        db.collection("instructors").where("name", "==", instructor_to_delete)
        .get()
        .then(querySnapshot => {
            db.collection("instructors").doc(querySnapshot.docs[0].id).delete().then(() => {
                console.log("Document successfully deleted!");
                let instructors_arr = []
                db.collection("instructors").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        instructors_arr.push(doc.data())
                    });
                    props.setListOfInstructors(instructors_arr)    
                }); 
            })
        }) 
    }
    //Delete course button from admin
    const delete_course = e => {

        const course_to_delete = e.target.id

        db.collection("courses").where("course_name", "==", course_to_delete)
        .get()
        .then(querySnapshot => {
            db.collection("courses").doc(querySnapshot.docs[0].id).delete().then(() => {
                console.log("Document successfully deleted!");
                let courses_arr = []
                db.collection("courses").get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        courses_arr.push(doc.data())
                    });
                    props.setListOfCourses(courses_arr)    
                }); 
            })
        }) 
    }

    //Submit instructor button clicked from admin page
    const submit_instructor = (name_id, password_id, email_id , phone_id) =>{
        
        const name = document.getElementById(name_id).value;
        const password = document.getElementById(password_id).value;
        const email = document.getElementById(email_id).value;
        const phone_number = document.getElementById(phone_id).value;

        const id = db.collection('stack_over').doc().id

        var newInstructor = {
            name,
            password,
            email,
            phone_number
        };
        db.collection("instructors").doc(id).set(newInstructor).then(() => {
            console.log("Documents successfully written!");
            let instructors_arr = []

            db.collection("instructors").get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    instructors_arr.push(doc.data())
                });
                props.setListOfInstructors(instructors_arr)    
                props.setContent("instructors_list")
            });
        });
    }

    switch (props.content) 
    {
        case "instructor_details":
       
            return (
                <Card id="instructorDetails">
                    <ListGroup variant="flush" id="listGroup">
                        <ListGroup.Item>שם מדריך: {props.instructor_name}</ListGroup.Item>
                        <ListGroup.Item>מספר פלאפון: {props.phone_number}</ListGroup.Item>
                        <ListGroup.Item>מייל: {props.email}</ListGroup.Item>
                    </ListGroup>
                </Card>
            );
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
                <div>
                    <Card id="courseDetails">
                        <ListGroup variant="flush" id="listGroup">
                            <ListGroup.Item>שם הקורס: {props.course_name}</ListGroup.Item>
                            <ListGroup.Item>תאריך התחלה: {props.start_date}</ListGroup.Item>
                            <ListGroup.Item>תאריך סיום: {props.end_date}</ListGroup.Item>
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
        case "courses_list":
      
            let courses_counter = 1
            const listItemsCourses = props.list_of_courses.map((course) => {
                return (
                    <ul id = {course} onClick = {course_clicked} key = {courses_counter++} className = "course-ul">{course}</ul>                               
                )
            });  
            return (
                <div className = "courses_list">
                    {listItemsCourses}
                </div>
            );  

        case "student_list_from_instructor":
  
            let students_counter = 1

            const listItemStudents = props.list_of_student.map((student) => {

                return (
                    <tr key={students_counter++}>
                        <td >{student.name}</td>
                        <td >{student.course}</td>
                        <td>{student.phone_number}</td>
                        <td><Button variant = "btn btn-danger" onClick = {delete_student} id = {student.name}>X</Button></td>
                    </tr>
                )
            });  
            return (

                <div className="list_students student_list_table">
                    <Table  striped bordered hover variant="dark">
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
        case "instructors_list":

            let instructors_counter = 1

            const listItemInstructors = props.list_of_instructors.map((instructor) => {
                return (
                    <tr key={instructors_counter++}>
                        <td>{instructor.name}</td>
                        <td>{instructor.email}</td>
                        <td>{instructor.phone_number}</td>
                        <td><Button variant = "btn btn-danger" onClick = {delete_instructor} id = {instructor.name}>X</Button></td>
                    </tr>
                )
            });  
            return (
                <div>
                    <Button className = "add_item" onClick = {() => props.setContent("add_instructor")} variant = "btn btn-success">הוסף מדריך</Button>
                    <div className="list_students student_list_table">
                        <Table  striped bordered hover variant="dark">
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
        case "courses_list_from_admin":

            let counter = 1
            const listCourses = props.list_of_courses.map((course) => {
                return (
                    <tr key={counter++}>
                        <td>{course.course_name}</td>
                        <td>{course.instructor_name}</td>
                        <td>{course.start_date}</td>
                        <td>{course.end_date}</td>
                        <td><Button variant = "btn btn-danger" onClick = {delete_course} id = {course.course_name}>X</Button></td>
                    </tr>
                )
            });
            return (  
                <div className="list_students student_list_table">
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
        case "add_instructor":
            return(
                <div className = "add_form">
                    <h1>הוספת מדריך</h1>
                    <input id = "input_name" className = "input_fields" type="text" placeholder="שם המדריך" required/>
                    <input id = "input_password" className = "input_fields" type="text" placeholder="סיסמא" required/>
                    <input id = "input_email" className = "input_fields" type="text" placeholder='דוא"ל' required/>
                    <input id = "input_phone" className = "input_fields" type="text" placeholder="מספר פלאפון" required/>
                    <Button className = "submit" variant = "btn btn-primary" onClick = {() => submit_instructor("input_name", "input_password", "input_email", "input_phone")}>אישור</Button>
                </div>
            )    

        
        default:
            return (<div>
                <h1>hello</h1>

            </div>)
    }



}

export default InternalContent;