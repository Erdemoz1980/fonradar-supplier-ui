import React, { useState } from 'react';
import { Form, Row, Upload } from 'antd';
// import { useSelector } from 'react-redux';
import Text from '../../../../components/Text';
// import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
// import { uploadLegalDocs } from '../../../../store/supplierFinancing/supplierFinancingActions';

// TODO: REFACTOR FORM

function LegalDocsForm() {
    // const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [legalDocs, setLegalDocs] = useState({
        TaxBoard: undefined,
        AuthorizedSignatures: undefined,
        ActivityCertificate: undefined,
    });
    // const { isLegalDocsLoading } = useSelector((state) => state.supplierFinancing);
    // const handleOnSubmitLegalDocs = () => {
    //     form.validateFields()
    //         .then((values) => {
    //             const formData = new FormData();
    //             formData.append('TaxBoard', values.TaxBoard);
    //             formData.append('AuthorizedSignatures', values.AuthorizedSignatures);
    //             formData.append('ActivityCertificate', values.ActivityCertificate);
    //             // values.TaxBoard && dispatch(uploadLegalDocs(formData));
    //         })
    //         .catch((errorInfo) => {
    //             console.log('errorInfo ...', errorInfo);
    //         });
    // };

    const handleDocumentUpload = (file, key) => {
        setLegalDocs({ ...legalDocs, [key]: file });
        form.setFieldsValue({ [key]: file });
        return false;
    };

    const handleDeleteUpload = (key) => {
        setLegalDocs({ ...legalDocs, [key]: undefined });
        form.setFieldsValue({ [key]: undefined });
        return true;
    };

    return (
        <div>
            <Form className="limited-width" form={form}>
                <Row className="mt">
                    <Form.Item
                        name="TaxBoard"
                        className="mr"
                        rules={[
                            {
                                required: true,
                                message: 'Dosya yükleyiniz!',
                            },
                        ]}>
                        <Text type="label" align="center" bold>
                            Vergi Levhası
                        </Text>
                        <Upload
                            listType="picture-card"
                            accept="application/pdf"
                            multiple={false}
                            onRemove={() => handleDeleteUpload('TaxBoard')}
                            beforeUpload={(file) => handleDocumentUpload(file, 'TaxBoard')}>
                            {!legalDocs.TaxBoard && (
                                <div>
                                    <Icon icon="plus" color="inherit" />
                                    <Text className="d-block" bold>
                                        Vergi Levhası
                                    </Text>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="AuthorizedSignatures"
                        className="mr ml"
                        rules={[
                            {
                                required: true,
                                message: 'Dosya yükleyiniz!',
                            },
                        ]}>
                        <Text type="label" align="center" bold>
                            İmza Sirküleri
                        </Text>
                        <Upload
                            listType="picture-card"
                            accept="application/pdf"
                            multiple={false}
                            onRemove={() => handleDeleteUpload('AuthorizedSignatures')}
                            beforeUpload={(file) => handleDocumentUpload(file, 'AuthorizedSignatures')}>
                            {!legalDocs.AuthorizedSignatures && (
                                <div>
                                    <Icon icon="plus" color="inherit" />
                                    <Text className="d-block" bold>
                                        İmza Sirküleri
                                    </Text>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="ActivityCertificate"
                        className="mr ml"
                        rules={[
                            {
                                required: true,
                                message: 'Dosya yükleyiniz!',
                            },
                        ]}>
                        <Text type="label" align="center" bold>
                            Faaliyet Belgesi
                        </Text>
                        <Upload
                            listType="picture-card"
                            accept="application/pdf"
                            multiple={false}
                            onRemove={() => handleDeleteUpload('ActivityCertificate')}
                            beforeUpload={(file) => handleDocumentUpload(file, 'ActivityCertificate')}>
                            {!legalDocs.ActivityCertificate && (
                                <div>
                                    <Icon icon="plus" color="inherit" />
                                    <Text className="d-block" bold>
                                        Faaliyet Belgesi
                                    </Text>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Row>
            </Form>
            {/* <Button
                type="primary"
                htmlType="submit"
                onClick={handleOnSubmitLegalDocs}
                // loading={isLegalDocsLoading}
                size="large">
                Kaydet
            </Button> */}
        </div>
    );
}

export default LegalDocsForm;
