import styled from 'styled-components';
import { Button } from 'antd';

// TYPES: primary, secondary, default-secondary, deafult, link

export default styled(Button)`
    border-radius: ${({ theme }) => theme.main.borderRadius};
    /* box-shadow: ${({ theme, type }) => type !== 'link' && theme.main.shadow}; */
    user-select: none !important;

    &.ant-btn-lg {
        padding-left: ${({ theme }) => theme.main.paddingMedium};
        padding-right: ${({ theme }) => theme.main.paddingMedium};
    }

    ${({ textAlign }) => (textAlign ? `text-align:${textAlign}` : '')};

    background: ${({ type, $active, theme }) => {
        switch (type) {
            // case 'primary':
            //   return theme.main.primaryColor;
            case 'secondary':
                return theme.main.secondaryColor;
            case 'default-secondary':
                return theme.main.secondaryLight;
            case 'outline':
            case 'link':
                return 'transparent';
            case 'transparent':
                return $active ? theme.main.primaryFaded : 'transparent';
            default:
                return '';
        }
    }};
    color: ${({ type, theme }) => {
        switch (type) {
            // case 'primary':
            case 'secondary':
                return '#fff';
            case 'default-secondary':
                return theme.main.secondaryDark;
            case 'outline':
                return theme.main.primaryColor;
            case 'link':
                return theme.main.dark;
            case 'transparent':
                return theme.main.primaryColor;
            default:
                return '';
        }
    }};

    border-color: ${({ type, theme }) => {
        switch (type) {
            case 'secondary':
                return theme.main.secondaryColor;
            case 'default-secondary':
                return theme.main.secondaryLight;
            case 'outline':
                return theme.main.primaryColor;
            case 'transparent':
                return 'transparent';
            default:
                return '';
        }
    }};

    &.ant-btn:hover,
    &.ant-btn:focus {
        background: ${({ type, theme }) => {
            switch (type) {
                case 'secondary':
                    return theme.main.secondaryLight;
                case 'default-secondary':
                    return theme.main.secondaryColor;
                case 'outline':
                    return theme.main.primaryColor;
                case 'link':
                    return 'transparent';
                default:
                    return '';
            }
        }};
        color: ${({ type, theme }) => {
            switch (type) {
                // case 'primary':
                case 'secondary':
                case 'default-secondary':
                case 'outline':
                    return '#fff';
                case 'link':
                case 'transparent':
                    return theme.main.primaryColor;
                default:
                    return '';
            }
        }};
        border-color: ${({ type, theme }) => {
            switch (type) {
                case 'secondary':
                    return theme.main.secondaryLight;
                case 'default-secondary':
                    return theme.main.secondaryColor;
                case 'link':
                    return 'transparent';
                case 'outline':
                case 'transparent':
                    return theme.main.primaryColor;
                default:
                    return '';
            }
        }};
    }
`;
