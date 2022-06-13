import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { oneColLayout } from '../../../utils';
import Icon from '../../../components/Icon';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { Tabs } from '../styles';
import { resetPasswordSendCode, resetPassword } from '../../../store/user/userActions';
import urls from '../../../routes/urls';
import { resetPasswordTabs } from '../constants';

const { TabPane } = Tabs;

function PasswordReset() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        isResetPasswordSendCodeLoading,
        passwordResettingEmail,
        isResetPasswordLoading,
        passwordResettedEmail,
    } = useSelector(({ user }) => user);
    const [activeTabKey, setActiveTabKey] = useState(
        passwordResettingEmail ? resetPasswordTabs.resetPassword : resetPasswordTabs.sendCode
    );

    const sendCode = ({ email }) => {
        dispatch(resetPasswordSendCode(email));
    };
    const handleResetPassword = (vals) => {
        dispatch(resetPassword(vals));
    };

    useEffect(() => {
        if (passwordResettingEmail) setActiveTabKey(resetPasswordTabs.resetPassword);
        if (passwordResettedEmail) history.push(urls.login);
    }, [passwordResettingEmail, passwordResettedEmail, history]);

    return (
        <Row>
            <Col {...oneColLayout}>
                <Text type="title" color="">
                    Parolamı Unuttum
                </Text>
                <Tabs activeKey={activeTabKey} animated>
                    <TabPane key={resetPasswordTabs.sendCode}>
                        <Form name="sendCode" onFinish={sendCode}>
                            <Form.Item
                                name="email"
                                rules={[
                                    { type: 'email', message: 'Lütfen geçerli bir email giriniz!' },
                                    {
                                        required: true,
                                        message: 'Lütfen email giriniz!',
                                    },
                                ]}>
                                <Input placeholder="E-posta adresi" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    loading={isResetPasswordSendCodeLoading}
                                    block>
                                    Kod Gönder
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>

                    <TabPane key={resetPasswordTabs.resetPassword}>
                        <Text type="subtitle">Adresine onay kodu gönderdik.</Text>
                        <Text className="d-block mb-big" type="small" color="smoke" bold>
                            {passwordResettingEmail}
                        </Text>
                        <Text className="d-block" color="smoke">
                            E-postayı göremiyorsanız, önemsiz, spam, sosyal veya diğer klasörleri kontrol
                            ediniz.
                        </Text>

                        <Button
                            className="my"
                            textAlign="left"
                            type="link"
                            block
                            size="large"
                            onClick={() => sendCode({ email: passwordResettingEmail })}
                            icon={
                                <Icon
                                    icon="sync"
                                    size="lg"
                                    color="inherit"
                                    spin={isResetPasswordSendCodeLoading}
                                />
                            }
                            disabled={isResetPasswordSendCodeLoading}>
                            Tekrar Gönder
                        </Button>

                        <Form className="d-block" name="passwordReset" onFinish={handleResetPassword}>
                            <Form.Item
                                name="code"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Lütfen şifre yenileme kodunu giriniz!',
                                    },
                                ]}>
                                <Input placeholder="Kod" autoComplete="new-password" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Lütfen yeni şifre giriniz!',
                                    },
                                ]}>
                                <Input.Password placeholder="Yeni Şifre" autoComplete="new-password" />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                    loading={isResetPasswordLoading}
                                    block>
                                    Kaydet
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    );
}

export default PasswordReset;
