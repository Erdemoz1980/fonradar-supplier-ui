import styled from 'styled-components';

export const Banner = styled.div`
    margin-left: -${({ theme }) => theme.content.paddingHorizontal};
    margin-right: -${({ theme }) => theme.content.paddingHorizontal};
    margin-top: -${({ theme }) => theme.main.paddingBig};

    background: ${({ theme }) => theme.main.primaryFaded};
    padding-top: ${({ theme }) => theme.main.paddingBig};

    overflow-x: hidden;

    .img-col {
        align-self: flex-end;

        .landing-img {
            max-width: 100%;
            max-height: 500px;
        }
    }
`;

export const LandingContainer = styled.div``;
