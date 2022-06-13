import styled from 'styled-components';
import { Collapse } from 'antd';

export default styled(Collapse)`
    &,
    .ant-collapse-item,
    .ant-collapse-header,
    .ant-collapse-content {
        border: none;
    }

    .ant-collapse-header {
        display: none;
    }
`;
