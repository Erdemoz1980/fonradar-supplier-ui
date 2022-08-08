/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CustomIcon } from '../../../components/Icon';
import Text from '../../../components/Text';
import { Steps } from './styles';
import urls from '../../../routes/urls';

const { Step } = Steps;

function InvoiceResult() {
    const { invoiceResId } = useSelector((state) => state.supplierFinance);
    return (
        <Row justify="center">
            <Col>
                <Steps direction="vertical" current={1}>
                    <Step
                        title={
                            <Text color="smoke" bold>
                                Başvurunuz {invoiceResId} numarasıyla oluşturuldu.
                            </Text>
                        }
                        description={
                            <Text type="p" color="smoke">
                                Gelen tekliflere <Link to={urls.funds}>Başvurularım</Link> sayfasından
                                ulaşabilirsiniz.
                            </Text>
                        }
                        icon={<CustomIcon icon="verified" margin={false} />}
                    />
                </Steps>
            </Col>
        </Row>
    );
}

export default InvoiceResult;
