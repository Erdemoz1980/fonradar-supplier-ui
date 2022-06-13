import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Divider, Popover } from 'antd';
import { Link } from 'react-router-dom';
import Icon, { CustomIcon } from '../Icon';
import AccountDropdownStyled, { AccountButton } from './styles';
import { logout } from '../../store/user/userActions';
import Text from '../Text';
import urls from '../../routes/urls';

const AccountMenu = ({ setIsDropdownVisible }) => {
    const dispatch = useDispatch();

    const closeDropdown = () => {
        setIsDropdownVisible(false);
    };
    const onClickLogout = () => dispatch(logout());

    return (
        <>
            <Link to={urls.accountSettings}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Hesap Bilgileri
                    </Text>
                    <Text type="small" color="smoke">
                        E-posta, telefon ve şifre bilgilerini değiştir.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.accountType}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Hesap Tipi
                    </Text>
                    <Text type="small" color="smoke">
                        Kalan premium üyelik süreni ya da kredi adedini öğren.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.financialData}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Mali Verilerim
                    </Text>
                    <Text type="small" color="smoke">
                        Mali Verilerinizi ekleyin veya düzeltin.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.legalDocuments}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Legal Evraklar
                    </Text>
                    <Text type="small" color="smoke">
                        Şirketinize ait legal evrakları ekleyin veya güncelleyin.
                    </Text>
                </AccountButton>
            </Link>

            <Divider className="m" />

            <Link to={urls.help}>
                <AccountButton onClick={closeDropdown} block>
                    <Text className="m-0" type="label">
                        Yardım
                    </Text>
                    <Text type="small" color="smoke">
                        Sorularınızı cevaplayalım.
                    </Text>
                </AccountButton>
            </Link>
            <Divider className="m" />

            <Link to={urls.landing}>
                <AccountButton onClick={onClickLogout} block>
                    <Text className="m-0" type="label" color="red">
                        Çıkış
                    </Text>
                </AccountButton>
            </Link>
        </>
    );
};

function AccountDropdown() {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <AccountDropdownStyled>
            <Popover
                className="cursor-pointer"
                content={() => <AccountMenu setIsDropdownVisible={setIsDropdownVisible} />}
                trigger="click"
                placement="bottomRight"
                onVisibleChange={setIsDropdownVisible}
                visible={isDropdownVisible}>
                <div>
                    <CustomIcon icon="user" size="lg" />
                    <Text color="primary" bold>
                        Hesabım
                    </Text>

                    <Icon className="mx" icon="angle-down" size="lg" />
                </div>
            </Popover>
        </AccountDropdownStyled>
    );
}

AccountMenu.propTypes = {
    setIsDropdownVisible: PropTypes.func.isRequired,
};

export default AccountDropdown;
