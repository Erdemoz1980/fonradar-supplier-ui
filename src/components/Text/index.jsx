import React from 'react';
import PropTypes from 'prop-types';
import { Span, P, H1, H2, H3, H4 } from './styles';

const Text = ({ type, color, bold, weight, italic, className, style, children, align, underlined }) => {
    const getTag = () => {
        switch (type) {
            case 'title':
                return (
                    <H1
                        className={className}
                        style={style}
                        color={color || 'primaryDark'}
                        bold={bold}
                        weight={weight}
                        italic={italic}
                        align={align}
                        underlined={underlined}>
                        {children}
                    </H1>
                );
            case 'subtitle':
                return (
                    <H2
                        className={className}
                        style={style}
                        color={color}
                        bold={bold}
                        align={align}
                        italic={italic}
                        weight={weight}
                        underlined={underlined}>
                        {children}
                    </H2>
                );
            case 'label':
                return (
                    <H3
                        className={className}
                        style={style}
                        color={color}
                        bold={bold}
                        align={align}
                        italic={italic}
                        weight={weight}
                        underlined={underlined}>
                        {children}
                    </H3>
                );
            case 'mini-title':
                return (
                    <H4
                        className={className}
                        style={style}
                        color={color}
                        bold={bold}
                        align={align}
                        italic={italic}
                        weight={weight}
                        underlined={underlined}>
                        {children}
                    </H4>
                );
            case 'p':
                return (
                    <P
                        className={className}
                        style={style}
                        color={color}
                        bold={bold}
                        align={align}
                        italic={italic}
                        weight={weight}
                        underlined={underlined}>
                        {children}
                    </P>
                );
            case 'small':
                return (
                    <Span
                        className={`${className} small`}
                        style={style}
                        color={color}
                        bold={bold}
                        italic={italic}
                        weight={weight}
                        align={align}
                        underlined={underlined}>
                        {children}
                    </Span>
                );
            default:
                return (
                    <Span
                        className={className}
                        style={style}
                        color={color}
                        bold={bold}
                        italic={italic}
                        weight={weight}
                        align={align}
                        underlined={underlined}>
                        {children}
                    </Span>
                );
        }
    };

    return getTag(children);
};

Text.propTypes = {
    type: PropTypes.oneOf(['title', 'subtitle', 'label', 'mini-title', 'p', 'span', 'small']),
    color: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf(['primary', 'secondary', 'light', 'smoke']),
    ]),
    bold: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
    underlined: PropTypes.bool,
    weight: PropTypes.number,
    italic: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.any,
    align: PropTypes.string,
};
Text.defaultProps = {
    type: 'span',
    color: '',
    bold: false,
    underlined: false,
    weight: undefined,
    italic: false,
    className: '',
    style: null,
    children: null,
    align: 'inherit',
};

export default Text;
