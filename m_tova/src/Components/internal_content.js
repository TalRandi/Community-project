import { db } from '../Firebase/firebase'
import { Button } from 'react-bootstrap';
import { Card, ListGroup, Table } from 'react-bootstrap';
// import del from '../Images/delete_student.png';s

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
    
    const delete_student = e =>{
        
        const user_to_delete = e.target.id
      
        db.collection("users").where("name", "==", user_to_delete)
        .get()
        .then(querySnapshot => {
            db.collection("users").doc(querySnapshot.docs[0].id).delete().then(() => {
                console.log("Document successfully deleted!");
            })
        }) 
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

        default:
            return (<div>
                <h1>hello</h1>

            </div>)
    }



}

export default InternalContent;