import styled from 'styled-components';

export const ProgressBarContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
`;

export const Gradient = styled.div`
    position: relative;
    width: 100%;
    height: 20px;

    background-image: linear-gradient(to right, #82fd8f, #46c750);
    border-radius: ${({ theme }) => theme.main.borderRadius};
`;

export const TickContainer = styled.div`
    position: relative;
    transition: transform ${({ theme }) => theme.createAnimation(1.5)};
    transform: ${({ percentage = 0 }) => `translate(${percentage}%, -5px);`};
`;

export const Tick = styled.div`
    position: relative;
    width: 0px;
    height: 15px;

    border: 1px solid black;
`;
