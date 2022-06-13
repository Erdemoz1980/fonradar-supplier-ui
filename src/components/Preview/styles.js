import styled from 'styled-components';
import { Image as ImageAntd } from 'antd';
import Icon from '../Icon';

export default styled.div`
    max-width: 104px;
    height: 100%;
    display: inline-block;
    position: relative;
    justify-content: center;

    .delete-icon {
        transition: transform ${({ theme }) => theme.main.defaultAnimation};
        transform: scale(0);
    }
    &:hover {
        .delete-icon {
            transition: transform ${({ theme }) => theme.main.defaultAnimation};
            transform: scale(1);
            &:hover {
                transform: scale(1.1);
            }
        }
    }
`;

export const Image = styled(ImageAntd)`
    border-radius: ${({ theme }) => theme.main.borderRadius};
    cursor: ${({ onClick }) => (onClick ? 'pointer' : '')};
`;

export const PdfContainer = styled.div`
    height: ${({ height }) => height};
    width: ${({ width }) => width};
    text-align: center;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: ${({ theme }) => theme.main.borderRadius};
    cursor: ${({ onClick }) => (onClick ? 'pointer' : '')};
`;

export const PdfNavigation = styled.div`
    width: 100%;
    position: absolute;
    bottom: 5px;
    text-align: center;
`;

export const DeleteIcon = styled(Icon)`
    position: absolute;
    z-index: 2;
    top: -10px;
    right: -10px;

    background-color: #fff;
    border-radius: 50%;
    color: ${({ theme }) => theme.main.red};
    cursor: pointer;
`;
