import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Radio, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { oneColLayout } from '../../../utils';
import { fetchProvinces } from '../../../store/provinces/provinceActions';
import { apiV1, endpoints } from '../../../services/apis';

const { Option } = Select;

function NationalityIdForm({ title, desc, submitText, onBack, onSuccess }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [type, setType] = useState('taxId');
    const [isLoading, setIsLoading] = useState(false);
    const { provinces, isProvincesLoading } = useSelector((state) => state.provinces);

    useEffect(() => {
        dispatch(fetchProvinces());
    }, [dispatch]);

    useEffect(() => {
        form.resetFields(['taxId']);
    }, [type, form]);

    const onTypeChange = (event) => {
        setType(event.target.value);
    };

    const onSubmit = async ({ taxId, province }) => {
        try {
            setIsLoading(true);
            await apiV1.patch(endpoints.updateTaxId, { taxId });
            await apiV1.patch(endpoints.updateProvince, { province });
            if (onSuccess) onSuccess();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Row>
            <Col {...oneColLayout}>
                <Text type="title">{title}</Text>
                <Text>{desc}</Text>

                <div className="mt-big">
                    <Text type="subtitle" color="dark" bold>
                        VKN veya TCKN bilgilerini bizimle paylaş
                    </Text>
                </div>

                <Form form={form} initialValues={{ type: 'taxId' }} onFinish={onSubmit}>
                    <Form.Item name="type" rules={[{ required: true, message: 'Lütfen bir seçim yapınız!' }]}>
                        <Radio.Group onChange={onTypeChange}>
                            <Radio value="taxId">
                                <Text>Vergi Kimlik No</Text>
                            </Radio>
                            <Radio value="idNo">
                                <Text>TC Kimlik No</Text>
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    {type === 'taxId' ? (
                        <Form.Item
                            name="taxId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen geçerli bir vergi kimlik numarası giriniz!',
                                    validator: (_, value) =>
                                        value.length === 10 ? Promise.resolve() : Promise.reject(),
                                },
                            ]}>
                            <Input placeholder="Vergi Kimlik No" />
                        </Form.Item>
                    ) : (
                        <Form.Item
                            name="taxId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen geçerli bir kimlik numaranızı giriniz!',
                                    validator: (_, value) =>
                                        value.length === 11 ? Promise.resolve() : Promise.reject(),
                                },
                            ]}>
                            <Input placeholder="TC Kimlik No" />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="province"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen bir il seçiniz!',
                            },
                        ]}>
                        <Select
                            placeholder="Bulunduğunuz il"
                            loading={isProvincesLoading}
                            optionFilterProp="children"
                            showSearch>
                            {provinces.map(({ provinceId, name }) => (
                                <Option key={`province-${provinceId}`} value={name}>
                                    {name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button className="mr" size="large" onClick={onBack} loading={isLoading}>
                            Geri
                        </Button>
                        <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
                            {submitText}
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

NationalityIdForm.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    submitText: PropTypes.string,
    onBack: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};
NationalityIdForm.defaultProps = {
    title: '',
    desc: '',
    submitText: 'Kaydet',
};

export default NationalityIdForm;
