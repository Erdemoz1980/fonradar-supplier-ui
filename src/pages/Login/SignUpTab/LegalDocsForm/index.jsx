import React from 'react';
import { Form, Row, Upload } from 'antd';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';

function LegalDocsForm({ legalDocs, setLegalDocs }) {
    const handleDocumentUpload = (file, key) => {
        setLegalDocs({ ...legalDocs, [key]: file });
        return false;
    };

    const handleDeleteUpload = (key) => {
        setLegalDocs({ ...legalDocs, [key]: undefined });
        return true;
    };

    return (
        <div>
            <Row className="mt">
                <Form.Item name="TaxBoard" className="mr">
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
                <Form.Item name="AuthorizedSignatures" className="mr ml">
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
                <Form.Item name="ActivityCertificate" className="mr ml">
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
        </div>
    );
}

export default LegalDocsForm;
