import React, { useEffect } from 'react';
import { Modal, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import InputCode from '../../../../components/InputCode';
import { sendCode } from '../../../../store/user/userActions';

function GsmCodeVerificationModal({ isVisible, setIsVisible, onSuccess, gsmNumber }) {
    const dispatch = useDispatch();
    const [codeForm] = Form.useForm();
    const { sendCodeResponse, isSendCodeLoading } = useSelector((state) => state.user);

    useEffect(() => {
        if (sendCodeResponse.isOtpValid) {
            setIsVisible(false);
            onSuccess();
        } else if (sendCodeResponse && !sendCodeResponse.isOtpValid) {
            codeForm.resetFields();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendCodeResponse]);

    const onSubmitOtpCode = ({ code }) => {
        if (code.length >= 6) {
            dispatch(sendCode({ code, gsmNumber }));
        }
    };

    const onCancel = () => {
        setIsVisible(false);
    };

    return (
        <Modal
            title="Hesap Onayı"
            visible={isVisible}
            onCancel={onCancel}
            afterClose={() => codeForm.resetFields()}
            footer={false}>
            <Form form={codeForm} name="otpCode" onFinish={onSubmitOtpCode}>
                <Text color="smoke">İşleminizi tamamlamak için telefonunuza gelen onay kodunu giriniz.</Text>

                <div className="my-big">
                    <Text className="d-block" bold>
                        SMS Kodu
                    </Text>
                    <Form.Item name="code">
                        <InputCode fields={6} />
                    </Form.Item>
                </div>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSendCodeLoading}
                        disabled={codeForm.getFieldValue(['code'].length > 6)}
                        block>
                        Onayla
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default GsmCodeVerificationModal;
