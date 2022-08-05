/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'antd';
import { CustomIcon } from '../../../components/Icon';
import Text from '../../../components/Text';
import { Steps } from './styles';

const { Step } = Steps;

function InvoiceResult() {
    return (
        <Row justify="center">
            <Col>
                <Steps direction="vertical" current={1}>
                    <Step
                        title={
                            <Text color="smoke" bold>
                                Başvurunuz Fon Radar numarasıyla oluşturuldu.
                            </Text>
                        }
                        description={
                            <Text type="p" color="smoke">
                                Gelen tekliflere Başvurularım sayfasından ulaşabilirsiniz
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
