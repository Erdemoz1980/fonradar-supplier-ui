import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Divider } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { login } from '../../../apiServices/userApi';
import urls from '../../../routes/urls';
import { setLoggedIn } from '../../../store/reducers/userSlice';

const LoginTab = ({ setActiveTabSignUp }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const onLogin = async (userCredentials) => {
        setLoading(true);
        const response = await login(userCredentials);
        if (response) {
            history.push(urls.supplierFinancing);
            dispatch(setLoggedIn(response.token));
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    return (
        <>
            <Text type="title" color="primaryDark">
                Üye Girişi
            </Text>
            <Form
                name="login"
                initialValues={{ email: 'farina@yahoo.com', password: '_f0N|R@d4r-._' }}
                onFinish={onLogin}>
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
                    <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                        Giriş Yap
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Link to={urls.passwordReset}>
                        <Button type="link" disabled={loading}>
                            Parolamı unuttum
                        </Button>
                    </Link>
                </Form.Item>
            </Form>

            <Divider>
                <Text color="smoke">Henüz Hesabım Yok</Text>
            </Divider>
            <Button type="outline" size="large" onClick={setActiveTabSignUp} loading={loading} block>
                Ücretsiz Üye Ol
            </Button>
        </>
    );
};

LoginTab.propTypes = {
    setActiveTabSignUp: PropTypes.func.isRequired,
};

export default LoginTab;
