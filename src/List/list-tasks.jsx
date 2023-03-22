import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import ItemsListTasks from './items-list-tasks';
import Pager from './pager';

const ListTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loadTasks, setLoadTasks] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortAsc, setSortAsc] = useState(false);
    const [sortDesc, setSortDesc] = useState(false);

    const ITEMS_PER_PAGE = 3;

    useEffect(() => {
        function getTasks () {
            const tasksDb = localStorage['tasks'];
            let listTasks = tasksDb ? JSON.parse(tasksDb) : [];

            //SORT
            if(sortAsc) {
                listTasks.sort((t1, t2) => (t1.name.toLowerCase() > t2.name.toLowerCase() ? 1 : -1 ))
            } else if(sortDesc) {
                listTasks.sort((t1, t2) => (t1.name.toLowerCase() < t2.name.toLowerCase() ? 1 : -1 ))
            }

            //PAGER
            setTotalItems(listTasks.length);
            console.log(listTasks);
            setTasks(listTasks.splice((currentPage - 1) * ITEMS_PER_PAGE, ITEMS_PER_PAGE));   
        }        

        if (loadTasks) {
            getTasks();
            setLoadTasks(false);
        }
        
    }, [loadTasks, currentPage, sortAsc, sortDesc]);

    function handleChangePage(page) {
        setCurrentPage(page);
        setLoadTasks(true);        
    }

    function handleSort (event) {
        event.preventDefault();
        if (!sortAsc && !sortDesc) {
            setSortAsc(true);
            setSortDesc(false);
        } else if(sortAsc) {
            setSortAsc(false);
            setSortDesc(true);
        } else {
            setSortAsc(false);
            setSortDesc(false);
        }
        setLoadTasks(true);
    }

    return (
        <div className='text-center'>
            <h3>List Tasks</h3>           
            <Table striped bordered hover responsive data-testid='table'>
                <thead>
                    <tr>
                        <th>
                            <a href='/' onClick={handleSort}>Task</a>
                        </th>
                        <th>
                            <Link to="/register" className='btn btn-success btn-sm'>
                                <FontAwesomeIcon icon={faPlus} /> &nbsp; New Task
                            </Link>
                        </th>
                    </tr>
                </thead>  
                <tbody>
                    <ItemsListTasks 
                        tasks={tasks}
                        reloadTasks={setLoadTasks} />
                </tbody>              
            </Table>
            <Pager
                 totalItems={totalItems}
                 itemsPerPage={ITEMS_PER_PAGE}
                 currentPage={currentPage}
                 changePage={handleChangePage} />
            
        </div>
    )
}

export default ListTasks;