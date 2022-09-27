import React, { useState } from 'react';
import { Form, Row, InputNumber, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { companyDp } from '../../../../utils';
import { validateVkn } from '../../../../utils/validators';
import { fetchTaxOffices } from '../../../../apiServices/commonApi';
import { setDistricts, setTaxOffices } from '../../../../store/reducers/commonSlice';

const { Option } = Select;

function UserStepForm({ setProvinceId, form }) {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const [showTaxOffice, setShowTaxOffice] = useState(false);
    const { districts, provinces, taxOffices } = useSelector(({ common }) => common);

    const onChangeProvince = async (value) => {
        setShowTaxOffice(true);
        form.resetFields(['district']);
        form.resetFields(['taxAdministration']);
        const _province = provinces.length > 0 && provinces.find((province) => province.name === value);
        if (_province) {
            setloading(true);
            setProvinceId(_province.provinceId);
            dispatch(setDistricts(_province.districts));
            const response = await fetchTaxOffices(_province.provinceId);
            if (response) {
                dispatch(setTaxOffices(response));
                setloading(false);
            }
        }
    };

    return (
        <>
            <Row gutter={0}>
                <Form.Item name="title" rules={[{ required: true }]}>
                    <Select placeholder="Şirket Türü" style={{ width: '350px', marginRight: '20px' }}>
                        {companyDp.map((company) => (
                            <Option key={`bank-option-${company.name}`} value={company.name}>
                                {company.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    style={{ width: '350px' }}
                    name="supplierTitle"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input placeholder="Ünvan" />
                </Form.Item>
                <Form.Item
                    style={{ width: '350px' }}
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
                        style={{ width: '350px', marginRight: '20px' }}
                        placeholder="İl"
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
                            style={{ width: '350px' }}
                            placeholder="İlçe"
                            loading={loading}
                            optionFilterProp="children"
                            showSearch>
                            {districts.length > 0 &&
                                districts.map((district, index) => (
                                    <Option key={`district-${index}`} value={district}>
                                        {district}
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
                            style={{ width: '350px' }}
                            placeholder="Vergi Dairesi"
                            loading={loading}
                            optionFilterProp="children"
                            showSearch>
                            {taxOffices.length > 0 &&
                                taxOffices.map((taxOfc, id) => (
                                    <Option key={`tax-Administration-${id}`} value={taxOfc.name}>
                                        {taxOfc.name}
                                    </Option>
                                ))}
                        </Select>
                    </Form.Item>
                )}
            </Row>
        </>
    );
}

export default UserStepForm;
