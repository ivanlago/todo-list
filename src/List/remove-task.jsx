import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const RemoveTask = (props) => {
    const [openModal, setOpenModal] = useState(false);

    function handleOpenModal (event) {
        event.preventDefault();
        setOpenModal(true);
    }

    const handleCloseModal = () => {        
        setOpenModal(false);    
    }

    const handleRemoveTask = (event) => {
        event.preventDefault();

        const tasksDb = localStorage['tasks'];
        let tasks = tasksDb ? JSON.parse(tasksDb) : [];

        // eslint-disable-next-line no-unused-vars
        tasks = tasks.filter(task => task.id !== props.task.id);
        localStorage['tasks'] = JSON.stringify(tasks);      
        
        setOpenModal(false);
        props.reloadTasks(true);
    }
    
    return (
        <span>
            <Button variant='danger'
                className='btn btn-sm'
                data-testid='btn-open-modal'
                onClick={handleOpenModal} >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        

            <Modal show={openModal} onHide={handleCloseModal} data-testid='modal'>
                <Modal.Header closeButton>                        
                    <Modal.Title>Remove Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to remove this task?
                    <br />
                    <strong>{props.task.name}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRemoveTask} data-testid='btn-remove'>Yes</Button>
                    <Button variant="light" onClick={handleCloseModal} data-testid='btn-close-modal'>No</Button>
                </Modal.Footer>
            </Modal>

        </span>
    )
}

RemoveTask.propTypes = {
    task: PropTypes.object.isRequired,
    reloadTasks: PropTypes.func.isRequired,
    className: PropTypes.string
}

export default RemoveTask;