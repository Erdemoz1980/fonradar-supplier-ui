import React, { useEffect, useState } from 'react';
import { Col, Form, Row, Select, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { oneColLayout, companyDp } from '../../../utils';
import { updateUser } from '../../../apiServices/userApi';
import { fetchTaxOffices, fetchProvinces } from '../../../apiServices/commonApi';
import { setDistricts, setTaxOffices, setProvinces } from '../../../store/reducers/commonSlice';

const { Option } = Select;

function CompanyInfo() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showTaxOffice, setShowTaxOffice] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const { user } = useSelector((state) => state.user);
    const { districts, provinces, taxOffices } = useSelector((state) => state.common);

    useEffect(() => {
        if (user) {
            const _company =
                companyDp.length > 0 && companyDp.find((company) => company.name === user.companyTitle);
            form.setFields([
                {
                    name: 'title',
                    value: _company
                        ? { key: `bank-option-${_company.name}`, value: _company.name }
                        : form.getFieldValue(['title']),
                },
                { name: 'taxId', value: user.taxId },
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

    const onChangeProvince = async () => {
        const _province = provinces?.find((province) => province.name === user?.province);
        if (_province) {
            dispatch(setDistricts(_province.districts));
            const response = await fetchTaxOffices(_province.provinceId);
            if (response) {
                dispatch(setTaxOffices(response));
            }
            form.setFields([
                { name: 'taxId', value: user.taxId },
                {
                    name: 'province',
                    value: _province
                        ? { key: `province-${_province.provinceId}`, value: _province.name }
                        : form.getFieldValue(['province']),
                },
            ]);
        }
    };

    useEffect(() => {
        if (user) {
            const _district =
                districts.length > 0 && districts.findIndex((district) => district.name === user.district);
            const _taxAdmin =
                taxOffices.length > 0 &&
                taxOffices.find((taxOffice) => taxOffice.name === user.taxAdministration);
            form.setFields([
                {
                    name: 'district',
                    value:
                        _district > 0
                            ? { key: `district${_district}`, value: districts[_district]?.name }
                            : form.getFieldValue(['district']),
                },
                {
                    name: 'taxAdministration',
                    value: _taxAdmin
                        ? { key: `tax-Administration-${_taxAdmin.id}`, value: _taxAdmin.name }
                        : form.getFieldValue(['taxAdministration']),
                },
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, districts, taxOffices]);

    const getProvinces = async () => {
        setLoadingData(true);
        const response = await fetchProvinces();
        if (response) {
            dispatch(setProvinces(response));
            setLoadingData(false);
        }
    };

    useEffect(() => {
        getProvinces();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (provinces?.length > 0) {
            onChangeProvince();
            setShowTaxOffice(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [provinces, user]);

    return (
        <Row>
            <Col {...oneColLayout}>
                <div className="mb">
                    <Text type="title" bold>
                        Firma Bilgileri
                    </Text>
                    <Text>Firmanıza ait bilgileri güncelleyin.</Text>
                </div>

                <Form form={form} name="accountSettings" onFinish={onSubmit}>
                    <Form.Item name="taxId">
                        <Input placeholder="VKN/TCKN" />
                    </Form.Item>
                    <Form.Item name="title" rules={[{ required: true }]}>
                        <Select placeholder="Şirket Türü">
                            {companyDp.map((company) => (
                                <Option key={`bank-option-${company.name}`} value={company.name}>
                                    {company.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="province"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen bir il seçiniz!',
                            },
                        ]}>
                        <Select
                            placeholder="İl"
                            loading={loadingData}
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
                            <Select placeholder="İlçe" optionFilterProp="children" showSearch>
                                {districts.map((district, id) => (
                                    <Option key={`district-${id}`} value={district.name}>
                                        {districts.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                    {showTaxOffice && (
                        <Form.Item
                            name="taxAdministration"
                            rules={[
                                {
                                    required: true,
                                    message: 'Lütfen bir il seçiniz!',
                                },
                            ]}>
                            <Select placeholder="Vergi Dairesi" optionFilterProp="children" showSearch>
                                {taxOffices.map((taxOfc, id) => (
                                    <Option key={`tax-Administration-${id}`} value={taxOfc.name}>
                                        {taxOfc.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}

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
export default CompanyInfo;
