import styled from 'styled-components';
import { Tabs as TabsAntd } from 'antd';

export const Tabs = styled(TabsAntd)`
    .ant-tabs-nav {
        display: none;
    }
`;

export const GoogleButton = styled.div`
    .google-btn {
        width: 100%;
        margin: 30px 0px 20px;
        border: 1px solid black !important;
        justify-content: center;
        color: black !important;
        border-radius: 6px !important;
        box-shadow: none !important;
        font-family: Montserrat, sans-serif !important;
        font-weight: 600 !important;
        font-size: 15px !important;
    }
    .google-btn div {
        height: 35px;
        width: 30px;
    }
`;

export const AppleButton = styled.div`
    .apple-auth-btn {
        width: 100%;
        border-radius: 6px !important;
        color: black !important;
        font-size: 15px !important;
        font-family: Montserrat, sans-serif !important;
        font-weight: 500 !important;
    }
    .apple-auth-btn svg {
        width: 30px;
    }
`;
