import React from "react";
import './Modal.css';
import axios from '../../config';

class Modal extends React.Component {

    state = {
        input: "",
        message: null
    }

    handleSubmit = async () => {
        try {
            if (this.state.input) {
                await axios.post('/projects', { "name": this.state.input });
                this.setState({
                    message: 'Project created!',
                    input: ''
                });
            } else {
                this.setState({
                    message: 'Please enter project name!'
                });
            }
        } catch (err) {
            this.setState({
                message: 'Error - Project is not saved'
            });
        }
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value });
    }

    render() {
        return (
            <div className='modal' onClick={this.props.closeModal}>
                <div className='modal-form' onClick={(e) => e.stopPropagation()}>
                    <div className="modal-form_close" onClick={this.props.closeModal}>&times;</div>
                    <label>Project name:</label>
                    <input className='modal-form_input' type="text" value={this.state.input} onChange={this.handleChange} />
                    <button className='modal-form_button' onClick={this.handleSubmit}>
                        Create project
                    </button>

                    <p>{this.state.message}</p>
                </div>

            </div >
        );
    }
}

export default Modal;