

import { Card, ListGroup, Table } from 'react-bootstrap';

const InternalContent = (props) => {
    console.log(props.list_of_student);
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
            let count = 1
            const listItems = props.list_of_student.map((d) => {
                return (
                    <tr key={count++}>
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
                            {listItems}
                        </Table>
                    </div>
                </div>

            );


        default:
            return (<div>
                <h1>hello</h1>

            </div>)
    }



}

export default InternalContent;