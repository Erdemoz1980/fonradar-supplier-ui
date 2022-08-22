import styled from 'styled-components';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

export default styled(Card)`
    border: 2px solid #a8c5ff;
    background: #f0f5ff;
`;

export const FaturaButton = styled(Button)`
    width: 264px;
    height: 48px;
    font-weight: 500;
    font-size: 14px;
    color: ${({ theme }) => theme.main.primaryColor};
    background-color: ${({ theme }) => theme.main.primaryLight};
    border-color: ${({ theme }) => theme.main.primaryLight};
    margin: 30px auto;
    &:hover {
        color: ${({ theme }) => theme.main.primaryColor};
        background-color: ${({ theme }) => theme.main.primaryLight};
        border-color: ${({ theme }) => theme.main.primaryLight};
    }
`;
