import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Divider, Input, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import {
    getCode,
    signUp,
    getDocType,
    uploadDoc,
    setLoggedIn,
    // signUpSuccess,
} from '../../../store/user/userActions';
import UserStepForm from './UserStepForm';
import LegalDocsForm from './LegalDocsForm';
import GsmCodeVerificationModal from './GsmCodeVerificationModal';
import { fetchProvinces } from '../../../store/provinces/provinceActions';

const { Step } = Steps;

const getStepTitle = (title) => (
    <Text className="m-0" type="subtitle" bold>
        {title}
    </Text>
);

function SignUpTab({ setActiveTabLogin }) {
    const dispatch = useDispatch();
    const [signUpForm] = Form.useForm();
    const [provinceId, setProvinceId] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [legalDocs, setLegalDocs] = useState({
        TaxBoard: undefined,
        AuthorizedSignatures: undefined,
        ActivityCertificate: undefined,
    });

    const { isSignUpLoading, createdUser, isGetCodeLoading, getCodeResponse, getDocTypeRes } = useSelector(
        ({ user }) => user
    );

    useEffect(() => {
        if (createdUser) {
            signUpForm.resetFields();
            setActiveTabLogin();
        }
    }, [createdUser, signUpForm, setActiveTabLogin]);

    const uploadDocs = () => {
        if (!legalDocs.TaxBoard && !legalDocs.AuthorizedSignatures && !legalDocs.ActivityCertificate) {
            dispatch(setLoggedIn(true));
        }
        if (legalDocs.TaxBoard) {
            const formData = new FormData();
            formData.append('', legalDocs.TaxBoard);
            const documentTypeId = getDocTypeRes.find((doc) => doc.name === 'Vergi Levhası');
            if (documentTypeId) {
                dispatch(
                    uploadDoc({
                        formData,
                        supplierId: createdUser.supplierId,
                        documentTypeId: documentTypeId.id,
                    })
                );
            }
            if (!legalDocs.AuthorizedSignatures && !legalDocs.ActivityCertificate) {
                // dispatch(setLoggedIn(true));
            }
        }
        if (legalDocs.AuthorizedSignatures) {
            const formData = new FormData();
            formData.append('', legalDocs.AuthorizedSignatures);
            const documentTypeId = getDocTypeRes.find((doc) => doc.name === 'İmza Sirküleri');
            if (documentTypeId) {
                dispatch(
                    uploadDoc({
                        formData,
                        supplierId: createdUser.supplierId,
                        documentTypeId: documentTypeId.id,
                    })
                );
            }
            if (!legalDocs.ActivityCertificate) {
                // dispatch(setLoggedIn(true));
            }
        }
        if (legalDocs.ActivityCertificate) {
            const formData = new FormData();
            formData.append('', legalDocs.ActivityCertificate);
            const documentTypeId = getDocTypeRes.find((doc) => doc.name === 'Faaliyet Belgesi');
            if (documentTypeId) {
                dispatch(
                    uploadDoc({
                        formData,
                        supplierId: createdUser.supplierId,
                        documentTypeId: documentTypeId.id,
                    })
                );
            }
            // dispatch(setLoggedIn(true));
        }
    };

    const createUser = () => {
        // dispatch(signUpSuccess({ supplierId: 'efec903c-8cf5-4fc9-b40f-397f84ce26c3' }));
        const formValues = signUpForm.getFieldsValue();
        if (
            formValues.name &&
            formValues.surname &&
            formValues.email &&
            formValues.password &&
            formValues.gsmNumber &&
            formValues.taxId &&
            formValues.title &&
            formValues.taxAdministration
        ) {
            dispatch(
                signUp({
                    name: formValues.name,
                    surname: formValues.surname,
                    email: formValues.email,
                    password: formValues.password,
                    phone: formValues.gsmNumber,
                    taxNumber: `${formValues.taxId}`,
                    title: formValues.title,
                    taxAdministration: formValues.taxAdministration,
                    province: provinceId,
                })
            );
        }
    };

    useEffect(() => {
        if (createdUser) {
            setActiveStep(2);
            uploadDocs();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdUser, legalDocs]);

    const onCodeSuccess = () => {
        setIsCodeValid(true);
        setActiveStep(1);
    };

    const getCodeNo = () => {
        const form1 = signUpForm.getFieldsValue();
        if (form1.name && form1.surname && form1.email && form1.password && form1.gsmNumber) {
            dispatch(getCode(form1.gsmNumber));
        }
    };

    useEffect(() => {
        getCodeResponse && setIsVisible(true);
    }, [getCodeResponse]);

    useEffect(() => {
        dispatch(fetchProvinces());
        dispatch(getDocType());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSteps = (val) => {
        setActiveStep(val);
    };

    return (
        <>
            <GsmCodeVerificationModal
                onSuccess={onCodeSuccess}
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                gsmNumber={signUpForm.getFieldValue('gsmNumber')}
            />
            <Form name="basic" form={signUpForm} onFinish={createUser} size="large">
                <Steps direction="vertical" current={activeStep} onChange={handleSteps}>
                    <Step
                        title={getStepTitle('Temel Bilgiler')}
                        description={
                            <>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <Input placeholder="Ad" />
                                </Form.Item>
                                <Form.Item
                                    name="surname"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}>
                                    <Input placeholder="Soyad" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Lütfen geçerli bir e-posta adresi giriniz!',
                                        },
                                        {
                                            required: true,
                                            message: 'Lütfen e-posta adresinizi giriniz!',
                                        },
                                    ]}>
                                    <Input placeholder="E-posta adresi" />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Lütfen bir şifre giriniz!',
                                        },
                                    ]}>
                                    <Input.Password placeholder="Şifre" />
                                </Form.Item>
                                <Form.Item
                                    name="gsmNumber"
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) => {
                                                const patt = new RegExp('(5)[0-9][0-9][0-9]([0-9]){6}');
                                                return patt.test(value) && value.length < 11
                                                    ? Promise.resolve()
                                                    : Promise.reject(
                                                          new Error(
                                                              'Lütfen geçerli bir telefon numaranızı giriniz!'
                                                          )
                                                      );
                                            },
                                        },
                                    ]}>
                                    <Input addonBefore="+90" placeholder="Telefon Numarası" />
                                </Form.Item>
                                {!isCodeValid && (
                                    <Button
                                        type="primary"
                                        loading={isGetCodeLoading}
                                        onClick={getCodeNo}
                                        size="large">
                                        Kaydet ve İlerle
                                    </Button>
                                )}
                            </>
                        }
                    />
                    <Step
                        disabled={!isCodeValid}
                        title={getStepTitle('Firma Bilgileri')}
                        description={
                            isCodeValid || activeStep === 1 ? (
                                <UserStepForm form={signUpForm} setProvinceId={setProvinceId} />
                            ) : (
                                ''
                            )
                        }
                    />
                    <Step
                        disabled={!isCodeValid}
                        description={
                            isCodeValid || activeStep === 2 ? (
                                <LegalDocsForm setLegalDocs={setLegalDocs} legalDocs={legalDocs} />
                            ) : (
                                ''
                            )
                        }
                        title={getStepTitle('Legal Evraklar')}
                    />
                </Steps>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" loading={isSignUpLoading} block>
                        Kayıt Ol
                    </Button>
                </Form.Item>
            </Form>

            <Divider>
                <Text color="smoke">Hesabım Var</Text>
            </Divider>
            <Button type="outline" size="large" onClick={setActiveTabLogin} loading={isSignUpLoading} block>
                Giriş Yap
            </Button>
        </>
    );
}

SignUpTab.propTypes = {
    setActiveTabLogin: PropTypes.func.isRequired,
};

export default SignUpTab;
