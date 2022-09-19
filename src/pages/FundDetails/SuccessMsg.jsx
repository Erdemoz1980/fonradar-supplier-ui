import React from 'react';
import { Col, Row, Button, Divider } from 'antd';
import { CheckCircleOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import Text from '../../components/Text';
import { SuccessBox } from './styles';
import { LoadPdfTemlik } from '../../utils/file';

const SuccessMsg = ({ invoiceData }) => {
    const handleTemlikDownload = async () => {
        await LoadPdfTemlik(invoiceData);
    };
    return (
        <>
            <Row>
                <Col xl={24}>
                    <SuccessBox>
                        <CheckCircleOutlined className="tick-icon" />
                        <Text>Onayınız finans kurumuna bildirildi.</Text>
                        <Text style={{ fontWeight: 'bold' }}>İşlemi tamamlamak için:</Text>
                        <Divider type="vertical" className="files-divider" />
                        <div className="num-round">1</div>
                        <Text>İşleme ait hazırlanan temliknameyi buradan indirin.</Text>
                        <Button onClick={handleTemlikDownload} className="download-temlik">
                            <DownloadOutlined className="download-icon" />
                            Temliknameyi İndir
                        </Button>
                        <Divider type="vertical" className="files-divider" />
                        <div className="num-round">2</div>
                        <Text>Temliknameyi bastırıp kaşeli ve imzalı olarak buraya yükleyin.</Text>
                        <Button className="add-temlik">
                            <PlusOutlined className="download-icon" />
                            Temliknameyi Yükle
                        </Button>
                        <Divider type="vertical" className="files-divider" />
                        <div className="num-round">3</div>
                        <Text>İmzali ve kaşeli bir kopyayı da şubeye iletin.</Text>
                    </SuccessBox>
                </Col>
            </Row>
        </>
    );
};

export default SuccessMsg;
