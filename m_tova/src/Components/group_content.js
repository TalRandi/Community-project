// import { useState } from 'react';
import { storage } from '../Firebase/firebase';
import { Button } from 'react-bootstrap';

//build interface of shared content per selected course
const GroupContent = props => {

    // const course_name = props.course_name;
    const students_shared_content = props.students_shared_content
    const setSpecificStudentSheredContent = props.setSpecificStudentSheredContent
    const setContent = props.setContent
    const type = props.type



    //updeting array of attributes {url, description, full object of student(name, class number, course name)}
    const getDetailStudent = (student) => {
        let temp_student_content = []
        storage.ref().child(`${student.course_name}/class${student.class_number}/${student.student_name}`).listAll().then(async list => {
            for (let lesson of list.items) {
                let url = await lesson.getDownloadURL()
                temp_student_content.push({ "url": url, "description": lesson.name, "student": student })
            }
            setSpecificStudentSheredContent(temp_student_content)
            setContent("specific_student_shared_content")

        })

    }
    return (

        <div>
            {type === 0 &&
                <Button className="add_item" onClick={() => props.setContent("add_student_shared_content")} variant="btn btn-success">הוסף תוכן</Button>
            }
            <div className="internal_content">

                <div className="container">
                    <div className="row justify-content-start">
                        {
                            students_shared_content.map(student => {
                                return (
                                    <div key={student.student_name + student.class_number} className="col-2 test" onClick={() => getDetailStudent(student)}>
                                        <h5> שם הסטודנט: {student.student_name}</h5>
                                        <h5>מספר שיעור: {student.class_number}</h5>
                                    </div>
                                )
                            })}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default GroupContent;
