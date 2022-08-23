import { Row } from 'antd';
import styled from 'styled-components';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

export const FooterBox = styled(Row)`
    margin-right: 40px;
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 76px;
    left: 0;
    padding: 20px 30px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    background-color: #fff;
`;

export const InvoiceText = styled(Text)`
    line-height: 1.05;
    font-weight: 300;
    color: ${({ theme }) => theme.main.primaryColor};
`;

export const InvoiceValue = styled(Text)`
    line-height: 1;
    font-weight: 600;
    color: ${({ theme }) => theme.main.primaryColor};
`;

export const InvoiceRow = styled(Text)`
    display: flex;
`;

export const InvoiceCol = styled(Text)`
    margin-right: 4.5em;
`;

export const InvoiceButton = styled(Button)`
    padding-left: 27px;
    paddind-right: 27px;
    background-color: ${({ theme }) => theme.main.primaryColor};
    border-color: ${({ theme }) => theme.main.primaryColor};
`;
