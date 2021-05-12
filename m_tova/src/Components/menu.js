import { Button } from 'react-bootstrap';
import InternalContent from './internal_content';
import { db } from '../Firebase/firebase'

const Menu = (props) => {

    let setPhoneNumber = props.setPhoneNumber
    let setEmail = props.setEmail
    let setInstructorName = props.setInstructorName
    let setContent = props.setContent

    const instructor_details = e => {
        setContent(e.target.id)
        db.collection("courses").where("course_name", "==", props.course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(element => {
                    setInstructorName(element.data().instructor_name)
                    db.collection("instructors").where("name", "==", props.instructor_name)
                        .get()
                        .then(querySnapshot => {
                            querySnapshot.docs.forEach(element => {
                                setPhoneNumber(element.data().phone_number)
                                setEmail(element.data().email)
                            });
                        })
                });
            })


    }
    return (
        <div className="side-menu">
            {(() => {
                //student
                if (props.type === 0) {
                    return (
                        <div className="menu-content">
                            <Button>תכנים קבוצתיים</Button><br />
                            <Button>תכני קורס</Button><br />
                            <Button>פרטי קורס</Button><br />
                            <Button onClick={instructor_details} id="instructor_details">פרטי מדריך</Button>
                        </div>
                    )
                }
                //instructor
                else if (props.type === 1) {
                    return (
                        <div className="menu-content">
                            <Button>רשימת קורסים</Button><br />
                            <Button>רשימת סטודנטים</Button>
                        </div>
                    )
                }
                //admin
                else if (props.type === 2) {
                    return (
                        <div className="menu-content">
                            <Button>רשימת מדריכים</Button><br />
                            <Button>רשימת קורסים</Button>
                        </div>
                    )
                }
            })()}
        </div>
    );
}

export default Menu;