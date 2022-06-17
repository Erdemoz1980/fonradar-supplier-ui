import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Divider, Checkbox, Input, Steps } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { getCode, signUp } from '../../../store/user/userActions';
import KullaniciSozlesmesi from '../../../assests/FonRadar-KullaniciSozlesmesi.pdf';
import AcikRizaMetni from '../../../assests/FonRadar-AcikRizaMetni.pdf';
import UserStepForm from './UserStepForm';
import LegalDocsForm from './LegalDocsForm';
import GsmCodeVerificationModal from './GsmCodeVerificationModal';
import { fetchProvinces } from '../../../store/provinces/provinceActions';
// import { getFormattedPhoneNumber } from '../../../utils';
// import { downloadURI } from '../../../utils/file';

const { Step } = Steps;

const getStepTitle = (title) => (
    <Text className="m-0" type="subtitle" bold>
        {title}
    </Text>
);
const requiredTrueValidator = {
    validator: (_, value) =>
        value ? Promise.resolve() : Promise.reject(new Error('Bu alanı onaylamalısınız!')),
};
function SignUpTab({ setActiveTabLogin }) {
    const dispatch = useDispatch();
    const [signUpForm] = Form.useForm();
    const [isVisible, setIsVisible] = useState(false);
    const [isCodeValid, setIsCodeValid] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const { isSignUpLoading, createdUser, isGetCodeLoading, getCodeResponse } = useSelector(
        ({ user }) => user
    );

    useEffect(() => {
        if (createdUser) {
            signUpForm.resetFields();
            setActiveTabLogin();
        }
    }, [createdUser, signUpForm, setActiveTabLogin]);

    const LoadPdfAcik = async () => {
        const formValues = signUpForm.getFieldsValue();
        const existingPdfBytes = await fetch(AcikRizaMetni)
            .then((res) => res.arrayBuffer())
            .then((arrayBufferData) => arrayBufferData);
        if (existingPdfBytes) {
            const pdfDoc = await PDFDocument.load(existingPdfBytes, {
                updateMetadata: false,
            });

            // Embed the Helvetica font
            const timeRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

            // Get the first page of the document
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            firstPage.moveTo(104, 560);
            firstPage.drawText(moment().format('DD-MM-YYYY'), {
                size: 10,
                font: timeRomanFont,
            });

            firstPage.moveTo(107, 533);
            firstPage.drawText(formValues.email || 'Farina', {
                size: 10,
                font: timeRomanFont,
            });

            // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
            // downloadURI(pdfDataUri);

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const updatedPdf = await pdfDoc.save();
            console.log(updatedPdf, '----');
        }
    };

    const LoadPdf = async () => {
        const formValues = signUpForm.getFieldsValue();
        LoadPdfAcik();
        const existingPdfBytes = await fetch(KullaniciSozlesmesi)
            .then((res) => res.arrayBuffer())
            .then((arrayBufferData) => arrayBufferData);
        if (existingPdfBytes) {
            const pdfDoc = await PDFDocument.load(existingPdfBytes, {
                updateMetadata: false,
            });

            // Embed the Helvetica font
            const timeRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

            // Get the first page of the document
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            firstPage.moveTo(254, 451);
            firstPage.drawText(formValues.email, {
                size: 11,
                font: timeRomanFont,
            });

            firstPage.moveTo(254, 467);
            firstPage.drawText(formValues.gsmNumber, {
                size: 10,
                font: timeRomanFont,
            });

            // Serialize the PDFDocument to bytes (a Uint8Array)
            const updatedPdf = await pdfDoc.save();
            console.log(updatedPdf, '----');
        }
    };

    const createUser = () => {
        LoadPdf();
        dispatch(signUp(signUpForm.getFieldsValue()));
    };

    const onCodeSuccess = () => {
        setIsCodeValid(true);
        setActiveStep(1);
        // const userData = signUpForm.getFieldsValue();
        // const titleData = userData?.title?.value ? userData?.title?.value : userData.title;
        // const provinceData = userData?.province?.value ? userData?.province?.value : userData.province;
        // const taxAdminData = userData?.taxAdministration?.value
        //     ? userData?.taxAdministration?.value
        //     : userData.taxAdministration;
        // const districtData = userData?.district?.value ? userData?.district?.value : userData.district;
    };

    const getCodeNo = () => {
        const form = signUpForm.getFieldsValue();
        if (form.name && form.surname && form.email && form.password && form.gsmNumber) {
            dispatch(getCode(form.gsmNumber));
        }
    };

    useEffect(() => {
        getCodeResponse && setIsVisible(true);
    }, [getCodeResponse]);

    useEffect(() => {
        dispatch(fetchProvinces());
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
                            activeStep === 1 ? <UserStepForm formValues={signUpForm.getFieldsValue()} /> : ''
                        }
                    />
                    <Step
                        disabled={!isCodeValid}
                        description={activeStep === 2 ? <LegalDocsForm /> : ''}
                        title={getStepTitle('Legal Evraklar')}
                    />
                </Steps>
                <Form.Item name="approveAccount" valuePropName="checked" rules={[requiredTrueValidator]}>
                    <Checkbox>
                        <a
                            href="https://www.fonradar.com/kullanici-sozlesmesi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text underlined bold>
                                Üyelik koşulları
                            </Text>
                        </a>
                        nı kabul ediyorum.
                    </Checkbox>
                </Form.Item>
                <Form.Item name="approveKvkk" valuePropName="checked" rules={[requiredTrueValidator]}>
                    <Checkbox>
                        <a href="https://www.fonradar.com/kvkk/" target="_blank" rel="noopener noreferrer">
                            <Text underlined bold>
                                Kişisel verilerimin korunması
                            </Text>
                        </a>
                        nı kabul ediyorum.
                    </Checkbox>
                </Form.Item>
                <Form.Item name="approveText" valuePropName="checked" rules={[requiredTrueValidator]}>
                    <Checkbox>
                        <a
                            href="https://www.fonradar.com/acik-riza-beyani/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text underlined bold>
                                Açık Rıza Metni
                            </Text>
                        </a>
                        ni kabul ediyorum.
                    </Checkbox>
                </Form.Item>

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
