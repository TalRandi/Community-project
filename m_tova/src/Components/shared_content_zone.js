import React, { Component } from 'react';
import AddSharedZone from './add_shared_content'
class SharedContent extends Component {
    constructor(props) {
        super(props);

        // const setContent = props.setContent

        this.state = {
            prop:props,
            class_number: 0,
            course_name: props.course_name,
            student_name:props.student_name,
            // setContent :props.setContent
        };


    }


    componentDidMount( ){

    }

    render() {
        console.log(this.state.prop)
        return (
            <div>
                {/* <button className="back" id={selected_course} onClick={() => { setContent("shared_content") }}>חזור</button> */}
                <div className="add_form">
                    <h1>הוספת תוכן</h1>
                    <input id="input_class_number" onChange={(event) => {
                        this.setState({ class_number: event.target.value })
                    }}
                        className="input_fields" type="text" placeholder="מספר שיעור" required />

                    {

                        // console.log(this.state.student_name),
                        this.state.class_number.length > 0 &&
                        <AddSharedZone
                            //  setClassContent={props.setClassContent}
                            course_name={this.state.course_name}
                            class_number={this.state.class_number}
                            setContent={this.props.setContent}
                            student_name={this.state.student_name}
                        />
                    }
                </div>
            </div>
        )
    }

}
export default SharedContent;