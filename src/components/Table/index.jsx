import React from 'react';
import PropTypes from 'prop-types';
import StyledTable from './styles';

function Table({ cursorPointer, rowClassName, ...props }) {
    return (
        <StyledTable
            rowClassName={rowClassName + cursorPointer ? 'cursor-pointer' : ''}
            locale={{ emptyText: 'Veri Yok' }}
            {...props}
        />
    );
}

Table.propTypes = {
    onRow: PropTypes.func,
    cursorPointer: PropTypes.bool,
    rowClassName: PropTypes.string,
};
Table.defaultProps = {
    onRow: () => null,
    cursorPointer: false,
    rowClassName: '',
};

export default Table;
