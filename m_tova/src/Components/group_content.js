// import { useState } from 'react';
import { db, storage } from '../Firebase/firebase';
import { Button } from 'react-bootstrap';

//build interface of shared content per selected course
const GroupContent = props => {

    // const course_name = props.course_name;
    const students_shared_content = props.students_shared_content
    const setSpecificStudentSheredContent = props.setSpecificStudentSheredContent
    const setContent = props.setContent
    const type = props.type
    const setComment = props.setComment
    const setCurrentStudentContent = props.setCurrentStudentContent

    //updeting array of attributes {url, description, full object of student(name, class number, course name)}
    const getDetailStudent = (student) => {
        setContent("loading")
        let temp_student_content = []
        let comment

        storage.ref().child(`${student.course_name}/class${student.class_number}/${student.student_name}`).listAll().then(async list => {
            for (let lesson of list.items) {
                let url = await lesson.getDownloadURL()
                temp_student_content.push({ "url": url, "description": lesson.name, "student": student })
            }
            db.collection("studentContent").where("course_name", "==", student.course_name)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    if(student.class_number === doc.data().class_number && student.student_name === doc.data().student_name) {
                        comment = doc.data().comment
                        return
                    }
                })
                setCurrentStudentContent({"class_number": student.class_number, "student_name": student.student_name, "course_name" : student.course_name})
                setComment(comment)
                setSpecificStudentSheredContent(temp_student_content)
                setContent("specific_student_shared_content")
            })
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
                                    <div key={student.student_name + student.class_number} className="col-2 shared_content_square" onClick={() => getDetailStudent(student)}>
                                        <h5> שם הסטודנט: </h5><h6>{student.student_name}</h6>
                                        <h5>מספר שיעור: </h5><h6>{student.class_number}</h6>
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
