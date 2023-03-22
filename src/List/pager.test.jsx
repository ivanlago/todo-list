import React from 'react';
import ReactDom from 'react-dom';
import Pager from './pager';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Testes do componente Update', () => {

    it('Update- Deve renderizar o documento div sem erros', () => {
        const div = document.createElement('div');
        ReactDom.render(<Pager
            totalItems={1}
            itemsPerPage={3}
            currentPage={1}
            changePage={() => false}
            />, div);
        ReactDom.unmountComponentAtNode(div);
    })

    it('Deve renderizar 3 páginas', () => {
        const { getByTestId} = render (<Pager
            totalItems={15}
            itemsPerPage={5}
            currentPage={1}
            changePage={() => false} />
        );
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const pagination = getByTestId('pagination');
        expect(pagination).toHaveTextContent('1');
        expect(pagination).toHaveTextContent('2');
        expect(pagination).toHaveTextContent('3');
    })
})
