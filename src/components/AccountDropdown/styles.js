import styled from 'styled-components';
import Button from '../Button';

export default styled.div`
    display: flex;
    align-items: center;

    .account-dropdown {
        cursor: pointer;
    }
`;

export const AccountButton = styled(Button)`
    border: none;
    height: initial;
    box-shadow: none;
    text-align: start;
`;
