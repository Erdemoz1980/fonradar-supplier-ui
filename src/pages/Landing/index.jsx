import React from 'react';
// import { Col, Row } from 'antd';
// import { Link } from 'react-router-dom';
// import Text from '../../components/Text';
// import Button from '../../components/Button';
// import { LandingContainer, Banner } from './styles';
// import InfoCard from './InfoCard';
// import urls from '../../routes/urls';
// import LANDING_IMG from '../../assests/landing.png';

function Landing() {
    return (
        <div>
            {/* <Banner>
                <Row className="h-100" justify="center" align="middle" gutter={24}>
                    <Col className="img-col" xs={0} md={10} lg={8} xl={6} xxl={5}>
                        <img className="landing-img" src={LANDING_IMG} alt="app" />
                    </Col>
                    <Col xs={20} md={10} lg={8} xl={6} xxl={5}>
                        <Text type="title" color="primary" bold>
                            Çekinizi ya da faturanızı nakde çevirdiğinizde elinize ne kadar para geçeceğini
                            öğrenin.
                        </Text>

                        <Link to={urls.chequeCalculator}>
                            <Button type="primary" size="large">
                                Hemen Dene
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Banner> */}

            {/* <Row className="mt-big" justify="center" gutter={[40, 12]}>
                <Col xs={24} lg={8} xl={6} xxl={5}>
                    <InfoCard
                        icon="hand"
                        title="Elime Ne Geçer"
                        desc="Çekinizi ya da faturanızı nakde çevirdiğinizde elinize ne kadar para geçeceğini öğrenin."
                    />
                </Col>

                <Col xs={24} lg={8} xl={6} xxl={5}>
                    <InfoCard
                        icon="supplierFinancing"
                        title="Fatura İşlemleri"
                        desc="Vadeli faturanız için en iyi teklifleri alın."
                    />
                </Col>

                <Col xs={24} lg={8} xl={6} xxl={5}>
                    <InfoCard
                        icon="search"
                        title="Çek/Senet İşlemleri"
                        desc="Vadeli çekinizi nakde çevirmek için farklı kurumlardan teklif alın."
                    />
                </Col>

                <Col xs={24} lg={8} xl={6} xxl={5}>
                    <InfoCard
                        icon="fund"
                        title="Başvurularım"
                        desc="Vadeli çekiniz için gelen teklifleri görüntüleyin."
                    />
                </Col>
            </Row> */}
        </div>
    );
}

export default Landing;
