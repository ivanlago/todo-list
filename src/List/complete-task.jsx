import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

const CompleteTask = (props) => {
    const [openModal, setOpenModal] = useState(false);

    function handleOpenModal (event) {
        event.preventDefault();
        setOpenModal(true);
    }

    const handleCloseModal = () => {        
        setOpenModal(false);    
    }

    const handleCompleteTask = (event) => {
        event.preventDefault();

        const tasksDb = localStorage['tasks'];
        let tasks = tasksDb ? JSON.parse(tasksDb) : [];

        // eslint-disable-next-line no-unused-vars
        tasks = tasks.map(task => {
            if ( task.id === props.task.id) {
                task.completed = true;
            }
            return task;
        });

        localStorage['tasks'] = JSON.stringify(tasks);
        setOpenModal(false);
        props.reloadTasks(true);
    }
    
    return (
        <span className={props.className}>
            <Button className='btn btn-sm'
                data-testid='btn-open-modal'
                onClick={handleOpenModal} >
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>
        

            <Modal show={openModal} onHide={handleCloseModal} data-testid='modal'>
                <Modal.Header closeButton>                        
                    <Modal.Title>Complete Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to complete the task?
                    <br />
                    <strong>{props.task.name}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCompleteTask} data-testid='btn-conclud'>Yes</Button>
                    <Button variant="light" onClick={handleCloseModal} data-testid='btn-close-modal'>No</Button>
                </Modal.Footer>
            </Modal>

        </span>
    )
}

CompleteTask.propTypes = {
    task: PropTypes.object.isRequired,
    reloadTasks: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default CompleteTask;