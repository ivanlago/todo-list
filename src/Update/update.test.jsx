import React from 'react';
import ReactDom from 'react-dom';
import Update from './update';


describe('Testes do componente Update', () => {

    it('Update- Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<Update id={1} />, div);
        ReactDom.unmountComponentAtNode(div);
    })
})
