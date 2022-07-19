import React, { useState } from 'react';
import { Modal, Form } from 'antd';
import Button from '../../../../components/Button';
import Text from '../../../../components/Text';
import InputCode from '../../../../components/InputCode';
import { sendCode } from '../../../../apiServices/userApi';

function GsmCodeVerificationModal({ isVisible, setIsVisible, onSuccess, gsmNumber }) {
    const [codeForm] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onSubmitOtpCode = async ({ code }) => {
        if (code.length >= 6) {
            setLoading(true);
            const response = await sendCode({ code, gsmNumber });
            if (response && response.isOtpValid) {
                setLoading(false);
                setIsVisible(false);
                onSuccess();
            } else if (response && !response.isOtpValid) {
                setLoading(false);
                codeForm.resetFields();
            }
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
                        loading={loading}
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
