import { useState } from 'react';
import {storage, db} from '../Firebase/firebase';

const GroupContent = props => {

    const course_name = props.course_name;
    const [students_shared_content, setStudentSharedContent] = useState([])
    
    let list
    const getData = async () =>{
        
        await db.collection("studentContent").where("course_name", "==", course_name)
            .get()
            .then(querySnapshot => {
                list = querySnapshot.docs.map(item => {
                    return (
                        <div className = "shared-content-card" key = {item.data().student_name}>
                            <ul>{item.data().course_name}</ul>
                            <ul>{item.data().class_number}</ul>
                            <ul>{item.data().student_name}</ul>
                        </div>
                    )
                })
                setStudentSharedContent(list)
            })
    }
    return (
        <div>
            <button onClick = {getData}>click here</button>
            <div className="internal_content">
                {students_shared_content}

            </div>
        </div>
    );
}
 
export default GroupContent;
