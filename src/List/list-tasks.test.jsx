import React from 'react';
import ReactDom from 'react-dom';
import ListTasks from './list-tasks';

describe('Testes do componente Listasks', () => {

    it('Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<ListTasks />, div);
        ReactDom.unmountComponentAtNode(div);
    })
})
