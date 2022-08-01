import React, { useState } from 'react';
import { Col, Drawer, Row, Space, Tag } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LOGO from '../../../assests/logo-horizontal.svg';
import Button from '../../Button';
import Icon, { CustomIcon } from '../../Icon';
import StyledHeader, { DrawerButton } from './styles';
import AccountDropdown from '../../AccountDropdown';
import useResponsive from '../../../hooks/useResponsive';
import urls from '../../../routes/urls';
// import { fetchUser } from '../../../apiServices/userApi';
// import { setUser } from '../../../store/reducers/userSlice';

function Header() {
    // const dispatch = useDispatch();
    const location = useLocation();
    const { xl, xxl } = useResponsive();
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const { isLoggedIn } = useSelector(({ user }) => user);

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
        { text: 'Fatura İşlemleri', url: urls.supplierFinancing, icon: 'supplierFinancing', isNew: true },
        { text: 'Başvurularım', url: urls.funds, icon: 'fund' },
    ];

    // const getUserData = async () => {
    //     const response = await fetchUser();
    //     if (response) {
    //         dispatch(setUser(response));
    //     }
    // };

    // useEffect(() => {
    //     getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);

    return (
        <StyledHeader className="light">
            <Row className="h-100" justify="space-between" align="middle">
                <Col xs={15} md={8} lg={4}>
                    <Link to={urls.supplierFinancing}>
                        <img className="header-logo" src={LOGO} alt="header-logo" />
                    </Link>
                </Col>

                <Col xs={0} xl={16}>
                    <Row>
                        <Space>
                            {headerItems.map(({ text, icon, url, isNew, onClick }) => (
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
                            ))}
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
                                <div className="mt-big" />
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
