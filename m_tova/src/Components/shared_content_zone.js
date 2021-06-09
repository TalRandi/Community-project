import React, { Component } from 'react';
import AddSharedZone from './add_shared_content'
import { db} from '../Firebase/firebase'


class SharedContent extends Component {
    constructor(props) {
        super(props);

        // const setContent = props.setContent

        this.state = {
            prop:props,
            class_number: 0,
            course_name: props.course_name,
            student_name:props.student_name,
            invalid_class : false,
            classes: []
            // setContent :props.setContent
        };
           
    }
    componentDidMount() {

        let list_of_classes =[]
        db.collection("classDescription").where("course_name", "==", this.state.course_name)
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach((doc) => {
                        list_of_classes.push(doc.data().class_number)
                    });
                    this.setState({classes : list_of_classes })
                });
    }
 
    render() {
        return (
            <div>
                <button className="back" id={this.state.course_name} onClick={() => { this.props.setContent("shared_content") }}>חזור</button>
                <div className="add_form">
                    <h1>הוספת תוכן</h1>
                    <input id="add_form" onChange={(event) => {
                        if(this.state.classes.includes(parseInt(event.target.value)))   
                            this.setState({ class_number: event.target.value, invalid_class : false })
                        else
                            this.setState({ class_number: event.target.value, invalid_class : true })
                          
                    }}
                        className="input_fields" type="text" placeholder="מספר שיעור" required />
                    {
                        this.state.class_number.length > 0 &&
                        !this.state.invalid_class &&
                        <AddSharedZone
                            // setClassContent={props.setClassContent}
                            course_name={this.state.course_name}
                            class_number={this.state.class_number}
                            setContent={this.props.setContent}
                            student_name={this.state.student_name}
                            setStudentSharedContent={this.props.setStudentSharedContent}
                        />
                    }
                    {this.state.invalid_class &&
                    this.state.class_number.length !== 0 &&
                    (<div>שיעור לא קיים</div>)
                    }

                </div>
            </div>
        )
    }


}
export default SharedContent;