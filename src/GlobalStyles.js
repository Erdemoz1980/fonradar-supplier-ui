import { createGlobalStyle } from 'styled-components';

/* - INDEX -
 * COLOR
 * SPACING
 * TEXT
 */

export default createGlobalStyle`
  // COLOR
  .primary{
    color: ${({ theme }) => theme.main.primaryColor}
  }
  .secondary{
    color: ${({ theme }) => theme.main.secondaryColor}
  }

  .smoke-background{
    background: ${({ theme }) => theme.main.smokeBackgroundColor}
  }

  .shadow{
    box-shadow: ${({ theme }) => theme.main.shadow};
  }
  .shadow-hover{
    box-shadow: ${({ theme }) => theme.main.shadowHover};
  }

  .opacity-50{
    opacity: 0.5;
  }
  .opacity-40{
    opacity: 0.4;
  }

  .cursor-pointer{
    cursor: pointer;
  }
  
  .hover-scale{
    transition: transform ${({ theme }) => theme.main.defaultAnimation};
    
    &:hover{
      transform: scale(1.05);
    }
  }

  .overflow-visible{
    overflow: visible;
  }


  // SPACING
  .w-100{
    width: 100%;
  }
  .limited-width{
    max-width: ${({ theme }) => theme.main.limitedWidth};
  }
  .h-100{
    height: 100%;
  }
  .d-block{
    display: block;
  }
  .d-inline{
    display: inline;
  }

  .m{
    margin: ${({ theme }) => theme.main.margin};
  }
  .m-0{
    margin: 0px;
  }
  .mx{
    margin-right: ${({ theme }) => theme.main.margin};
    margin-left: ${({ theme }) => theme.main.margin};
  }
  .ml{
    margin-left: ${({ theme }) => theme.main.margin};
  }
  .mr{
    margin-right: ${({ theme }) => theme.main.margin};
  }
  .my{
    margin-top: ${({ theme }) => theme.main.margin};
    margin-bottom: ${({ theme }) => theme.main.margin};
  }
  .mt{
    margin-top: ${({ theme }) => theme.main.margin};
  }
  .mb{
    margin-bottom: ${({ theme }) => theme.main.margin};
  }
  .m-big{
    margin: ${({ theme }) => theme.main.marginBig};
  }
  .mx-big{
    margin-right: ${({ theme }) => theme.main.marginBig};
    margin-left: ${({ theme }) => theme.main.marginBig};
  }
  .mr-big{
    margin-right: ${({ theme }) => theme.main.marginBig};
  }
  .ml-big{
    margin-left: ${({ theme }) => theme.main.marginBig};
  }
  .my-big{
    margin-top: ${({ theme }) => theme.main.marginBig};
    margin-bottom: ${({ theme }) => theme.main.marginBig};
  }
  .mb-big{
    margin-bottom: ${({ theme }) => theme.main.marginBig};
  }
  .mt-big{
    margin-top: ${({ theme }) => theme.main.marginBig};
  }

  .p{
    padding: ${({ theme }) => theme.main.padding};
  }
  .p-0{
    padding: 0px;
  }
  .px{
    padding-right: ${({ theme }) => theme.main.padding};
    padding-left: ${({ theme }) => theme.main.padding};
  }
  .pl{
    padding-left: ${({ theme }) => theme.main.padding};
  }
  .pr{
    padding-right: ${({ theme }) => theme.main.padding};
  }
  .py{
    padding-top: ${({ theme }) => theme.main.padding};
    padding-bottom: ${({ theme }) => theme.main.padding};
  }
  .pt{
    padding-top: ${({ theme }) => theme.main.padding};
  }
  .pb{
    padding-bottom: ${({ theme }) => theme.main.padding};
  }
  .p-big{
    padding: ${({ theme }) => theme.main.paddingBig};
  }
  .px-big{
    padding-right: ${({ theme }) => theme.main.paddingBig};
    padding-left: ${({ theme }) => theme.main.paddingBig};
  }
  .pl-big{
    padding-left: ${({ theme }) => theme.main.paddingBig};
  }
  .pr-big{
    padding-right: ${({ theme }) => theme.main.paddingBig};
  }
  .py-big{
    padding-top: ${({ theme }) => theme.main.paddingBig};
    padding-bottom: ${({ theme }) => theme.main.paddingBig};
  }
  .pb-big{
    padding-bottom: ${({ theme }) => theme.main.paddingBig};
  }
  .pt-big{
    padding-top: ${({ theme }) => theme.main.paddingBig};
  }

  // TEXT
  .bold{
    font-weight: bold;
  }
  .light{
    color: ${({ theme }) => theme.main.light};
  }
  .dark{
    color: ${({ theme }) => theme.main.dark};
  }
  .text-center{
    text-align: center;
  }
  .text-r{
    text-align: right;
  }

  // ANTD
  .ant-input-number-handler-wrap {
    display: none;
  }

  // REACT-PDF
  .annotationLayer {
    display: none;
  }
  .google-btn {
    width: 100%;
  }

  .status-title {
    display: block;
    font-weight: 500;
    font-size: 20px;
  }

  .item-title {
    display: block;
    font-weight: 400;
    font-size: 18px;
  }

  .font-18 {
    font-size: 18px !important;
  }

  .invoiceTable .ant-pagination-total-text {
    // width: 68%;
  }

  .invoiceTable .ant-pagination-item-link, 
  .invoiceTable .ant-pagination-options .ant-select .ant-select-selector, 
  .invoiceTable .ant-pagination-item {
    border: 0px;
  }

  .signup-popup .ant-drawer-header-title {
    flex-direction: row-reverse;
  }
`;
