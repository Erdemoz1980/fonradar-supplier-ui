import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as StyledComponenThemeProvider } from 'styled-components';
import useResponsive from '../hooks/useResponsive';
import defaultTheme from './index';
import mobileTheme from './mobileTheme';

const ThemeSelector = ({ children, setTheme }) => {
    const { isMobile } = useResponsive();

    useEffect(() => {
        if (isMobile) {
            setTheme({
                ...defaultTheme,
                main: {
                    ...defaultTheme.main,
                    ...mobileTheme.main,
                },
            });
        } else {
            setTheme(defaultTheme);
        }
    }, [isMobile, setTheme]);

    return <>{children}</>;
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(defaultTheme);

    return (
        <StyledComponenThemeProvider theme={theme}>
            <ThemeSelector setTheme={setTheme}>{children}</ThemeSelector>
        </StyledComponenThemeProvider>
    );
};

ThemeSelector.propTypes = {
    children: PropTypes.node,
    setTheme: PropTypes.func.isRequired,
};
ThemeSelector.defaultProps = {
    children: () => <div />,
};

ThemeProvider.propTypes = {
    children: PropTypes.node,
};
ThemeProvider.defaultProps = {
    children: () => <div />,
};

export default ThemeProvider;
