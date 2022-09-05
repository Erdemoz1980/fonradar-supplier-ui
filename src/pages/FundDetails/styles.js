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
        height: 389px;
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
