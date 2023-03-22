import React from 'react';
import ReactDom from 'react-dom';
import RemoveTask from './remove-task';
import Task from '../models/task.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Testes do componente RemoveTask', () => {
     const nameTask = "Task";
     const task = new Task(1, nameTask, false);
         
    it('Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<RemoveTask task={task} reloadTasks={() => false} />, div);
        ReactDom.unmountComponentAtNode(div);
    })

    it('Deve exibir a modal', () => {
        const { getByTestId } = render(
            <RemoveTask task={task} reloadTasks={() => false} />
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.click(getByTestId('btn-open-modal'));
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByTestId('modal')).toHaveTextContent(nameTask);
    })

    it('Deve remover uma tarefa', () => {
        localStorage['tasks'] = JSON.stringify([task])
        const { getByTestId } = render(
            <RemoveTask task={task} reloadTasks={() => false} />
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.click(getByTestId('btn-open-modal'));
        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.click(getByTestId('btn-remove'));
        const taskDb = JSON.parse(localStorage['tasks']);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(taskDb.length).toBe(0);
    })
})