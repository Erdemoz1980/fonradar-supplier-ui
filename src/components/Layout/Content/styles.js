import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const { Content } = Layout;

export default styled(Content)`
    /* display:flex;
  flex-direction: column; */
    overflow: auto;
    overflow-x: hidden;
    position: relative;

    background: ${({ theme }) => theme.main.spaceBackgroundColor};

    margin-top: ${({ theme }) => theme.header.height};
    padding: ${({ theme }) => theme.main.paddingBig} ${({ theme }) => theme.content.paddingHorizontal};
    padding-bottom: 80px;
`;

export const HelpLink = styled(Link)`
    position: absolute;
    right: ${({ theme }) => theme.main.paddingBig};
    bottom: ${({ theme }) => theme.main.padding};
`;
