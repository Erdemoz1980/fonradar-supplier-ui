import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive';
import Text from '../../Text';
import StyledFooter from './styles';

import LOGO_WHITE from '../../../assests/logo-white.svg';
import DOMESTIC_GOOD from '../../../assests/domestic-good.png';
import IYZICO from '../../../assests/companies/iyzico.svg';
import MASTERCARD from '../../../assests/companies/mastercard.svg';
import VISA from '../../../assests/companies/visa.svg';
import urls from '../../../routes/urls';
// import { createFundReset } from '../../../store/funds/fundActions';

function Footer() {
    // const dispatch = useDispatch();
    const { xs } = useResponsive();

    return (
        <StyledFooter>
            <Row justify="space-between" gutter={[40, 40]}>
                <Col md={12} lg={6} style={{ flexGrow: '2', maxWidth: '100%' }}>
                    <div className="text-l" style={{ marginBottom: '32px' }}>
                        <img src={LOGO_WHITE} alt="logo-white" />
                    </div>
                    <div className="txt" style={{ marginBottom: '32px' }}>
                        <Text className="d-block mb" type="mini-title" color="white" align="left" bold>
                            Fon Radar Bilişim Teknolojileri San. ve Tic. Ltd. Şti.
                        </Text>
                        <Text className="mb" type="mini-title" color="white" align="left">
                            Büyükdere Caddesi No:255, Nurol Plaza B02, Sarıyer/İstanbul
                        </Text>
                        <Text type="mini-title" color="white" align="left">
                            info@fonradar.com
                        </Text>
                    </div>
                    <img className="ref-logo big-mr" src={DOMESTIC_GOOD} alt="domestic-good" />
                    <img className="ref-logo big-mr" src={IYZICO} alt="iyzico" />
                    <img className="ref-logo big-mr" src={MASTERCARD} alt="mastercard" />
                    <img className="ref-logo" src={VISA} alt="visa" />
                </Col>
                {!xs && (
                    <Col style={{ flexGrow: '1' }}>
                        <div className="fnt mr-bt">
                            <Link to={urls.chequeCalculator}>
                                <Text type="mini-title" color="white" align="right" className="mr-bt">
                                    Yüklenen Faturalarım
                                </Text>
                            </Link>
                            <Link to={urls.funds}>
                                <Text type="mini-title" color="white" align="right" className="mr-bt">
                                    Başvurularım
                                </Text>
                            </Link>

                            <Link to={urls.generalInfo}>
                                <Text type="mini-title" color="white" align="right">
                                    Temlik Ettiğim Faturalar
                                </Text>
                            </Link>
                        </div>
                    </Col>
                )}

                <Col style={{ flexGrow: '1' }}>
                    <div className="mb-big fnt">
                        <a
                            href="https://www.fonradar.com/kullanici-sozlesmesi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="white" align="right" className="mr-bt">
                                Kullanıcı Sözleşmesi
                            </Text>
                        </a>
                        <a
                            href="https://www.fonradar.com/kullanici-sozlesmesi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="white" align="right" className="mr-bt">
                                Sıkça Sorulan Sorular
                            </Text>
                        </a>
                        <a href="https://www.fonradar.com/kvkk/" target="_blank" rel="noopener noreferrer">
                            <Text type="mini-title" color="white" align="right" className="mr-bt">
                                KVKK ve Aydınlatma Metni
                            </Text>
                        </a>
                        <a
                            href="https://www.fonradar.com/acik-riza-beyani/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="white" align="right" className="mr-bt">
                                Açık Rıza Beyanı
                            </Text>
                        </a>
                        <a
                            href="https://www.fonradar.com/cerez-politikasi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="white" align="right">
                                Çerez Politikası
                            </Text>
                        </a>
                    </div>
                </Col>
            </Row>

            <Text className="my-big d-block" type="small" align="center" color="white">
                © 2020 – Fonradar.com Tüm Hakları Fon Radar Bilişim Teknolojileri San. ve Tic. Ltd. Şti.’ye
                aittir.
            </Text>
        </StyledFooter>
    );
}

export default Footer;
