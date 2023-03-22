import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';

const Pager = (props) => {

    function generateFirstItem () {
        return (
            <Pagination.First
                key='firstPage'
                onClick={() => props.changePage(1)}
                disabled={props.currentPage === 1} />
        )
    }

    function generatePreviousItem () {
        return (
            <Pagination.Prev
                key='prevPage'
                onClick={() => props.changePage(props.currentPage - 1)}
                disabled={props.currentPage === 1} />
        )
    }

    function generateNumericItem (page) {
        return (
            <Pagination.Item
                key={page}
                active={page === props.currentPage}
                onClick={() => props.changePage(page)}
                disabled={props.currentPage === 1} >
                {page}
            </Pagination.Item>
        )
    }

    function generateNextItem (numPages) {
        return (
            <Pagination.Next
                key='nextPage'
                onClick={() => props.changePage(props.currentPage + 1)}
                disabled={props.currentPage === numPages} />
        )
    }

    function generateLastItem (numPages) {
        return (
            <Pagination.Last
                key='lastPage'
                onClick={() => props.changePage(numPages)}
                disabled={props.currentPage === numPages} />
        )
    }
   

    function getPagination () {
        const numPages = Math.ceil(props.totalItems / props.itemsPerPage);
        let items = [];

        items.push(generateFirstItem());
        items.push(generatePreviousItem());
        
        for ( let page = 1; page <= numPages; page++ ) {
            items.push(generateNumericItem(page));
        }
        items.push(generateNextItem(numPages));
        items.push(generateLastItem(numPages));

        return items;
    }

    return (
        <Pagination data-testid='pagination'>
            {getPagination()}
        </Pagination>        
    )
}

Pager.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
}

export default Pager;