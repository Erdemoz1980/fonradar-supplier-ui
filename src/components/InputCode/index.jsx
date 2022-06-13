import React, { forwardRef } from 'react';

import CodeInput from 'react-code-input';
import { useTheme } from 'styled-components';

function InputCode({ ...props }, ref) {
    const theme = useTheme();

    return (
        <CodeInput
            {...props}
            ref={ref}
            inputStyle={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: theme.main.h1FontSize,
                width: 30,
                textAlign: 'center',
                marginRight: 10,
                border: 'none',
                borderBottom: '2px solid black',
            }}
        />
    );
}

export default forwardRef(InputCode);
