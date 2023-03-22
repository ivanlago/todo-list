import React from 'react';
import ReactDom from 'react-dom';
import ItemsListTasks from './items-list-tasks';
import Task from '../models/task.model';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Testes do componente ItemsListTasks', () => {
    const nameTask = "Task";
    const task = new Task(1, nameTask, false);
    const taskCompleted = new Task(2, nameTask, true);
    
    it('Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<ItemsListTasks tasks={[]} reloadTasks={() => false} />, div);
        ReactDom.unmountComponentAtNode(div);
    })

    it('Deve exibir a tarefa', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItemsListTasks tasks={[task]} reloadTasks={() => false} />
                </tbody>
            </table>
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByTestId('name-task')).toHaveStyle('text-decoration: line-through');
    })

    it('Deve exibir a tarefa Concluída', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItemsListTasks tasks={[taskCompleted]} reloadTasks={() => false} />
                </tbody>
            </table>
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByTestId('task')).toHaveTextContent(nameTask);
    })

})
