import React from 'react';
import PropTypes from 'prop-types';
import StyledButton from './styles';

function Button({ active, textAlign, children, ...props }) {
    return (
        <StyledButton {...props} $active={active} $textAlign={textAlign}>
            {children}
        </StyledButton>
    );
}

Button.propTypes = {
    active: PropTypes.bool,
    textAlign: PropTypes.string,
    children: PropTypes.node,
};
Button.defaultProps = {
    active: false,
    textAlign: '',
    children: () => null,
};

export default Button;
