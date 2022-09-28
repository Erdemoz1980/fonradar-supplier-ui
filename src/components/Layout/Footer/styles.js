import styled from 'styled-components';
import Layout from '../index';

const { Footer } = Layout;

export default styled(Footer)`
    background-color: ${({ theme }) => theme.footer.backgroundColor};
    color: ${({ theme }) => theme.main.spaceColor} !important;
    img {
        &.ref-logo {
            height: 24px;
            max-width: 100%;
        }
    }
    .txt {
        font-size: 12px;
    }
    .fnt {
        font-size: 14px;
    }
    .big-mr {
        margin-right: 80px;
    }
    .mr-bt {
        margin-bottom: 24px;
    }
`;
