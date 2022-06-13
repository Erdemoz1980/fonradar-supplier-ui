import React, { useEffect, useState } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/Button';
import Text from '../../../components/Text';
import { oneColLayout, companyDp } from '../../../utils';
import { updateUser } from '../../../store/user/userActions';
import { fetchDistricts, fetchProvinces, fetchTaxOffices } from '../../../store/provinces/provinceActions';
import { validateGsmNumber } from '../../SupplierFinancingNew/SupplierFinancingForm/validators';

const { Option } = Select;

function AccountSettings() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [showTaxOffice, setShowTaxOffice] = useState(false);
    // const [phoneNumber, setPhoneNumber] = useState('');
    const { user, updatedUser, isUpdateUserLoading } = useSelector((state) => state.user);
    const { districts, isDistrictsLoading, provinces, isProvincesLoading, taxOffices, isTaxOfficesLoading } =
        useSelector((state) => state.provinces);

    useEffect(() => {
        if (updatedUser) form.resetFields();
    }, [updatedUser, form]);

    const validateGSMNo = (gsmNumber) =>
        gsmNumber?.charAt(0) === '0' ? gsmNumber?.replace('0', '') : gsmNumber;

    useEffect(() => {
        if (user) {
            const _company =
                companyDp.length > 0 && companyDp.find((company) => company.name === user.companyTitle);
            form.setFields([
                { name: 'email', value: user?.email },
                { name: 'name', value: user.name },
                { name: 'surname', value: user.surname },
                {
                    name: 'gsmNumber',
                    value: validateGSMNo(user?.gsmNumber),
                },
                {
                    name: 'title',
                    value: _company
                        ? { key: `bank-option-${_company.name}`, value: _company.name }
                        : form.getFieldValue(['title']),
                },
                { name: 'taxId', value: user.taxId },
            ]);
            // setPhoneNumber(user.normalizedGsmNumber);
        }
    }, [user, form]);

    const onSubmit = (vals) => {
        dispatch(updateUser(vals));
    };

    const onChangeProvince = () => {
        const _province = provinces?.find((province) => province.name === user?.province);
        if (_province) {
            dispatch(fetchDistricts(_province.provinceId));
            dispatch(fetchTaxOffices(_province.provinceId));
            form.setFields([
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

    useEffect(() => {
        dispatch(fetchProvinces());
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
                        Hesap Bilgileri
                    </Text>
                    <Text>E-posta ve şifre bilgilerini değiştir.</Text>
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
                                placeholder="İlçe"
                                loading={isDistrictsLoading}
                                optionFilterProp="children"
                                showSearch>
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
                            <Select
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

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            loading={isUpdateUserLoading}
                            block>
                            Kaydet
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}
export default AccountSettings;
