import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row } from 'antd';
import { useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { oneColLayout } from '../../../utils';
import { updateUser } from '../../../apiServices/userApi';
import { validateGsmNumber } from '../../../utils/validators';

function GeneralInfo() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.user);

    const validateGSMNo = (gsmNumber) =>
        gsmNumber?.charAt(0) === '0' ? gsmNumber?.replace('0', '') : gsmNumber;

    useEffect(() => {
        if (user) {
            form.setFields([
                { name: 'email', value: user?.email },
                { name: 'name', value: user.name },
                { name: 'surname', value: user.surname },
                {
                    name: 'gsmNumber',
                    value: validateGSMNo(user?.gsmNumber),
                },
            ]);
        }
    }, [user, form]);

    const onSubmit = async (vals) => {
        setLoading(true);
        const response = await updateUser(vals);
        if (response) {
            form.resetFields();
            setLoading(false);
        }
    };

    return (
        <Row>
            <Col {...oneColLayout}>
                <div className="mb">
                    <Text type="title" bold>
                        Temel Bilgileri
                    </Text>
                    <Text>E-posta, telefon ve şifre bilgilerini değiştir.</Text>
                </div>

                <Form form={form} name="accountSettings" onFinish={onSubmit}>
                    <Text className="mt-big" type="subtitle">
                        Telefon Numarası:{' '}
                        <Text className="d-inline" type="subtitle" bold>
                            {user && user.gsmNumber}
                        </Text>
                    </Text>

                    <Form.Item name="name">
                        <Input placeholder="Ad" />
                    </Form.Item>

                    <Form.Item name="surname">
                        <Input placeholder="Soyad" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', message: 'Lütfen geçerli bir email giriniz!' }]}>
                        <Input placeholder="E-posta adresi" />
                    </Form.Item>

                    <Form.Item name="password">
                        <Input.Password placeholder="Şifre" autoComplete="new-password" />
                    </Form.Item>

                    <Form.Item
                        name="gsmNumber"
                        rules={[
                            {
                                validator: (_, value) => validateGsmNumber(value),
                            },
                        ]}>
                        <Input placeholder="Cep Telefonu" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large" loading={loading} block>
                            Kaydet
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
export default GeneralInfo;
