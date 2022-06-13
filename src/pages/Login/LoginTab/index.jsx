import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { login } from '../../../store/user/userActions';
import urls from '../../../routes/urls';

function LoginTab({ setActiveTabSignUp }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isLoginLoading } = useSelector(({ user }) => user);

    const onLogin = (userCredentials) => {
        dispatch(login(userCredentials, history));
    };

    return (
        <>
            <Text type="title" color="primaryDark">
                Üye Girişi
            </Text>
            <Form name="login" onFinish={onLogin}>
                <Form.Item
                    name="email"
                    rules={[
                        { type: 'email', message: 'Lütfen geçerli bir e-posta adresi giriniz!' },
                        {
                            required: true,
                            message: 'Lütfen email giriniz!',
                        },
                    ]}>
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Lütfen şifrenizi giriniz!',
                        },
                    ]}>
                    <Input.Password placeholder="Şifre" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" loading={isLoginLoading} block>
                        Giriş Yap
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to={urls.passwordReset}>
                        <Button type="link" disabled={isLoginLoading}>
                            Parolamı unuttum
                        </Button>
                    </Link>
                </Form.Item>
            </Form>

            <Divider>
                <Text color="smoke">Henüz Hesabım Yok</Text>
            </Divider>
            <Button type="outline" size="large" onClick={setActiveTabSignUp} loading={isLoginLoading} block>
                Ücretsiz Üye Ol
            </Button>
        </>
    );
}

LoginTab.propTypes = {
    setActiveTabSignUp: PropTypes.func.isRequired,
};

export default LoginTab;
