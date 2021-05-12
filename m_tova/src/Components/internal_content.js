

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


        default:
            return (<div>
                <h1>hello</h1>

            </div>)
    }

}

export default InternalContent;