import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Form, Divider, Checkbox, Popover } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import { signUp } from '../../../store/user/userActions';
import { getFormattedPhoneNumber } from '../../../utils';
import KullaniciSozlesmesi from '../../../assests/FonRadar-KullaniciSozlesmesi.pdf';
import AcikRizaMetni from '../../../assests/FonRadar-AcikRizaMetni.pdf';
// import { downloadURI } from '../../../utils/file';

const requiredTrueValidator = {
    validator: (_, value) =>
        value ? Promise.resolve() : Promise.reject(new Error('Bu alanı onaylamalısınız!')),
};
function SignUpTab({ setActiveTabLogin }) {
    const dispatch = useDispatch();
    const [signUpForm] = Form.useForm();
    const [gsmNumber, setGsmNumber] = useState('');
    const { isSignUpLoading, createdUser } = useSelector(({ user }) => user);

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

    useEffect(() => {
        LoadPdfAcik();
    }, []);

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

    return (
        <>
            <Text type="title" color="primaryDark">
                Kayıt Ol
            </Text>
            <Form name="basic" form={signUpForm} onFinish={createUser} size="large">
                <div id="recaptcha-contaier" />
                <Popover
                    content={
                        <div>
                            <Text color="smoke">Telefon Numaranız: </Text>
                            <Text bold>{getFormattedPhoneNumber(gsmNumber)}</Text>
                        </div>
                    }
                    placement="top"
                    trigger="focus">
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
                                              new Error('Lütfen geçerli bir telefon numaranızı giriniz!')
                                          );
                                },
                            },
                        ]}>
                        <Input
                            addonBefore="+90"
                            placeholder="Telefon Numarası"
                            onChange={(e) => setGsmNumber(e.target.value)}
                        />
                    </Form.Item>
                </Popover>

                <Form.Item
                    name="email"
                    rules={[
                        { type: 'email', message: 'Lütfen geçerli bir e-posta adresi giriniz!' },
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

                <Form.Item name="referenceCode">
                    <Input placeholder="Referans Kodu (Opsiyonel)" />
                </Form.Item>

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
