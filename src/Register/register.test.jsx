import React from 'react';
import ReactDom from 'react-dom';
import Register from './register';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Test of component Register', () => {

    it('Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<Register />, div);
        ReactDom.unmountComponentAtNode(div);
    });

    it('Deve cadastrar uma nova tarefa', () => {
        const { getByTestId } = render(<Register />);
        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.change(getByTestId('txt-task'), { target: { value: 'test component'} });
        // eslint-disable-next-line testing-library/prefer-screen-queries
        fireEvent.click(getByTestId('btn-task'));
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByTestId('modal')).toHaveTextContent('Success');
        // eslint-disable-next-line testing-library/prefer-screen-queries
        expect(getByTestId('modal')).toHaveTextContent('Task added successfully');

    });
})
