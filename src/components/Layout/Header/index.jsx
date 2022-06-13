import React, { useState } from 'react';
import { Col, Drawer, Row, Space, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LOGO from '../../../assests/logo-horizontal.svg';
import Button from '../../Button';
import Icon, { CustomIcon } from '../../Icon';
import StyledHeader, { DrawerButton } from './styles';
import AccountDropdown from '../../AccountDropdown';
import useResponsive from '../../../hooks/useResponsive';
import Text from '../../Text';
import urls from '../../../routes/urls';
import { logout } from '../../../store/user/userActions';
// import { createFundReset } from '../../../store/funds/fundActions';

// TODO: TOO MANY CODE DUPLICATES
// TODO: GET URLS FROM URLS FILE

function Header() {
    const location = useLocation();
    const { xl, xxl } = useResponsive();
    const dispatch = useDispatch();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.user);

    const path = location.pathname;
    const getButtonSize = () => {
        if (xxl) return 'large';
        return 'middle';
    };

    const closeDrawer = () => {
        setIsDrawerVisible(false);
    };
    const onClickDrawerItem = (callback) => {
        if (callback) callback();
        closeDrawer();
    };

    const headerItems = [
        // { text: 'Elime Ne Geçer', url: urls.chequeCalculator, icon: 'hand' },
        // { text: 'Fatura İşlemleri', url: urls.supplierFinancing, icon: 'supplierFinancing', isNew: true },
        // {
        //     text: 'Çek/Senet İşlemleri',
        //     url: urls.seekFund,
        //     icon: 'search',
        //     onClick: () => dispatch(createFundReset()),
        // },
        // { text: 'Başvurularım', url: urls.funds, icon: 'fund' },
    ];

    return (
        <StyledHeader className={`${path !== urls.landing ? 'light' : ''}`}>
            <Row className="h-100" justify="space-between" align="middle">
                <Col xs={15} md={8} lg={4}>
                    <Link to={urls.landing}>
                        <img className="header-logo" src={LOGO} alt="header-logo" />
                    </Link>
                </Col>

                <Col xs={0} xl={16}>
                    <Row>
                        <Space>
                            {/* {headerItems.map(({ text, icon, url, isNew, onClick }) => (
                                <Link key={`header-link-${url}`} to={url}>
                                    <Button
                                        type="transparent"
                                        size={getButtonSize()}
                                        active={path === url}
                                        onClick={onClick}>
                                        <CustomIcon icon={icon} />
                                        {text}
                                        {isNew && (
                                            <Tag className="ml" color="green">
                                                Yeni
                                            </Tag>
                                        )}
                                    </Button>
                                </Link>
                            ))} */}
                        </Space>
                    </Row>
                </Col>

                {xl ? (
                    <Col>
                        {isLoggedIn ? (
                            <AccountDropdown />
                        ) : (
                            <Link to={urls.login}>
                                <Button type="primary" size={getButtonSize()}>
                                    Giriş Yap / Üye Ol
                                </Button>
                            </Link>
                        )}
                    </Col>
                ) : (
                    <>
                        <Button type="primary" onClick={() => setIsDrawerVisible(true)}>
                            <Icon icon="bars" color="light" margin={false} />
                        </Button>
                        <Drawer
                            placement="right"
                            width="400"
                            closeIcon={false}
                            onClose={() => setIsDrawerVisible(false)}
                            visible={isDrawerVisible}>
                            {headerItems.map(({ text, icon, url, isNew, onClick }) => (
                                <Link key={`drawer-link-${url}`} to={url}>
                                    <DrawerButton
                                        type="transparent"
                                        size={getButtonSize()}
                                        onClick={() => onClickDrawerItem(onClick)}
                                        active={path === url}
                                        block>
                                        <CustomIcon icon={icon} />
                                        {text}
                                        {isNew && (
                                            <Tag className="ml" color="green">
                                                Yeni
                                            </Tag>
                                        )}
                                    </DrawerButton>
                                </Link>
                            ))}

                            {isLoggedIn ? (
                                <div className="mt-big">
                                    <Link to={urls.accountSettings}>
                                        <DrawerButton
                                            type="transparent"
                                            size={getButtonSize()}
                                            onClick={closeDrawer}
                                            active={path === urls.accountSettings}
                                            block>
                                            Hesap Bilgilerim
                                        </DrawerButton>
                                    </Link>

                                    <Link to={urls.accountType}>
                                        <DrawerButton
                                            type="transparent"
                                            size={getButtonSize()}
                                            onClick={closeDrawer}
                                            active={path === urls.accountType}
                                            block>
                                            Hesap Tipi
                                        </DrawerButton>
                                    </Link>

                                    <Link to={urls.help}>
                                        <DrawerButton
                                            type="transparent"
                                            size={getButtonSize()}
                                            onClick={closeDrawer}
                                            active={path === urls.help}
                                            block>
                                            Yardım
                                        </DrawerButton>
                                    </Link>

                                    <DrawerButton
                                        type="transparent"
                                        size={getButtonSize()}
                                        onClick={() => {
                                            dispatch(logout());
                                            closeDrawer();
                                        }}
                                        active={path === urls.help}
                                        block>
                                        <Text color="red">Çıkış</Text>
                                    </DrawerButton>
                                </div>
                            ) : (
                                <Link to={urls.login}>
                                    <Button
                                        className="mt"
                                        type="primary"
                                        size={getButtonSize()}
                                        onClick={closeDrawer}
                                        active={path === urls.funds}
                                        block>
                                        Giriş Yap / Kayıt Ol
                                    </Button>
                                </Link>
                            )}
                        </Drawer>
                    </>
                )}
            </Row>
        </StyledHeader>
    );
}

export default Header;
