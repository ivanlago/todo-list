import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';
import Task from '../models/task.model';

const Register = () => {
    let navigate = useNavigate();
    const [ task, setTask ] = useState("");
    const [ formValidado, setFormValidado ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);

    const newTask = (event) => {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            // obtém as tarefas
            const taskDB = localStorage['tasks'];
            const tasks = taskDB ? JSON.parse(taskDB) : [];

            // persiete a tarefa
            tasks.push(new Task(new Date().getTime(), task, false));
            localStorage['tasks'] = JSON.stringify(tasks);

            setShowModal(true);
        }        
    }

    const handleTxtTask = (event) => {
        setTask(event.target.value);
    }

    const handleCloseModal = () => {
        navigate("/", { replace: true });        
    }

    return (
        <div>
            <h1 className='text-center'>Register</h1>
            <div className='container'>
                <Form
                    validated={formValidado}
                    noValidate
                    onSubmit={newTask}>
                    <Form.Group>
                        <Form.Label>Task</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter the Task'
                            minLength='5'
                            maxLength='100'
                            required
                            value={task}
                            onChange={handleTxtTask}
                            data-testid='txt-task' />
                        <Form.Control.Feedback type='invalid'>
                            The task must be at least 5 characters long.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <Form.Group className='text-center'>
                        <Button variant='success' type='submit' data-testid='btn-task' >
                            Register
                        </Button>
                        &nbsp;
                        &nbsp;
                        <Link to="/" className='btn btn-light'>Back</Link>
                    </Form.Group>
                </Form>

                <Modal show={showModal} onHide={handleCloseModal} data-testid='modal'>
                    <Modal.Header closeButton>                        
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Task added successfully
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleCloseModal}>Continue</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default Register;