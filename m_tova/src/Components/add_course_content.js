import React, { useState } from 'react';
import {storage, db} from '../Firebase/firebase';
import {useDropzone} from 'react-dropzone';
import firebase from 'firebase';

const AddZone = props => {

    const course_name = props.course_name
    const class_number = props.class_number
    const current_class_number=props.current_class_number
    const is_add_content=props.is_add_content
    const setContent = props.setContent
    const setClassContent = props.setClassContent
    const setCurrentClassNumber = props.setCurrentClassNumber
    const class_description =props.class_description

    let class_number_to_set
    is_add_content ?  class_number_to_set =current_class_number : class_number_to_set =class_number

    
    const [prog, setProg] = useState(0) 

    const {getRootProps, getInputProps, acceptedFiles} = useDropzone({noKeyboard: true});
    
    let loaded_files = []


    const files = acceptedFiles.map(file => {
        loaded_files.push(file)
        return(
            <ul key={file.path}>{file.path}</ul>)
    })

    const upload = (loaded_files) =>{ 
        const id = db.collection('stack_over').doc().id
        let temp_class_description = (class_description === '' ? "" : class_description)
        
        var newDescription = {
            course_name,
            class_number: class_number_to_set,
            class_description : temp_class_description
        };

        db.collection("classDescription").doc(id).set(newDescription).then(() => {
            console.log("Documents successfully written!");
        });
        var uploadTask

        loaded_files.forEach((item) => {
            uploadTask = storage.ref().child(`${course_name}/class${class_number_to_set}/${item.name}`).put(item)
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
                    console.log('Upload is running');
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
                console.log('File available at', downloadURL);
                });
                let temp_class_content = []
                    
                storage.ref().child(props.course_name + "/class" + class_number_to_set).listAll().then(async list => {
                    for(let lesson of list.items)
                    {
                        let url = await lesson.getDownloadURL()
                        temp_class_content.push({"url": url, "description": lesson.name})            
                    }
                    setClassContent(temp_class_content)
                    setCurrentClassNumber(class_number_to_set)
                    setContent("class_content")
                });   
            }
        );
    }

    return( 
        <div>
            <div {...getRootProps({className: 'dropzone add-zone'})}>
                <input {...getInputProps()} />
                <p>גרור לכאן או לחץ כדי לעלות קבצים</p>
            </div>
            <br />
            {files.length > 0 ? (
            <aside>
                <h4>קבצים שנקלטו:</h4>
                <ul>{files}</ul>
                <button onClick={()=>{
                    upload(loaded_files)
                }}>העלה קבצים</button>
            </aside>

            ):(<h4> </h4>) }
            {prog !== 0 ? (
                <div>
                    {prog === 100 ? (
                        <h1>הפעולה הושלמה בהצלחה</h1>
                    ):(
                        <h5 id = "upload">מעלה קבצים: {prog.toFixed(2)}% <br />אנא המתן</h5>
                    )}
                </div>
            ):(
                <div></div>
            )}
        </div>
    );
}
 
export default AddZone;