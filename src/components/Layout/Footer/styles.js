import styled from 'styled-components';
import Layout from '../index';

const { Footer } = Layout;

export default styled(Footer)`
    background-color: ${({ theme }) => theme.footer.backgroundColor};
    color: ${({ theme }) => theme.main.lightTextColor} !important;

    img {
        &.ref-logo {
            height: 30px;
            max-width: 100%;
        }
    }
`;
