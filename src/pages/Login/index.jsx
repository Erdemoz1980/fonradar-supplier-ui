import React, { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import { useLocation } from 'react-router';
import LoginTab from './LoginTab';
import SignUpTab from './SignUpTab';
import { oneColLayout } from '../../utils';
import { loginTabs } from './constants';
import { AuthTabs } from './styles';

const { TabPane } = Tabs;

function Login() {
    const location = useLocation();
    const initialTab = (location.state && location.state.tab) || loginTabs.login;
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <Row>
            <Col style={{ margin: '0px auto' }} {...oneColLayout}>
                <AuthTabs>
                    <Tabs
                        defaultActiveKey="login"
                        activeKey={activeTab}
                        className="login-tab"
                        onChange={(tabKey) => setActiveTab(tabKey)}
                        animated>
                        <TabPane tab="Giriş Yap" key={loginTabs.login}>
                            <LoginTab setActiveTabSignUp={() => setActiveTab(loginTabs.signUp)} />
                        </TabPane>

                        <TabPane tab="Üye Ol" key={loginTabs.signUp}>
                            <SignUpTab setActiveTabLogin={() => setActiveTab(loginTabs.login)} />
                        </TabPane>
                    </Tabs>
                </AuthTabs>
            </Col>
        </Row>
    );
}

export default Login;
