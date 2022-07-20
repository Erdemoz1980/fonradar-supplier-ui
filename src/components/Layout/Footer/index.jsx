import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import useResponsive from '../../../hooks/useResponsive';
import Text from '../../Text';
import StyledFooter from './styles';

import LOGO_WHITE from '../../../assests/logo-white.svg';
import DOMESTIC_GOOD from '../../../assests/domestic-good.png';
import APP_STORE from '../../../assests/app-store-download.png';
import GOOGLE_PLAY from '../../../assests/google-play-download.png';
import YAPIKREDI from '../../../assests/companies/yapikredi.png';
import DENIZFACTORING from '../../../assests/companies/deniz-faktoring.png';
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
                <Col md={12} lg={6}>
                    <div className="text-r mb">
                        <img src={LOGO_WHITE} alt="logo-white" />
                    </div>
                    <div className="text-r mb-big">
                        <img src={DOMESTIC_GOOD} alt="domestic-good" />
                    </div>

                    <div className="mb float-clear">
                        <Text className="d-block" type="mini-title" color="lightTextColor" align="right" bold>
                            Fon Radar Bilişim Teknolojileri
                        </Text>
                        <Text type="mini-title" color="lightTextColor" align="right" bold>
                            San. ve Tic. Ltd. Şti.
                        </Text>
                    </div>

                    <Text type="mini-title" color="lightTextColor" align="right">
                        Büyükdere Caddesi No:255, Nurol Plaza B02, Sarıyer/İstanbul
                    </Text>

                    <Text type="mini-title" color="lightTextColor" align="right">
                        info@fonradar.com
                    </Text>
                </Col>

                <Col>
                    <div>
                        <Text type="label" color="#fff">
                            Uygulamamızı İndirin
                        </Text>
                    </div>

                    <a
                        href="https://apps.apple.com/tr/app/fonradar/id1481393590"
                        className="m"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img className="mb d-block" src={APP_STORE} alt="app-store" />
                    </a>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.fonradar.app"
                        className="m"
                        target="_blank"
                        rel="noopener noreferrer">
                        <img className="mb-big d-block" src={GOOGLE_PLAY} alt="google-play" />
                    </a>

                    <Text className="mb" type="label" color="#fff">
                        Referanslar
                    </Text>

                    <img className="ref-logo mr" src={YAPIKREDI} style={{ height: 60 }} alt="yapikredi" />
                    <img
                        className="ref-logo mr"
                        src={DENIZFACTORING}
                        style={{ height: 45 }}
                        alt="denizfactoring"
                    />
                </Col>

                {!xs && (
                    <Col>
                        <Link to={urls.chequeCalculator}>
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Elime Ne Geçer
                            </Text>
                        </Link>

                        {/* <Link to={urls.seekFund} onClick={() => dispatch(createFundReset())}>
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Çek/Senet İşlemleri
                            </Text>
                        </Link> */}

                        <Link to={urls.funds}>
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Başvurularım
                            </Text>
                        </Link>

                        <Link to={urls.generalInfo}>
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Hesabım
                            </Text>
                        </Link>
                    </Col>
                )}

                <Col>
                    <div className="mb-big">
                        <a
                            href="https://www.fonradar.com/kullanici-sozlesmesi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Kullanıcı Sözleşmesi
                            </Text>
                        </a>

                        <a href="https://www.fonradar.com/kvkk/" target="_blank" rel="noopener noreferrer">
                            <Text type="mini-title" color="lightTextColor" align="right">
                                KVKK ve Aydınlatma Metni
                            </Text>
                        </a>
                        <a
                            href="https://www.fonradar.com/acik-riza-beyani/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Açık Rıza Beyanı
                            </Text>
                        </a>
                        <a
                            href="https://www.fonradar.com/cerez-politikasi/"
                            target="_blank"
                            rel="noopener noreferrer">
                            <Text type="mini-title" color="lightTextColor" align="right">
                                Çerez Politikası
                            </Text>
                        </a>
                    </div>

                    <img className="ref-logo mr" src={IYZICO} alt="iyzico" />
                    <img className="ref-logo" src={MASTERCARD} alt="mastercard" />
                    <img className="ref-logo" src={VISA} alt="visa" />
                </Col>
            </Row>

            <Text className="my-big d-block" type="small" align="center" color="lightTextColor">
                © 2020 – Fonradar.com Tüm Hakları Fon Radar Bilişim Teknolojileri San. ve Tic. Ltd. Şti.’ye
                aittir.
            </Text>
        </StyledFooter>
    );
}

export default Footer;
