import styled from 'styled-components';

export const LeftSideBox = styled.div`
    display: grid;
    width: 320px;
    margin-right: 20px;
    .head-title {
        font-size: 24px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        text-align: left;
        color: #001444;
    }
    .status-box {
        width: 320px;
        height: 64px;
        flex-grow: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin: 32px 0px 0px;
        gap: 49px;
        padding: 16px;
        object-fit: contain;
        background-color: #f4f4f4;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .status-title {
        flex-grow: 0;
        font-size: 16px;
        font-weight: 600;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        margin-left: 8px;
        letter-spacing: normal;
        text-align: left;
        color: #131112;
    }
    .item-title {
        width: 320px;
        flex-grow: 0;
        font-size: 15px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: left;
        color: #001444;
    }
    .item-value {
        flex-grow: 0;
        font-size: 15px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: normal;
        text-align: right;
        color: #131112;
    }
    .item-row {
        margin-bottom: 15px;
    }
    .item-box {
        width: 320px;
        height: max-content;
        flex-grow: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 16px;
        padding: 16px;
        border: solid 1px #eef4ff;
        background-color: #fff;
    }
`;

export const SuccessBox = styled.div`
    display: grid;
    justify-content: center;
    gap: 20px;
    text-align: center;
    .tick-icon {
        font-size: 48px;
        color: #5ad363;
    }
    .download-icon {
        font-weight: bold;
        font-size: 20px;
        margin-right: -10px;
    }
    .files-divider {
        height: 24px;
        border-left: 1.5px solid #e1e1e1;
        width: 49%;
        margin-left: auto;
    }
    .num-round {
        width: 32px;
        height: 32px;
        flex-grow: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 16px;
        border-radius: 33px;
        border: solid 1px #e1e1e1;
        background-color: #fff;
        margin: 0px auto;
    }
    .download-temlik {
        width: 230px;
        height: 45px;
        flex-grow: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 15px;
        border-radius: 8px;
        background-color: #f4f4f4;
        border: 0px;
        color: #131112;
        font-weight: bold;
        margin: 0px auto;
    }
    .add-temlik {
        width: 250px;
        height: 45px;
        flex-grow: 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 12px;
        padding: 15px;
        border-radius: 8px;
        background-color: #e6f1ff;
        border: 0px;
        color: #131112;
        font-weight: bold;
        margin: 0px auto;
    }
`;
