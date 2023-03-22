import { render, screen } from '@testing-library/react';
import TodoList from './todo-list';
import React from 'react';
import ReactDom from 'react-dom';

describe('Testes do componente Register', () => {

    it('Register - Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<TodoList />, div);
        ReactDom.unmountComponentAtNode(div);
    })
})
