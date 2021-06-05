import React, { useState } from 'react';
import { storage, db } from '../Firebase/firebase';
import { useDropzone } from 'react-dropzone';
import firebase from 'firebase';
import { Button } from 'react-bootstrap';
import LinearWithValueLabel from '@material-ui/core/LinearProgress';

const AddSharedZone = props => {

    const course_name = props.course_name
    const class_number = props.class_number
    const setContent = props.setContent
    const student_name = props.student_name
    const setStudentSharedContent = props.setStudentSharedContent


    const [prog, setProg] = useState(0)
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({ noKeyboard: true });

    let loaded_files = []


    const files = acceptedFiles.map(file => {
        loaded_files.push(file)
        return (
            <ul key={file.path}>{file.path}</ul>)
    })

    const upload = (loaded_files) => {

        const id = db.collection('stack_over').doc().id
        var newStudentContent = {
            course_name,
            class_number,
            student_name
        };

        var uploadTask

        loaded_files.forEach((item) => {
            uploadTask = storage.ref().child(`${course_name}/class${class_number}/${student_name}/${item.name}`).put(item) // add to db storge
        })
        db.collection("studentContent").where("course_name", "==", course_name) 
            .get()
            .then(querySnapshot => {
                let flag = false
                querySnapshot.forEach(doc => {
                    if (doc.data().student_name === student_name && doc.data().class_number === class_number) // checking if login user already upload content to this class number
                        flag = true
                })

                if(flag === false) // if not create one
                {
                    db.collection("studentContent").doc(id).set(newStudentContent).then(() => {
                        console.log("Documents successfully written!");
                    });
                }

            })

       

        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProg(progress)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error);
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  
                });

             
                let list = []
                db.collection("studentContent").where("course_name", "==", course_name)  // update list with new data in use state
                    .get()
                    .then(querySnapshot => {
                        querySnapshot.forEach(doc => {
                            return (
                                list.push({ 'course_name': doc.data().course_name, 'class_number': doc.data().class_number, 'student_name': doc.data().student_name })
                            )
                        })
                        setStudentSharedContent(list)
                        setContent("shared_content")
                    })

            }
        );
    }

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone add-zone' })}>
                <input {...getInputProps()} />
                <p>גרור לכאן או לחץ כדי לעלות קבצים</p>
            </div>
            <br />
            {files.length > 0 &&
                <aside>
                    <h4>קבצים שנקלטו:</h4>
                    <ul>{files}</ul>
                    {prog !== 0 ? (
                        <div>
                            {prog === 100 ? (
                                <h1>הפעולה הושלמה בהצלחה</h1>
                            ) : (
                                <div className="progress_loading">
                                    <LinearWithValueLabel value={prog} />
                                    <h5 id="upload">{prog.toFixed(2)}% <br />אנא המתן</h5>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Button className="submit" onClick={() => {
                            upload(loaded_files)
                        }}>העלה קבצים</Button>
                    )}
                </aside>
            }
        </div>
    );
}

export default AddSharedZone;