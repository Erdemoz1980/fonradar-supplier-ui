import styled from 'styled-components';
import Button from '../../Button';
import Layout from '../index';

const { Header } = Layout;

export default styled(Header)`
    z-index: 1000;
    position: fixed;
    width: 100%;

    overflow: hidden;
    height: ${({ theme }) => theme.header.height};
    padding: ${({ theme }) => theme.main.padding};
    padding-left: ${({ theme }) => theme.main.paddingBig};
    padding-right: ${({ theme }) => theme.main.paddingBig};

    background: ${({ theme }) => theme.main.primaryFaded};
    box-shadow: none;

    transition: background-color 0.3s linear, box-shadow 0.3s linear;

    &.light {
        background: ${({ theme }) => theme.header.backgroundColor};
        box-shadow: ${({ theme }) => theme.main.shadow};
    }

    .header-logo {
        width: 100%;
        max-height: 60px;
        user-select: none;
    }

    .header-btn {
        background: #fff;
        border: 0px;
        box-shadow: none;
        border-bottom: 0px;
        border-radius: 0px;
        padding: 0px 0px;
        font-weight: 500;
        margin-right: 40px;
    }

    .active-line,
    .header-btn:active,
    .header-btn:focus,
    .header-btn:hover {
        border: 0px;
        border-bottom: 2px solid ${({ theme }) => theme.main.primaryColor};
    }
`;

export const DrawerButton = styled(Button)`
    text-align: start;
`;
