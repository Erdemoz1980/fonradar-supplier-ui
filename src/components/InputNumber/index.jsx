import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { convertNumberDotSeperated, decimalSeperator, integerSeperator } from '../../utils';

const InputNumber = (props) => {
    const [value, setValue] = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef();

    const getSeperatorCount = (formattedNumber) => {
        const seperatorCount = Math.floor((`${formattedNumber}`.length - 1) / 3);
        return seperatorCount < 0 ? 0 : seperatorCount;
    };

    const formatter = (event) => {
        const stringNumber = `${event.target.value}`;
        const cursorPosition = event.target.selectionStart;
        let formatted = '';
        let isDecimal = false;

        for (let i = 0; i < stringNumber.length; i += 1) {
            const char = stringNumber[i];

            if (char === decimalSeperator && !isDecimal) {
                isDecimal = true;
                formatted += char;
            } else if (char && Number.isInteger(parseInt(char))) {
                formatted += char;
            }
        }

        const [integer, decimal = ''] = formatted.split(decimalSeperator);
        let [oldInteger] = value.split(decimalSeperator);
        oldInteger = oldInteger.split(integerSeperator).join(''); // it includes "."

        const formattedInteger = convertNumberDotSeperated(parseInt(integer) || 0);

        const oldIntegerSeperatorCount = getSeperatorCount(oldInteger);
        const newIntegerSeperatorCount = getSeperatorCount(integer);
        const newCursorPosition = cursorPosition + (newIntegerSeperatorCount - oldIntegerSeperatorCount);
        setCursor(newCursorPosition);

        if (isDecimal) return `${formattedInteger}${decimalSeperator}${decimal.slice(0, 2)}`;
        return formattedInteger;

        // return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const setCursorPositions = () => {
        // reset the cursor position for input
        inputRef.current.input.selectionStart = cursor;
        inputRef.current.input.selectionEnd = cursor;
    };

    const onChange = (e) => {
        const formattedValue = formatter(e);
        setValue(formattedValue);
        if (props.onChange) props.onChange(formattedValue); // required for antd forms
    };

    useEffect(setCursorPositions, [value]);

    return <Input {...props} ref={inputRef} onChange={onChange} value={value} />;
};

InputNumber.propTypes = {
    onChange: PropTypes.func,
};
InputNumber.defaultProps = {
    onChange: () => null,
};

export default InputNumber;
