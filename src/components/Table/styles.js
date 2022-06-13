import styled from 'styled-components';
import { Table } from 'antd';

export default styled(Table)`
    .ant-table-thead > tr > th {
        background: transparent;
        font-weight: bold;
        font-size: 16px;
    }

    td {
        font-size: 16px;
        font-weight: 500 !important;
    }
`;
