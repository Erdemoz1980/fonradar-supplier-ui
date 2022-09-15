import styled from 'styled-components';
import { Tabs as TabsAntd } from 'antd';

export const Tabs = styled(TabsAntd)`
    .ant-tabs-nav {
        display: none;
    }
`;

export const AuthTabs = styled.div`
    .ant-tabs {
        width: 400px;
        margin: 0px auto;
    }
    .ant-tabs-nav-list {
        background-color: #f4f4f4;
        width: 400px;
        margin: 0px auto;
        padding: 4px;
        border-radius: 12px;
    }
    .ant-tabs-top > .ant-tabs-nav::before {
        border-bottom: 0px;
    }
    .ant-tabs-tab {
        margin: 0px;
        width: 200px;
        justify-content: center;
    }
    .ant-tabs-tab-active {
        width: 196px;
        justify-content: center;
        background-color: #ffffff;
        border-radius: 12px;
    }
    .ant-tabs-ink-bar {
        background: transparent;
    }
    .ant-tabs-tab {
        font-weight: bold;
        color: #484848;
        font-weight: bold;
    }
    .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
        color: #484848 !important;
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
