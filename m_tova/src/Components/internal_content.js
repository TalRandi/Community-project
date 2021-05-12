

import { Card, ListGroup } from 'react-bootstrap';

const InternalContent = (props) => {

    switch (props.content) {
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
            return (
                <Card id="courseDetails">
                <ListGroup variant="flush" id="listGroup">
                    <ListGroup.Item>שם הקורס: {props.course_name}</ListGroup.Item>
                    <ListGroup.Item>תאריך התחלה: {props.start_date}</ListGroup.Item>
                    <ListGroup.Item>תאריך סיום: {props.end_date}</ListGroup.Item>
                    <ListGroup.Item> {props.list_of_student}</ListGroup.Item>
                </ListGroup>
            </Card>
            );


        default:
            return (<div>
                <h1>hello</h1>

            </div>)
    }

}

export default InternalContent;