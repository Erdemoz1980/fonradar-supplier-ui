import styled from 'styled-components';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

export default styled(Card)`
    border: 2px solid #a8c5ff;
    background: #f0f5ff;
`;

export const HelpBox = styled.div`
    width: 95%;
    margin: 40px auto 15px;
    display: flex;
    justify-content: space-between;
    .info_box {
        width: 225px;
        height: 304px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        gap: 40px;
        padding: 32px 24px;
        border-radius: 24px;
        border: solid 1px #e6f1ff;
        background-color: #f8fbff;
        text-align: center;
    }
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
