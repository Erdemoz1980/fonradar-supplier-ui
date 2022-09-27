import React from 'react';
import { Button, Form, Row, Upload } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import Text from '../../../../components/Text';
import Icon from '../../../../components/Icon';
import { ServiceBox } from '../../styles';

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
                <Text type="label" style={{ fontSize: 15 }}>
                    Başvurularınızın hızlı bir şekilde işleme alınması için aşağıdaki alanını doldurmanız
                    gerekiyor.
                </Text>
                <Text type="label" style={{ fontSize: 15 }}>
                    Dosya Boyutu 10 MB'ı geçmemeli ve .jpg,.png ve .pdf format tiplerinden biri olmalıdır.
                </Text>
                <Form.Item name="taxBoard" className="mr">
                    <Text type="label" style={{ fontSize: 17, marginBottom: 0, marginTop: 10 }}>
                        Vergi Levhası
                    </Text>
                    <Text type="label" style={{ fontSize: 14 }}>
                        Şirkete ait vergi levhasını yükleyin.
                    </Text>
                    <Upload
                        className="legal-doc"
                        listType="picture-card"
                        accept="application/pdf"
                        multiple={false}
                        onRemove={() => handleDeleteUpload('taxBoard')}
                        beforeUpload={(file) => handleDocumentUpload(file, 'taxBoard')}>
                        {!legalDocs.taxBoard && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon icon="plus" color="inherit" />
                                <Text className="d-block" bold>
                                    Vergi Levhası
                                </Text>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item name="authorizedSignatures" className="mr">
                    <Text type="label" style={{ fontSize: 17, marginBottom: 0 }}>
                        İmza Sirküleri
                    </Text>
                    <Text type="label" style={{ fontSize: 14 }}>
                        Güncel imza sirkülerini yükleyin.
                    </Text>
                    <Upload
                        className="legal-doc"
                        listType="picture-card"
                        accept="application/pdf"
                        multiple={false}
                        onRemove={() => handleDeleteUpload('authorizedSignatures')}
                        beforeUpload={(file) => handleDocumentUpload(file, 'authorizedSignatures')}>
                        {!legalDocs.authorizedSignatures && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon icon="plus" color="inherit" />
                                <Text className="d-block" bold>
                                    İmza Sirküleri
                                </Text>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item name="activityCertificate" className="mr">
                    <Text type="label" style={{ fontSize: 17, marginBottom: 0 }}>
                        Faaliyet Belgesi
                    </Text>
                    <Text type="label" style={{ fontSize: 14 }}>
                        Bağlı olduğunuz ticaret odasından temin ettiğiniz faaliyet belgenizi yükleyin.
                    </Text>
                    <Upload
                        className="legal-doc"
                        listType="picture-card"
                        accept="application/pdf"
                        multiple={false}
                        onRemove={() => handleDeleteUpload('activityCertificate')}
                        beforeUpload={(file) => handleDocumentUpload(file, 'activityCertificate')}>
                        {!legalDocs.activityCertificate && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Icon icon="plus" color="inherit" />
                                <Text className="d-block" bold>
                                    Faaliyet Belgesi
                                </Text>
                            </div>
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item name="serviceAggrement" className="mr">
                    <Text type="label" style={{ fontSize: 17, marginBottom: 0 }}>
                        İmzalı Hizmet Sözleşmesi
                    </Text>
                    <Text type="label" style={{ fontSize: 14 }}>
                        Hizmet sözleşmemizi indirin, okuyup imzaladıktan sonra bir kopyayı buraya yükleyin.
                    </Text>
                    <ServiceBox>
                        <div>
                            <Button type="default" className="download-btn">
                                <VerticalAlignBottomOutlined
                                    style={{ fontSize: 20, verticalAlign: 'text-top' }}
                                />
                                Sözleşmeyi İndir
                            </Button>
                        </div>
                        <div>
                            <Upload
                                className="legal-doc"
                                listType="picture-card"
                                accept="application/pdf"
                                multiple={false}
                                onRemove={() => handleDeleteUpload('serviceAggrement')}
                                beforeUpload={(file) => handleDocumentUpload(file, 'serviceAggrement')}>
                                {!legalDocs.serviceAggrement && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}>
                                        <Icon icon="plus" color="inherit" />
                                        <Text className="d-block" bold>
                                            Yukle
                                        </Text>
                                    </div>
                                )}
                            </Upload>
                        </div>
                    </ServiceBox>
                </Form.Item>
            </Row>
        </div>
    );
}

export default LegalDocsForm;
