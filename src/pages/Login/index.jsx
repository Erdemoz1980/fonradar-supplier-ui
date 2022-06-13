import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { useLocation } from 'react-router';
import LoginTab from './LoginTab';
import { oneColLayout } from '../../utils';
import { loginTabs } from './constants';

const { TabPane } = Tabs;

function Login() {
    const location = useLocation();
    const initialTab = (location.state && location.state.tab) || loginTabs.login;
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <Row>
            <Col {...oneColLayout}>
                <Tabs
                    defaultActiveKey="login"
                    activeKey={activeTab}
                    onChange={(tabKey) => setActiveTab(tabKey)}
                    animated>
                    <TabPane tab="Uye Girişi" key={loginTabs.login}>
                        <LoginTab setActiveTabSignUp={() => setActiveTab(loginTabs.signUp)} />
                    </TabPane>

                    {/* <TabPane tab="Kayıt Ol" key={loginTabs.signUp}>
                        <SignUpTab setActiveTabLogin={() => setActiveTab(loginTabs.login)} />
                    </TabPane> */}
                </Tabs>
            </Col>
        </Row>
    );
}

export default Login;
