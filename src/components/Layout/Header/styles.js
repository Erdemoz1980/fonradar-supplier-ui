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
`;

export const DrawerButton = styled(Button)`
    text-align: start;
`;
