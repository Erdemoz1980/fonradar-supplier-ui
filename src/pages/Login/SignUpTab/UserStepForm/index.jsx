import React, { useState } from 'react';
import { Form, Row, InputNumber, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { companyDp } from '../../../../utils';
import { validateVkn } from '../../../../utils/validators';
import { fetchDistrictsSuccess, fetchTaxOffices } from '../../../../store/provinces/provinceActions';
import { signUp } from '../../../../store/user/userActions';

const { Option } = Select;

function UserStepForm({ formValues }) {
    const dispatch = useDispatch();
    const [showTaxOffice, setShowTaxOffice] = useState(false);
    const [provinceId, setProvinceId] = useState(0);
    const [form] = Form.useForm();
    const { districts, isDistrictsLoading, provinces, isProvincesLoading, taxOffices, isTaxOfficesLoading } =
        useSelector((state) => state.provinces);

    const onChangeProvince = (value) => {
        setShowTaxOffice(true);
        form.resetFields(['district']);
        form.resetFields(['taxAdministration']);
        const _province = provinces.length > 0 && provinces.find((province) => province.name === value);
        if (_province) {
            setProvinceId(_province.provinceId);
            dispatch(fetchDistrictsSuccess(_province.districts));
            dispatch(fetchTaxOffices(_province.provinceId));
        }
    };

    const updateUser = () => {
        form.validateFields()
            .then((values) => {
                if (
                    formValues.name &&
                    formValues.surname &&
                    formValues.email &&
                    formValues.password &&
                    formValues.gsmNumber
                ) {
                    dispatch(
                        signUp({
                            name: formValues.name,
                            surname: formValues.surname,
                            email: formValues.email,
                            password: formValues.password,
                            phone: formValues.gsmNumber,
                            taxNumber: `${values.taxId}`,
                            title: values.title,
                            taxAdministration: values.taxAdministration,
                            province: provinceId,
                        })
                    );
                }
            })
            .catch((errorInfo) => {
                console.log('errorInfo ...', errorInfo);
            });
        console.log('updateUser');
    };

    return (
        <>
            <Form form={form} name="accountSettings">
                <Row gutter={0}>
                    <Form.Item name="title" rules={[{ required: true }]}>
                        <Select placeholder="Şirket Türü" style={{ width: '300px', marginRight: '20px' }}>
                            {companyDp.map((company) => (
                                <Option key={`bank-option-${company.name}`} value={company.name}>
                                    {company.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        style={{ width: '300px' }}
                        name="taxId"
                        rules={[
                            {
                                required: true,
                                validator: (_, value) => validateVkn(value),
                            },
                        ]}>
                        <InputNumber className="w-100" placeholder="VKN/TCKN" />
                    </Form.Item>
                </Row>
                <Row gutter={0}>
                    <Form.Item
                        name="province"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen bir il seçiniz!',
                            },
                        ]}>
                        <Select
                            style={{ width: '300px', marginRight: '20px' }}
                            placeholder="İl"
                            loading={isProvincesLoading}
                            onChange={onChangeProvince}
                            optionFilterProp="children"
                            showSearch>
                            {provinces.map((provnce) => (
                                <Option key={`province-${provnce.name}`} value={provnce.name}>
                                    {provnce.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    {showTaxOffice && (
                        <Form.Item
                            name="district"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen bir il seçiniz!',
                                },
                            ]}>
                            <Select
                                style={{ width: '300px' }}
                                placeholder="İlçe"
                                loading={isDistrictsLoading}
                                optionFilterProp="children"
                                showSearch>
                                {districts.map((district, index) => (
                                    <Option key={`district-${index}`} value={district[index]}>
                                        {districts[index]}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                </Row>
                <Row gutter={0}>
                    {showTaxOffice && (
                        <Form.Item
                            name="taxAdministration"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen bir il seçiniz!',
                                },
                            ]}>
                            <Select
                                style={{ width: '300px' }}
                                placeholder="Vergi Dairesi"
                                loading={isTaxOfficesLoading}
                                optionFilterProp="children"
                                showSearch>
                                {taxOffices.map((taxOfc, id) => (
                                    <Option key={`tax-Administration-${id}`} value={taxOfc.name}>
                                        {taxOfc.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                </Row>
                <Button type="primary" onClick={updateUser} size="large">
                    Kaydet ve İlerle
                </Button>
            </Form>
        </>
    );
}

export default UserStepForm;
