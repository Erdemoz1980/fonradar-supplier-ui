import styled from 'styled-components';
import Card from '../../../components/Card';
import Text from '../../../components/Text';

export default styled(Card)`
    border: 2px solid #a8c5ff;
    background: #f0f5ff;
`;
export const InvoiceText = styled(Text)`
    line-height: 1.1;
`;

export const InvoiceRow = styled(Text)`
    display: flex;
`;

export const InvoiceCol = styled(Text)`
    margin-right: 40px;
`;
