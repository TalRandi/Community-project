import { Button } from 'react-bootstrap';
import { db } from '../Firebase/firebase'


const Menu = (props) => {

    let setPhoneNumber = props.setPhoneNumber
    let setEmail = props.setEmail
    let setInstructorName = props.setInstructorName
    let setContent = props.setContent
    let instructor_name = props.instructor_name
    let course_name = props.course_name
    let setStartDate=props.setStartDate
    let setEndDate =props.setEndDate
    let setListOfStudent=props.setListOfStudent

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
        let new_list_student=[]
        db.collection("users").where("course","==",course_name)
        .get()
        .then(querySnapshot => {
            querySnapshot.docs.forEach(element => {
                 new_list_student.push({'name': element.data().name, 'phone_number': element.data().phone_number})
            });         
            setListOfStudent(new_list_student)
        })
       

    }

    const instructor_details = e => {
        setContent(e.target.id)
        db.collection("courses").where("course_name", "==", course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    setInstructorName(element.data().instructor_name)
                });
            })
    }
    db.collection("instructors").where("name", "==", instructor_name)
        .get()
        .then(querySnapshot2 => {

            querySnapshot2.docs.forEach(element2 => {
                setPhoneNumber(element2.data().phone_number)
                setEmail(element2.data().email)
            });
        })

    return (
        <div className="side-menu">
            {(() => {
                //student
                if (props.type === 0) {
                    return (
                        <div className="menu-content">
                            <Button  >תכנים קבוצתיים</Button><br />
                            <Button >תכני קורס</Button><br />
                            <Button  onClick={course_details} id="course_details">פרטי קורס</Button><br />
                            <Button  onClick={instructor_details} id="instructor_details">פרטי מדריך</Button>
                        </div>
                    )
                }
                //instructor
                else if (props.type === 1) {
                    return (
                        <div className="menu-content">
                            <Button >רשימת קורסים</Button><br />
                            <Button >רשימת סטודנטים</Button>
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